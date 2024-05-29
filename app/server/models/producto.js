const db = require('../config/db');
sequelize = db.sequelize; 
Sequelize = db.Sequelize;


module.exports = sequelize.define('producto', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'  
    },
    login_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'login_id'
    },
    artesano_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'artesano_id'
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
        type: Sequelize.DECIMAL(6,2),
        allowNull: true,
        field: 'alto'
    },
    ancho: {
        type: Sequelize.DECIMAL(6,2),
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
        type: Sequelize.DECIMAL(6,2),
        allowNull: true,
        field: 'precio'
    },
    peso: {
        type: Sequelize.DECIMAL(6,2),
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
        type: Sequelize.DECIMAL(6,2),
        allowNull: true,
        field: 'precio_local'
    },
    precio_nacional: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: true,
        field: 'precio_nacional'
    },
    precio_extranjero: {
        type: Sequelize.DECIMAL(6,2),
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