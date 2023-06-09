
import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import {Link, useHistory} from "react-router-dom";
import GetReservas from "../helpers/GetReservas";




const Reserva_listComponent = ({
                                   reservas, setReservas, restaurantes, setRestaurantes,
                                   mesas, setMesas, clientes, setClientes
                               }) => {




    const [show, setShow] = useState(false);
    const [inRestaurnate, setInRestaurante] = useState("");
    const [inFecha, setInFecha] = useState("");
    const [inCliente, setCliente] = useState("");
    const [temp, setTemp] = useState([]);


    const columns = [
        // {dataField: 'id', text: 'Id'},

        {dataField: 'id_restaurante', text: 'Restaurante', filter: textFilter()},
        {dataField: 'id_mesa', text: 'Mesa', sort: true},
        { dataField: "id_mesa",
            text: "Consumo",
            editable: false,
            formatter: (cellContent, row) => {
                return (
                    <Link to={"/consumo/"+ row.id}
                        className="btn btn-info "
                    >
                        Ver Consumo
                    </Link>
                );
            },
        },
        {dataField: 'fecha', text: 'Fecha', sort: true, filter: textFilter()},
        {dataField: 'rango', text: 'Horario', sort: true},
        {dataField: 'id_cliente', text: 'Cliente', filter: textFilter()},
        {
            dataField: "id",
            text: "Opciones",
            editable: false,
            formatter: (cellContent, row) => {
                return (
                    <button
                        className="btn btn-danger btn-xs"
                        onClick={() => handleDelete(row.id)}
                    >
                        Eliminar
                    </button>
                );
            },
        },
    ]
    const handleDelete = (id) => {

        fetch('http://localhost:9090/api/reserva/' + id, {method: 'DELETE'})
            .then(res => res.text())
        window.location.reload(false);
        setReservas(reservas);
        console.log(id);
    }


    const loadReservas = () => {

        console.log("carga")
        GetReservas()
            .then((newReservas) => {
                setReservas(newReservas);
            });
    };

    useEffect(() => {
        loadReservas();
    }, [])
    useEffect(() => {


        return () => {

        };


    }, [show]);


    const modReserva = () => {
        setShow(true);
        console.log(reservas.length);
        console.log(restaurantes.length);

        for (let i = 0; i < reservas.length; i++) {
            for (let j = 0; j < restaurantes.length; j++) {
                if (reservas[i].id_restaurante === restaurantes[j].id) {
                    console.log("dsfsfd");
                    reservas[i].id_restaurante = restaurantes[j].nombre;
                    reservas[i].fecha = reservas[i].fecha.split('T')[0];
                    setReservas({...reservas});
                }
            }
            for (let j = 0; j < mesas.length; j++) {
                if (reservas[i].id_mesa === mesas[j].id) {
                    reservas[i].id_mesa = mesas[j].nombre;
                    setReservas({...reservas});
                }
            }
            for (let j = 0; j < clientes.length; j++) {
                if (reservas[i].id_cliente === clientes[j].id) {
                    reservas[i].id_cliente = clientes[j].nombre + " " + clientes[j].apellido;
                    setReservas({...reservas});
                }
            }

        }
        setReservas(reservas);
        // history.push("/");
        console.log(reservas);

        setTemp(reservas)
    };


    const handleChangeFecha = (e) => {
        setTemp(reservas);
        setInFecha(e.target.value);
        setTemp(filterFechas);
    }
    const handleChangeRestaurante = (e) => {
        setTemp(reservas);
        setInRestaurante(e.target.value);
        setTemp(filterRestaurantes);
    }

    const filterRestaurantes = reservas.filter(
        reserva => (
            reserva.id_restaurante.toLowerCase().includes(inRestaurnate.toLowerCase())
        )
    )
    const filterFechas = reservas.filter(
        reserva => (
            reserva.fecha.toLowerCase().includes(inFecha.toLowerCase())
        )
    )

    return (
        <div className="">
            <div className="col-16">
                {() => modReserva()}

                <input type="button" className="badge-dark btn" onClick={() => modReserva()} value="Listar Reservas"/>

                <Link
                    to={"/reserva/add"}
                    className="m-1 badge-secondary btn"
                >
                    Agregar Reserva
                </Link>
                {show &&

                    <BootstrapTable bootstrap4 keyField='id' columns={columns} data={reservas}
                                    filter={filterFactory()}/>
                }

            </div>

        </div>

    );
};
export default Reserva_listComponent;
