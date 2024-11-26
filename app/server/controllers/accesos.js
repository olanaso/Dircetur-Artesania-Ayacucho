const sequelize = require('sequelize');
const model = require('../models/accesos');
const { Op } = require('sequelize');

module.exports = {

  guardar,
  listarfull,
  listarInterval,
  obtenerEstadisticas

};


/**
 * Calcula el horario según la hora de acceso.
 * @param {string} fecha_cliente - Fecha y hora en formato ISO (YYYY-MM-DDTHH:mm:ss).
 * @returns {string} - Horario (Mañana, Tarde o Noche).
 */
function calcularHorario (fecha_cliente) {
  const fecha = new Date(fecha_cliente);
  const hora = fecha.getHours();

  if (hora >= 6 && hora < 12) {
    return "Mañana";
  } else if (hora >= 12 && hora < 18) {
    return "Tarde";
  } else {
    return "Noche";
  }
}

/**
 * Calcula la hora de acceso en formato 24h.
 * @param {string} fecha_cliente - Fecha y hora en formato ISO (YYYY-MM-DDTHH:mm:ss).
 * @returns {number} - Hora de acceso en formato 24h.
 */
function calcularHoraAcceso (fecha_cliente) {
  const fecha = new Date(fecha_cliente);
  return fecha.getHours();
}

function guardar (req, res) {


  req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  req.body.dispositivo = req.header('user-agent');
  req.body.horario = calcularHorario(req.body.fecha_cliente);
  req.body.horaacceso = calcularHoraAcceso(req.body.fecha_cliente);

  model.create(req.body)
    .then(object => {
      res.status(200).json(object);
    })
    .catch(error => {
      res.status(400).send(error)
    })

}


function listarfull (req, res) {

  model.findAll({
    where: { iestp: req.query.iestp },
    order: [
      ['id', 'DESC']
    ],
    attributes: {
      include: [
        "id",
        "iestp",
        "carrera",

        [
          sequelize.fn
            (
              "DATE_FORMAT",
              sequelize.col("fecha_registro"),
              "%m/%d/%Y %H:%i"
            ),
          "fecha_registro",
        ],
        "libro", "autor", "usuario", "modalidad", "ip"
      ]
    }
  })
    .then(resultset => {
      res.status(200).json(resultset)
    })
    .catch(error => {
      res.status(400).send(error)
    })
}


function listarInterval (req, res) {

  model.findAll({
    where: {
      [Op.and]: [
        { iestp: req.query.iestp },
        sequelize.where(sequelize.fn('date', sequelize.col('fecha_registro')), '>=', req.query.fecha_inicio),
        sequelize.where(sequelize.fn('date', sequelize.col('fecha_registro')), '<=', req.query.fecha_fin)
      ]
    },
    order: [
      ['id', 'DESC']
    ],

    attributes: {
      include: [
        "id",
        "iestp",
        "carrera",

        [
          sequelize.fn
            (
              "DATE_FORMAT",
              sequelize.col("fecha_registro"),
              "%d/%m/%Y %H:%i"
            ),
          "fecha_registro",
        ],
        "libro", "autor", "usuario", "modalidad", "ip"
      ]
    }
  })
    .then(resultset => {

      res.status(200).json(resultset)
    })
    .catch(error => {
      res.status(400).send(error)
    })
}



async function obtenerEstadisticas (req, res) {
  try {
    const sequelize = model.sequelize;

    // Definición de las consultas
    const consultas = {
      totalVisitas: `
        SELECT COUNT(*) AS total_visitas
        FROM accesos;
      `,
      usuariosNuevos: `
        SELECT 
          b.denominacion, 
          COUNT(*) AS usuarios_nuevos,
          DATE(a.createdat) AS fecha
        FROM usuario a
        INNER JOIN rol b ON a.rolid = b.id
        WHERE a.createdat >= CURDATE() - INTERVAL 30 DAY
        GROUP BY DATE(a.createdat);
      `,
      accesosPorHora: `
        SELECT 
          horaacceso,
          COUNT(*) AS total_accesos
        FROM accesos
        GROUP BY horaacceso
        ORDER BY total_accesos DESC
        LIMIT 5;
      `,
      palabrasClaveFrecuencia: `
        SELECT 
          palabrasclave,
          COUNT(*) AS frecuencia
        FROM accesos
        WHERE palabrasclave IS NOT NULL
        GROUP BY palabrasclave
        ORDER BY frecuencia DESC
        LIMIT 10;
      `,
      demandasPorCategoria: `
        SELECT 
          c.denominacion,
          COUNT(a.productoid) AS total_demandas
        FROM accesos a
        INNER JOIN producto p ON a.productoid = p.id
        INNER JOIN categoria c ON c.id = p.categoria_id
        GROUP BY c.denominacion, a.productoid
        ORDER BY c.denominacion, a.productoid DESC
        LIMIT 5;
      `,
      solicitudesPorArtesano: `
        SELECT 
          CONCAT(ar.nombres, ' ', ar.apellidos) AS artesano,
          COUNT(a.productoid) AS total_solicitudes
        FROM accesos a
        INNER JOIN producto p ON a.productoid = p.id
        INNER JOIN artesano ar ON ar.id = p.artesano_id
        GROUP BY ar.nombres, ar.apellidos
        ORDER BY total_solicitudes DESC
        LIMIT 5;
      `,
      calificacionesPromedio: `
        SELECT 
          p.nombres_es AS producto,
          AVG(c.valor) AS promedio_calificacion,
          COUNT(c.valor) AS total_calificaciones
        FROM valoracion c
        INNER JOIN producto p ON c.productoid = p.id
        GROUP BY c.productoid
        ORDER BY promedio_calificacion DESC
        LIMIT 10;
      `
    };

    // Ejecutar las consultas en paralelo
    const resultados = await Promise.all(
      Object.entries(consultas).map(async ([key, query]) => {
        const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        return { [key]: result };
      })
    );

    // Consolidar los resultados en un único JSON
    const respuesta = resultados.reduce((acc, curr) => ({ ...acc, ...curr }), {});

    // Enviar la respuesta
    res.status(200).json(respuesta);
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).send({ error: "Error al obtener estadísticas" });
  }
}


