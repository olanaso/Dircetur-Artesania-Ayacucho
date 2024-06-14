const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    usuario: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'usuario'
    }, 
    correo: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'correo'
    },
    nombre_completo: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'nombre_completo'
    }, 
    clave: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'clave'
    },
    rolid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'rolid'
    },
    tipousuario: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'tipousuario'
    },
    estado: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'estado'
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
    tableName: 'usuario',
    timestamps: true,  // Para permitir que Sequelize maneje `createdAt` y `updatedAt`
    underscored: true, // Esto asegurará que las columnas creadas automáticamente tengan nombres en formato underscore y no camelCase
});
