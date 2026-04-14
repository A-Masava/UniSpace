const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Student, Teacher } = require('../models/User');

function getModel(role) {
  return role === 'teacher' ? Teacher : Student;
}

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { role, fullName, idNumber, email, password, department } = req.body;

  if (!role || !fullName || !idNumber || !email || !password) {
    return res.status(400).json({ msg: 'Please fill in all required fields' });
  }

  try {
    const Model = getModel(role);

    const existing = await Model.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const data = { fullName, idNumber, email, password: hashed };
    if (role === 'student') data.department = department;

    const user = new Model(data);
    await user.save();

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      msg: 'Account created successfully',
      token,
      user: {
        id: user._id,
        role,
        fullName: user.fullName,
        email: user.email,
        department: user.department || null
      }
    });

  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ msg: 'Server error, please try again' });
  }
});


// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { role, email, password } = req.body;

  if (!role || !email || !password) {
    return res.status(400).json({ msg: 'Please provide role, email and password' });
  }

  try {
    const Model = getModel(role);

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    if (!user.password) {
      return res.status(400).json({ msg: 'This account uses Google Sign-In' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        role,
        fullName: user.fullName,
        email: user.email,
        department: user.department || null
      }
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ msg: 'Server error, please try again' });
  }
});


// POST /api/auth/google
router.post('/google', async (req, res) => {
  const { credential, role } = req.body;

  if (!credential || !role) {
    return res.status(400).json({ msg: 'Missing Google credential or role' });
  }

  try {
    const payload = JSON.parse(Buffer.from(credential.split('.')[1], 'base64').toString());
    const { sub: googleId, email, name, picture } = payload;

    const Model = getModel(role);
    let user = await Model.findOne({ email });

    if (!user) {
      user = new Model({
        fullName: name,
        idNumber: 'GOOGLE-' + googleId.slice(-6),
        email,
        googleId,
        avatar: picture
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      msg: 'Google sign-in successful',
      token,
      user: {
        id: user._id,
        role,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar
      }
    });

  } catch (err) {
    console.error('Google auth error:', err.message);
    res.status(500).json({ msg: 'Google sign-in failed' });
  }
});
// PUT /api/auth/profile
router.put('/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const Model = getModel(decoded.role);
    const user = await Model.findById(decoded.id);
    
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Update allowed fields
    const { fullName, idNumber, designation, department, bio, phone, website } = req.body;
    
    if (fullName) user.fullName = fullName;
    if (idNumber) user.idNumber = idNumber;
    if (designation !== undefined) user.designation = designation;
    if (department !== undefined) user.department = department;
    if (bio !== undefined) user.bio = bio;
    if (phone !== undefined) user.phone = phone;
    if (website !== undefined) user.website = website;

    await user.save();

    res.json({
      msg: 'Profile updated successfully',
      user: user.toObject()
    });
  } catch (err) {
    console.error('Profile update error:', err.message);
    res.status(500).json({ msg: 'Server error updating profile' });
  }
});


// GET /api/auth/me
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const Model = getModel(decoded.role);
    const user = await Model.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ ...user.toObject(), role: decoded.role });
  } catch (err) {
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
});



// PUT /api/auth/change-password
router.put('/change-password', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const Model = getModel(decoded.role);
    const user = await Model.findById(decoded.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ msg: 'Please provide current and new password' });
    }

    if (!user.password) {
      return res.status(400).json({ msg: 'This account uses Google Sign-In and has no password' });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ msg: 'New password must be at least 6 characters' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ msg: 'Password changed successfully' });
  } catch (err) {
    console.error('Change password error:', err.message);
    res.status(500).json({ msg: 'Server error, please try again' });
  }
});

module.exports = router;
