const sequelize= require('sequelize');
const model = require('../models/indent_predios');
const {Op}= require('sequelize');

module.exports = {
    guardar,
    actualizar,
    eliminar,
    obtener,
    listar,
    save,
    listardia
};

function guardar(req, res) {


    req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.body.equipo=req.header('user-agent');

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
        where: {id: req.params.id}

    })
        .then(object => {
                object.update(req.body)
                    .then(object => res.status(200).json(object))
                    .catch(error => res.status(400).send(error))
            }
        )
        .catch(error => res.status(400).send(error));
}

function eliminar(req, res) {

    model
        .findOne({
            where: {id: req.body.id}
        })
        .then(object => {
                object.destroy();
                res.status(200).json(object);
            }
        )
        .catch(error => res.status(400).send(error));
}
function obtener(req, res) {

    model.findOne({
        where: {id: req.params.id}
    })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}
function listar(req, res) {

    model.findAll({
        attributes: {exclude: ['fotos']},
    order: [['id','DESC']]})
        .then(resultset => {
           
            res.status(200).json(resultset)
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
            let obj = {...object.dataValues, ...req.body}
            for (const prop in obj) {
                object[prop] = obj[prop]
            }
            object.usuaregistra_id = req.userId;
            await object.save({t});
        } else {
            object = await model.create({...req.body}, {t});
        }
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

function listardia(req, res) {
    
    let day= req.query.day;
    
   let inicio= new Date(day+' 00:01').valueOf()
   let fin= new Date(day+' 23:59').valueOf()
   
    // res.status(200).send(day)
   model.findAll({
         where: {
             epoch: {
        [Op.gt]:inicio,
        [Op.lt]:fin
      } 
         },
        attributes: {exclude: ['fotos']},
    order: [['id','DESC']]})
        .then(resultset => {
           
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}



