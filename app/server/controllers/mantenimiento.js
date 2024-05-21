const sequelize = require('sequelize');

const model = require('../models/mantenimiento');

module.exports = {
    guardar,
    actualizar,
    eliminar,
    obtener,
    listar,
    buscar,
    buscarProgramados,
    save,
    finalizar
};

function guardar(req, res) {

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


function finalizar(req, res) {

    model.findOne({
        where: {id: req.params.id}

    })
        .then(object => {
            let now= new Date();
                object.update({...req.body,fechafinalizacion:now,finalizado:true})
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


function buscar(req, res) {
    let sql = ``;
    if (req.body.ind == '1') {
        sql = `
         select a.*,b.nombres||' '||b.apellidos personalregistra,b.celular,b.dni,
        case when finalizado is false and anulado is false then 
            case when actividadesejecutadas is not null THEN  'PROCESO' ELSE 'PENDIENTE' END 
         ELSE 
            case when anulado=true THEN  'ANULADO' ELSE 'FINALIZADO' END 
         END estado 
        ,c.denominacion equipo
		from mantenimiento a
		inner join personal b on a.personaregistra=b.id
		inner join equipo c on c.id=a.idequipo
        where a.serie='${req.body.serie}'
        order by a.id desc
        limit 50


        `
    }
    if (req.body.ind == '2') {
        sql = `
         select a.*,b.nombres||' '||b.apellidos personalregistra,b.celular,b.dni,
        case when finalizado is false and anulado is false  then 
        case when actividadesejecutadas is not null THEN  'PROCESO' ELSE 'PENDIENTE' END 
        ELSE 'FINALIZADO'  END estado 
        ,c.denominacion equipo
		from mantenimiento a
		inner join personal b on a.personaregistra=b.id
		inner join equipo c on c.id=a.idequipo
        where a.codigo='${req.body.codigo}'
        order by a.id desc
        limit 50
        `
    }
    if (req.body.ind == '3') {
        sql = `
           select a.*,b.nombres||' '||b.apellidos personalregistra,b.celular,b.dni,
        case when finalizado is false and anulado is false  then 
        case when actividadesejecutadas is not null THEN  'PROCESO' ELSE 'PENDIENTE' END 
        ELSE 'FINALIZADO'  END estado 
        ,c.denominacion equipo
		from mantenimiento a
		inner join personal b on a.personaregistra=b.id
		inner join equipo c on c.id=a.idequipo
        where 
         a."createdAt">='${req.body.fechainicio} 00:00' and a."createdAt"<='${req.body.fechafin} 23:59'
        order by a.id desc
        limit 50
        
          
        `
    }

    // if(!req.query.fechainicio && !req.query.fechafin){


    model.sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}



function buscarProgramados(req, res) {
    let sql = ``;

        sql = `
        select a.*,b.nombres||' '||b.apellidos personalregistra,b.celular,b.dni,
        case when finalizado is false and anulado is false  then 
        case when actividadesejecutadas is not null THEN  'PROCESO' ELSE 'PENDIENTE' END 
        ELSE 'FINALIZADO'  END estado 
        ,c.denominacion equipo, now()-fechainicio diasrestantes
		from mantenimiento a
		inner join personal b on a.personaregistra=b.id
		inner join equipo c on c.id=a.idequipo
        where 
        finalizado is false 
		and fechainicio is not null
        order by a.id desc
        limit 50
        
          
        `


    // if(!req.query.fechainicio && !req.query.fechafin){


    model.sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

function listar(req, res) {

    model.findAll()
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



