const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('ubigeo', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    ubigeo: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'ubigeo'
    }, 
    iddepartamento: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'iddepartamento'
    }, 
    departamento: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'departamento'
    }, 
    idprovincia: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'idprovincia'
    }, 
    provincia: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'provincia'
    }, 
    distrito: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'distrito'
    }
}, {
    tableName: 'ubigeo',
    timestamps: true
});
