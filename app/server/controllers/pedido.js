const model = require('../models/pedido');
const { Op } = require('sequelize');
const modelPedido = require('../models/pedido');
const modelCliente = require('../models/cliente');
const modelArtesano = require('../models/artesano');

modelPedido.belongsTo(modelCliente, { foreignKey: 'cliente_id' });
modelPedido.belongsTo(modelArtesano, { foreignKey: 'artesano_id' });


module.exports = {
    guardar,
    actualizar,
    eliminar,
    listar,
    save,
    filtrar,
    obtener: async (req, res) => {
        const idPedido = req.params.id;

        try {
            const pedido = await obtenerPedido(idPedido);
            res.json(pedido);
        } catch (error) {
            console.error(error);
            res.status(error.status || 500).json({ error: error.message || 'Error al obtener el pedido' });
        }
    }
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
        where: { num_pedido: req.params.id }
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
        where: { num_pedido: req.body.id }
    })
        .then(object => {
            object.destroy();
            res.status(200).json(object);
        })
        .catch(error => res.status(400).send(error));
}

// function obtener(req, res) {
//     model.findOne({
//         where: { num_pedido: req.params.id }
//     })
//         .then(resultset => {
//             res.status(200).json(resultset);
//         })
//         .catch(error => {
//             res.status(400).send(error);
//         });
// }
async function obtenerPedido(idPedido) {
    try {
        const pedidoResult = await modelPedido.findOne({
            where: { num_pedido: idPedido },
            attributes: {
                exclude: ['cliente_id', 'artesano_id'] // Excluir los campos cliente_id y artesano_id
            },
            include: [
                {
                    model: modelCliente,
                    attributes: [
                        'nombres',
                        'apellidos',
                        'numero_documento',
                        'correo',
                        'telefono',
                        'tipo_documento',
                        'numero_documento',
                        'direccion',
                        'pais',
                        'region',
                        'ciudad'
                    ]
                },
                {
                    model: modelArtesano,
                    attributes: ['nombres', 'apellidos']
                }
            ]
        });

        if (!pedidoResult) {
            throw {
                error: new Error("pedido no encontrado"),
                message: "pedido no encontrado",
                status: 404
            };
        }

        return pedidoResult;
    } catch (error) {
        throw error;
    }
}


function listar(req, res) {
    modelPedido.findAll({
        attributes: {
            exclude: ['cliente_id', 'artesano_id']
        },
        include: [
            {
                model: modelCliente,
                attributes: [
                    'nombres',
                    'apellidos'
                ]
            },
            {
                model: modelArtesano,
                attributes: ['nombres', 'apellidos']
            }
        ]
    })
        .then(resultset => {
            res.status(200).json(resultset);
        })
        .catch(error => {
            console.error('Error al listar pedidos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        });
}


async function save(req, res, next) {
    const t = await model.sequelize.transaction();
    try {
        let object = await model.findOne({
            where: {
                num_pedido: req.body.id ? req.body.id : 0
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
        const { fecha_pedido, num_pedido, nombre_artesano, nombre_cliente, estado } = req.query;
        const whereCondition = {};

        if (fecha_pedido) {
            whereCondition.fecha_pedido = {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('DATE', Sequelize.col('fecha_pedido')), fecha_pedido)
                ]
            };
        }

        if (num_pedido) {
            whereCondition.num_pedido = num_pedido;
        }

        if (estado) {
            whereCondition.estado = estado;
        }

        const includeCondition = [];

        if (nombre_cliente) {
            includeCondition.push({
                model: modelCliente,
                where: {
                    [Op.or]: [
                        { nombres: { [Op.like]: `%${nombre_cliente}%` } },
                        { apellidos: { [Op.like]: `%${nombre_cliente}%` } }
                    ]
                }
            });
        } else {
            includeCondition.push({
                model: modelCliente,
                attributes: ['nombres', 'apellidos']
            });
        }

        if (nombre_artesano) {
            includeCondition.push({
                model: modelArtesano,
                where: {
                    [Op.or]: [
                        { nombres: { [Op.like]: `%${nombre_artesano}%` } },
                        { apellidos: { [Op.like]: `%${nombre_artesano}%` } }
                    ]
                }
            });
        } else {
            includeCondition.push({
                model: modelArtesano,
                attributes: ['nombres', 'apellidos']
            });
        }

        const result = await modelPedido.findAll({
            where: whereCondition,
            include: includeCondition,
            attributes: {
                exclude: ['cliente_id', 'artesano_id']
            }
        });

        res.json(result);
    } catch (error) {
        console.error('Error al buscar pedidos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};