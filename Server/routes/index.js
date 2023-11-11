const userRouter = require('./userRouter')
const chatRouter = require('./chatRouter')
const messageRouter = require('./messageRouter')

function router(app){
    app.use('/user', userRouter)
    app.use('/chat',chatRouter)
    app.use('/message',messageRouter )
}
module.exports = router