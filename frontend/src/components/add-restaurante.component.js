import React, { Component } from "react";
import RestauranteDataService from "../services/restaurante.service";

export default class AddRestaurante extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeDireccion = this.onChangeDireccion.bind(this);
    this.saveRestaurante = this.saveRestaurante.bind(this);
    this.newRestaurante = this.newRestaurante.bind(this);

    this.state = {
      id: null,
      nombre: "",
      Direccion: "",

      submitted: false
    };
  }

  onChangeNombre(e) {
    this.setState({
      nombre: e.target.value
    });
  }

  onChangeDireccion(e) {
    this.setState({
      direccion: e.target.value
    });
  }

  saveRestaurante() {
    let data = {
      nombre: this.state.nombre,
      direccion: this.state.direccion
    };

    RestauranteDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nombre: response.data.nombre,
          direccion: response.data.direccion,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newRestaurante() {
    this.setState({
      id: null,
      nombre: "",
      direccion: "",


      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Creado con exito!</h4>
            <button className="btn btn-success" onClick={this.newRestaurante}>
              Agregar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                required
                value={this.state.nombre}
                onChange={this.onChangeNombre}
                name="nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Direccion</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.direccion}
                onChange={this.onChangeDireccion}
                name="direccion"
              />
            </div>

            <button onClick={this.saveRestaurante} className="btn btn-success">
              Guardar
            </button>
          </div>
        )}
      </div>
    );
  }
}
