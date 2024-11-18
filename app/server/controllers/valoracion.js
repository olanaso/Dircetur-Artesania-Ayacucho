const sequelize = require('sequelize');
const model = require('../models/valoracion');
const {
  Op
} = require('sequelize');
module.exports = {
  save,
  puntuacionPromedio,
  puntuacionPromedioArtesano
};


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

async function puntuacionPromedio (req, res) {


  try {
    const promedio = await model.findAll({
      attributes: [
        [model.sequelize.fn('AVG', Sequelize.col('valor')), 'promedio'],
      ],
      where: {
        productoid: req.query.productoid, // Filtro por el ID del producto si es necesario
      },
    });

    const resultado = promedio[0].get('promedio');
    console.log(`El promedio de puntuaciones es: ${resultado}`);
    return res.status(200).send({ puntuacion: Math.round(resultado) });
  } catch (error) {
    console.error('Error al calcular el promedio:', error);
  }


}

async function puntuacionPromedioArtesano (req, res) {


  try {
    const promedio = await model.findAll({
      attributes: [
        [model.sequelize.fn('AVG', Sequelize.col('valor')), 'promedio'],
      ],
      where: {
        artesanoid: req.query.artesanoid, // Filtro por el ID del producto si es necesario
      },
    });

    const resultado = promedio[0].get('promedio');
    console.log(`El promedio de puntuaciones es: ${resultado}`);
    return res.status(200).send({ puntuacion: Math.round(resultado) });
  } catch (error) {
    console.error('Error al calcular el promedio:', error);
  }


}