require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const sequelize = require("./config/db");

// Load models + relations
const { User, College, Channel, Message } = require("./models");

const authRoutes = require("./routes/auth");
const collegeRoutes = require("./routes/colleges");
const channelRoutes = require("./routes/channels");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/channels", channelRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("joinChannel", ({ channelId }) => {
    socket.join(channelId);
  });

  socket.on("sendMessage", async ({ channelId, userId, text }) => {
    const message = await Message.create({ ChannelId: channelId, UserId: userId, text });
    const populated = await Message.findByPk(message.id, { include: User });
    io.to(channelId).emit("newMessage", populated);
  });
});

// Sync MySQL tables & start server
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("MySQL Connected & Models Synced");
    server.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("DB Error:", err));
