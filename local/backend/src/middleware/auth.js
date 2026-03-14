// Authentication Middleware
export const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        // TODO: Verify token
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Authorization Middleware
export const authorize = (...roles) => {
    return (req, res, next) => {
        // TODO: Check user role
        next();
    };
};

// Error Handling Middleware
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
};
