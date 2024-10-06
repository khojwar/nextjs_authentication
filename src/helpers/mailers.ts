import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


// verify or reset gardaa 2 ota kaam garna parxa
// 1. database ma token store garne
// 2. user laai email send garne

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken, 
                    verifyTokenExpire: Date.now() + 3600000
                }
            })
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken, 
                    forgetPasswordTokenExpire: Date.now() + 3600000
                }
            })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "36994832d6f7f7",
            pass: "f5c592fb781b0a"
          }
        });

        const mailOptions = {
            from: 'khojwartikaram@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}