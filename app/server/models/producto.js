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
    LoginID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'LoginID'
    },
    ArtesanoID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'ArtesanoID'
    },
    Nombres_es: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Nombres_es'
    },
    Nombres_eng: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'Nombres_eng'
    },
    Resumen_es: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'Resumen_es'
    },
    Resumen_eng: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'Resumen_eng'
    },
    Descripcion_es: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'Descripcion_es'
    },
    Descripcion_eng: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'Descripcion_eng'
    },
    Cualidades_es: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'Cualidades_es'
    },
    Cualidades_eng: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'Cualidades_eng'
    },
    PalabraClave_es: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'PalabraClave_es'
    },
    PalabraClave_eng: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'PalabraClave_eng'
    },
    NumeroPiezas_es: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'NumeroPiezas_es'
    },
    NumeroPiezas_eng: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'NumeroPiezas_eng'
    },
    Alto: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: true,
        field: 'Alto'
    },
    Ancho: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: true,
        field: 'Ancho'
    },
    Materiales_es: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'Materiales_es'
    },
    Materiales_eng: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'Materiales_eng'
    },
    Precio: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: true,
        field: 'Precio'
    },
    Peso: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: true,
        field: 'Peso'
    },
    Tecnicas_es: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'Tecnicas_es'
    },
    Tecnicas_eng: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'Tecnicas_eng'
    },
    Cantidad: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'Cantidad'
    },
    CantidadMinima: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'CantidadMinima'
    },
    RestarStock: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'RestarStock'
    },
    TipoEstado: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'TipoEstado'
    },
    FechaDisponible: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        field: 'FechaDisponible'
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
    lst_Colores: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_Colores'
    },
    lst_Talla: {
        type: Sequelize.JSON,
        allowNull: true,
        field: 'lst_Talla'
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
    Igv: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'Igv'
    },
    Precio_local: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: true,
        field: 'Precio_local'
    },
    Precio_nacional: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: true,
        field: 'Precio_nacional'
    },
    Precio_extranjero: {
        type: Sequelize.DECIMAL(6,2),
        allowNull: true,
        field: 'Precio_extranjero'
    },
    Tiempo_elaboracion: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'Tiempo_elaboracion'
    },
    Tiempo_envio: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'Tiempo_envio'
    },
    Preventas: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'Preventas'
    },
    UsuarioCreacion: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'UsuarioCreacion'
    },
    UsuarioModificacion: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'UsuarioModificacion'
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
    tableName: 'producto', 
    timestamps: true
});