module.exports = (sequelize, Sequelize) => {
  const Producto = sequelize.define("Producto", {
    nombre: {
      type: Sequelize.STRING,
    },
    id_categoria: {
      type: Sequelize.BIGINT,
    },
    precio: {
      type: Sequelize.BIGINT,
    },
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return Producto;
};
