/* jshint indent: 1 */
const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('equipo', {
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
            autoIncrement: true,
			field: 'id'
		},
		denominacion: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'denominacion'
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
		ubicacionfisica: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'ubicacionfisica'
		}
	}, {
		tableName: 'equipo',
		schema: 'public',
	timestamps: false,
	});
