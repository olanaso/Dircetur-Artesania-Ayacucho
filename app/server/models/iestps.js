const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('iestps', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    nombre: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'nombre'
    },
    direccion: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'direccion'
    },
    ruc: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'ruc'
    },
    paginaweb: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'paginaweb'
    },
    telefonos: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'telefonos'
    },
    departamento: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'departamento'
    },
    provincia: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'provincia'
    },
    distrito: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'distrito'
    },
    fechainivigencia: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'fechainivigencia'
    },
    fechafinvigencia: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'fechafinvigencia'
    },
    logourl: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'logourl'
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'createdat'
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'updatedat'
    }
}, {
    tableName: 'iestps',
    timestamps: true,  // Para permitir que Sequelize maneje `createdAt` y `updatedAt`
    underscored: true, // Esto asegurará que las columnas creadas automáticamente tengan nombres en formato underscore y no camelCase
});
