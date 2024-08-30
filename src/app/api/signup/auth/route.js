import { NextResponse } from "next/server";
import pool from "@/libs/postgreSQL";
import { cookies } from "next/headers";

const client = await pool.connect();

export async function POST(request) {
    try {
        const { id, code } = await request.json();

        const codeToken = cookies().get('codeToken');
        
        if(!codeToken){
            return NextResponse.json(
                {
                    message: 'No hay token de codigo de registro',
                },
                {
                    status: 403,
                }
            );
        }

        if (!id || !code) {
            return NextResponse.json(
                {
                    auth: false,
                    message: 'Todos los campos son obligatorios',
                },
                {
                    status: 400,
                }
            );
        }

        if (typeof id !== 'string' || typeof code !== 'string') {
            return NextResponse.json(
                {
                    auth: false,
                    message: 'El id y el code debe ser una cadena de texto',
                },
                {
                    status: 400,
                }
            );
        }

        const result = await client.query('SELECT * FROM public.user WHERE id = $1', [id]);
        const data = result.rows;
        const user = data[0];

        if (data.length === 0) {
            return NextResponse.json(
                {
                    auth: false,
                    message: 'Credenciales incorrectas, no se encontro el usuario indicado',
                },
                {
                    status: 401,
                }
            );
        }

        if (user.code !== code || user.code === null) {
            return NextResponse.json(
                {
                    auth: false,
                    message: 'El código no es válido',
                },
                {
                    status: 401,
                }
            );
        }

        let todayDate = new Date();
        let expirationDate = user.code_expiration;
        if (todayDate > expirationDate) {
            return NextResponse.json(
                {
                    auth: false,
                    message: 'El tiempo de validez del código ha expirado',
                },
                {
                    status: 401,
                }
            );
        }

        const result2 = await client.query('UPDATE public.user SET enabled = true WHERE id = $1', [id]);

        if (result2.rowCount === 0) {
            return NextResponse.json(
                {
                    auth: false,
                    message: 'No se pudo activar la cuenta',
                },
                {
                    status: 500,
                }
            );
        }
        
        cookies().delete(codeToken.name);
        return NextResponse.json({ auth: true, message: 'Cuenta activada' });

    } catch (error) {
        return NextResponse.json(
            {
                auth: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}