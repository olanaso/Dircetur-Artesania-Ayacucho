const sequelize = require('sequelize');
const model = require('../models/libros');
const {
  Op
} = require('sequelize');

module.exports = {
  guardar,
  actualizar,
  eliminar,
  obtener,
  listar,
  listarPaginado,
  save,
  listarCantbyCarreras,
  listarReporte
};

function guardar(req, res) {


  // req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //req.body.equipo=req.header('user-agent');

  model.create(req.body)
    .then(object => {
      res.status(200).json(object);
    })
    .catch(error => {
      res.status(400).send(error)
    })

}

function actualizar(req, res) {
  model.findOne({
      where: {
        id: req.params.id
      }

    })
    .then(object => {
      object.update(req.body)
        .then(object => res.status(200).json(object))
        .catch(error => res.status(400).send(error))
    })
    .catch(error => res.status(400).send(error));
}

function eliminar(req, res) {

  model
    .findOne({
      where: {
        id: req.body.id
      }
    })
    .then(object => {
      object.destroy();
      res.status(200).json(object);
    })
    .catch(error => res.status(400).send(error));
}

function obtener(req, res) {

  model.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(resultset => {
      res.status(200).json(resultset)
    })
    .catch(error => {
      res.status(400).send(error)
    })
}

function listarReporte(req, res) {
  let wheresql = {}
  if (!!req.query.carrera) {
    wheresql.carrera = req.query.carrera
  }
  if(req.query.carrera=='-'){
    delete wheresql.carrera 
  }
  if (!!req.query.iestp) {
    wheresql.iestp = req.query.iestp
  }

  model.findAll({
      where: wheresql

        ,
      attributes: {
        exclude: ['url_digital', 'portada']
      },
      order: [
        ['carrera', 'DESC']
      ]
    })
    .then(resultset => {

      res.status(200).json(resultset)
    })
    .catch(error => {
      res.status(400).send(error)
    })
}


function listar(req, res) {

  //let usuario=req.session.usuario;

   //res.status(200).json(usuario)

   let qwhere=[]
    if(req.query.administrador==1 || req.query.administrador=='1'){
      qwhere=[
       {
            iestp: req.params.iestp
          },
          sequelize.where(sequelize.fn('concat', sequelize.col('nombre_libro'), sequelize.col('autor'), sequelize.col('isbn')), {
            [Op.like]: `%${req.params.busqueda.trim().replace(/ /g, "%")}%`
          })
        ]
    }
    else{
      qwhere=[{
            carrera: req.params.carrera
          }, {
            iestp: req.params.iestp
          },
          sequelize.where(sequelize.fn('concat', sequelize.col('nombre_libro'), sequelize.col('autor'), sequelize.col('isbn')), {
            [Op.like]: `%${req.params.busqueda.trim().replace(/ /g, "%")}%`
          })
        ]
    }

     
   


  model.findAll({
      limit: 10,
      where: {
        [Op.and]: qwhere
      },
      attributes: {
        exclude: ['editorial', 'nro_paginas', 'anio_edicion', 'tomo', 'nro_edicion', 'resenia','url_digital']
      },
      order: [
        ['id', 'DESC']
      ]
    })
    .then(resultset => {

      res.status(200).json(resultset)
    })
    .catch(error => {
      res.status(400).send(error)
    })


}



async function listarPaginado(req, res) {
   let qwhere=[]
    if( (req.query.administrador==1 || req.query.administrador=='1') || (req.query.administrador==2 || req.query.administrador=='2') ){
      qwhere=[
       {
            iestp: req.params.iestp
          },
          sequelize.where(sequelize.fn('concat', sequelize.col('nombre_libro'), sequelize.col('autor'), sequelize.col('isbn'), sequelize.col('carrera'), sequelize.col('tema')), {
            [Op.like]: `%${req.params.busqueda.trim().replace(/ /g, "%")}%`
          })
        ]
    }
    else{
      qwhere=[{
            carrera: req.params.carrera
          }, {
            iestp: req.params.iestp
          },
          sequelize.where(sequelize.fn('concat', sequelize.col('nombre_libro'), sequelize.col('autor'), sequelize.col('isbn'), sequelize.col('carrera'), sequelize.col('tema')), {
            [Op.like]: `%${req.params.busqueda.trim().replace(/ /g, "%")}%`
          })
        ]
    }
    
    const count = await model.count({
     where: {
        [Op.and]: qwhere
      } 
    });



    model.findAll({
      
      where: {
        [Op.and]: qwhere
      },
      attributes: {
        exclude: ['editorial', 'nro_paginas', 'anio_edicion', 'tomo', 'nro_edicion', 'resenia','url_digital']
      },
      order: [
        ['id', 'DESC']
      ],
      limit: parseInt(req.query.per_page),
      offset: parseInt(req.query.per_page) * parseInt(req.query.page)
    })
    .then(resultset => {
      res.status(200).json({ cant:count, data:resultset, cantPages: Math.ceil(count/parseInt(req.query.per_page)) })
    })
    .catch(error => {
      res.status(400).send(error)
    })
}

function listarCantbyCarreras(req, res) {

   //let usuario=req.session.usuario



   let qwhere={}
    if( (req.query.administrador==1 || req.query.administrador=='1') || (req.query.administrador==2 || req.query.administrador=='2')){
      qwhere= {
        carrera: req.params.carrera
      }
    }
    else{
      qwhere= {
        carrera: req.params.carrera,
        iestp: req.params.iestp
      }
    }
    
    
  model.findAll({
      where: qwhere,
      attributes: {
        exclude: ['editorial', 'nro_paginas', 'anio_edicion', 'tomo', 'nro_edicion', 'resenia']
      },
      order: [
        ['id', 'DESC']
      ]
    })
    .then(resultset => {

      res.status(200).json({
        cant: resultset.length
      })
    })
    .catch(error => {
      res.status(400).send(error)
    })

}


/*Guarda los datos generales de un predio*/
async function save(req, res, next) {
  const t = await model.sequelize.transaction();
  try {

    let object = await model.findOne({
      where: {
        id: req.body.id ? req.body.id : 0
      }
    });

    if (object != null) {
      let obj = { ...object.dataValues,
        ...req.body
      }
      for (const prop in obj) {
        object[prop] = obj[prop]
      }
      object.usuaregistra_id = req.userId;
      await object.save({
        t
      });
    } else {
      object = await model.create({ ...req.body
      }, {
        t
      });
    }
    t.commit().then();
    return res.status(200).send(object);
  } catch (e) {
    t.rollback();
    return next(e);
  }
}


async function listarPaginado2(req,res){
  
  let page = req.query.page || 1;  // page number
  let limit = 10;  // number of records per page
  let offset = 0 + (page - 1) * limit;

  let users = await model.findAndCountAll({
    limit: limit,
    offset: offset
  });

  res.json({
    totalPages: Math.ceil(users.count / limit),
    data: users.rows
  });

}