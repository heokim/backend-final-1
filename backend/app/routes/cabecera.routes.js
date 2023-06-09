const reserva = require("../controllers/reservadao.controllers");
const mesa = require("../controllers/mesadao.controller");

module.exports = (app) => {
  const cabecera = require("../controllers/cabeceradao.controller");
  let router = require("express").Router();

  router.post("/", cabecera.create);

  router.get("/", cabecera.findAll);

  router.get("/:id", cabecera.findOne);

  router.delete("/:id", cabecera.deleteOne);

  router.get("/mesa/:id", cabecera.findByatrb);

  router.put("/:id", cabecera.update);

  app.use("/api/cabecera", router);
};
