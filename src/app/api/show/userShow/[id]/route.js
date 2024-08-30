import { NextResponse } from "next/server";
import pool from "@/libs/postgreSQL";

const client = await pool.connect();

export async function GET(request, { params }) {
    try {
        const user_id = params.id; 
        const result = await client.query('SELECT * FROM public.show WHERE user_id = $1', [user_id]);
        const data = result.rows;
        

        if(data.length === 0){
            return NextResponse.json(
                {
                    founded: false,
                    message: 'Los shows del usuario no fueron encontrados',
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                founded: true,
                data: data
            }
        );

    } catch (error) {
        return NextResponse.json(
            {
                founded: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}