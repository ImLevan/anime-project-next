import { NextResponse } from "next/server";
import pool from "@/libs/postgreSQL";
import { v4 as uuidv4 } from 'uuid';

const client = await pool.connect();

export async function GET() {
    try {
        const result = await client.query('SELECT * FROM public.show');
        const data = result.rows;

        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { emision_day, genre, image, status, title, user_id } = await request.json();
        let id = uuidv4();

        if(!emision_day || !genre || !image || !status || !title || !user_id){
            return NextResponse.json(
                {
                    message: 'Todos los campos son obligatorios',
                    status: 400
                },
                {
                    status: 400,
                }
            );
        }

        const result = await client.query(
            'INSERT INTO public.show (id, emision_day, genre, image, status, title, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [id, emision_day, genre, image, status, title, user_id]
        );

        return NextResponse.json(
            {
                message: 'Show creado',
                data: {
                    id,
                    emision_day,
                    genre,
                    image,
                    status,
                    title,
                    user_id
                },
                status: 201
            },
            {
                status: 201
            }
    );

    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}