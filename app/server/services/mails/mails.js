const { generarCorreoRegistro } = require('./templates');
const { enviarCorreo } = require('./generic_email_sender');
module.exports = {
    emailRegistroArtesano
};
async function emailRegistroArtesano ({ correo, nombreArtesano, usuarioArtesano, contrasenaArtesano, logoUrl }) {

    try {
        const resultado = await enviarCorreo({
            destinatarios: correo,
            asunto: 'Bienvenido a www.artesaniasdeayacucho.pe',
            html: generarCorreoRegistro({ nombreArtesano, usuarioArtesano, contrasenaArtesano, logoUrl }),

        });
        console.log('Resultado:', resultado);
    } catch (error) {
        console.error('Error:', error);
    }

}