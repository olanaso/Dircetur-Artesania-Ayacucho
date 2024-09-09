export function generarCorreoConfirmacionCompra (logoUrl, numeroPedido, montoTotal, productos, enlaceSeguimiento) {
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
            <img src="${logoUrl}" alt="Logo de Artesanías de Ayacucho" style="max-width: 200px; margin-bottom: 20px;">
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

// Ejemplo de uso:
const logoUrl = 'https://www.example.com/logo.png';
const numeroPedido = '123456';
const montoTotal = '150.00';
const productos = [
    { nombre: 'Producto A', cantidad: 2 },
    { nombre: 'Producto B', cantidad: 1 },
    { nombre: 'Producto C', cantidad: 3 }
];
const enlaceSeguimiento = 'https://www.example.com/seguimiento';

const correoHtml = generarCorreoConfirmacionCompra(logoUrl, numeroPedido, montoTotal, productos, enlaceSeguimiento);
document.write(correoHtml);
