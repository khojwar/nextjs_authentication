import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET!);
        // console.log(decodedToken)
        // console.log(decodedToken.tokenData.id)
        return decodedToken.tokenData.id;
    } catch (error: any) {
        throw new Error(error.message);
    }

}