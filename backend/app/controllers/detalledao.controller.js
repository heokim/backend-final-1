const db = require("../models");

const Detalle = db.Detalle;
const Producto = db.Producto;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request

  // crea una detalle

  const detalle = {
    id_producto: req.body.id_producto,
    cantidad: req.body.cantidad,
    id_cabecera: req.body.id_cabecera,
  };

  // Guardamos en la base de datos

  Detalle.create(detalle)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear una detalle.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Detalle.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al obtener una detalle con id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;
  Detalle.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al obtener las detalles.",
      });
    });
};

exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Detalle.destroy({
      where: { id_cabecera: id },
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
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Detalle.destroy({
      where: { id: id },
    })
      .then(function (data) {
        return { success: true, data: data, message: "Deleted successful" };
      })
      .catch((error) => {
        return { success: false, error: error };
      });
    res.json(response);
  } catch (e) {
    console.log(e);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Detalle.update(
      {
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

exports.findByatrb = (req, res) => {
  const id = req.params.id;

  Detalle.findAll({ where: { id_cabecera: id } })
    .then(async (data) => {
      if (data) {
        for (let i = 0; i < data.length; i++) {
          let prod = await Producto.findByPk(data[i].id_producto);
          console.log("Detalles:ddfs", data[i]);
          // data[i]=Object.assign(data[i],{id_detalle:data[i].id})

          data[i] = Object.assign(prod?.["dataValues"], data[i].dataValues);
          const total = data[i].precio * data[i].cantidad;
          let t = {
            total: total,
          };
          data[i] = Object.assign(data[i], t);
        }
        let suma = 0;
        for (let i = 0; i < data.length; i++) {
          suma += data[i].total;
        }
        let s = {
          suma: suma,
        };
        data[0] = Object.assign(data[0], s);
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
