const sequelize = require('sequelize');
const model = require('../models/accesos');
const { Op } = require('sequelize');

module.exports = {
  guardar,
  listarfull,
  listarInterval

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