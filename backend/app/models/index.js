const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.Ventas = require("./venta.model.js")(sequelize, Sequelize);
db.Restaurante = require("./restaurante.model")(sequelize, Sequelize);
db.Cliente = require("./cliente.model")(sequelize, Sequelize);
db.Mesa = require("./mesa.model")(sequelize, Sequelize);
db.Reserva = require("./reserva.model")(sequelize, Sequelize);
db.Categoria = require("./categoria.model")(sequelize, Sequelize);
db.Producto = require("./producto.model")(sequelize, Sequelize);
db.Cabecera = require("./cabecera.model")(sequelize, Sequelize);
db.Detalle = require("./detalle.model")(sequelize, Sequelize);

module.exports = db;
