import React, {Component} from "react";
import RestauranteDataService from "../services/restaurante.service";
import {Link} from "react-router-dom";

export default class RestaurantesList extends Component {
    constructor(props) {
        super(props);

        this.retrieveRestaurantes = this.retrieveRestaurantes.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveRestaurante = this.setActiveRestaurante.bind(this);
        this.removeAllRestaurantes = this.removeAllRestaurantes.bind(this);


        this.state = {
            restaurantes: [],
            currentRestaurante: null,
            currentIndex: -1,

        };
    }

    componentDidMount() {
        this.retrieveRestaurantes();
    }


    retrieveRestaurantes() {
        RestauranteDataService.getAll()
            .then(response => {
                this.setState({
                    restaurantes: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveRestaurantes();
        this.setState({
            currentRestaurante: null,
            currentIndex: -1
        });
    }

    setActiveRestaurante(restaurante, index) {
        this.setState({
            currentRestaurante: restaurante,
            currentIndex: index
        });
    }

    removeAllRestaurantes() {
        RestauranteDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        this.setState({
            currentRestaurante: null,
            currentIndex: -1
        });

        RestauranteDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    restaurantes: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {restaurantes, currentRestaurante, currentIndex} = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <Link
                        to={"/restaurante/add"}
                        className="m-1 btn btn-info"
                    >
                        Agregar Restaurante
                    </Link>
                </div>
                <div className="col-md-6">
                    <h4>Restaurantes</h4>

                    <ul className="list-group">
                        {restaurantes &&
                            restaurantes.map((restaurante, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveRestaurante(restaurante, index)}
                                    key={index}
                                >
                                    {restaurante.nombre}
                                </li>
                            ))}
                    </ul>


                </div>
                <div className="col-md-6">
                    {currentRestaurante ? (
                        <div>
                            <h4>Restaurante</h4>
                            <div>
                                <label>
                                    <strong>Nombre:</strong>
                                </label>{" "}
                                {currentRestaurante.nombre}
                            </div>
                            <div>
                                <label>
                                    <strong>Direccion:</strong>
                                </label>{" "}
                                {currentRestaurante.direccion}
                            </div>


                            <Link
                                to={"/restaurante/" + currentRestaurante.id}
                                className="badge badge-warning"
                            >
                                Editar
                            </Link>






                            <Link
                                to={`restaurantes/${currentRestaurante.id}/mesas`}
                                className="m-1 badge badge-primary"
                            >
                                Mesas
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Selecciona un Restaurante...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
