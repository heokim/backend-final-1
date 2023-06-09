import React, { Component } from "react";
import MesaDataService from "../services/mesa.service";
import {Link} from "react-router-dom";

export default class Mesa extends Component {
    constructor(props) {
        super(props);
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeFactura = this.onChangeFactura.bind(this);
        this.onChangePos_x = this.onChangePos_x.bind(this);
        this.onChangePos_y = this.onChangePos_y.bind(this);
        this.onChangeNro_piso = this.onChangeNro_piso.bind(this);
        this.onChangeCapacidad= this.onChangeCapacidad.bind(this);

        this.getMesa = this.getMesa.bind(this);
        this.updateMesa = this.updateMesa.bind(this);
        this.deleteMesa = this.deleteMesa.bind(this);

        this.state = {
            currentMesa: {
                id: null,
                nombre: '',
                id_restaurante: '',
                factura: '',
                pos_x:'',
                pos_y:'',
                nro_piso: '',
                capacidad: '',
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getMesa(this.props.match.params.id);
    }

    onChangeNombre(e) {
        const nombre = e.target.value;

        this.setState(function(prevState) {
            return {
                currentMesa: {
                    ...prevState.currentMesa,
                    nombre: nombre
                }
            };
        });
    }
    onChangeFactura(e){
        const factura = e.target.value;

        this.setState(function(prevState) {
            return {
                currentMesa: {
                    ...prevState.currentMesa,
                    factura: factura
                }
            };
        });
    }

    onChangePos_x(e){
        const pos_x = e.target.value;

        this.setState(function(prevState) {
            return {
                currentMesa: {
                    ...prevState.currentMesa,
                    pos_x: pos_x
                }
            };
        });
    }
    onChangePos_y(e){
        const pos_y= e.target.value;

        this.setState(function(prevState) {
            return {
                currentMesa: {
                    ...prevState.currentMesa,
                    pos_y: pos_y
                }
            };
        });
    }
    onChangeNro_piso(e){
        const nro_piso = e.target.value;

        this.setState(function(prevState) {
            return {
                currentMesa: {
                    ...prevState.currentMesa,
                    nro_piso: nro_piso
                }
            };
        });
    }
    onChangeCapacidad(e){
        const capacidad = e.target.value;

        this.setState(function(prevState) {
            return {
                currentMesa: {
                    ...prevState.currentMesa,
                    capacidad: capacidad
                }
            };
        });
    }



    getMesa(id) {
        MesaDataService.get(id)
            .then(response => {
                this.setState({
                    currentMesa: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }



    updateMesa() {
        MesaDataService.update(
            this.state.currentMesa.id,
            this.state.currentMesa
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

    deleteMesa() {
        MesaDataService.delete(this.state.currentMesa.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/mesa')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentMesa } = this.state;

        return (
            <div>
                {currentMesa ? (
                    <div className="edit-form">
                        <h4>Mesas</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    value={currentMesa.nombre}
                                    onChange={this.onChangeNombre}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="factura">Factura</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="factura"
                                    value={currentMesa.factura}
                                    onChange={this.onChangeFactura}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nro_piso">Nro Piso</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nro_piso"
                                    value={currentMesa.nro_piso}
                                    onChange={this.onChangeNro_piso}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="capacidad">Capacidad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="capacidad"
                                    value={currentMesa.capacidad}
                                    onChange={this.onChangeCapacidad}
                                />
                            </div>

                        </form>



                        <button
                            className="btn btn-danger  mr-2"
                            onClick={this.deleteMesa}
                        >
                            Eliminar
                        </button>

                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.updateMesa}
                        >
                            Actualizar
                        </button>
                        <p>{this.state.message}</p>

                        <Link
                            to={"/mesa/"}
                            className="btn btn-warning"
                        >
                            Volver
                        </Link>
                    </div>

                ) : (
                    <div>
                        <br />
                        <p>Please click on a Mesa...</p>
                    </div>
                )}
            </div>
        );
    }
}
