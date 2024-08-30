import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
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

        cookies().delete(loginToken.name);
        return NextResponse.json(
            {
                message: 'Sesión cerrada con éxito',
                auth: true,
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