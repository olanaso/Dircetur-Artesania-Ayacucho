const { buscarArtesano } = require('../../controllers/portada');
const models = require('../../models/libro');

module.exports = {
    /*Servicios portada*/
    listarSlider,
    listarCategorias,
    listadoProductosOferta,
    listadoProductosDestacados,
    listadoProductosRecientes,
    listadoArtesanos,
    /*Servicios portada*/
    detalleProducto,
    busquedaProducto,
    obtenerArtesano,
    PortadaBusquedaListArtesanos,
    PortadaBusquedaListCategorias
}

async function listarSlider () {
    try {

        let sql = `
SELECT * FROM slider
     `;

        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        // console.log(list)
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
        // console.log(list)
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


function limpiarCadenaOfertas (input) {
    return input.replace(/\\/g, '');
}


async function listadoProductosOferta () {
    try {

        let sql = `
      SELECT a.*,
       CONCAT(b.nombres, ' ', b.apellidos) AS artesano,    b.foto1, b.id artesano_id
        ,c.denominacion categoria,c.id categoria_id
        FROM producto a
 INNER JOIN artesano b ON a.artesano_id=b.id
 INNER JOIN categoria c ON a.categoria_id=c.id
WHERE JSON_VALID(a.lst_ofertas) AND TRIM(a.lst_ofertas) != '"[]"';
     `;

        //   console.log(sql)
        const data = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        // console.log(data)
        if (!data) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }

        return obtenerOfertasVigentes(data);
    }
    catch (err) {
        throw err;
    }
}

function obtenerOfertasVigentes (listaDeProductos) {
    // Función para obtener la fecha actual en formato 'YYYY-MM-DD'
    const obtenerFechaActual = () => {
        const hoy = new Date();
        return hoy.toISOString().split('T')[0];
    };
    const fechaActual = obtenerFechaActual();
    return listaDeProductos.map(item => {

        const ofertasLimpias = item.lst_ofertas.trim();
        console.log('----------------')
        // console.log(ofertasLimpias)
        // const ofertasSinComillas = ofertasLimpias.startsWith('"') && ofertasLimpias.endsWith('"')
        //     ? ofertasLimpias.slice(1, -1)
        //     : ofertasLimpias;

        // Deserializar dos veces para corregir el problema de caracteres escapados
        const ofertasArray = JSON.parse(limpiarCadenaOfertas(ofertasLimpias.slice(1, -1)));
        console.log('----------------')
        // console.log(ofertasArray)
        // Parsear el string limpio
        //const ofertasArray = JSON.parse(ofertasSinComillas);
        // Filtrar solo las ofertas vigentes
        const ofertasFiltradas = ofertasArray.filter(oferta =>
            fechaActual >= oferta.fechaInicio && fechaActual <= oferta.fechaFin
        );

        // Si hay ofertas vigentes, devolver el objeto con las ofertas filtradas
        if (ofertasFiltradas.length > 0) {
            return {
                ...item,
                oferta: true,
                lst_ofertas: ofertasFiltradas // Reemplazamos lst_ofertas con solo las ofertas vigentes
            };
        }

        return null; // Si no hay ofertas vigentes, devolvemos null
    })
        .filter(item => item !== null); // Filtrar los elementos que no tienen ofertas vigentes
}

function obtenerFechaActual () {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
}

function limpiezaDeOfertasDelProducto (listaDeProductos) {
    // Función para obtener la fecha actual en formato 'YYYY-MM-DD'
    const fechaActual = obtenerFechaActual();
    return listaDeProductos.map(item => {

        const ofertasLimpias = item.lst_ofertas.trim();
        console.log('----------------')
        // console.log(ofertasLimpias)
        // const ofertasSinComillas = ofertasLimpias.startsWith('"') && ofertasLimpias.endsWith('"')
        //     ? ofertasLimpias.slice(1, -1)
        //     : ofertasLimpias;

        // Deserializar dos veces para corregir el problema de caracteres escapados
        const ofertasArray = JSON.parse(limpiarCadenaOfertas(ofertasLimpias.slice(1, -1)));
        console.log('----------------')
        // console.log(ofertasArray)
        // Parsear el string limpio
        //const ofertasArray = JSON.parse(ofertasSinComillas);
        // Filtrar solo las ofertas vigentes
        const ofertasFiltradas = ofertasArray.filter(oferta =>
            fechaActual >= oferta.fechaInicio && fechaActual <= oferta.fechaFin
        );

        // Si hay ofertas vigentes, devolver el objeto con las ofertas filtradas

        return finalItem = {
            ...item,
            lst_ofertas: ofertasFiltradas // Reemplazamos lst_ofertas con solo las ofertas vigentes
        }

    })
        .filter(item => item !== null); // Filtrar los elementos que no tienen ofertas vigentes
}



async function listadoProductosDestacados () {
    try {

        let sql = `
       SELECT
    p.*,
    CONCAT(a.nombres, ' ', a.apellidos) AS artesano,
    a.foto1,
    a.id AS artesano_id,
    c.denominacion AS categoria,
    c.id AS categoria_id,
    v.valor,
    (SELECT AVG(valor) FROM valoracion) AS promedio_valor
FROM
    producto p
INNER JOIN
    artesano a ON p.artesano_id = a.id
INNER JOIN
    valoracion v ON p.id = v.productoid
INNER JOIN
    categoria c ON p.categoria_id = c.id
ORDER BY
    v.valor DESC
LIMIT 9;

     `;

        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        // console.log(list)
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }

        return limpiezaDeOfertasDelProducto(list);
    }
    catch (err) {
        throw err;
    }
}



async function listadoProductosRecientes () {
    try {

        let sql = `
 SELECT a.*,
      CONCAT(b.nombres, ' ', b.apellidos) AS artesano,   b.foto1, b.id artesano_id
       ,c.denominacion categoria,c.id categoria_id
  FROM producto a
 INNER JOIN artesano b ON a.artesano_id=b.id
  INNER JOIN categoria c ON a.categoria_id=c.id
 ORDER BY RAND()
LIMIT 9

     `;

        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        // console.log(list)
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }
        return limpiezaDeOfertasDelProducto(list);
    }
    catch (err) {
        throw err;
    }
}


async function listadoArtesanos () {
    try {

        let sql = `
 SELECT a.id, a.nombres, a.apellidos, a.celular, a.foto1, a.foto2, a.correo,
       COALESCE(b.categorias, 'OTRO') AS categoria_artesano
FROM artesano a
LEFT JOIN (
    SELECT
        a.artesano_id,
        GROUP_CONCAT(DISTINCT b.denominacion SEPARATOR ', ') AS categorias
    FROM producto a
    INNER JOIN categoria b ON a.categoria_id = b.id
    GROUP BY a.artesano_id
) b ON a.id = b.artesano_id
ORDER BY RAND()
LIMIT 12;

     `;

        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        // console.log(list)
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
        // console.log(list)
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
        // console.log(list)
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

async function busquedaProducto (pagina = 1, limit = 9, oferta = false, precio_min = 0, precio_max = 9999999, abrev_categoria, nombre_categoria, id_categoria, id_artesano
    , nombre_artesano, nombre_producto, order) {

    try {
        let sql = '';
        let where = ``;
        //Generacion del where 

        if (oferta) {
            where += ` AND JSON_VALID(a.lst_ofertas) AND TRIM(a.lst_ofertas) != '"[]"'`
        }
        if (precio_min && precio_min >= 0) {
            where += ` AND a.precio >= ${precio_min}`
        }
        if (precio_max && precio_max < 9999999) {
            where += ` AND a.precio <= ${precio_max}`
        }
        if (abrev_categoria) {
            where += ` AND c.abreviatura like '%${abrev_categoria}%' `
        }
        if (nombre_categoria) {
            where += ` AND c.denominacion like '%${nombre_categoria}%' `
        }
        if (id_categoria) {
            where += ` AND c.id = ${id_categoria} `
        }

        if (id_artesano) {
            where += ` AND b.id = ${id_artesano} `
        }



        if (nombre_artesano) {
            where += ` AND upper(concat(b.nombres, b.apellidos)) like '%${nombre_artesano.toUpperCase()}%' `
        }


        if (order === 'ofertas') {
            where += ` AND JSON_VALID(a.lst_ofertas) AND TRIM(a.lst_ofertas) != '"[]"' `
        }
        // if (nombre_producto) {
        //     where += ` AND upper(concat(a.resumen_es,a.nombres_es, a.nombres_eng)) like '%${nombre_producto.toUpperCase()}%' `
        // }
        let params = {};
        if (nombre_producto) {

            const nombreTerms = nombre_producto.trim().split(/\s+/);
            const nombreConditions = nombreTerms.map((term, index) => {
                params[`nombre${index}`] = `%${term}%`;
                return `( a.nombres_es LIKE  :nombre${index}  OR a.nombres_eng LIKE  :nombre${index}  OR a.resumen_es LIKE  :nombre${index}  OR a.resumen_eng LIKE  :nombre${index} )`;
            });
            where += ` AND (${nombreConditions.join(' AND ')}) `
        }



        sql = `
          SELECT count(1) cantidad
                FROM producto a
                INNER JOIN artesano b ON a.artesano_id=b.id
                INNER JOIN categoria c ON a.categoria_id=c.id
         WHERE 1 = 1
     `+ where;

        console.log(sql)

        const [tam_consulta] = await models.sequelize.query(sql, { replacements: params, type: sequelize.QueryTypes.SELECT });
        let cantidad = tam_consulta.cantidad

        let offset = (pagina - 1) * limit;
        //Calculo de limit offset




        let orderby = ` `
        let opcionesordenamiento = []


        /**/

        if (order) {

            if (order === 'menor-precio') {
                orderby = ` order by  a.precio ASC`;
            } else if (order === 'mayor-precio') {
                orderby = ` order by  a.precio desc`;
            } else if (order === 'novedades') {
                orderby = ` order by a.createdat desc`;

            }
            else if (order === 'relevancia') {
                orderby = ` `;
            }
        }





        let limitOffset = ` LIMIT ${limit} OFFSET ${offset}`

        sql = `
          SELECT a.*,
                CONCAT(b.nombres, ' ', b.apellidos) AS artesano,   b.foto1, b.id artesano_id
       ,c.denominacion categoria,c.id categoria_id ,c.abreviatura
                
                FROM producto a
                INNER JOIN artesano b ON a.artesano_id=b.id
                INNER JOIN categoria c ON a.categoria_id=c.id
         WHERE 1 = 1
     ` + where + orderby + limitOffset;

        console.log(sql)

        let resultados = await models.sequelize.query(sql, { replacements: params, type: sequelize.QueryTypes.SELECT });

        if (order === 'ofertas') {
            resultados = obtenerOfertasVigentes(resultados);

        }
        // resultados = limpiezaDeOfertasDelProducto(resultados)
        // console.log(resultados)
        if (!resultados) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }

        return {
            datos: resultados,
            total_filas: cantidad,
            pagina_actual: pagina,
            paginas_totales: Math.ceil(cantidad / limit)
        }
    } catch (e) {
        console.error(e)
        handleHttpError(res, "Ocurrion un error", 500)
        return
    }
}


async function obtenerArtesano (id) {
    try {

        let sql = `
SELECT * FROM artesano a
WHERE id=${id}
     `;

        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        console.log('-----------')
        // console.log(list)
        if (!list || list.length == 0) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }

        let [artesano] = list;
        // console.log(artesano)

        sql = `SELECT a.*,
                CONCAT(b.nombres, ' ', b.apellidos) AS artesano,   b.foto1, b.id artesano_id
       ,c.denominacion categoria,c.id categoria_id ,c.abreviatura
                
                FROM producto a
                INNER JOIN artesano b ON a.artesano_id=b.id
                INNER JOIN categoria c ON a.categoria_id=c.id
         WHERE 1 = 1 AND a.artesano_id=${artesano.id}`


        const productos = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        // console.log(list)
        if (!list) {
            throw {
                error: new Error("No existen datos"),
                message: "No existen Datos",
                status: 401
            };
        }

        // let listaProductos = await busquedaProducto(1, 10000, null, 0, 9999999, null/*abrev_categoria*/
        //  , null /*nombre_categoria*/, null /*id_categoria*/, artesano.id
        // , null /*nombre_artesano*/, null /*nombre_producto*/, null /*orden_precio*/, null/*recientes*/);
        //  return list;



        return { ...artesano, productos };
    }
    catch (err) {
        throw err;
    }
}





async function PortadaBusquedaListCategorias (cateria_id = 0, preciomin = 0, precio_max = 9999, artesano_id = 0) {
    try {

        let sql = `
     SELECT id, concat(abreviatura, ' - ', denominacion) categoria FROM categoria
     `;

        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        // console.log(list)
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

async function PortadaBusquedaListArtesanos (cateria_id = 0, preciomin = 0, precio_max = 9999, artesano_id = 0) {
    try {

        let sql = `
   SELECT id, concat(nombres, ' ', apellidos) artesano FROM artesano
ORDER BY concat(nombres, ' ', apellidos)
     `;

        const list = await models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT });
        // console.log(list)
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

