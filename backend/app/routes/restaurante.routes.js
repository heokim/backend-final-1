const restaurante = require("../controllers/restaurantedao.controller.js");
module.exports = app => {

    const restaurante = require("../controllers/restaurantedao.controller.js");

    var router = require("express").Router();

    router.post("/", restaurante.create);

    router.get("/", restaurante.findAll);

    router.get("/:id", restaurante.findOne);

    router.delete("/:id", restaurante.deleteOne);

    router.put("/:id", restaurante.update);

    app.use('/api/restaurante', router);

};