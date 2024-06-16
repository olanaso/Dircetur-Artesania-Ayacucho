const sequelize = require('sequelize');
const model = require('../models/ubigeo'); 
const { Op, fn, col, literal  } = require('sequelize'); 
const PARAMETROS = require("../helpers/parametros");
const moment = require('moment');
 
 

module.exports = {
    listarDepartamento,
    obtenerProvincia,
    obtenerDistrito
};

function listarDepartamento(req, res) {
 

    model.findAll({
        attributes: [
            [fn('DISTINCT', col('iddepartamento')), 'iddepartamento'],
            'departamento'
        ]
    })
    .then(resultset => {
        res.status(200).json(resultset);
    })
    .catch(error => {
        res.status(400).send(error);
    });
}


function obtenerProvincia(req, res) { 
  
        const iddepartamento = req.params.id; // Suponiendo que recibes el iddepartamento desde la URL
     

        model.findAll({
            attributes: [
                [fn('DISTINCT', col('idprovincia')), 'idprovincia'],
                'provincia'
            ],
            where: {
                iddepartamento: iddepartamento
            }
        })
        .then(resultset => {
            res.status(200).json(resultset);
        })
        .catch(error => {
            console.error('Error al obtener provincias:', error);
            res.status(500).json({ error: 'Error al obtener provincias' });
        });
}

function obtenerDistrito(req, res) { 

    model.findAll({ 
        attributes: [
            [fn('DISTINCT', col('ubigeo')), 'ubigeo'],
            'distrito'
        ],
        where: {
            idprovincia: req.params.id 
        }
    })
    .then(resultset => {
        res.status(200).json(resultset);
    })
    .catch(error => {
        res.status(400).send(error);
    });
}