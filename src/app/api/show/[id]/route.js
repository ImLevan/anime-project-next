import { NextResponse } from "next/server";
import pool from "@/libs/postgreSQL";

const client = await pool.connect();

export async function GET(request, { params }) {
    try {
        const id = params.id; 
        const result = await client.query('SELECT * FROM public.show WHERE id = $1', [id]);
        const data = result.rows;
        

        if(data.length === 0){
            return NextResponse.json(
                {
                    message: 'Show no encontrado',
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

export async function DELETE(request, { params }) {
    try {
        const id = params.id; 

        if(!id){
            return NextResponse.json(
                {
                    message: 'El id del show es necesario para eliminarlo',
                },
                {
                    status: 400,
                }
            );
        }

        const result = await client.query('DELETE FROM public.show WHERE id = $1', [id]);

        if(result.rowCount === 0){
            return NextResponse.json(
                {
                    message: 'Show no encontrado',
                },
                {
                    status: 404,
                }
            );
        }

        return new Response(
            null,
            {
                status: 204
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

export async function PUT(request, { params }) {
    try {
        const id = params.id; 
        const { emision_day, genre, image, status, title, user_id } = await request.json();
        //validaciones

        if(!id || !emision_day || !genre || !image || !status || !title || !user_id){
            return NextResponse.json(
                {
                    message: 'Todos los campos son obligatorios',
                },
                {
                    status: 400,
                }
            );
        }     

        const result = await client.query(
            'UPDATE public.show SET emision_day = $1, genre = $2, image = $3, status = $4, title = $5, user_id = $6 WHERE id = $7',
            [emision_day, genre, image, status, title, user_id, id]
        );

        if(result.rowCount === 0){
            return NextResponse.json(
                {
                    message: 'Show no encontrado',
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                message: 'Show actualizado',
                data: {
                    id,
                    emision_day,
                    genre,
                    image,
                    status,
                    title,
                    user_id
                },
                status: 200
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
