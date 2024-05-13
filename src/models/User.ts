import mongoose from "mongoose";
import { string } from "zod";

const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required: true
    },
    last_name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type:String,
        required: true
    },
})

const User = mongoose.models.User || mongoose.model("User",userSchema)
export default User;