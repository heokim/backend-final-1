const db = require("../models");

const Reserva = db.Reserva;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request

  // crea una reserva

  const reserva = {
    id_restaurante: req.body.id_restaurante,
    id_mesa: req.body.id_mesa,
    fecha: req.body.fecha,
    rango: req.body.rango,
    id_cliente: req.body.id_cliente,
    cantidad: req.body.cantidad,
  };

  // Guardamos en la base de datos

  Reserva.create(reserva)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear una reserva.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Reserva.findByPk(id)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error al obtener reserva con id=" + id,
      });
    });
};
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Reserva.findAll({ where: condition })

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al obtener las reservas.",
      });
    });
};

exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Reserva.destroy({
      where: { id: id },
    })
      .then(function (data) {
        const res = {
          success: true,
          data: data,
          message: "Deleted successful",
        };
        return res;
      })
      .catch((error) => {
        const res = { success: false, error: error };
        return res;
      });
    res.json(response);
  } catch (e) {
    console.log(e);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    // if (!req.body.nombre) {
    //
    //     res.status(400).send({
    //
    //         message: "Debe tener nombre!"
    //
    //     });
    //
    //     return;
    //
    // }

    const response = await Reserva.update(
      {
        id_restaurante: req.body.id_restaurante,
        id_mesa: req.body.id_mesa,
        fecha: req.body.fecha,
        rango: req.body.rango,
        id_cliente: req.body.id_cliente,
        cantidad: req.body.cantidad,
      },
      {
        where: { id: id },
      }
    )
      .then(function (data) {
        const res = {
          success: true,
          data: data,
          message: "actualización completa",
        };
        return res;
      })
      .catch((error) => {
        const res = { success: false, error: error };
        return res;
      });
    res.json(response);
  } catch (e) {
    console.log(e);
  }
};
