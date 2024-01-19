import { createMovie, getMovies, updateMovie } from "@/controllers/movie.controller";
import connectToDB from "@/db";
import { NextResponse } from "next/server";

// connect db

export const GET = async (req, res) => {
    try {
        await connectToDB()
        return NextResponse.json(await getMovies(req.url.split("=")[1]), { status: 200 })
    } catch (error) {
        return new NextResponse("something in /api" + error, { status: 500 })
    }
}

export const PUT = async (req, res) => {
    try {
        const data = await req.json()
        await connectToDB()
        return NextResponse.json(await updateMovie(data, res), { status: 500 })
    } catch (error) {
        return new NextResponse("something in /api" + error, { status: 500 })
    }
}

export const POST = async (req, res) => {
    try {
        const data = await req.json()        
        await connectToDB()
        return NextResponse.json(await createMovie(data, res), { status: 200 })
    } catch (error) {
        console.log(error);
        return new NextResponse("something in /api" + error, { status: 500 })
    }
}
