import { NextResponse } from "next/server"

// /api/create-chat
export async function POST(req:Request,res:Response){
    try {
        const body =await req.json()
        const {file_key, file_name } = body
    } catch (error) {
        console.error()
        return NextResponse.json({error:'Internal server error '}, {status:500})
    }
}