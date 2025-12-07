require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const collegeRoutes = require('./routes/colleges');
const channelRoutes = require('./routes/channels');

const User = require('./models/User');
const Channel = require('./models/Channel');
const Message = require('./models/Message');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/channels', channelRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL || '*' } });

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  // join a channel room
  socket.on('joinChannel', ({ channelId, userId }) => {
    socket.join(channelId);
    console.log('joined', channelId);
  });

  // leave channel
  socket.on('leaveChannel', ({ channelId, userId }) => {
    socket.leave(channelId);
  });

  // send message
  socket.on('sendMessage', async ({ channelId, userId, text }) => {
    try {
      const message = await Message.create({ channel: channelId, sender: userId, text });
      const populated = await Message.findById(message._id).populate('sender', 'name');
      io.to(channelId).emit('newMessage', populated);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(PORT, () => console.log('Server running on', PORT));
}).catch(err => {
  console.error('Mongo connection error', err);
});
