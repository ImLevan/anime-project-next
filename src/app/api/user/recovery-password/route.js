import { NextResponse } from "next/server";
import pool from "@/libs/postgreSQL";
import { sendRecoveryMail } from "@/libs/nodeMailer";
import jwt from 'jsonwebtoken';
import { serialize } from "cookie";

const client = await pool.connect();

export async function POST(request) {
    try {
        const { email } = await request.json();
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

        if (!email) {
            return NextResponse.json(
                {
                    saved: false,
                    message: 'El email es obligatorio',
                },
                {
                    status: 400,
                }
            );
        }

        if (typeof email !== 'string') {
            return NextResponse.json(
                {
                    saved: false,
                    message: 'El email debe ser una cadena de texto',
                },
                {
                    status: 400,
                }
            );
        }

        if (!emailPattern.test(email)) {
            return NextResponse.json(
                {
                    saved: false,
                    message: 'El email debe ser una dirección de correo electrónico válida',
                },
                {
                    status: 400,
                }
            );
        }

        const result= await client.query(
            'SELECT * FROM public.user WHERE email = $1',
            [email]
        );

        if (result.rows.length < 1) {
            return NextResponse.json(
                {
                    saved: false,
                    message: 'Credenciales incorrectas, no se encontro el usuario indicado',
                },
                {
                    status: 400,
                }
            );
        }

        const token = jwt.sign(
            { id: result.rows[0].id, email: email, username: result.rows[0].username },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        const serialized = serialize('recoveryPasswordToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            domain: process.env.NEXT_PUBLIC_SITE_URL === 'http://localhost:3000' ? '' : process.env.NEXT_PUBLIC_SITE_URL,
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        })

        const recoveryURL = process.env.NEXT_PUBLIC_SITE_URL + '/new-password?token=' + result.rows[0].id;

        await sendRecoveryMail(email, recoveryURL);

        return NextResponse.json(
            {
                saved: true,
                token: token,
                message: 'Se envió un correo a la dirección de correo ' + email + ' para restablecer la contraseña. Por favor revise su bandeja de entrada.',

            },
            {
                status: 200,
                headers: {
                    'Set-Cookie': serialized
                }
            }
        );

    } catch (error) {
        return NextResponse.json(
            {
                saved: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}
