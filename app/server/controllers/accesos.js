const sequelize = require('sequelize');
const model = require('../models/accesos');
const { Op } = require('sequelize');

module.exports = {
    guardar,
    listarfull,
    listarInterval

};

function guardar(req, res) {


    req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //req.body.equipo=req.header('user-agent');

    model.create(req.body)
        .then(object => {
            res.status(200).json(object);
        })
        .catch(error => {
            res.status(400).send(error)
        })

}


function listarfull(req, res) {

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
      "libro", "autor",  "usuario",  "modalidad",  "ip"
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


function listarInterval(req, res) {

    model.findAll({
            where: {
                [Op.and]: [
                    {iestp: req.query.iestp},
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
      "libro", "autor",  "usuario",  "modalidad",  "ip"
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