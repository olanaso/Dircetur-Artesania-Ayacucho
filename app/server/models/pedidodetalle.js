const db = require('../config/db');
sequelize = db.sequelize; 
Sequelize = db.Sequelize;


module.exports = sequelize.define('pedidodetalle', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'  
    }, 
    pedido_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'pedido_id'
    },
    producto_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'producto_id'
    }, 
    preciounitario: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: 'preciounitario'
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'cantidad'
    }, 
    subtotal: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: 'subtotal'
    },

    descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'descripcion'
    },

    usuariocreacion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'usuariocreacion_id'
    },
    usuariomodificacion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'usuariomodificacion_id'
    },
    createdat: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'createdat'
    },
    updatedat: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'updatedat'
    }
}, {
    tableName: 'pedidodetalle', 
    timestamps: true
});