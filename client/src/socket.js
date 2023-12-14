import {io} from 'socket.io-client'

let socket;
const connectSocket=(userId)=>{
    const newSocket = io("http://localhost:9000")
    socket = newSocket
    socket.emit('addNewUser', userId)
    return()=>{
        newSocket.disconnect()
    }
}
export {socket, connectSocket}