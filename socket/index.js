const { Server } = require("socket.io");
require('dotenv').config()

const io = new Server({cors: 'http://localhost:3000'});
let onlineUser = []

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on('addNewUser', (userId)=>{
    !onlineUser.some(user=>user.userId===userId) && 
      onlineUser.push({
        userId,
        socketId: socket.id
      })
      console.log('connnect',onlineUser);
      io.emit('getOnlineUser', onlineUser)
    })

  socket.on('disconnet',()=>{
    onlineUser = onlineUser.filter(user=> user.socketId !== socket.id)
    console.log('disconnet',onlineUser);
    io.emit('getOnlineUser', onlineUser)
  })

  socket.on('sendMessage', (message)=>{
    const user = onlineUser.find(user => user.userId === message.respientId)
    if(user){
      socket.to(user.socketId).emit('getMessage', message)
    }
  })

  socket.on('sendRequest', (request)=>{
    const user = onlineUser.find(user=>user.userId === request.recipient._id)
    if(user){
      socket.to(user.socketId).emit('getRequest', request)
    }
  })
});

io.listen(process.env.POST);