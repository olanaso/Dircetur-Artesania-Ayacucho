const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');


const db = new Sequelize('jockey', 'postgres', 'selmira1', {
    host: '200.121.128.102',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  
  db.authenticate()
    .then(() => console.log('Conexión con la base de datos establecida con éxito.'))
    .catch(err => console.error('No se pudo conectar a la base de datos:', err));
  

const Proforma = db.define('proforma', {
  tipodocumento: Sequelize.STRING,
  nrodocumento: Sequelize.STRING,
  cliente: Sequelize.STRING,
  direccion: Sequelize.STRING,
  ubigeo: Sequelize.STRING,
  idtienda: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tienda: Sequelize.STRING,
  area: Sequelize.DECIMAL,
  frontis: Sequelize.DECIMAL,
  fondo: Sequelize.DECIMAL,
  color: Sequelize.STRING,
  fecha_inicio: Sequelize.DATE,
  fecha_fin: Sequelize.DATE,
  cantmeses: Sequelize.INTEGER,
  fecha_registro: Sequelize.DATE,
  geomjb: Sequelize.JSONB, 
  geom: {
    type: DataTypes.GEOMETRY('POLYGON', 4326),
  },
});

export default Proforma;

