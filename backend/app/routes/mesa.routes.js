const mesa = require("../controllers/mesadao.controller");
const restaurante = require("../controllers/restaurantedao.controller");
module.exports = app => {

    const mesa = require("../controllers/mesadao.controller");

    var router = require("express").Router();

    router.post("/", mesa.create);

    router.get("/", mesa.findAll);

    router.get("/:id", mesa.findOne);

    router.delete("/:id", mesa.deleteOne);

    router.put("/:id", mesa.update);

    router.get("/:id/mesas", mesa.findByatrb);

    app.use('/api/mesa', router);

};