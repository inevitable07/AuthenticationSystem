import nodemailer from 'nodemailer';
import User from "@/models/userModel.js";
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType,userId}:any) =>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        const user = await User.findById(userId);


        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {
            verificationToken: hashedToken,
            verificationTokenExpiry: Date.now() + 3600000});
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordExpiry: Date.now() + 3600000});
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT || "2525"),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: "authentication.app@example.com",
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Hello ${user.username},</h2>

                    <p>
                        ${
                            emailType === "VERIFY"
                            ? "Welcome to our App! We're excited to have you on board."
                            : "You requested a password reset."
                        }
                    </p>

                    <p>
                        Click the button below to ${
                        emailType === "VERIFY"
                            ? "verify your email"
                            : "reset your password"
                        }:
                    </p>

                    <a 
                        href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" 
                        style="
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #22BC66;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        "
                    >
                        ${
                        emailType === "VERIFY"
                            ? "Verify Your Email"
                            : "Reset Password"
                        }
                    </a>

                    <p style="margin-top: 20px;">
                        Or copy and paste this link in your browser:
                        <br/>
                        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                    </p>

                    <p>Need help? Just reply to this email — we'd love to help.</p>
                </div>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

        


    } catch (error: any) {
        throw new Error(error.message);
    }
}

