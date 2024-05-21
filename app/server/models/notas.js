const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

module.exports = sequelize.define('notas', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    dni: {
        type: Sequelize.STRING(8),
        allowNull: true,
        field: 'dni'
    },
    nombres: {
        type: Sequelize.STRING(500),
        allowNull: true,
        field: 'nombres'
    },
    cod_curso: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'cod_curso'
    },
     curso: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'curso'
    },
     ubicacion: {
        type: Sequelize.STRING(200),
        allowNull: true,
        field: 'ubicacion'
    },
    codigo_certificado: {
        type: Sequelize.STRING(36),
        allowNull: true,
        field: 'codigo_certificado'
    },
    nota: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'nota'
    },
    cant_horas: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'cant_horas'
    },
    institucion_solicitante : {
        type: Sequelize.STRING(300),
        allowNull: true,
        field: 'institucion_solicitante'
    },
     fecha_inicio: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'fecha_inicio'
    },
     fecha_emision: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'fecha_emision'
    },
    fecha_fin: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'fecha_fin'
    },
    instructor: {
        type: Sequelize.STRING(500),
        allowNull: true,
        field: 'instructor'
    },
    temario: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'temario'
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
    tableName: 'notas',
    timestamps: true,
    underscored: true
});
