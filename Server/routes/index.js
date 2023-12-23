const userRouter = require('./userRouter')
const chatRouter = require('./chatRouter')
const messageRouter = require('./messageRouter')
const friendRequestRouter = require('./friendRequestRouter')

function router(app){
    app.use('/user', userRouter)
    app.use('/chat',chatRouter)
    app.use('/message',messageRouter )
    app.use('/friendRequest', friendRequestRouter)
}
module.exports = router