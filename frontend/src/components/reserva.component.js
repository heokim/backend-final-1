import React, {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import axios from "axios";
import Reserva_listComponent from "./reserva_list.component";


import GetReservas from "../helpers/GetReservas";

const url = "http://localhost:9090/api/";
 const ReservaComponent = ()=> {


     const [reservas, setReservas] = useState([]);

     const [restaurantes, setRestaurantes] = useState([]);
     const [mesas, setMesas] = useState([]);
     const [clientes, setClientes] = useState([]);

     const loadReservas = () => {

         console.log("carga")
         GetReservas()
             .then((newReservas) => {
                 setReservas(newReservas);
             });
     };


     useEffect(() => {

         loadReservas();
         loadMesas()
             .then(res => console.log(res));
         loadClientes()
             .then(res => console.log(res));

         loadRestaurantes()
             .then(res => console.log(res));

         // setReservas(reservas=>reservas);
         console.log("2 - con", reservas);
         // modReserva();


     }, []);


     const loadRestaurantes = async () => {
         // fetch(url + 'reserva/')
         //     .then(response=>response.json())
         //     .then(result =>setReservas(result));
         const response = await axios.get(url + 'restaurante/');
         setRestaurantes(response.data);
     };
     const loadMesas = async () => {
         // fetch(url + 'reserva/')
         //     .then(response=>response.json())
         //     .then(result =>setReservas(result));
         const response = await axios.get(url + 'mesa/');
         setMesas(response.data);
     };
     const loadClientes = async () => {
         const response = await axios.get(url + 'cliente/');
         setClientes(response.data);
     };











    return(
        <div className="">

            <div className="col-16">
                <h4>Lista de Reservas</h4>
                <Reserva_listComponent reservas={reservas} setReservas={setReservas}

                restaurantes={restaurantes} setRestaurantes={setRestaurantes}
                                      mesas={mesas} setMesas={setMesas}
                                        clientes={clientes} setClientes={setClientes}/>


            </div>

        </div>

    );
};
export default ReservaComponent;
