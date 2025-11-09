 
const mongoose = require('mongoose')

const connectToDatabase = async () => {
    try {
        mongoose.set('strictQuery', false)  

        console.log("MongoUri:"+process.env.MONGO_URI)
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            //useUnifiedTopology: true,
            //useNewUrlParser: true,
        })
        console.log(`MongoDb Connected: ${connect.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

 module.exports = connectToDatabase;
 
