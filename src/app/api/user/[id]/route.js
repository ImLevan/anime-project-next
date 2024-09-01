import { NextResponse } from "next/server";
import pool from "@/libs/postgreSQL";

const client = await pool.connect();

export async function GET(request, { params }) {
    try {
        const id = params.id; 
        const result = await client.query('SELECT * FROM public.user WHERE id = $1', [id]);
        const data = result.rows;
        

        if(data.length === 0){
            return NextResponse.json(
                {
                    message: 'Usuario no encontrado',
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(data[0]);

    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}