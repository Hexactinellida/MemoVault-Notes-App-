import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, RESET_PASSWORD_TEMPLATE } from '../config/emailTemplate.js';


        // USER REGISTRATION CONTROLLER FUNCTION :
export const register = async (req,res) => {
    const {name, email,password} = req.body;

    if (!name || !email || !password) { // if any is absent
        return res.json({success : false, message: "Details are Missing"})
    }
    
    try {
        // check if user exists, if yes, then say it exists, if not it creates new using name, email and password (hashed) and saved. 
        const existingUser = await userModel.findOne({email})
        
        if (existingUser) {
            return res.json({succes: false, message: "User already exists."});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new userModel({name, email, password: hashedPassword});
        await user.save();
        
        // creates token for auth
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn : '7d'}); // id from the database (user collection) along with token expiry time
        res.cookie('token', token, {    //response as a token, along with an object {}
            httpOnly : true, //only http request can access this cookie
            secure: process.env.NODE_ENV === 'production', // false for development (http) || true for production (https)
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict', // is strict while in development
            maxAge : 7 * 24 * 60 * 60 * 1000 // expiry time of token (7 days in milliseconds)
        });
            // for nodemailer
         const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to our site! ",
            text: "Your account has been created successfully!"
        };

        await transporter.sendMail(mailOption);

        return res.json({success:true});
    }
    catch (error) {
        res.json({success: false, message : error.message})
    }
}


// USER LOGIN CONTROLLER FUNCTION

export const login = async (req, res) => {
     const {email,password} = req.body; // unlike registration, we only need email n pass for user login
     if (!email || !password){
        return res.json({success: false, message : "Email and Password are required"})
     }

     try{
        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success: false, message: "Invalid email"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.json({success: false, message: "Invalid Password"})
        }
        // since email and password is valid till now, token is generated for the user authentication.
        // token generation code is same as the registration one

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn : '7d'}); // id from the database (user collection) along with token expiry time
        res.cookie('token', token, {    //response as a token, along with an object {}
            httpOnly : true, //only http request can access this cookie
            secure: process.env.NODE_ENV === 'production', // false for development (http) || true for production (https)
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict', // is strict while in development
            maxAge : 7 * 24 * 60 * 60 * 1000 // expiry time of token (7 days in milliseconds)
        });
        return res.json({success:true, message: "Logged in Successfully"});

    }
     catch(error) {
        return res.json({success: false, message: error.message});
    }
}

            // USER LOGOUT CONTROLLER FUNCTION
export const logout = async (req,res) => {
    try {
        res.clearCookie('token', {
            httpOnly : true, //only http request can access this cookie
            secure: process.env.NODE_ENV === 'production', // false for development (http) || true for production (https)
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict', // is strict while in development
        })
        return res.json({success: true, message: "Logged Out"})
    }
     catch(error) {
        return res.json({success: false, message: error.message});
    }
}

            //SEND VERIFICATION OTP TO USERS' EMAIL (VERIFICATION CONTROLLER FUNCTION)
            // INVOKED VIA MIDDLEWARE

export const sendVerifyOtp = async (req,res) => {
    try{
        const {userId} = req.body;

        const user = await userModel.findById(userId);
        if(user.isAccountVerified){
            return res.json({succes: false, message: "Account Already Verified"})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24*60*60*1000 // in milliseconds

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            // text: `Your OTP is: ${otp}. \n Verify your account using this OTP.`,
            html: EMAIL_VERIFY_TEMPLATE(user.name, otp)
        }
        
        await transporter.sendMail(mailOption);
        res.json({success: true, message: "Verification OPT Sent on Email"})
    }
    catch(error){
        return res.json({success: false, message: error.message});
    }
}

            //  ACTUAL VERIFICATION OF THE ACCOUNT AFTER OTP WAS SENT.

export const verifyEmail =  async (req,res) => {
    const {userId, otp} = req.body;

    if(!userId ||  !otp){   //if any of them is not available
        return res.json({success: false, message: "Missing details"});
    }
    try{
        const user = await userModel.findById(userId)

        if(!user){
        return res.json({success: false, message: "User not found"});
        }
        if(user.verifyOtp === '' || user.verifyOtp !== otp){
        return res.json({success: false, message: "Invalid OTP"});
        }
        if(user.verifyOtpExpireAt < Date.now()){
        return res.json({success: false, message: "OTP Expired"});
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({
            success: true, message:"Email Verified Successfully."
        });
    }
    catch(error){
        return res.json({success: false, message: error.message});
    }
}

            // TO CHECK IF USER IS AUTHENTICATED CONROLLER FUNCTION:

export const isAuthenticated = async(req,res) => {
    try{
        return res.json({success:true});
    }
    catch(error){
        return res.json({success: false, message: error.message});
    }
}

            // TO SEND THE PASSWORD RESET OTP , FUNCTION CONTROLLER:

export const sendResetOtp = async(req,res) => {
    const {email} = req.body; 

    if(!email){
        return res.json({success: false, message:"Email is required!" })
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
        return res.json({success: false, message:"User not found" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15*60*1000 // in milliseconds

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            // text: `Your OTP is: ${otp} \n Reset Your password using this OTP.\n This OTP will expire in 15 minutes.`,
            html: RESET_PASSWORD_TEMPLATE(user.name, otp)
        }
        
        await transporter.sendMail(mailOption);
        res.json({success: true, message: "Password reset OPT Sent on Email"})

    }
    catch(error){
        return res.json({success: false, message: error.message});
    }
}

            //RESET YOUR PASSWORD 

export const resetPassword = async(req,res) => {
    const {email,otp,newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success: false, message: "Email, otp and new password are required !"});
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message:"User not found" });
        }
        if(user.resetOtp ==='' || user.resetOtp !== otp){
            return res.json({success: false, message:"Invalid OTP" });
        }
        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success: false, message:"This OTP is Expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();
        return res.json({success: true, message:"Password has been reset successfully !" })
    }
    catch(error){
        return res.json({success: false, message: error.message});
    }
}