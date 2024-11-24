//const fs = require('fs');
//const path = require('path');



module.exports = {
    generarCorreoRegistro, generarFacturaHTML, generarCorreoRecuperacion, generarCorreoRegistroCliente
};

// Lee el archivo SVG como string
//const logo = fs.readFileSync(path.resolve(__dirname, './assets/logo.svg'), 'utf-8');
//const Logo = `data:image/svg+xml;base64,${Buffer.from(logo).toString('base64')}`
const Logo = `https://artesaniasdeayacucho.pe/email/Logo.jpg`


function generarCorreoConfirmacionCompra (logoUrl, numeroPedido, montoTotal, productos, enlaceSeguimiento) {
    // Genera la lista de productos en HTML
    const productosHtml = productos.map(producto =>
        `<li>${producto.nombre} (${producto.cantidad} unidad/es)</li>`
    ).join('');

    // Genera el HTML completo
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Compra</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="text-align: center; padding-bottom: 20px;">
            <img src="${Logo}" alt="Logo de Artesanías de Ayacucho" style="max-width: 200px; margin-bottom: 20px;">
            <h1 style="font-size: 24px; color: #d6008b; margin: 0;">¡Gracias por tu compra en Artesanías de Ayacucho! 🛍️✨</h1>
        </div>

        <!-- Body -->
        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 20px 0;">
            Esperamos que disfrutes cada detalle tanto como nosotros disfrutamos creándolos. ¡Gracias por apoyar a los artesanos locales y por ser parte de nuestra comunidad! ¡Esperamos verte de nuevo pronto! 😉
        </p>

        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 20px 0;">
            <strong>La solicitud será atendida y enviada en: 10 días y será notificada por este medio.</strong>
        </p>

        <!-- Order Details -->
        <h2 style="font-size: 20px; color: #d6008b; margin-top: 30px; margin-bottom: 10px;">Detalle de tu compra</h2>

        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eeeeee;"><strong>Número de pedido:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">${numeroPedido}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eeeeee;"><strong>Monto:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">S/${montoTotal}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eeeeee;"><strong>Productos:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eeeeee;">
                    <ul style="margin: 0; padding-left: 20px; list-style-type: disc;">
                        ${productosHtml}
                    </ul>
                </td>
            </tr>
        </table>

        <!-- Button -->
        <div style="text-align: center; margin: 30px 0;">
            <a href="${enlaceSeguimiento}" style="background-color: #d6008b; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Haz seguimiento a tu compra</a>
        </div>

        <!-- Footer -->
        <p style="font-size: 14px; color: #999999; text-align: center; margin-top: 40px;">
            Este correo fue enviado desde Artesanías de Ayacucho. Si tienes alguna pregunta, no dudes en <a href="mailto:contacto@tu-dominio.com" style="color: #d6008b; text-decoration: none;">contactarnos</a>.
        </p>

    </div>

</body>
</html>`;

    return html;
}



function generarCorreoRegistro ({ nombreArtesano, usuarioArtesano, contrasenaArtesano, logoUrl }) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Exitoso</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="text-align: center; padding-bottom: 20px;">
            <img src="${Logo}" alt="Logo de Artesanías de Ayacucho" style="max-width: 200px; margin-bottom: 20px;">
            <h1 style="font-size: 24px; color: #d6008b; margin: 0;">Bienvenido a Artesanías de Ayacucho 🎉</h1>
        </div>

        <!-- Body -->
        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 20px 0;">
            Estimado/a ${nombreArtesano}, nos complace informarte que has sido registrado exitosamente en nuestra plataforma. ¡Ahora puedes comenzar a compartir tus creaciones con el mundo y ser parte de nuestra comunidad de artesanos!
        </p>

        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 20px 0;">
            Tus credenciales de acceso son las siguientes:
        </p>

        <ul style="font-size: 16px; color: #333333; line-height: 1.6; margin: 20px 0; list-style-type: none; padding: 0;">
            <li><strong>Usuario:</strong> ${usuarioArtesano}</li>
            <li><strong>Contraseña:</strong> ${contrasenaArtesano}</li>
        </ul>

        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 20px 0;">
            Te invitamos a completar tu perfil para que los compradores conozcan más sobre ti y tus artesanías. ¡Cuéntanos tu historia y muestra tu talento!
        </p>

        <!-- Button -->
        <div style="text-align: center; margin: 30px 0;">
            <a href="https://artesaniasdeayacucho.pe/" style="background-color: #d6008b; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Completar mi perfil</a>
        </div>

        <!-- Footer -->
        <p style="font-size: 14px; color: #999999; text-align: center; margin-top: 40px;">
            Este correo fue enviado desde Artesanías de Ayacucho. Si tienes alguna pregunta, no dudes en <a href="mailto:contacto@tu-dominio.com" style="color: #d6008b; text-decoration: none;">contactarnos</a>.
        </p>

    </div>

</body>
</html>`;
}


function generarFacturaHTML (cliente, pedido) {
    return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Factura de Venta - Artesanías de Ayacucho</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .invoice-container {
                max-width: 800px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .invoice-header {
                text-align: center;
                padding-bottom: 20px;
            }
            .invoice-header img {
                max-width: 150px;
                margin-bottom: 10px;
            }
            .invoice-header h1 {
                font-size: 28px;
                color: #d6008b;
                margin: 0;
            }
            .order-code {
                text-align: center;
                font-size: 20px;
                color: #d6008b;
                margin-top: 10px;
                font-weight: bold;
            }
            .invoice-section {
                margin: 20px 0;
            }
            .invoice-section h2 {
                font-size: 18px;
                color: #d6008b;
                margin-bottom: 10px;
            }
            .invoice-details table {
                width: 100%;
                border-collapse: collapse;
            }
            .invoice-details th, .invoice-details td {
                padding: 10px;
                text-align: left;
                border-bottom: 1px solid #dddddd;
            }
            .invoice-details th {
                background-color: #f0f0f0;
            }
            .invoice-footer {
                text-align: center;
                margin-top: 30px;
                font-size: 14px;
                color: #999999;
            }
            .btn-follow-up {
                background-color: #25D366;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                display: inline-block;
                margin-top: 20px;
            }
            .customer-details-table, .shipping-details-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            .customer-details-table td, .shipping-details-table td {
                padding: 10px;
                border-bottom: 1px solid #dddddd;
            }
            .customer-details-table td:first-child, .shipping-details-table td:first-child {
                font-weight: bold;
                color: #333333;
            }
        </style>
    </head>
    <body style="background: #dedede">

        <div class="invoice-container"  style="background: #fff">
            <!-- Header -->
            <div class="invoice-header">
                <img src="${Logo}" alt="Logo de Artesanías de Ayacucho"/>
                <h1>Pedido de venta de artesanía</h1>
                <div class="order-code">Código del Pedido: #${pedido.id}</div>
            </div>

            <!-- Customer Details -->
            <div class="invoice-section">
                <h2>Datos del Cliente:</h2>
                <table class="customer-details-table">
                    <tr>
                        <td>Documento de Identidad (Person ID):</td>
                        <td>${cliente.numero_documento}</td>
                    </tr>
                    <tr>
                        <td>Nombres:</td>
                        <td>${cliente.nombres}</td>
                    </tr>
                    <tr>
                        <td>Apellidos:</td>
                        <td>${cliente.apellidos}</td>
                    </tr>
                    <tr>
                        <td>Correo Electrónico:</td>
                        <td>${cliente.correo}</td>
                    </tr>
                  
                    <tr>
                        <td>Teléfono / Móvil:</td>
                        <td>${cliente.telefono}</td>
                    </tr>
                </table>
            </div>

            <!-- Shipping Details -->
            <div class="invoice-section">
                <h2>Datos del Envío:</h2>
                <table class="shipping-details-table">
                    <tr>
                        <td>País:</td>
                        <td>${cliente.pais}</td>
                    </tr>
                    <tr>
                        <td>Región:</td>
                        <td>${cliente.region}</td>
                    </tr>
                    <tr>
                        <td>Ciudad:</td>
                        <td>${cliente.ciudad}</td>
                    </tr>
                    <tr>
                        <td>Dirección (para el envío):</td>
                        <td>${cliente.direccion}</td>
                    </tr>
                    <tr>
                        <td>Mensaje al artesano:</td>
                        <td>${cliente.direccion_envio || ''}</td>
                    </tr>
                </table>
            </div>

            <!-- Invoice Details -->
            <div class="invoice-section invoice-details">
                <h2>Detalles del Pedido:</h2>
                <table>
                    <thead>
                        <tr>    
                            <th>Producto</th>
                            <th style="text-align: right;">Cantidad</th>
                            <th style="text-align: right;">Precio Unitario</th>
                            <th style="text-align: right;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pedido.productos.map(producto => {
        const totalProducto = producto.cantidad * producto.precioUnitario;
        return `
                                <tr>
                                    <td>${producto.nombre}</td>
                                    <td style="text-align: right;">${producto.cantidad}</td>
                                    <td style="text-align: right;">S/ ${producto.precioUnitario.toFixed(2)}</td>
                                    <td style="text-align: right;">S/ ${totalProducto.toFixed(2)}</td>
                                </tr>
                            `;
    }).join('')}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" style="text-align: right;"><strong>Total a Pagar:</strong></td>
                            <td style="text-align: right;"><strong>S/ ${pedido.productos.reduce((total, producto) => total + (producto.cantidad * producto.precioUnitario), 0).toFixed(2)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <!-- Follow-up Button -->
            <div style="text-align: center; margin-top: 30px;">
                <a href="https://wa.me/+51${pedido.artesano_celular}" class="btn-follow-up" style="color:#fff">Contactar al Artesano por WhatsApp</a>
            </div>

            <!-- Footer -->
            <p class="invoice-footer">
                Este correo fue enviado desde Artesanías de Ayacucho. Si tienes alguna pregunta, no dudes en <a href="mailto:contacto@artesaniasdeayacucho.pe" style="color: #d6008b; text-decoration: none;">contactarnos</a>.
            </p>
        </div>

    </body>
    </html>`;
}

function generarCorreoRecuperacion ({ nombreUsuario, usuarioArtesano, contrasenaArtesano }) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperación de Cuenta</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

        <!-- Header -->
        <div style="text-align: center; padding-bottom: 20px;">
            <img src="${Logo}" alt="Logo de Artesanías de Ayacucho" style="max-width: 200px; margin-bottom: 20px;">
            <h1 style="font-size: 24px; color: #d6008b; margin: 0;">Recuperación de Cuenta</h1>
        </div>

        <!-- Body -->
        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 20px 0;">
            Estimado/a <strong>${nombreUsuario}</strong>, hemos recibido tu solicitud de recuperación de cuenta. A continuación, te proporcionamos tus nuevas credenciales de acceso.
        </p>

        <ul style="font-size: 16px; color: #333333; line-height: 1.6; margin: 20px 0; list-style-type: none; padding: 0;">
            <li><strong>Usuario:</strong> ${usuarioArtesano}</li>
            <li><strong>Contraseña:</strong> ${contrasenaArtesano}</li>
        </ul>

        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 20px 0;">
            Por favor, te recomendamos que cambies tu contraseña al iniciar sesión para mantener tu cuenta segura.
        </p>

        <!-- Button -->
        <div style="text-align: center; margin: 30px 0;">
            <a href="https://artesaniasdeayacucho.pe/" style="background-color: #d6008b; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Iniciar sesión</a>
        </div>

        <!-- Footer -->
        <p style="font-size: 14px; color: #999999; text-align: center; margin-top: 40px;">
            Este correo fue enviado desde Artesanías de Ayacucho. Si tienes alguna pregunta, no dudes en <a href="mailto:contacto@tu-dominio.com" style="color: #d6008b; text-decoration: none;">contactarnos</a>.
        </p>

    </div>

</body>
</html>
`
}



function generarCorreoRegistroCliente ({ nombreCliente, usuarioCliente, contrasenaCliente }) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Cuenta</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

        <!-- Header -->
        <div style="text-align: center; padding-bottom: 20px;">
            <img src="${Logo}" alt="Logo de Artesanías de Ayacucho" style="max-width: 200px; margin-bottom: 20px;">
            <h1 style="font-size: 24px; color: #d6008b; margin: 0;">Registro de cuenta</h1>
        </div>

        <!-- Body -->
        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 20px 0;">
            Estimado/a cliente: <strong>${nombreCliente}</strong>, tu registro a sido exitoso. A continuación, te proporcionamos tus nuevas credenciales de acceso.
        </p>

        <ul style="font-size: 16px; color: #333333; line-height: 1.6; margin: 20px 0; list-style-type: none; padding: 0;">
            <li><strong>Usuario:</strong> ${usuarioCliente}</li>
            <li><strong>Contraseña:</strong> ${contrasenaCliente}</li>
        </ul>

        <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 20px 0;">
            Por favor, te recomendamos que cambies tu contraseña al iniciar sesión para mantener tu cuenta segura.
        </p>

        <!-- Button -->
        <div style="text-align: center; margin: 30px 0;">
            <a href="https://artesaniasdeayacucho.pe/" style="background-color: #d6008b; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Iniciar sesión</a>
        </div>

        <!-- Footer -->
        <p style="font-size: 14px; color: #999999; text-align: center; margin-top: 40px;">
            Este correo fue enviado desde Artesanías de Ayacucho. Si tienes alguna pregunta, no dudes en <a href="mailto:contacto@tu-dominio.com" style="color: #d6008b; text-decoration: none;">contactarnos</a>.
        </p>

    </div>

</body>
</html>
`
}