import { getModelForClass } from "@typegoose/typegoose";
import  mongoose from "mongoose";
import { User } from "./entities/User";



const MONGO_URI='mongodb+srv://admin:mcb2T4w7sLifL85J@cluster1.gfxtcfv.mongodb.net/chat-app?retryWrites=true&w=majority'
async function connectDB() {
    
    await mongoose.connect(MONGO_URI)   
        .then(() => console.log("Database connected!"))
        .catch(err => console.log(err));
    
}

connectDB();