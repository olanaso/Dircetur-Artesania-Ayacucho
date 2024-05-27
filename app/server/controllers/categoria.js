const model = require('../models/categoria');
const { Op } = require('sequelize');

module.exports = {
    guardar,
    actualizar,
    eliminar,
    obtener,
    listar,
    save,
    filtrar
};

function guardar(req, res) {
    model.create(req.body)
        .then(object => {
            res.status(200).json(object);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

function actualizar(req, res) {
    model.findOne({
        where: { id: req.params.id }
    })
        .then(object => {
            object.update(req.body)
                .then(object => res.status(200).json(object))
                .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
}

function eliminar(req, res) {
    model.findOne({
        where: { id: req.body.id }
    })
        .then(object => {
            object.destroy();
            res.status(200).json(object);
        })
        .catch(error => res.status(400).send(error));
}

function obtener(req, res) {
    model.findOne({
        where: { id: req.params.id }
    })
        .then(resultset => {
            res.status(200).json(resultset);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

function listar(req, res) {
    model.findAll()
        .then(resultset => {
            res.status(200).json(resultset);
        })
        .catch(error => {
            res.status(400).send(error);
        });
}

async function save(req, res, next) {
    const t = await model.sequelize.transaction();
    try {
        let object = await model.findOne({
            where: {
                id: req.body.id ? req.body.id : 0
            }
        });

        if (object != null) {
            let obj = { ...object.dataValues, ...req.body };
            for (const prop in obj) {
                object[prop] = obj[prop];
            }
            object.usuaregistra_id = req.userId;
            await object.save({ t });
        } else {
            object = await model.create({ ...req.body }, { t });
        }
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

async function filtrar(req, res) {
    try {
        const whereCondition = {};

        for (const [key, value] of Object.entries(req.query)) {
            if (value) {
                if (typeof value === 'string' && key !== 'id') {
                    // Si el valor es una cadena y la clave no es 'id', usar Op.like para búsquedas parciales
                    whereCondition[key] = { [Op.like]: `%${value}%` };
                } else {
                    // Si no, hacer una coincidencia exacta
                    whereCondition[key] = value;
                }
            }
        }

        const categorias = await model.findAll({ where: whereCondition });

        res.json(categorias);
    } catch (error) {
        console.error('Error al buscar categorías:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};