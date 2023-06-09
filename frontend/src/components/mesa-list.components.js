import React, { Component } from "react";
import MesaDataService from "../services/mesa.service";
import { Link } from "react-router-dom";

export default class MesasList extends Component {
  constructor(props) {
    super(props);

    this.retrieveMesas = this.retrieveMesas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMesa = this.setActiveMesa.bind(this);
    this.removeAllMesas = this.removeAllMesas.bind(this);

    this.state = {
      mesas: [],
      currentMesa: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveMesas();
  }

  retrieveMesas() {
    MesaDataService.getByAtr(this.props.match.params.id)
      .then((response) => {
        this.setState({
          mesas: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMesas();
    this.setState({
      currentMesa: null,
      currentIndex: -1,
    });
  }

  setActiveMesa(mesa, index) {
    this.setState({
      currentMesa: mesa,
      currentIndex: index,
    });
  }

  removeAllMesas() {
    MesaDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { mesas, currentMesa, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8"></div>
        <div className="col-md-6">
          <h4>Mesas</h4>

          <ul className="list-group">
            {mesas &&
              mesas.map((mesa, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveMesa(mesa, index)}
                  key={index}
                >
                  {mesa.nombre}
                </li>
              ))}
          </ul>

          <Link to={"mesa/add/"} className="m-1 badge badge-info">
            Agregar
          </Link>
        </div>
        <div className="col-md-6">
          {currentMesa ? (
            <div>
              <h4>Mesa</h4>
              <div>
                <label>
                  <strong>Nombre:</strong>
                </label>{" "}
                {currentMesa.nombre}
              </div>
              <div>
                <label>
                  <strong>Factura:</strong>
                </label>{" "}
                {currentMesa.factura}
              </div>
              <div>
                <label>
                  <strong>Nro Piso:</strong>
                </label>{" "}
                {currentMesa.nro_piso}
              </div>
              <div>
                <label>
                  <strong>Capacidad:</strong>
                </label>{" "}
                {currentMesa.capacidad}
              </div>

              <Link
                to={"mesas/" + currentMesa.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Selecciona un Mesa...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
