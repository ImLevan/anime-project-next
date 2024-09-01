import { NextResponse } from "next/server";
import pool from "@/libs/postgreSQL";
import bcrypt from 'bcryptjs';
import { cookies } from "next/headers";

const client = await pool.connect();

export async function PATCH(request) {
    try {
        const { username, password } = await request.json();
        const passwordPattern = /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$/;
        const usernamePattern = /^[A-Za-z0-9]{3,16}$/;

        const recoveryToken = cookies().get('recoveryPasswordToken');
        
        if (!username || !password) {
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

        if (typeof username !== 'string' || typeof password !== 'string') {
            return NextResponse.json(
                {
                    auth: false,
                    message: 'El nombre de usuario y la contraseña deben ser cadenas de texto',
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

        const result = await client.query(
            'SELECT * FROM public.user WHERE username = $1',
            [username]
        );
        
        if (result.rows.length < 1) {
            return NextResponse.json(
                {
                    saved: false,
                    message: 'El usuario no existe',
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

        // Encriptar la contraseña
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result2 = await client.query(
            'UPDATE public.user SET password = $1 WHERE username = $2',
            [hashedPassword, username]
        );

        if (result2.rowCount < 1) {
            return NextResponse.json(
                {
                    saved: false,
                    message: 'No se pudo modificar la contraseña',
                },
                {
                    status: 400,
                }
            );
        }

        cookies().delete(recoveryToken.name);

        return NextResponse.json(
            {
                saved: true,
                message: 'La contraseña se modificó correctamente',
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