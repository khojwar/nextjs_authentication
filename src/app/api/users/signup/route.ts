import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailers";


connect();

export async function POST(request: NextRequest) {

try {
        const reqBody = await request.json();
        // console.log(reqBody);
        
        const {username, email, password}: any = reqBody;
        // console.log(username, email, password);
    

        //check if user already exists
        const user = await User.findOne({email})
    
        if(user){
            return NextResponse.json({message: "User already exists"})
        }
    
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password, salt);
    
        const newUser = new User({
            username,
            email,
            password: hashPassword
        })
    
        const savedUser = await newUser.save();
    
        //send email to user
        sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
    
    
        return NextResponse.json({ 
            message: "User created successfully",
            success: true,
            savedUser,
        });

} catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500}) 
}
}