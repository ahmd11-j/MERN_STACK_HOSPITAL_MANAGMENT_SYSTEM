import {catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddleware.js"
import {User} from "../models/userSchema.js"
import {generateToken} from "../utils/jwtToken.js"
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req,res,next)=>{
    const{firstName,
         lastName,
          email,
           phone,
            password,
            gender,
            dob,
             nic,
              role}
               = req.body;
    if(!firstName||
         !lastName||
          !email ||
           !phone||
            !password||
             !gender ||
              !dob||
               !nic ||
                !role
            ){
                return next(new ErrorHandler("Please Fill Forum", 400));
            }
            let user = await  User.findOne({ email });
            if(user){
                return next(new ErrorHandler("User Already Register", 400));
            }
            user = await User.create({
                firstName,
                lastName,
                email,
                phone,
                password,
                gender,
                dob,
                nic,
                role
            });
            generateToken(user, "User Registered", 200, res);
                    

});


export const login = catchAsyncErrors(async(req, res, next)=>{
    const{email, password, confirmPassword, role} 
    = req.body;
    if(!email || !password || !confirmPassword|| !role){
        return next(new ErrorHandler("Please Provide All Detail", 400));
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password And Confirm Password Do Not Match!", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invailed Password And Email!", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Please Provide All Detail", 400));
    }
    if(role !== user.role){
        return next(new ErrorHandler("User With This Role Not Found!", 400));
    }

    generateToken(user, "User Login Successfully", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async(req, res, next)=>{
    const{firstName,
        lastName,
         email,
          phone,
           password,
           gender,
           dob,
            nic,
            
            }
              = req.body;
              if(
                !firstName||
                !lastName||
                 !email ||
                  !phone||
                   !password||
                    !gender ||
                     !dob||
                      !nic
                     
                   ){
                       return next(new ErrorHandler("Please Fill Forum", 400));
                   }
                   const isRegistered = await User.findOne({email});
                   if (isRegistered){
                   return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`));
                   }
                   const admin = await User.create({firstName,
                    lastName,
                     email,
                      phone,
                       password,
                       gender,
                       dob,
                        nic,
                        role: "Admin",
                    });
                    res.status(200).json({
                        success: true,
                        message:"New User Registered!",
                    });
});

export const getAllDoctors = catchAsyncErrors(async(res,req,next)=>{
    req.status(200).json({
        success:true,
        doctors,
    });

});

export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async(res,req,next)=>{
    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires: new Date(Date.now()),
    }).json({
        success:true,
        message:"User Log Out Successfully!",
    });
});

export const logoutPatient = catchAsyncErrors(async(res,req,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires: new Date(Date.now()),
    }).json({
        success:true,
        message:"Patient Log Out Successfully!",
    });
});

export const addNewDoctor = catchAsyncErrors( async (req,res,next) => {
    console.log(req.body);
    if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor Avatar Required!", 400))
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpg", "image/webp" ];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Format Is Not Supported!"))
    }
    const{firstName,
        lastName,
         email,
          phone,
           password,
           gender,
           dob,
            nic,
            doctorDepartement,
            } = req.body;
            if(!firstName ||
                !lastName ||
                 !email||
                  !phone||
                   !password||
                   !gender||
                   !dob||
                    !nic||
                    !doctorDepartement
                ){
                        return next(new ErrorHandler("Please Provide Full Details", 400));

                    }
                    const isRegistered = await User.findOne({email});
                    if(isRegistered){
                        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400));
                    } 
                    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
                        
                    
                    if( !cloudinaryResponse ||  cloudinaryResponse.error){
                        console.error("Cloudinary error!", cloudinaryResponse.error || "unkhnown cloudinary error");
                        return next(new ErrorHandler("cloudinary upload failed", 500));

                    }
                    const doctor = await User.create({
                        firstName,
                        lastName,
                        email,
                         phone,
                       password,
                        gender,
                         dob,
                         nic,
                      doctorDepartement,
                      role:"Doctor",
                      docAvatar: {
                        public_id: cloudinaryResponse.public_id,
                        url: cloudinaryResponse.secure_url,
                      },
                    });
                    res.status(200).json({
                        success:true,
                        message: "New Doctor Registered",
                        doctor
                    });
                    

});