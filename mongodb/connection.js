const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const connect = async () => { 
  try {
    await mongoose.connect(process.env.DB_ENDPOINT)
    console.log('DB Connected')
  } catch (error) {
    console.log(error)
  }
 }

module.exports = { connect }
 
