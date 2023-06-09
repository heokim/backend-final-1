module.exports = (sequelize, Sequelize) => {
  const Reserva = sequelize.define("Reserva", {
    id_restaurante: {
      type: Sequelize.BIGINT,
      // }
    },
    id_mesa: {
      type: Sequelize.BIGINT,
    },
    fecha: {
      type: Sequelize.DATE,
    },
    rango: {
      type: Sequelize.STRING,
    },
    id_cliente: {
      type: Sequelize.BIGINT,
    },
    cantidad: {
      type: Sequelize.BIGINT,
    },
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return Reserva;
};
