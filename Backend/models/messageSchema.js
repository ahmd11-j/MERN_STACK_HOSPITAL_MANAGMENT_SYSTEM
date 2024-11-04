import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minlenght: [3, "First Name Must Contain At Least 3 Characters!"]
    },
    lastName:{
    type: String,
        required: true,
        minlenght: [3, "First Name Must Contain At Least 3 Characters!"]
    },
    email:{
        type: String,
        required : true,
        validate: [validator.isEmail, "Please Provide Valid Email"]
    },
    phone:{
        type: String,
        required: true,
        minlenght: [11, "Phone Number Must Contain Exact 11 Digit!"],
        maxlenght: [11, "Phone Number Must Contain Exact 11 Digit!"],
    },
    message:{
        type: String,
        required: true,
        minlenght: [10, "Message Must Contain Exact 10 Characters!"],
    }  
    });

    export const Message = mongoose.model("Message", messageSchema);