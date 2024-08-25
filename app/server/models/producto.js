const db = require('../config/db');
sequelize = db.sequelize; 
Sequelize = db.Sequelize;
const categoria = require ('./categoria')
const artesano = require('./artesano')
const {Op} = require('sequelize')


const product = sequelize.define('producto', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'  
    }, 
    artesano_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'artesano_id'
    },
    categoria_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'categoria_id'
    },
    nombres_es: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'nombres_es'
    },
    nombres_eng: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'nombres_eng'
    },
    resumen_es: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'resumen_es'
    },
    resumen_eng: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'resumen_eng'
    },
    descripcion_es: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'descripcion_es'
    },
    descripcion_eng: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'descripcion_eng'
    },
    cualidades_es: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'cualidades_es'
    },
    cualidades_eng: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'cualidades_eng'
    },
    palabra_clave_es: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'palabra_clave_es'
    },
    palabra_clave_eng: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'palabra_clave_eng'
    },
    numero_piezas_es: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'numero_piezas_es'
    },
    numero_piezas_eng: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'numero_piezas_eng'
    },
    alto: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: 'alto'
    },
    ancho: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: 'ancho'
    },
    materiales_es: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'materiales_es'
    },
    materiales_eng: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'materiales_eng'
    },
    precio: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: 'precio'
    },
    peso: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: 'peso'
    },
    tecnicas_es: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'tecnicas_es'
    },
    tecnicas_eng: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'tecnicas_eng'
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'cantidad'
    },
    cantidad_minima: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'cantidad_minima'
    },
    restar_stock: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'restar_stock'
    },
    tipo_estado: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'tipo_estado'
    },
    fecha_disponible: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'fecha_disponible'
    },
 
    imagen_principal: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'imagen_principal'
    },
    lst_imagenes: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_imagenes'
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
    lst_colores: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_colores'
    },
    lst_talla: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_talla'
    },
    lst_ofertas: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_ofertas'
    },
    lst_otros_costos: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_otros_costos'
    },
    igv: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'igv'
    },
    precios_envio: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'precios_envio'
    },
    precio_local: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: 'precio_local'
    },
    precio_nacional: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: 'precio_nacional'
    },
    precio_extranjero: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: 'precio_extranjero'
    },
    tiempo_elaboracion: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'tiempo_elaboracion'
    },
    tiempo_envio: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'tiempo_envio'
    },
    preventas: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'preventas'
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
    tableName: 'producto', 
    timestamps: true
});

/**
 * Funcion para encontrar todos los productos de por el id de la categoria
 * @param categoryId
 * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
 */
product.findAllProductsByCategoryId = async function(categoryId){
    product.belongsTo(categoria, {
        foreignKey: 'categoria_id'
    })
    return await product.findAll({where:{categoria_id : categoryId}})
}
//cuando pongo las relaciones afuera de la funcion ,la funcion no se cae
//producto pertenece a artesano, la foreign key es artesano_id dentro del mismo product
product.belongsTo(artesano, {
    foreignKey: 'artesano_id',
    as: 'datos_artesano'
})

//producto pertenece a categoria, la foreign key es categoria_id dentro del mismo product
product.belongsTo(categoria, {
    foreignKey: 'categoria_id',
    as: 'categoria_producto'
})


/**
 * Funcion para encontrar todos los productos de un
 * artesano y jala datos de la tabla artesano y categoria
 * @param artesanoId : id del artesano
 * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
 */
product.findAllProductsByArtesanoId = async function(artesanoId) {
    return await product.findAll({where:{artesano_id : artesanoId},
        include: [
            //Eligiendo que atributos de los alias quiero que vaya en el response
            {
                model:artesano,
                as: 'datos_artesano',
                attributes: ['nombres']
            },
            {
                model: categoria,
                as: 'categoria_producto',
                attributes: ['denominacion']
            }
        ]
    })
}

product.findAllArtesanoIdByCategoriaId = async function(id)  {
    const artesanos = await product.findAll({where: {categoria_id : id}})
    return artesanos.map(artesano => artesano.artesano_id)
}

product.findProductoAndArtesanoByProdId = async function(id){
    const productoEncontrado = await product.findOne(
        {where: {id},
            attributes: ['nombres_es', 'artesano_id', 'lst_ofertas', 'resumen_es',
            'descripcion_es', 'cualidades_es', 'palabra_clave_es', 'numero_piezas_es',
            'alto', 'ancho', 'materiales_es', 'precio', 'tecnicas_es', 'cantidad',
            'imagen_principal', 'lst_imagenes', 'lst_colores', 'lst_ofertas', 'lst_talla',
            'lst_otros_costos', 'precio_local', 'precio_nacional', 'precio_extranjero',
            'tiempo_elaboracion' ],
            include: [
                {
                    model: artesano,
                    attributes: ['foto1', 'correo', 'celular', 'lst_mediospago', 'lst_contactos'],
                    as: 'datos_artesano'
                }
            ]
        })
    return productoEncontrado
}
/**
 * Funcion  para encontrar todos los id de artesanos y categorias por el id de la categoria
 * @param categorias = objeto
 * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
 */
product.findAllArtesanoIdAndCategoriaIdByCategorias = async function(categorias){
    const artesanosPorCategoria = await product.findAll({
        attributes: ['categoria_id', 'artesano_id'],
        where: {
            categoria_id : {
                [Op.in] : categorias.map(cat => cat.id)
            }
        }
    })
    //no retorno valores repetidos
    const uniqueArtesanosPorCategoria = artesanosPorCategoria.reduce((unique, item) => {
        return unique.some(uniqueItem => uniqueItem.categoria_id === item.categoria_id && uniqueItem.artesano_id === item.artesano_id) ? unique : [...unique, item];
    }, []);

    return uniqueArtesanosPorCategoria;
}
module.exports = product





