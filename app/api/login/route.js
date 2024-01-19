import { loginUser } from "@/controllers/user.controller";
import connectToDB from "@/db";
import { NextResponse } from "next/server";

// connect db

export const POST = async (req, res) => {
    try {
        const data = await req.json()        
        await connectToDB()
        const result = await loginUser(data, res)
        return NextResponse.json(result, { status: result.status })
    } catch (error) {
        console.log(error);
        return new NextResponse("something in /api" + error, { status: 500 })
    }
}