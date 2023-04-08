import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect (process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`)
    }).catch((err)=>{
        console.log("Can't connect with database")
    })
}
export default connectDB;