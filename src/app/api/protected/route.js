import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const loginToken = cookies().get('loginToken');

        if(!loginToken){
            return NextResponse.json(
                {
                    message: 'No hay token de inicio de sesion',
                },
                {
                    status: 403,
                }
            );
        }

        try {
            const data = jwt.verify(loginToken.value, process.env.JWT_SECRET);
            return NextResponse.json(
                {
                    data: data
                },
                {
                    status: 200,
                }
            );         
        }catch (error) {
            return NextResponse.json(
                {
                    message: 'Token de inicio de sesion invalido',
                },
                {
                    status: 401,
                }
            );
        }

    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}