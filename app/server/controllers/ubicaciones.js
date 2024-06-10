const sequelize = require('sequelize');
const modelPais = require('../models/countries');
const modelRegion = require('../models/states');
const modelCiudad = require('../models/cities');
const { Op } = require('sequelize');

module.exports = {
    listarPais,
    obtenerRegiones,
    obtenerCiudades
};

function listarPais(req, res) {

    modelPais.findAll()
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}


function obtenerRegiones(req, res) {
    let { pais_id } = req.query
    modelRegion.findAll({
        where: {country_id: pais_id}
    })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

function obtenerCiudades(req, res) {
    let { region_id } = req.query
    modelCiudad.findAll({
        where: {state_id: region_id}
    })
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

function listarCiudad(req, res) {

    modelCiudad.findAll()
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}