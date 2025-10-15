import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: process.env.PGDATABASE || 'pern',
  username: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || '12345',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test connection automatically when module loads
(async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(-1);
  }
})();

export default sequelize;
