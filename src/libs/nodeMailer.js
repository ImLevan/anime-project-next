import nodemailer from 'nodemailer';

const email = process.env.NEXT_PUBLIC_EMAIL_USER;
const pass = process.env.NEXT_PUBLIC_EMAIL_PASS;

const transporter = nodemailer.createTransport({
    //Usar .env para los datos sensibles
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: email,
        pass
    }
});

export async function sendMail(mail, code) {
    const info = await transporter.sendMail({
        from: email,
        to: mail,
        subject: 'Codigo de confirmacion',
        html: `
      <div style="background-color: #f7f7f7; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; font-weight: bold; margin-bottom: 10px;">Verificación de cuenta</h2>
        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Su código de verificación es: <strong>${code}</strong></p>
        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Este código expira en 1 hora.</p>
        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Si no fue usted quien solicitó la verificación, por favor ignore este correo.</p>
        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Gracias por registrarse en Anime Tracker.</p>
        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Atentamente,</p>
        <p style="color: #666; font-size: 16px;">El equipo de Anime Tracker</p>
      </div>
    `,
    });
}

export async function sendRecoveryMail(mail, recoveryURL) {
    const info = await transporter.sendMail({
        from: email,
        to: mail,
        subject: 'Reestablece tu contraseña',
        html: `
      <div style="background-color: #f7f7f7; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333; font-weight: bold; margin-bottom: 10px;">Reestablece tu contraseña</h2>
        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Para reestablecer tu contraseña, <a href="${recoveryURL}">haga clic a continuación</a>.</p>
        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Si no fue usted quien solicitó la reestablecida, por favor ignore este correo.</p>
        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Gracias por registrarse en Anime Tracker.</p>
        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Atentamente,</p>
        <p style="color: #666; font-size: 16px;">El equipo de Anime Tracker</p>
      </div>
    `,
    });
}