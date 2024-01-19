import { getMovieById } from "@/controllers/movie.controller"
import connectToDB from "@/db"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    try {
        await connectToDB()
        return NextResponse.json(await getMovieById(req.url.split("=")[1]), { status: 200 })
    } catch (error) {
        return new NextResponse("something in /api" + error, { status: 500 })
    }
}