const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

// Conexión usando variables de entorno pasadas por Docker Composer
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432,
});

app.get('/api/datos', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      mensaje: "¡Conexión exitosa desde el Backend exisoto666565!",
      db_time: result.rows[0].now
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8010;
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});   