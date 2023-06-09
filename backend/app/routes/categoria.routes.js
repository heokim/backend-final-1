const categoria = require("../controllers/categoriadao.controller");

module.exports = (app) => {
  const categoria = require("../controllers/categoriadao.controller");
  let router = require("express").Router();

  router.post("/", categoria.create);

  router.put("/:id", categoria.update);

  router.get("/", categoria.findAll);

  router.get("/:id", categoria.findOne);

  router.delete("/:id", categoria.deleteOne);

  app.use("/api/categoria", router);
};
