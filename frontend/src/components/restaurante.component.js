import React, { Component } from "react";
import RestauranteDataService from "../services/restaurante.service";
import {Link} from "react-router-dom";

export default class Restaurante extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeDireccion = this.onChangeDireccion.bind(this);
    this.getRestaurante = this.getRestaurante.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateRestaurante = this.updateRestaurante.bind(this);
    this.deleteRestaurante = this.deleteRestaurante.bind(this);

    this.state = {
      currentRestaurante: {
        id: null,
        nombre: "",
        direccion: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getRestaurante(this.props.match.params.id);
  }

  onChangeNombre(e) {
    const nombre = e.target.value;

    this.setState(function(prevState) {
      return {
        currentRestaurante: {
          ...prevState.currentRestaurante,
          nombre: nombre
        }
      };
    });
  }

  onChangeDireccion(e) {
    const direccion = e.target.value;

    this.setState(prevState => ({
      currentRestaurante: {
        ...prevState.currentRestaurante,
        direccion: direccion
      }
    }));
  }

  getRestaurante(id) {
    RestauranteDataService.get(id)
      .then(response => {
        this.setState({
          currentRestaurante: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentRestaurante.id,
      nombre: this.state.currentRestaurante.nombre,
      direccion: this.state.currentRestaurante.direccion,

    };

    RestauranteDataService.update(this.state.currentRestaurante.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentRestaurante: {
            ...prevState.currentRestaurante,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateRestaurante() {
    RestauranteDataService.update(
      this.state.currentRestaurante.id,
      this.state.currentRestaurante
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Actualizacion completa!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteRestaurante() {
    RestauranteDataService.delete(this.state.currentRestaurante.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/restaurante')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentRestaurante } = this.state;

    return (
      <div>
        {currentRestaurante ? (
          <div className="edit-form">
            <h4>Restaurantes</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={currentRestaurante.nombre}
                  onChange={this.onChangeNombre}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Direccion</label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  value={currentRestaurante.direccion}
                  onChange={this.onChangeDireccion}
                />
              </div>

            </form>



            <button
              className="btn btn-danger  mr-2"
              onClick={this.deleteRestaurante}
            >
              Eliminar
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updateRestaurante}
            >
              Actualizar
            </button>
            <p>{this.state.message}</p>

            <Link
                to={"/restaurante/"}
                className="btn btn-warning"
            >
              Volver
            </Link>
          </div>

        ) : (
          <div>
            <br />
            <p>Please click on a Restaurante...</p>
          </div>
        )}
      </div>
    );
  }
}
