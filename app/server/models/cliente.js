const db = require('../config/db');
sequelize = db.sequelize;
Sequelize = db.Sequelize;

const cliente = sequelize.define('cliente', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    nombres: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null,
        field: 'nombres',
    },
    apellidos: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null,
        field: 'apellidos',
    },
    correo: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null,
        field: 'correo',
    },
    telefono: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null,
        field: 'telefono',
    },
    direccion: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: null,
        field: 'direccion',
    },
    pais: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null,
        field: 'pais',
    },
    region: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null,
        field: 'region',
    },
    ciudad: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null,
        field: 'ciudad',
    },
    tipo_documento: {
        type: Sequelize.STRING(150),
        allowNull: true,
        defaultValue: null,
        field: 'tipo_documento',
    },
    numero_documento: {
        type: Sequelize.STRING(15),
        allowNull: true,
        defaultValue: null,
        field: 'numero_documento',
    },
    direccion_envio: {
        type: Sequelize.STRING(300),
        allowNull: true,
        defaultValue: null,
        field: 'direccion_envio',
    },
    foto_perfil: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: null,
        field: 'foto_perfil',
    },
    list_reclamos: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: null,
        field: 'list_reclamos',
        collate: 'utf8mb4_bin',
    },
    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        field: 'usuario_id'
    },
    estado: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: null,
        field: 'estado'
    },
    usuariocreacion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        field: 'usuariocreacion_id'
    },
    usuariomodificacion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        field: 'usuariomodificacion_id'
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
        field: 'createdAt'
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
        field: 'updatedAt',
        onUpdate: 'CURRENT_TIMESTAMP'
    }
}, {
    tableName: 'cliente',
    timestamps: true
});

/**
 * Funcion que  encuentra el id de un cliente por su correo
 * @param correo
 * @returns {Promise<id|null>}
 */
cliente.findIdByCorreo = async function(correo){
    clienteEncontrado = await cliente.findOne({
        where: {
            correo: correo
        }
    });
    return clienteEncontrado ? clienteEncontrado.id : null
}

/**
 * Funcion que encuentra el cliente por su id
 * @param id
 * @returns {Promise<cliente | null>}
 */
cliente.findClienteById = async function(id){
    return cliente.findOne({where: {id}})
}

/**
 * Funcion que encuentra el id de un usuario por el id de un cliente
 * @param id
 * @returns {Promise<usuario_id|null>}
 */
cliente.findUsuarioIdByClienteId = async function(id){
    usuario = await cliente.findOne({where: {id}})
    return usuario ? usuario.usuario_id : null
}

module.exports = cliente

cliente.findClienteIdByUsuarioId = async function(id){
    clienteEncontrado = await cliente.findOne({
        where: {usuario_id : id}
    })
    return clienteEncontrado ? clienteEncontrado.id : null
}
