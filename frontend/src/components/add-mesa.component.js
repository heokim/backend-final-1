import React, { Component } from "react";
import MesaDataService from "../services/mesa.service";

export default class AddMesa extends Component {
    constructor(props) {
        super(props);
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeFactura = this.onChangeFactura.bind(this);
        this.onChangePos_x = this.onChangePos_x.bind(this);
        this.onChangePos_y = this.onChangePos_y.bind(this);
        this.onChangeNro_piso = this.onChangeNro_piso.bind(this);
        this.onChangeCapacidad= this.onChangeCapacidad.bind(this);



        this.saveMesa = this.saveMesa.bind(this);
        this.newMesa = this.newMesa.bind(this);

        this.state = {
            id: null,
            nombre: '',
            id_restaurante: '',
            factura: '',
            pos_x:'',
            pos_y:'',
            nro_piso: '',
            capacidad: '',

            submitted: false
        };
    }

    onChangeNombre(e) {
        this.setState({
            nombre: e.target.value
        });
    }

    onChangeFactura(e){
        this.setState({
            factura: e.target.value
        });
    }

    onChangePos_x(e){
        this.setState({
            pos_x: e.target.value
        });
    }
    onChangePos_y(e){
        this.setState({
            pos_y: e.target.value
        });
    }

    onChangeNro_piso(e){
        this.setState({
            nro_piso: e.target.value
        });
    }
    onChangeCapacidad(e){
        this.setState({
            capacidad: e.target.value
        });
    }

    saveMesa() {
        let data = {
            nombre: this.state.nombre,
            id_restaurante: this.props.match.params.id,
            factura: this.state.factura,
            pos_x:this.state.pos_x,
            pos_y:this.state.pos_y,
            nro_piso: this.state.nro_piso,
            capacidad: this.state.capacidad,

        };

        MesaDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    nombre: response.data.nombre,
                    id_restaurante: response.data.id_restaurante,
                    factura:response.data.factura,
                    pos_x:response.data.pos_x,
                    pos_y:response.data.pos_y,
                    nro_piso: response.data.nro_piso,
                    capacidad:response.data.capacidad,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newMesa() {
        this.setState({
            id: null,
            nombre: '',
            id_restaurante: '',
            factura: '',
            pos_x:'',
            pos_y:'',
            nro_piso: '',
            capacidad: '',

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Creado con exito!</h4>
                        <button className="btn btn-success" onClick={this.newMesa}>
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
                            <label htmlFor="title">Factura</label>
                            <input
                                type="text"
                                className="form-control"
                                id="factura"
                                required
                                value={this.state.factura}
                                onChange={this.onChangeFactura}
                                name="factura"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Posicion X</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pos_x"
                                required
                                value={this.state.pos_x}
                                onChange={this.onChangePos_x}
                                name="pos_x"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Posicion Y</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pos_y"
                                required
                                value={this.state.pos_y}
                                onChange={this.onChangePos_y}
                                name="pos_y"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Nro Piso</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nro_piso"
                                required
                                value={this.state.nro_piso}
                                onChange={this.onChangeNro_piso}
                                name="nro_piso"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Capacidad</label>
                            <input
                                type="text"
                                className="form-control"
                                id="capacidad"
                                required
                                value={this.state.capacidad}
                                onChange={this.onChangeCapacidad}
                                name="capacidad"
                            />
                        </div>



                        <button onClick={this.saveMesa} className="btn btn-success">
                            Guardar
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
