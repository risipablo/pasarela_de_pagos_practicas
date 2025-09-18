const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB)
        console.log("Conexion exitosa con la base datos")
    } catch (err){
        console.log("Error de conexion" + err)
    }
}

module.exports = connectDB