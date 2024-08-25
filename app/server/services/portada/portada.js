const models = require('../../models/libro');

module.exports = {
    /*Servicios portada*/
    listarSlider,
    listarCategorias,
    listadoProductosOferta,
    listadoProductosDestacados,
    listadoProductosRecientes,
    /*Servicios portada*/
    detalleProducto
}

async function listarSlider () {
    try {

        let sql = `
SELECT * FROM slider
     `;

        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        console.log(list)
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}


async function listarCategorias () {
    try {

        let sql = `
        SELECT id,abreviatura,denominacion,foto_referente FROM categoria
     `;

        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        console.log(list)
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}


async function listadoProductosOferta () {
    try {

        let sql = `
      SELECT *
FROM producto
WHERE JSON_VALID(lst_ofertas) AND TRIM(lst_ofertas) != '"[]"';
     `;

        //   console.log(sql)
        const data = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        console.log(data)
        if (!data) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }

        // Función para obtener la fecha actual en formato 'YYYY-MM-DD'
        const obtenerFechaActual = () => {
            const hoy = new Date();
            return hoy.toISOString().split('T')[0];
        };

        const fechaActual = obtenerFechaActual();

        const ofertasVigentes = data
            .map(item => {

                console.log(item)
                // Filtrar solo las ofertas vigentes
                const ofertasFiltradas = JSON.parse(item.lst_ofertas).filter(oferta =>
                    fechaActual >= oferta.fechaInicio && fechaActual <= oferta.fechaFin
                );

                // Si hay ofertas vigentes, devolver el objeto con las ofertas filtradas
                if (ofertasFiltradas.length > 0) {
                    return {
                        ...item,
                        lst_ofertas: ofertasFiltradas // Reemplazamos lst_ofertas con solo las ofertas vigentes
                    };
                }

                return null; // Si no hay ofertas vigentes, devolvemos null
            })
            .filter(item => item !== null); // Filtrar los elementos que no tienen ofertas vigentes


        return ofertasVigentes;
    }
    catch (err) {
        throw err;
    }
}



async function listadoProductosDestacados () {
    try {

        let sql = `
       SELECT *
FROM producto a
INNER JOIN productos_favoritos b ON a.id=b.id_producto
LIMIT 9

     `;

        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        console.log(list)
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}



async function listadoProductosRecientes () {
    try {

        let sql = `
 SELECT * FROM producto
ORDER BY id DESC
LIMIT 9

     `;

        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        console.log(list)
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}


async function detalleProducto (id) {
    try {

        let sql = `
       SELECT a.*,
b.dni, b.ruc, b.nombres, b.apellidos, b.correo, b.celular, b.telefonos, b.foto1, b.foto2, b.ubigeo
, b.lugar_nacimiento, b.lengua_materna, b.lst_taller, b.lst_especialidadtecnicas, b.lst_contactos
, b.lst_mediospago, b.lst_reconocimientos, b.lst_videos, b.lst_videoenlace,
c.abreviatura,c.denominacion
FROM producto a
INNER JOIN artesano b ON a.artesano_id=b.id
INNER JOIN categoria c ON a.categoria_id=c.id
WHERE a.id=${id}
     `;

        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        console.log(list)
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}



async function detalleProducto (cateria_id = 0, preciomin = 0, precio_max = 9999, artesano_id = 0) {
    try {

        let sql = `
       SELECT a.*,
b.dni, b.ruc, b.nombres, b.apellidos, b.correo, b.celular, b.telefonos, b.foto1, b.foto2, b.ubigeo
, b.lugar_nacimiento, b.lengua_materna, b.lst_taller, b.lst_especialidadtecnicas, b.lst_contactos
, b.lst_mediospago, b.lst_reconocimientos, b.lst_videos, b.lst_videoenlace,
c.abreviatura,c.denominacion
FROM producto a
INNER JOIN artesano b ON a.artesano_id=b.id
INNER JOIN categoria c ON a.categoria_id=c.id
WHERE a.id=${id}
     `;

        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        console.log(list)
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return list;
    }
    catch (err) {
        throw err;
    }
}




