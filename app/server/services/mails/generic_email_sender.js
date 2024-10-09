const nodemailer = require('nodemailer');

module.exports = {
    enviarCorreo
};
async function enviarCorreo ({ destinatarios, asunto, html, adjuntos }) {
    return new Promise((resolve, reject) => {
        // Crear el transporte con los detalles SMTP
        const transport = nodemailer.createTransport({
            host: "mail.artesaniasdeayacucho.pe",
            secure: true,
            port: 465,
            auth: {
                user: 'noreply@artesaniasdeayacucho.pe',
                pass: '-CbIMnX~z%5%'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Definir las opciones del correo
        const mailOptions = {
            from: 'noreply@artesaniasdeayacucho.pe',
            to: destinatarios,
            subject: asunto,
            html: html,
            attachments: adjuntos || []
        };

        // Enviar el correo en segundo plano
        setImmediate(() => {
            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    return reject(error);
                } else {
                    console.log('Correo enviado correctamente:', info.response);
                    return resolve(info);
                }
            });
        });
    });
}

