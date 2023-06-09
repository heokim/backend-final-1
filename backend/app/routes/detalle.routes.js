const cabecera = require("../controllers/cabeceradao.controller");
const mesa = require("../controllers/mesadao.controller");
const detalle = require("../controllers/detalledao.controller");


module.exports = app => {
    const detalle = require("../controllers/detalledao.controller");
    let router = require("express").Router();

    router.post("/", detalle.create);

    router.get("/", detalle.findAll);

    router.get("/:id", detalle.findOne);

    router.delete("/:id", detalle.deleteOne);

    router.delete("/id/:id", detalle.delete);


    router.get("/cabecera/:id", detalle.findByatrb);

    app.use('/api/detalle', router);

};