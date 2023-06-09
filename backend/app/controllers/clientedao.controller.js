const db = require("../models");

const Cliente = db.Cliente;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request

  if (!req.body.nombre) {
    res.status(400).send({
      message: "Debe tener nombre!",
    });

    return;
  }

  // crea un cliente

  const cliente = {
    cedula: req.body.cedula,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
  };

  // Guardamos en la base de datos

  Cliente.create(cliente)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear un cliente.",
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cliente.findByPk(id)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error al obtener cliente con id=" + id,
      });
    });
};
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Cliente.findAll({ where: condition })

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al obtener los clientes.",
      });
    });
};
