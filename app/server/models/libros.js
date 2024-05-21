/* jshint indent: 1 */
const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports =  sequelize.define('libros', {
		id: {
			type: Sequelize.INTEGER,
			allowNull: true,
			primaryKey: true,
            autoIncrement: true,
			field: 'id'
		},
			iestp: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'iestp'
		},
		carrera: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'Carrera'
		},
		nombre_libro: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'nombre_libro'
		},
		editorial: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'editorial'
		},
		autor: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'autor'
		},
    nro_paginas: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'nro_paginas'
    },
     anio_edicion: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'anio_edicion'
    },
     tomo: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'tomo'
    },
      isbn: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'isbn'
    },
        nro_edicion: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'nro_edicion'
    },
        portada: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'portada'
    },
        url_digital: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'url_digital'
    },
        resenia: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'resenia'
    }
    ,
        resenia: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'tema'
    }
	}, {
    tableName: 'libros',

    timestamps: false,
	});

