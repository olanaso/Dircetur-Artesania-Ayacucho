export function obtenerParametrosURL() {

    const url = window.location.href;
    const urlObj = new URL(url);
    const parametros = urlObj.searchParams;
    const parametrosObj = {};

    // Recorre los parámetros y los agrega al objeto parametrosObj
    for (const [clave, valor] of parametros.entries()) {
        if (!parametrosObj.hasOwnProperty(clave)) {
            parametrosObj[clave] = valor;
        } else {
            // Si el parámetro ya existe, lo convierte en un array y agrega el valor actual
            if (!Array.isArray(parametrosObj[clave])) {
                parametrosObj[clave] = [parametrosObj[clave]];
            }
            parametrosObj[clave].push(valor);
        }
    }

    return parametrosObj;
}

