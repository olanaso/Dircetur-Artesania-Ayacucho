const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('libro', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    titulo: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'titulo'
    },
    autores: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'autores'
    },
    editorial: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'editorial'
    },
    nropaginas: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'nropaginas'
    },
    anioedicion: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'anioedicion'
    },
    tomo: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'tomo'
    },
    isbn: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'isbn'
    },
    url_portada: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'url_portada'
    },
    url_digital: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'url_digital'
    },
    resenia: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'resenia'
    },
    temas: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'temas'
    },
    idlibro: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'idlibro'
    },
    ciudad: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'ciudad'
    },
    ref_apa7: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'ref_apa7'
    },
    ref_ieee: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'ref_ieee'
    },
    ref_vancuver: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'ref_vancuver'
    },
    ref_iso: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'ref_iso'
    },
    googleid: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'googleid'
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
    tableName: 'libro',
    timestamps: true,  // Para permitir que Sequelize maneje `createdAt` y `updatedAt`
    underscored: true, // Esto asegurará que las columnas creadas automáticamente tengan nombres en formato underscore y no camelCase
});
