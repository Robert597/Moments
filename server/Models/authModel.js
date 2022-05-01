import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String
    },
    imageUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxOJamkXOs2GQClHU9T6Ua03OcWvAxYo2hj58JuhGfVyltG0mToYjbD-2Y_smcHR5ipKg&usqp=CAU"
    }
});

export default mongoose.model("User", userSchema);