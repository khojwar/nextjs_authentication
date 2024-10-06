import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function GET(request:NextRequest){
    try {
        const userId = getDataFromToken(request);
        // console.log(userId);
        const user = await User.findOne({_id: userId}).select('-password');
        return NextResponse.json({mesaaage: "User found", body: user}, {status: 200});

    } catch (error: any) {
        return NextResponse.json({body: error.message },{status: 500,}) 
    }
}


