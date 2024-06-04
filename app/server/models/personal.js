/* jshint indent: 1 */
const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports =  sequelize.define('personal', {
		id: {
			type: Sequelize.INTEGER,
			allowNull: true,
			primaryKey: true,
            autoIncrement: true,
			field: 'id'
		},
		dni: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'dni'
		},
		nombres: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'nombres'
		},
		apellidos: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'apellidos'
		},
		celular: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'celular'
		},
    cargo: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'cargo'
    },
    clave: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'clave'
    }
	}, {
    tableName: 'personal',

    timestamps: false,
	});

