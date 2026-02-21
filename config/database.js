import mongoose from "mongoose";

let connected = false;

const connectDB = async () =>{
    mongoose.set('strictQuery', true);

    //If already connected, don't connect again
    if(connected){
        console.log("MongoDB is connected");
        return;
    }

    //If not connected, connect
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
    } catch (error) {
        console.log("MongoDB: ", error);
    }
}

export default connectDB;