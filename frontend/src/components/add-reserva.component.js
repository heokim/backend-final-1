import React, {Component,useEffect} from "react";


import ReservaDataService from "../services/reserva.service";

import RestaurantesList from "./restaurante-list.component";
import RestauranteDataService from "../services/restaurante.service";
import {Link} from "react-router-dom";

export default class AddReserva extends Component {
    constructor(props) {
        super(props);
        this.onChangeFecha = this.onChangeFecha.bind(this);
        this.onChangeRango = this.onChangeRango.bind(this);
        this.onChangeRestaurante = this.onChangeRestaurante.bind(this);

        this.saveReserva = this.saveReserva.bind(this);
        this.newReserva = this.newReserva.bind(this);

        this.retrieveRestaurantes = this.retrieveRestaurantes.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.state = {
            restaurantes: [],
            id: null,
            id_restaurante: null,
            id_mesa: null,
            fecha: "",
            id_cliente: null,
            cantidad: 0,
            rango: {
                h1: false,
                h2: false,
                h3: false,
                h4: false,
                h5: false,
                h6: false,
                h7: false
            },
            horarios: {
                h1: "12 a 13",
                h2: "13 a 14",
                h3: "14 a 15",
                h4: "19 a 20",
                h5: "20 a 21",
                h6: "21 a 22",
                h7: "22 a 23"

            },

            submitted: false,
            selected_res: false,
            selected_fecha: false,
            selected_rango: false,
            is: false

        };


    }


    onChangeRestaurante(e) {
        console.log("id_Ressss " + e.target.value)
        this.setState({
            id_restaurante: e.target.value,
            selected_res: true,
            is: this.state.selected_res && this.state.selected_fecha && this.state.selected_rango
        })

    }

    onChangeFecha(e) {
        console.log("id_Fecha: " + e.target.value);
        this.setState({
            fecha: e.target.value,
            selected_fecha: true,
            is: this.state.selected_res && this.state.selected_fecha && this.state.selected_rango,


        });

    }

    onChangeRango(e) {
        let {name, checked} = e.target;
        const rango = this.state.rango;
        rango[name] = checked;
        this.setState({
            rango,
            selected_rango: true,

            is: this.state.selected_res & this.state.selected_fecha & this.state.selected_rango
        });

        console.log("ssd:" + this.state.is)
    }

    onChangeParams() {
        this.setState({
            is: this.state.selected_res & this.state.selected_fecha & this.state.selected_rango
        });
    }

    saveReserva() {
        console.log("is: " + this.state.is);
        console.log("res: " + this.state.selected_res);
        console.log("fec: " + this.state.selected_fecha);
        console.log("rang: " + this.state.selected_rango);

        this.setState({
            is: this.state.selected_res & this.state.selected_fecha & this.state.selected_rango
        });
        let seletedHours = Object.keys(this.state.rango);
        console.log(seletedHours);
        /*Crear X reserva si hay más de un rango seleccionado*/

        // for (let i = 0; i < seletedHours.length; i++) {
        //     let val = seletedHours[i]; //nombre de la clave
        //     let horario = this.state.horarios[val];
        //     let select = this.state.rango[seletedHours[i]]; // Está seleccionado o no
        //
        //
        //     if (select) {
        //         let data = {
        //             id_restaurante: this.state.id_restaurante,
        //             id_mesa: this.state.id_mesa,
        //             fecha: this.state.fecha,
        //             rango: horario,
        //             id_cliente: this.state.id_cliente,
        //             cantidad: this.state.cantidad,
        //
        //             submitted: true
        //         };
        //         console.log(data)
        //
        //         ReservaDataService.create(data)
        //             .then(response => {
        //                 this.setState({
        //                     id_restaurante: response.data.id_restaurante,
        //                     id_mesa: response.data.id_mesa,
        //                     fecha: response.data.fecha,
        //                     rango: response.data.rango,
        //                     id_cliente: response.data.id_cliente,
        //                     cantidad: response.data.cantidad,
        //
        //                     submitted: true
        //                 });
        //                 console.log(response.data);
        //             })
        //             .catch(e => {
        //                 console.log(e);
        //             });
        //
        //     }
        //
        // }


    }

    newReserva() {
        this.setState({
            restaurantes: [],
            id: null,
            id_restaurante: "",
            id_mesa: "",
            fecha: "",
            rango: [],
            id_cliente: "",
            cantidad: "",

            submitted: false,
            selected: false
        });
    }


    /*Obtener los restaurantes*/

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

    componentDidMount() {
        this.retrieveRestaurantes();
        this.onChangeParams();


    }

    render() {

        return (


            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Creado con exito!</h4>
                        <button className="btn btn-success" onClick={this.newReserva}>
                            Agregar Nueva Reserva
                        </button>
                    </div>
                ) : (
                    <div>
                        <div>{this.state.is} </div>
                        <div className="form-group">
                            <label htmlFor="restaurante">Restaurantes</label>
                            <select className="form-control" id="restaurante" name="restaurante"
                                    onChange={this.onChangeRestaurante}>
                                {this.state.restaurantes.map((item, index) => {
                                    return (
                                        <option value={item.id}>{item.nombre}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Fecha</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fecha"
                                required
                                value={this.state.fecha}
                                onChange={this.onChangeFecha}
                                name="fecha"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="rango">Horarios</label><br/>


                            <input type="checkbox" id="h1" name="h1" className="form-check-inline"
                                   onChange={this.onChangeRango}/>
                            <label htmlFor="h1" className="form-label">12 a 13 hs </label><br/>

                            <input type="checkbox" id="h2" name="h2" className="form-check-inline"
                                   onChange={this.onChangeRango}/>
                            <label htmlFor="h2" className="form-label">13 a 14 hs </label><br/>

                            <input type="checkbox" id="h3" name="h3" className="form-check-inline"
                                   onChange={this.onChangeRango}/>
                            <label htmlFor="h3" className="form-label">14 a 15 hs </label><br/>

                            <input type="checkbox" id="h4" name="h4" className="form-check-inline"
                                   onChange={this.onChangeRango}/>
                            <label htmlFor="h4" className="form-label">19 a 20 hs </label><br/>

                            <input type="checkbox" id="h5" name="h5" className="form-check-inline"
                                   onChange={this.onChangeRango}/>
                            <label htmlFor="h5" className="form-label">20 a 21 hs </label><br/>

                            <input type="checkbox" id="h6" name="h6" className="form-check-inline"
                                   onChange={this.onChangeRango}/>
                            <label htmlFor="h6" className="form-label">21 a 22 hs </label><br/>

                            <input type="checkbox" id="h7" name="h7" className="form-check-inline"
                                   onChange={this.onChangeRango}/>
                            <label htmlFor="h7" className="form-label">22 a 23 hs </label><br/>


                        </div>

                        <button onClick={this.saveReserva} className="btn btn-success">
                            Guardar
                        </button>
                    </div>
                )}


            </div>
        );
    }
}
