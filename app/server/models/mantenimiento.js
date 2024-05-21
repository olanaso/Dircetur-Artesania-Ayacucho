/* jshint indent: 1 */
const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports =  sequelize.define('mantenimiento', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        codigo: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'codigo'
        },
        tipomantenimiento: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'tipomantenimiento'
        },
        equipo: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'tipomantenimiento'
        },
        prioridad: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'prioridad'
        },
        tipoequipamiento: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'tipoequipamiento'
        },
        modalidadejecucion: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'modalidadejecucion'
        },
        ejecutormantenimiento: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'ejecutormantenimiento'
        },
        serviciohospitalario: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'serviciohospitalario'
        },
        ubicacionfisica: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'ubicacionfisica'
        },
        idequipo: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'idequipo'
        },
        marca: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'marca'
        },
        modelo: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'modelo'
        },
        serie: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'serie'
        },
        codigopatrimonial: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'codigopatrimonial'
        },
        estadoinicial: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'estadoinicial'
        },
        tipofalla: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'tipofalla'
        },
        descripcionfalla: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'descripcionfalla'
        },
        diagnostico: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'diagnostico'
        },
        actividadesejecutadas: {
            type: Sequelize.JSONB,
            allowNull: true,
            field: 'actividadesejecutadas'
        },
        estadofinal: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'estadofinal'
        },
        garantiaMeses: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'garantia_meses'
        },
        repuestosutilizados: {
            type: Sequelize.JSONB,
            allowNull: true,
            field: 'repuestosutilizados'
        },
        origenadquisiscion: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'origenadquisiscion'
        },
        personales: {
            type: Sequelize.JSONB,
            allowNull: true,
            field: 'personales'
        },
        observaciones: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'observaciones'
        },
        personaregistra: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'personaregistra'
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'createdAt'
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'updatedAt'
        },
        finalizado: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'finalizado'
        },
        anulado: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
            field: 'anulado'
        },
        fechafinalizacion: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'fechafinalizacion'
        },
        fechainicio: {
            type: Sequelize.DATE,
            allowNull: true,
            field: 'fechainicio'
        },
        personafinaliza: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'personafinaliza'
        },
        idproveedormantenimiento: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'idproveedormantenimiento'
        },
        idorigenmantenimiento: {
            type: Sequelize.INTEGER,
            allowNull: true,
            field: 'idorigenmantenimiento'
        }
    }, {
        tableName: 'mantenimiento',
        schema: 'public'
    }
	);

