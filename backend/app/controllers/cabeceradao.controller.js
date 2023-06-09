const db = require("../models");

const Cabecera = db.Cabecera;
const Reserva = db.Reserva;
const Cliente = db.Cliente;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request

  // crea una cabecera

  const cabecera = {
    id_mesa: req.body.id_mesa,
    id_cliente: req.body.id_cliente,
    estado: req.body.estado,
    total: req.body.total,
    cierre: req.body.cierre,
  };

  // Guardamos en la base de datos

  Cabecera.create(cabecera)

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ha ocurrido un error al crear una cabecera.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Cabecera.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error al obtener una cabecera con id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Cabecera.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al obtener las cabeceras.",
      });
    });
};

exports.deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Cabecera.destroy({
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
    const response = await Cabecera.update(
      {
        id_cliente: req.body.id_cliente,
        estado: req.body.estado,
        total: req.body.total,
        cierre: req.body.cierre,
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

  Reserva.findAll({ where: { id: id } })
    .then(async (data) => {
      console.log(data);
      // res.send(data[0].id_mesa);
      let cabecera = await Cabecera.findAll({
        where: { id_mesa: data[0].id_mesa },
      });
      console.log("clientasfadfsssssssssssssss");
      let cliente = await Cliente.findAll({
        where: { id: cabecera[0].id_cliente },
      });
      console.log("cluent", cabecera);
      console.log("cluent", cliente);
      data[0] = Object.assign(cliente[0].dataValues, cabecera[0].dataValues);

      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
