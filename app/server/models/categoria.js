/* jshint indent: 1 */
const db = require('../config/db');
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

const categoria = sequelize.define('categoria', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    abreviatura: {
        type: Sequelize.STRING(10),
        allowNull: true,
        field: 'abreviatura'
    },
    denominacion: {
        type: Sequelize.STRING(155),
        allowNull: true,
        field: 'denominacion'
    },
    descripcion: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'descripcion'
    },
    foto_referente: {
        type: Sequelize.STRING(155),
        allowNull: true,
        field: 'foto_referente'
    },
    usuariocreacion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'usuariocreacion_id'
    },
    usuariomodificion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'usuariomodificion_id'
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'createdAt'
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'updatedAt'
    }
}, {
    tableName: 'categoria',
    timestamps: true
});

categoria.findCategoryIdByAbreviatura = async function(abreviatura){
    const categoriaEncontrada =  await categoria.findOne({where: {abreviatura}})
    return categoriaEncontrada.id
}

categoria.findAllCategoriasId = async function(){
    //Esta opcion da un arreglo con los valores, pero en un objeto
    // const idCategorias = await categoria.findAll({attributes: ['id']})
    // return idCategorias

    //Esta opcion da un arreglo con los valores tal cual
    const categorias = await categoria.findAll()
    return categorias.map(categoria => categoria.id)
}

/**
 * metodo que encuentra todas las categorias y solo devuelve el id y la denominacion
 * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
 */
categoria.findAllIdAndDenominacion = async function(){
    const result = await categoria.findAll({
        attributes: ['id', 'denominacion']
    })
    return result
}


module.exports = categoria