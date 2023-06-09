module.exports = (sequelize, Sequelize) => {
  return sequelize.define("Mesa", {
    nombre: {
      type: Sequelize.STRING,
    },
    id_restaurante: {
      type: Sequelize.BIGINT,
      foreignKey: true,
    },
    factura: {
      type: Sequelize.STRING,
    },
    pos_x: {
      type: Sequelize.BIGINT,
    },
    pos_y: {
      type: Sequelize.BIGINT,
    },
    nro_piso: {
      type: Sequelize.BIGINT,
    },
    capacidad: {
      type: Sequelize.BIGINT,
    },
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};
