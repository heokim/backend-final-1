module.exports = (sequelize, Sequelize) => {
  const Categoria = sequelize.define("Categoria", {
    nombre: {
      type: Sequelize.STRING,
    },
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return Categoria;
};
