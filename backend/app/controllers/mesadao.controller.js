const db = require("../models");

const Mesa = db.Mesa;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request

  if (!req.body.nombre) {
    res.status(400).send({
      message: "Debe tener nombre!",
    });

    return;
  }

  // crea una mesa

  const mesa = {
    nombre: req.body.nombre,
    id_restaurante: req.body.id_restaurante,
    factura: req.body.factura,
    pos_x: req.body.pos_x,
    pos_y: req.body.pos_y,
    nro_piso: req.body.nro_piso,
    capacidad: req.body.capacidad,
  };

  // Guardamos en la base de datos

  Mesa.create(mesa)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear una mesa.",
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;

  Mesa.findByPk(id)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: "Error al obtener mesa con id=" + id,
      });
    });
};
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Mesa.findAll({ where: condition })

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al obtener las mesas.",
      });
    });
};

exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Mesa.destroy({
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

    const response = await Mesa.update(
      {
        nombre: req.body.nombre,
        id_restaurante: req.body.id_restaurante,
        factura: req.body.factura,
        pos_x: req.body.pos_x,
        pos_y: req.body.pos_y,
        nro_piso: req.body.nro_piso,
        capacidad: req.body.capacidad,
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
  Mesa.findAll({ where: { id_restaurante: id } })
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
