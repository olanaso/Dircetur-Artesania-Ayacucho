const sequelize = require('sequelize');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {
    Op
} = require('sequelize');
const model = require('../models/notas');
const modelprograma = require('../models/programas');
const { listarProgramasbyIESTP } = require('../services/libros/libros');
const { reporteLibros,reporteUsuarios,reporteaccesos } = require('../services/usuario/usuario');
const iestps = require('../models/iestps');
const programas = require('../models/programas');
const rol = require('../models/rol');
//const modelNota = require('../models/notas');
const usuario = require('../models/usuario');

module.exports = {
    guardar,
    actualizar,
    eliminar,
    obtener,
    obtenerCertificado,
    listar,
    save,
    importarNotas,
    search

};

async function guardar(req, res) {
    try {
        let existingNota = await model.findOne({
            where: {
                dni: req.body.dni,
                cod_curso: req.body.cod_curso
            }
        });

        if (existingNota) {
            return res.status(409).json({ error: 'Ya existe un registro con el mismo DNI y código de curso' });
        }

        let object = await model.create(req.body);
        res.status(200).json(object);
    } catch (error) {
        res.status(400).send(error);
    }
}


function actualizar (req, res) {
    model.findOne({
        where: { id: req.params.id }

    })
        .then(object => {
            object.update(req.body)
                .then(object => res.status(200).json(object))
                .catch(error => res.status(400).send(error))
        }
        )
        .catch(error => res.status(400).send(error));
}

function eliminar (req, res) {

    model
        .findOne({
            where: { id: req.body.id }
        })
        .then(object => {
            object.destroy();
            res.status(200).json(object);
        }
        )
        .catch(error => res.status(400).send(error));
}

function obtener (req, res) {

    model.findOne({
        where: { id: req.params.id }
    })
        .then(resultset => {
            req.session.usuario = resultset;
            res.status(200).json(resultset);
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

function obtenerCertificado (req, res) {

    model.findOne({
        where: { codigo_certificado: req.params.codigo }
    })
        .then(resultset => {
            req.session.usuario = resultset;
            res.status(200).json(resultset);
        })
        .catch(error => {
            res.status(400).send(error)
        })
}

function listar (req, res) {

    model.findAll({
        where: { dni: req.query.dni },
        attributes: {},
        order: [['nombres', 'DESC']]
    })
        .then(resultset => {

            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })
}


async function save (req, res, next) {

    console.log(req.body)
    const t = await model.sequelize.transaction();
    try {

        let object = await model.findOne({
            where: {
                id: req.body.id ? req.body.id : 0
            }
        });

        if (object != null) {
            let obj = { ...object.dataValues, ...req.body }
            for (const prop in obj) {
                object[prop] = obj[prop]
            }
            object.usuaregistra_id = req.userId;
          
            await object.save({ t });
            
        } else {
            object = await model.create({ ...req.body }, { t });
             // await enviarcorreoingreso (req.body);
        }
        t.commit().then();
        return res.status(200).send(object);
    } catch (e) {
        t.rollback();
        return next(e);
    }
}

function cambiarFormatoFecha2(fecha) {
    // Dividir la fecha en partes: año, mes y día
    const partesFecha = fecha.split("/");
    const anio = partesFecha[2];
    const mes = partesFecha[1];
    const dia = partesFecha[0];

    // Devolver la fecha en el formato dd/mm/yyyy
    return `${anio}-${mes}-${dia}`;
}

/* Guarda los datos de las notas de los cursos */
async function importarNotas(req, res, next) {
    let listanotas = req.body.listanotas;
    const t = await model.sequelize.transaction();

    var listanotasResultado = []
    try {

        for (let i = 0; i < listanotas.length; i++) {
            let nota = listanotas[i];
            let listErrores = []

            // Validamos que el DNI tenga 8 digitos
            if (String(nota.dni).trim() === '') {
                listErrores.push('DNI vacío');
            } else if (String(nota.dni).length !== 8) {
                listErrores.push('Tamaño de DNI diferente de 8 dígitos');
            }

            // Validamos que los nombres no estén vacíos
            if (String(nota.nombres).trim().length === 0) {
                listErrores.push('El nombre está vacío');
            }

            // Validación de la existencia del curso mediante cod_curso
            if (String(nota.cod_curso).trim().length === 0) {
                listErrores.push('Código de curso vacío');
            }
            
            // Validación de la existencia del curso mediante cod_curso
            if (String(nota.curso).trim().length === 0) {
                listErrores.push('Nombre de curso vacío');
            }

            // Validación de la nota
            if (nota.nota < 0 || nota.nota > 20) {
                listErrores.push('Nota fuera de rango (0-20)');
            }
            
              // Validación de la cant horas
            if (nota.cant_horas < 0 || nota.nota > 10000) {
                listErrores.push('Horas fuera de rango (0-20)');
            }


            // Validación del instructor
            if (String(nota.instructor).trim().length === 0) {
                listErrores.push('Nombre de instructor vacío');
            }
            
            var inicio = new Date(cambiarFormatoFecha2(nota.fecha_inicio));
            var fin = new Date(cambiarFormatoFecha2(nota.fecha_fin));
            
            // Validar que la fecha de inicio no sea mayor que la fecha de fin
            if (inicio > fin) {
            listErrores.push("La fecha de inicio no puede ser mayor que la fecha de fin.");
            }
            
               // Verificación de duplicidad de DNI y cod_curso
            let existingNota = await model.findOne({
                where: {
                    dni: nota.dni,
                    cod_curso: nota.cod_curso
                }
            });

            if (existingNota) {
                listErrores.push('Ya existe un registro con el mismo DNI y código de curso');
            }
            

            if (listErrores.length > 0) {
                nota.errores = listErrores.join(', ');
                listanotasResultado.push(nota);
            } else {
                nota.fecha_inicio=cambiarFormatoFecha2(nota.fecha_inicio)
                nota.fecha_fin=cambiarFormatoFecha2(nota.fecha_fin)
                 nota.fecha_emision=cambiarFormatoFecha2(nota.fecha_emision)
                let notaInsertada = await model.create(nota, { transaction: t });
                nota.errores = 'NINGUNO';
                listanotasResultado.push(nota);
            }
        }
        await t.commit();
        return res.status(200).send(listanotasResultado);
    } catch (e) {
        await t.rollback();
        return next(e);
    }
}


async function search(req, res, next) {
    console.log(req.query); // Suponiendo que los valores de búsqueda vienen en los parámetros de consulta
    const searchValue = req.query.search;

    try {
        const results = await model.findAll({
            where: {
                [Op.or]: [
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('codigo_certificado')), {
                        [Op.like]: `%${searchValue}%`
                    }),
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('nombres')), {
                        [Op.like]: `%${searchValue}%`
                    }),
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('cod_curso')), {
                        [Op.like]: `%${searchValue}%`
                    }),
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('curso')), {
                        [Op.like]: `%${searchValue}%`
                    }),
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('dni')), {
                        [Op.like]: `%${searchValue}%`
                    })
                ]
            },
             limit: 200 // Limita los resultados a 20
        });
        
        const modifiedResults = results.map(result => {
            const resultData = result.toJSON(); // Convierte el objeto Sequelize a un objeto simple
            // Construye la URL del certificado usando el campo codigo_certificado
            resultData.certificado = `https://certificados.centrodegestion.org/certificado/?${resultData.codigo_certificado}`;
            return resultData;
        });

        return res.status(200).send(modifiedResults);
    } catch (e) {
        return next(e);
    }
}
