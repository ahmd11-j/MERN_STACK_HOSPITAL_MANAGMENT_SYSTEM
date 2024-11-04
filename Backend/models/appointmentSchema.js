import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
    nic:{
        type: String,
        required: true,
        minlenght: [13, "NIC Must Contain 13 Digits!"],
        maxlenght: [13, "NIC Must Contain 13 Digits!"],
    },  
    dob: {
        type: Date,
        required:[true, "DOB is required! "],
    },
    gender:{
        type: String,
        required: true,
        enum: ["Male","Female"],
    },
    appointment_date:{
        type : String,
        require: true,
    },
    department :{
        type: String,
        required: true,
    },
    doctor:{
        firstName:{
            type: String,
        required: true,
        },
        lastName:{
            type: String,
        required: true,
        },
    },
    hasVisited:{
        type : Boolean,
        default: false,
    },
    doctorId:{
        type: mongoose.Schema.ObjectId,
        rewuired: true,
    },
    address:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum:["Pending, Accepted, Rejected"],
        default:"Pending",
    },
    });

    export const Appointment = mongoose.model("Appointment", appointmentSchema);