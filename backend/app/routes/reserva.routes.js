
module.exports = app => {

    const reserva = require("../controllers/reservadao.controllers.js");

    var router = require("express").Router();

    router.post("/", reserva.create);

    router.get("/", reserva.findAll);

    router.get("/:id", reserva.findOne);

    router.delete("/:id", reserva.deleteOne);

    router.put("/:id", reserva.update);

    app.use('/api/reserva', router);

};