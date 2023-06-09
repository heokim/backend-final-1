import React, { Component } from "react";

import { Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddRestaurante from "./components/add-restaurante.component";
import Restaurante from "./components/restaurante.component";
import RestaurantesList from "./components/restaurante-list.component";

import Mesa from "./components/mesa.component";
import AddMesa from "./components/add-mesa.component";
import MesasList from "./components/mesa-list.components";

import AddreservaForm from "./components/add_reserva.component";

import AddCliente from "./components/add-cliente.component";
import ReservaComponent from "./components/reserva.component";

import ConsumoComponent from "./components/consumo.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            INICIO
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item float-end">
              <Link to={"/restaurantes"} className="nav-link">
                Restaurantes
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/restaurantes" component={RestaurantesList} />
            <Route exact path="/restaurante/add" component={AddRestaurante} />
            <Route exact path="/restaurante/:id" component={Restaurante} />

            <Route exact path="/restaurantes/:id/mesas/:id" component={Mesa} />
            <Route
              exact
              path="/restaurantes/:id/mesa/add/"
              component={AddMesa}
            />
            <Route exact path="/restaurantes/:id/mesas" component={MesasList} />

            <Route exact path="/" component={ReservaComponent} />
            <Route exact path="/reserva/add/" component={AddreservaForm} />
            <Route exact path="/cliente/add/" component={AddCliente} />
            <Route
              exact
              path="/consumo/:id_reserva/"
              component={ConsumoComponent}
            />
            {/*<Route exact path="/reserva/:id/" component={ReservasList} />*/}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
