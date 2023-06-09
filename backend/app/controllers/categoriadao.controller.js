const db = require("../models");

const Categoria = db.Categoria;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request

  if (!req.body.nombre) {
    res.status(400).send({
      message: "Debe tener nombre!",
    });

    return;
  }

  // crea una categoria

  const categoria = {
    nombre: req.body.nombre,
  };

  // Guardamos en la base de datos

  Categoria.create(categoria)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear una categoria.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Categoria.findByPk(id)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error al obtener una categoria con id=" + id,
      });
    });
};
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  let condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Categoria.findAll({ where: condition })

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al obtener las categorias.",
      });
    });
};

exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Categoria.destroy({
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

    const response = await Categoria.update(
      {
        nombre: req.body.nombre,
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
