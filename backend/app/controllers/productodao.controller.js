const db = require("../models");

const Producto = db.Producto;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request

  if (!req.body.nombre) {
    res.status(400).send({
      message: "Debe tener nombre!",
    });

    return;
  }

  // crea un producto

  const producto = {
    nombre: req.body.nombre,
    id_categoria: req.body.id_categoria,
    precio: req.body.precio,
  };

  // Guardamos en la base de datos

  Producto.create(producto)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear un producto.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Producto.findByPk(id)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error al obtener una producto con id=" + id,
      });
    });
};
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Producto.findAll({ where: condition })

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al obtener las productos.",
      });
    });
};

exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Producto.destroy({
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

    const response = await Producto.update(
      {
        nombre: req.body.nombre,
        id_categoria: req.body.id_categoria,
        precio: req.body.precio,
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

exports.findByatrb = (req, res) => {
  const id = req.params.id;

  Producto.findAll({ where: { id_categoria: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
