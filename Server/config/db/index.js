const mongoose = require('mongoose');
require('dotenv').config()

async function connected(){
  await mongoose.connect(process.env.MONODB_URL)
                  .then(()=>console.log('Connect Successfuly!!!'))
                  .catch((err)=>console.log('Connect failue!!!,'+err))
}
module.exports = {connected}