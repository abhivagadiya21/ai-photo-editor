const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Picsart_register',
  password: 'Abhi1234@',
  port: 5432,
});

module.exports = pool;
