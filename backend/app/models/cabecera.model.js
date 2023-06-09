module.exports = (sequelize, Sequelize) => {
  return sequelize.define("Cabecera", {
    id_mesa: {
      type: Sequelize.BIGINT,
    },
    id_cliente: {
      type: Sequelize.BIGINT,
    },
    estado: {
      type: Sequelize.STRING,
    },
    total: {
      type: Sequelize.STRING,
    },
    cierre: {
      type: Sequelize.DATE,
    },
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};
