import express from 'express';


import Sequelize from  'sequelize';
import  { DataTypes } from 'sequelize';


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


const app = express();
app.use(express.json());

// CREATE
app.post('/api/proforma', async (req, res) => {
  try {
    const proforma = await Proforma.create(req.body);
    res.json(proforma);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ
app.get('/api/proforma/:id', async (req, res) => {
  try {
    const proforma = await Proforma.findByPk(req.params.id);
    if (proforma) res.json(proforma);
    else res.status(404).json({ error: 'Proforma no encontrada' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.get('/api/proforma', async (req, res) => {
    try {
      const proforma = await Proforma.findAll(req.params.id);
      if (proforma) res.json(proforma);
      else res.status(404).json({ error: 'Proforma no encontrada' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// UPDATE
app.put('/api/proforma/:id', async (req, res) => {
  try {
    const proforma = await Proforma.findByPk(req.params.id);
    if (proforma) {
      await tienda.update(req.body);
      res.json(proforma);
    } else res.status(404).json({ error: 'Proforma no encontrada' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete('/api/proforma/:id', async (req, res) => {
  try {
    const tienda = await Proforma.findByPk(req.params.id);
    if (tienda) {
      await tienda.destroy();
      res.json({ message: 'Proforma eliminada' });
    } else res.status(404).json({ error: 'Tienda no encontrada' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('API escuchando en el puerto 3000'));
