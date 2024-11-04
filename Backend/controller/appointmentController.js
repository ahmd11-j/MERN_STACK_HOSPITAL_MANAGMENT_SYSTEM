import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddleware.js"
import { Appointment } from "../models/appointmentSchema.js"
import { User } from "../models/userSchema.js"

export const postAppointment = catchAsyncErrors(async(req,res,next)=>{
    const{
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
       doctor_firstName,
       doctor_lastName,
        hasVisited,
        address,
        
    } = req.body();
    if(!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
       !doctor_firstName ||
       !doctor_lirstName ||
       ! hasVisited ||
        !address
    ){
        return next(new ErrorHandler("please fill full form",400));


    }
    const isConflict = await user.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department,
    });
    if (isConflict.length === 0){
        return next(new ErrorHandler("Doctor not found!", 400));
    }
    if (isConflict.length > 1 ){
        return next(new ErrorHandler("Doctor conflict! please contact throw email or phone!", 400));
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor:{
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        hasVisited,
        address,
        doctorId,
        patientId,
    });
    res.status(200).json({
        success: true,
        message: "Appointment sent successfully!",
        appointment,
    });

});
export const getAllAppointment = catchAsyncErrors(async(req,res,next)=>{
    const appointments = await Appointment.find();
    res.status(200).json({
        success:true,
        appointments,
    });
});

export const updateAppointmentStatus = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.parms;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found!", 404));
    }
    appointment = await Appointment.findById(id, req.body,{
        new : true,
        runValidators: true,
        useFindAndModify : false,
    });
    res.status(200).json({
        success: true,
        message:"appointment status updated",
        appointment,
    });
});

export const deleteAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.parms;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment not found!", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success:true,
        message:"appointment deleted",
    })
})