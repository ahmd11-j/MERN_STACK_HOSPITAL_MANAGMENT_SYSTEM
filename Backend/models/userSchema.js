import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    password:{
        type: String,
        minlenght: [8,"Password Must Contain At Least 8 Characters!"],
        required : true,
        select: false,
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"],
    },
    doctorDepartement:{
        type:String,
    },
    docAvator:{
        public_id: String,
        url: String,
    }, 
    });

    userSchema.pre("save", async function(next){
        if( !this.isModified("password")) {
          next();
        }
        this.password = await bcrypt.hash(this.password, 10);
       
        
    });

    userSchema.methods.comparePassword = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password);
    };

    userSchema.methods.generateJsonWebToken = function(){
        return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
            expiresIn: process.env.JWT_EXPIRES,
        });
    } 
    
    export const User = mongoose.model("User", userSchema);

