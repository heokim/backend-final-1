import React, {Component} from "react";
import ReservaDataService from "../services/reserva.service";
import {Link} from "react-router-dom";

export default class ReservasList extends Component {
    constructor(props) {
        super(props);

        this.retrieveReservas = this.retrieveReservas.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveReserva = this.setActiveReserva.bind(this);
        this.removeAllReservas = this.removeAllReservas.bind(this);


        this.state = {
            reservas: [],
            currentReserva: null,
            currentIndex: -1,

        };
    }

    componentDidMount() {
        this.retrieveReservas();
    }


    retrieveReservas() {
        ReservaDataService.getAll()
            .then(response => {
                this.setState({
                    reservas: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveReservas();
        this.setState({
            currentReserva: null,
            currentIndex: -1
        });
    }

    setActiveReserva(reserva, index) {
        this.setState({
            currentReserva: reserva,
            currentIndex: index
        });
    }

    removeAllReservas() {
        ReservaDataService.deleteAll()
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
            currentReserva: null,
            currentIndex: -1
        });

        ReservaDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    reservas: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {reservas, currentReserva, currentIndex} = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">

                    <Link
                        to={"/reserva/add"}
                        className="m-1 btn btn-info"
                    >
                        Agregar Reserva
                    </Link>
                </div>
                <div className="col-md-6">
                    <h4>Lista de Reservas</h4>

                    {/*<ul className="list-group">*/}
                    {/*    {reservas &&*/}
                    {/*        reservas.map((reserva, index) => (*/}
                    {/*            <li*/}
                    {/*                className={*/}
                    {/*                    "list-group-item " +*/}
                    {/*                    (index === currentIndex ? "active" : "")*/}
                    {/*                }*/}
                    {/*                onClick={() => this.setActiveReserva(reserva, index)}*/}
                    {/*                key={index}*/}
                    {/*            >*/}
                    {/*                {reserva.id_restaurante}*/}
                    {/*            </li>*/}
                    {/*        ))}*/}
                    {/*</ul>*/}


                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Restaurante</th>
                            <th>Mesa</th>
                            <th>Fecha</th>
                            <th>Horario</th>
                            <th>Cliente</th>
                            <th>Cantidad</th>
                            <th>Opcion</th>


                        </tr>
                        </thead>
                        <tbody>
                        {reservas.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <th>{item.id_restaurante}</th>
                                    <th>{item.id_mesa}</th>
                                    <th>{item.fecha}</th>
                                    <th>{item.rango}</th>
                                    <th>{item.id_cliente}</th>
                                    <th>{item.cantidad}</th>
                                    <th>


                                        <Link
                                            to={"/reserva/add"}
                                            className="m-1 badge badge-danger"
                                        >
                                            Eliminar
                                        </Link>

                                    </th>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>


                </div>

            </div>
        );
    }
}
