import { NextResponse } from "next/server";
import pool from "@/libs/postgreSQL";
import jwt from 'jsonwebtoken';
import { serialize } from "cookie";
import bcrypt from 'bcryptjs';

const client = await pool.connect();

export async function POST(request) {
    try {
        const { username, password } = await request.json();
        const passwordPattern = /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$/;
        const usernamePattern = /^[A-Za-z0-9]{3,16}$/;

        if (!username || !password) {
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

        const result = await client.query('SELECT * FROM public.user WHERE username = $1 AND password = $2', [username, password]);
        const user = await client.query(
            'SELECT * FROM public.user WHERE username = $1',
            [username]
        );
        const data = user.rows;

        if (data.length === 0) {
            return NextResponse.json(
              {
                auth: false,
                message: 'Credenciales incorrectas,usuario no encontrado',
              },
              { 
                status: 401 
              }
            );
        }

        const isValidPassword = await bcrypt.compare(password, data[0].password);

        if (!isValidPassword) {
        return NextResponse.json(
            {
                auth: false,
                message: 'Contraseña incorrecta',
            },
            {
                status: 401,
            }
        );
        }

        if(!data[0].enabled){
            return NextResponse.json(
                {
                    auth: false,
                    message: 'El usuario no ingresó su código de registro, verifique su código o intentelo mas tarde.',
                },
                {
                    status: 401,
                }
            );
        }

        const token = jwt.sign(
            { id: data[0].id, username: data[0].username },
            process.env.JWT_SECRET,
            { 
                expiresIn: '1h' 
            }
        )

        const serialized = serialize('loginToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
            path: '/'
        })

        //quiero crear un json que me tire una variable booleano para saber si se logeo o no y ademas el data[0]
        return NextResponse.json(
            {
                auth: true,
                data: data[0],
                status: 200
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
                message: error.message,
            },
            { status: 500 }
        );
    }
}