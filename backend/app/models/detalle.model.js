module.exports = (sequelize, Sequelize) => {
  return sequelize.define("Detalle", {
    id_producto: {
      type: Sequelize.BIGINT,
    },
    cantidad: {
      type: Sequelize.BIGINT,
    },
    id_cabecera: {
      type: Sequelize.BIGINT,
    },
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};
