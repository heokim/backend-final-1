const detalle = require("../controllers/detalledao.controller");

module.exports = (app) => {
  const producto = require("../controllers/productodao.controller");
  let router = require("express").Router();

  router.post("/", producto.create);

  router.get("/", producto.findAll);

  router.get("/:id", producto.findOne);

  router.put("/:id", producto.update);

  router.delete("/:id", producto.deleteOne);

  router.get("/categoria/:id", producto.findByatrb);

  app.use("/api/producto", router);
};
