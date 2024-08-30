import { NextResponse } from "next/server";
import pool from "@/libs/postgreSQL";
import { v4 as uuidv4 } from 'uuid';
import { sendMail } from "@/libs/nodeMailer";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from "cookie";

const client = await pool.connect();

export async function POST(request) {
    try {
        const { username, password, email } = await request.json();
        const passwordPattern = /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$/;
        const usernamePattern = /^[A-Za-z0-9]{3,16}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        let id = uuidv4();

        if (!username || !password || !email) {
            return NextResponse.json(
                {
                    saved: false,
                    message: 'Todos los campos son obligatorios',
                },
                {
                    status: 400,
                }
            );
        }

        if (typeof username !== 'string' || typeof password !== 'string' || typeof email !== 'string') {
            return NextResponse.json(
                {
                    auth: false,
                    message: 'El nombre de usuario, el email y la contraseña deben ser cadenas de texto',
                },
                {
                    status: 400,
                }
            );
        }

        if (!usernamePattern.test(username)) {
            return NextResponse.json(
                {
                    auth: false,
                    message: 'El nombre de usuario debe tener entre 3 y 50 caracteres y no debe contener caracteres especiales',
                },
                {
                    status: 400,
                }
            );
        }

        if (!passwordPattern.test(password)) {
            return NextResponse.json(
                {
                    auth: false,
                    message: 'La contraseña debe tener entre 8 y 20 caracteres, al menos una mayúscula, una minúscula, un número y un caracter especial',
                },
                {
                    status: 400,
                }
            );
        }

        if (!emailPattern.test(email)) {
            return NextResponse.json(
                {
                    auth: false,
                    message: 'El email debe ser una dirección de correo electrónico válida',
                },
                {
                    status: 400,
                }
            );
        }

        // Validación para evitar inyección SQL
        if (password.includes(';')) {
            return NextResponse.json(
                {
                    auth: false,
                    message: 'No se permiten caracteres especiales como `;` en el nombre de usuario o contraseña',
                },
                {
                    status: 400,
                }
            );
        }

        const result = await client.query(
            'SELECT * FROM public.user WHERE username = $1',
            [username]
        );

        if (result.rows.length > 0) {
            return NextResponse.json(
                {
                    saved: false,
                    message: 'El nombre de usuario ya esta en uso',
                },
                {
                    status: 400,
                }
            );
        }

        const result2 = await client.query(
            'SELECT * FROM public.user WHERE email = $1',
            [email]
        );

        if (result2.rows.length > 0) {
            return NextResponse.json(
                {
                    saved: false,
                    message: 'El email ya esta en uso',
                },
                {
                    status: 400,
                }
            );
        }

        let code = cadenaAleatoria(12);
        let expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);

        // Encriptar la contraseña
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result3 = await client.query(
            'INSERT INTO public.user (id, code, code_expiration, email, enabled, password, session_status, username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [id, code, expirationTime, email, false, hashedPassword, 'USUARIO_ENCONTRADO', username]
        );

        const token = jwt.sign(
            { id: id, code: code },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        const serialized = serialize('codeToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        })
        await sendMail(email, code);

        return NextResponse.json(
            {
                saved: true,
                data: {
                    id,
                    code,
                    code_expiration: expirationTime,
                    email,
                    enabled: false,
                    password: hashedPassword,
                    session_status: 'USUARIO_ENCONTRADO',
                    username,
                }
            },
            {
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

function cadenaAleatoria(longitud) {
    const banco = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const caracteres = Array.from({ length: longitud }, () => banco[numeroAleatorioEnRango(0, banco.length - 1)]);
    return caracteres.join('');
}

function numeroAleatorioEnRango(minimo, maximo) {
    return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
}