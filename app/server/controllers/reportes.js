const sequelize = require('sequelize');
const { Op } = require('sequelize');
const Cliente = require('../models/cliente');
const Artesano = require('../models/artesano');
const Producto = require('../models/producto');



function generateReport  (req, res) {
    //const { attributes } = req.body;
    //const attributes = req.query.attributes ? req.query.attributes.split(',') : null;
    const reportType = req.query.reportType;
    // if (!reportType || !attributes || !Array.isArray(attributes)) {
    //     return res.status(400).json({ error: 'Invalid request data' });
    // }
    if (!reportType) {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    try {
        let data;
        switch (reportType) {
            case 'clientes':
                Cliente.findAll()
                    .then(resultset => {
                        res.status(200).json(resultset)
                    })
                    .catch(error => {
                        res.status(400).send(error)
                    })
                    //where: {},
                    //attributes: attributes
                //});
                break;
            case 'artesanos':
                Artesano.findAll()
                    .then(resultset => {
                        res.status(200).json(resultset)
                    })
                    .catch(error => {
                        res.status(400).send(error)
                    })
                    
                break;
            case 'productos':
                data = Producto.findAll()
                    .then(resultset => {
                        res.status(200).json(resultset)
                    })
                    .catch(error => {
                        res.status(400).send(error)
                    })
                break;
            default:
                return res.status(400).json({ error: 'Invalid report type' });
        }

        //return res.status(200).json(data);
    } catch (error) {
        console.error('Error generating report:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    generateReport
};