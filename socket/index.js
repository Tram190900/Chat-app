const { Server } = require("socket.io");
require("dotenv").config();

const io = new Server({ cors: "http://localhost:3000" });
let onlineUser = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on("addNewUser", (userId) => {
    !onlineUser.some((user) => user.userId === userId) &&
      onlineUser.push({
        userId,
        socketId: socket.id,
      });
    console.log("connnect", onlineUser);
    io.emit("getOnlineUser", onlineUser);
  });

  socket.on("logOut", () => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUser", onlineUser);
    console.log("logOut", onlineUser);
  });

  socket.on("sendMessage", (message) => {
    const userRecipients = message.selectedChat.members.filter(
      (id) => id !== message.senderId
    );
    userRecipients.map(async (item) => {
      const user = onlineUser.find(
        (user) => user.userId === item
      );
      if (user) {
        console.log('user', user);
        socket.to(user.socketId).emit("getMessage", message);
        socket.to(user.socketId).emit("getNotification", {
          senderId: message.senderId,
          isRead: false,
          date: new Date(),
        });
      }
    });
  });

  socket.on("sendRequest", async (request) => {
    const user = await onlineUser.find(
      (user) => user.userId === request.recipient._id
    );
    if (user) {
      socket.to(user.socketId).emit("getRequest", request);
    }
  });
  socket.on("acceptRequest", async (request) => {
    const user = await onlineUser.find(
      (user) => user.userId === request.sender._id
    );
    if (user) {
      socket.to(user.socketId).emit("getAcceptRequest", { status: 200 });
    }
  });
  socket.on("sendFirstChat", async (message) => {
    const userRecipient = message.selectedChat.members.find(
      (id) => id !== message.senderId
    );
    const user = await onlineUser.find((user) => user.userId === userRecipient);
    if (user) {
      socket
        .to(user.socketId)
        .emit("getFirstChat", { newChat: message.selectedChat });
    }
  });
  socket.on("groupChat", async (message) => {
    const userRecipients = message.selectedChat.members.filter(
      (id) => id !== message.senderId
    );
    userRecipients.map(async (item) => {
      const user = await onlineUser.find((user) => user.userId === item);
      if (user) {
        socket
          .to(user.socketId)
          .emit("getFirstChat", { newChat: message.selectedChat });
      }
    });
  });
});

io.listen(process.env.POST);
