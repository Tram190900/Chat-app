const userRouter = require('./userRouter')

function router(app){
    app.use('/user', userRouter)
}
module.exports = router