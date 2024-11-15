const { generarCorreoRegistro, generarFacturaHTML, generarCorreoRecuperacion, generarCorreoRegistroCliente } = require('./templates');
const { enviarCorreo } = require('./generic_email_sender');
module.exports = {
    emailRegistroArtesano, emailPedidoArtesania, emailRecuperarContraseña, emailRegistrarCliente
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
async function emailPedidoArtesania ({ correos, cliente, pedido }) {

    try {
        const resultado = await enviarCorreo({
            destinatarios: correos,
            asunto: 'Su pedido a sido completado ',
            html: generarFacturaHTML(cliente, pedido),

        });
        console.log('Resultado:', resultado);
    } catch (error) {
        console.error('Error:', error);
    }

}


async function emailRecuperarContraseña ({ correos, nombreUsuario, usuarioArtesano, contrasenaArtesano }) {

    try {
        const resultado = await enviarCorreo({
            destinatarios: correos,
            asunto: 'Recuperación de Cuenta - www.artesaniasdeayacucho.pe',
            html: generarCorreoRecuperacion({ nombreUsuario, usuarioArtesano, contrasenaArtesano }),

        });
        console.log('Resultado:', resultado);
    } catch (error) {
        console.error('Error:', error);
    }

}


async function emailRegistrarCliente (correos, nombreCliente, usuarioCliente, contrasenaCliente) {

    try {
        const resultado = await enviarCorreo({
            destinatarios: correos,
            asunto: 'Registro exitoso de cliente - www.artesaniasdeayacucho.pe',
            html: generarCorreoRegistroCliente({ nombreCliente, usuarioCliente, contrasenaCliente }),

        });
        console.log('Resultado:', resultado);
    } catch (error) {
        console.error('Error:', error);
    }

}



