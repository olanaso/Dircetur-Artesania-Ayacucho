const sequelize = require('sequelize');
const model = require('../models/comentarios');
const usuario = require('../models/usuario');
const cliente = require('../models/cliente');
const iestp = require('../models/iestps')
const programa = require('../models/programas')
const {
  Op
} = require('sequelize');



model.belongsTo(cliente, {
  foreignKey: 'clienteid', // La clave foránea debe ser clienteid para hacer referencia al modelo clientes
  targetKey: 'id'          // El campo id de clientes se relaciona con clienteid de comentarios
});

module.exports = {
  guardar,
  actualizar,
  eliminar,
  obtener,
  listar,
  save
};

async function guardar(req, res) {
  try {
    const { clienteid, productoid, nropagina, comentario } = req.body;

    if (!clienteid || !productoid || !comentario) {
      return res.status(400).json({ 
        error: 'clienteid, productoid, y comentario son campos requeridos' 
      });
    }

    if (!Number.isInteger(clienteid) || !Number.isInteger(productoid)) {
      return res.status(400).json({ 
        error: 'clienteid and productoid deben ser números enteros'
      });
    }

    if (comentario.length < 3 || comentario.length > 1000) {
      return res.status(400).json({
        error: 'comentario debe tener entre 3 y 1000 caracteres'
      });
    }

    const object = await model.create({
      ...req.body,
      nropagina: nropagina || 1,
      createdAt: new Date()
    });

    const comentarioBD = await model.findOne({
      where: {
        id: object.id
      },
      include: [
        {
          model: cliente,
          attributes: ['nombres', 'apellidos'],
        }
      ]
    });

    return res.status(200).json(comentarioBD);

  } catch (error) {
    console.error('Error creardo el comentario:', error);
    return res.status(400).json({
      error: error.message || 'Error creardo el comentario'
    });
  }
}

function actualizar (req, res) {
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

function eliminar (req, res) {

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

function obtener (req, res) {

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
/*
function listar(req, res) {
    model.findAll({
         where: {libroid: req.query.libroid},
        })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}
*/
function listar (req, res) {

  if (!req.query.productoid) {
    return res.status(400).send({ error: 'The productoid parameter   is required' });
  }


  model.findAll({
    where: { productoid: req.query.productoid },
    attributes: {
      exclude: ['productoid']
    },
    include: [
      {
        model: cliente,
        attributes: ['nombres', 'apellidos'],

      },



    ]
  })
    .then(resultset => {
      res.status(200).json(resultset)
    })
    .catch(error => {
      res.status(400).send(error)
    })
}
async function save (req, res, next) {
  const t = await model.sequelize.transaction();
  try {

    let object = await model.findOne({
      where: {
        id: req.body.id ? req.body.id : 0
      }
    });

    if (object != null) {
      let obj = {
        ...object.dataValues,
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
      object = await model.create({
        ...req.body
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