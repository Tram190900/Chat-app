const { Server } = require("socket.io");
require('dotenv').config()

const io = new Server({cors: 'http://localhost:3000'});
const onlineUser = []

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on('addNewUser', (userId)=>{
    !onlineUser.some(user=>user.userId===userId) && 
      onlineUser.push({
        userId,
        socketId: socket.id
      })
    })
  console.log(onlineUser);
});

io.listen(process.env.POST);