const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

const db = require("./app/models");

db.sequelize.sync();

// var corsOptions = {
//
//     origin: "http://localhost:9091"
//
// };

app.use(cors());

// parse requests of content-type - application/json

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({extended: true}));

// simple route

app.get("/", (req, res) => {

    res.json({message: "Bienvenido Node backend"});

});

require("./app/routes/venta.routes")(app);// set port, listen for requests
require("./app/routes/restaurante.routes")(app);// set port, listen for requests
require("./app/routes/mesa.routes")(app);// set port, listen for requests
require("./app/routes/cliente.routes")(app);// set port, listen for requests
require("./app/routes/reserva.routes")(app);// set port, listen for requests
require("./app/routes/categoria.routes")(app);// set port, listen for requests
require("./app/routes/producto.routes")(app);// set port, listen for requests
require("./app/routes/cabecera.routes")(app);// set port, listen for requests
require("./app/routes/detalle.routes")(app);// set port, listen for requests

//Relaciones
require("./app/routes/asociations");

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
    console.log('Servidor corriendo en puerto 9090.');
});