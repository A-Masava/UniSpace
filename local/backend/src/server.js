require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');

const authRoutes      = require('./routes/auth');
const classroomRoutes = require('./routes/classroomRoutes');
const chatRoutes      = require('./routes/chatRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

const app = express();
const http = require('http');
const { Server } = require('socket.io');

// ── Middleware ──
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'] 
  : '*';
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// ── Database ──
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('DB Error:', err));

// ── Routes ──
app.use('/api/auth',       authRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/classrooms', announcementRoutes);
app.use('/api/chat',       chatRoutes);

app.get('/', (req, res) => {
  res.send('Unispace server is running');
});

// ── Start ──
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: allowedOrigins, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }
});

require('./socket/chatSocket')(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});