import nodemailer from 'nodemailer';

const email = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    //Usar .env para los datos sensibles
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: email,
        pass
    },
});

export async function sendMail(mail, code) {
    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: mail,
        subject: 'Codigo de confirmacion',
        text: `Su codigo de verificacion es: ${code}\nEste codigo expira en 1 hora.\n\nSi no fue usted, por favor ignore este correo.\n\nGracias por registrarse en AnimeManagment`,
    });
}