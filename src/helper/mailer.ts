import nodemailer from 'nodemailer';
import User from '@models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType,userId}:any) =>{
    try {
        const hasedToken = await bcryptjs.hash(userId.toString(), 10);


        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {
            verificationToken: hasedToken,
            verificationTokenExpiry: Date.now() + 3600000});
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hasedToken,
            forgotPasswordExpiry: Date.now() + 3600000});
        }

        


    } catch (error: any) {
        throw new Error(error.message);
    }
}

