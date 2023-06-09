const db = require("../models");

const Restaurante = db.Restaurante;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request

  if (!req.body.nombre) {
    res.status(400).send({
      message: "Debe tener nombre!",
    });

    return;
  }

  // crea una restaurante

  const restaurante = {
    nombre: req.body.nombre,
    direccion: req.body.direccion,
  };

  // Guardamos en la base de datos

  Restaurante.create(restaurante)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error al crear una restaurante.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Restaurante.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al obtener restaurante con id=" + id,
      });
    });
};
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Restaurante.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al obtener los restaurantes.",
      });
    });
};

exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Restaurante.destroy({
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

    if (!req.body.nombre) {
      res.status(400).send({
        message: "Debe tener nombre!",
      });

      return;
    }

    const response = await Restaurante.update(
      {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
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
