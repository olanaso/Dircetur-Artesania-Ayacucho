/* jshint indent: 1 */
const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize
const categoria = require('./categoria')
const {Op} = require('sequelize')

const artesano = sequelize.define('artesano', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    usuario_id: { 
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'usuario_id'
    },
    dni: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'dni'
    },
    ruc: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'ruc'
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
    correo: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'correo'
    },
    celular: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'celular'
    },
    telefonos: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'telefonos'
    },
    foto1: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'foto1'
    },
    foto2: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'foto2'
    },
    ubigeo: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'ubigeo'
    },
    lugar_nacimiento: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'lugar_nacimiento'
    }, 
    lengua_materna: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'lengua_materna'
    },
    lst_taller: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_taller',
    }, 
    lst_especialidadtecnicas: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_especialidadtecnicas',
    },
    lst_contactos: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_contactos',
    },
    lst_mediospago: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_mediospago',
    },
    lst_reconocimientos: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_reconocimientos',
    }, 
    lst_videos: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_videos'
    },
    lst_videoenlace: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_videoenlace'
    }, 
    estado: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'estado'
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
    tableName: 'artesano',
    timestamps: true

});

/**
 * Obtener todos los artesanos por ids de un arreglo
 * @params ids = arreglo
 */
artesano.findArtesanosByIds = async function (ids){
    return await artesano.findAll({
        where: {
            id: {
                [Op.in] : ids
            }
        },
        attributes: ['id', 'nombres', 'foto1', 'foto2']
    })
}

artesano.findArtesanoByUserId = async function(id) {
    return await artesano.findOne({where: {usuario_id: id}})
}





module.exports = artesano
