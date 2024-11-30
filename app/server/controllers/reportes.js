const sequelize = require('sequelize');
const { Op } = require('sequelize');
const Cliente = require('../models/cliente');
const Artesano = require('../models/artesano');
const Producto = require('../models/producto');



function generateReport (req, res) {
    const reportType = req.query.reportType;

    if (!reportType) {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    try {
        let sql = '';

        switch (reportType) {
            case 'clientes':
                sql = `
                    SELECT *
                    FROM cliente;`;
                break;

            case 'artesanos':
                sql = `
                    SELECT *
                    FROM artesano;`;
                break;

            case 'productos':
                sql = `
                    SELECT 
                        p.*,
                        c.denominacion AS Categoria,
                        c.descripcion AS DescripcionCategoria,
                        a.nombres AS NombresArtesano,
                        a.apellidos AS ApellidosArtesano,
                        a.correo AS CorreoArtesano,
                        a.celular AS CelularArtesano
                    FROM producto p
                    JOIN categoria c ON p.categoria_id = c.id
                    JOIN artesano a ON p.artesano_id = a.id;
                `;
                break;

            default:
                return res.status(400).json({ error: 'Invalid report type' });
        }

        Cliente.sequelize.query(sql, {
            type: Cliente.sequelize.QueryTypes.SELECT
        })
            .then(resultset => {
                res.status(200).json(resultset);
            })
            .catch(error => {
                res.status(400).send(error);
            });
        //const [results, metadata] = await Cliente.sequelize.query(sql, { type: Cliente.sequelize.QueryTypes.SELECT });

        //return res.status(200).json(results);
    } catch (error) {
        console.error('Error generating report:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    generateReport
};