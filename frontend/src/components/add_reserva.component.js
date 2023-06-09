import React, {useState, useEffect} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import MesaDataService from "../services/mesa.service.js"
import AddCliente from "./add-cliente.component";
import {Link} from "react-router-dom";


const url = "http://localhost:9090/api/";


export default function AddreservaForm() {

    let horarios = {
        h1: "12 a 13",
        h2: "13 a 14",
        h3: "14 a 15",
        h4: "19 a 20",
        h5: "20 a 21",
        h6: "21 a 22",
        h7: "22 a 23"
    };

    let history = useHistory();
    let date = new Date();
    let output = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');


    const [form, setForm] = useState("");


    const [data, setData] = useState([]);

    const [mesas, setMesas] = useState([]);

    const [reservas, setReservas] = useState([]);

    const [cliente, setCliente] = useState("");
    const [clientes, setClientes] = useState([]);

    const [showMesas, setShowMesas] = useState(false);


    const estaReservada = (obj) => {
        console.log("wewe", obj)
        for (let i = 0; i < reservas.length; i++) {

            // console.log("resFEcja ", reservas[i].fecha.split('T')[0]);
            // console.log("FormFEcja ", form.fecha.split('T')[0]);
            // console.log(reservas[i].fecha.split('T')[0] === form.fecha.split('T')[0])

            if (reservas[i].id_mesa === obj.id && reservas[i].fecha?.split('T')[0] === form.fecha?.split('T')[0] && controlHora()) {
                console.log('enter')
                return true;
            }

        }
        return false;
    };
    const controlHora = () => {

        let list = Object.keys(horarios);

        for (let i = 0; i < reservas.length; i++) {

            for (let j = 0; j < list.length; j++) {
                if (form[list[i]]) {
                    let val = horarios[list[i]];
                    if (reservas[i].rango === val) {
                        return true;
                    }
                }
            }


        }
        return false;

    };


    const loadReservas = async () => {
        const response = await axios.get(url + 'reserva/');
        setReservas(response.data);
    };
    const loadMesas = async (id) => {

        console.log('id recibido: ', id);
        if (id) {
            const response = await axios.get(url + 'mesa/' + id + '/mesas/');

            //
            // for (let i=0;i<response.data.length;i++){
            //     if(await estaReservada(response.data[i])){
            //         console.log("reservadas", response.data[i].id, " : ", response.data[i].nombre);
            //         response.data.splice(0,response.data[i].id);
            //     }else{
            //         console.log("no reservadas", response.data[i].id);
            //     }
            //
            //
            // }

            setMesas(response.data);
        } else {
            setMesas([]);
        }

    };
    const loadCliente = async (ci) => {
        for (let i = 0; i < clientes.length; i++) {
            console.log(clientes[i]['cedula']);
            if (clientes[i]['cedula'] === ci) {
                console.log("chec", clientes[i]);
                setCliente(clientes[i]);
            }
        }
    }

    const loadClientes = async () => {
        const response = await axios.get(url + 'cliente/');
        setClientes(response.data);
    }
    const loadData = async () => {
        const response = await axios.get(url + 'restaurante/');
        setData(response.data);
    };


    useEffect(() => {
        loadData()
            .then(res => console.log(res));

        loadReservas()
            .then(res => console.log(res));
        loadClientes()
            .then(res => console.log(res));

    }, []);


    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })


    }
    const handleChangeFecha = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        setShowMesas(false);

    }
    const handleChangeRest = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        loadMesas(e.target.value)
            .then(res => console.log(res));

        setShowMesas(false);


    }
    const handleChecked = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.checked
        })

        loadMesas(form.restaurante)
            .then(res => console.log(res));
        console.log("antes", mesas);

        setShowMesas(false);

    }


    const handleChangeCI = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setCliente('');
        loadCliente(e.target.value)
            .then(res => console.log(res));
        // for(let i=0;i<clientes.length;i++){
        //     if(e.target.value===clientes[i].cedula){
        //         console.log("existe");
        //     }else{
        //         console.log("no existe")
        //     }
        // }

    }

    const verificarCliente = () => {
        if (cliente) {
            console.log("existe");
            alert("Cliente Existente")
        } else {
            console.log("no existe")
            alert("No existe el cliente, Favor registarse");
            history.push('/cliente/add')
        }

    }

    const verificarMesas = () => {
        console.log("Ingreso a verMesas", mesas);
        for (let i = 0; i < mesas.length; i++) {
            if (estaReservada(mesas[i])) {
                mesas.forEach(function (mesa, index, object) {
                    if (mesa.id === mesas[i].id) {
                        object.splice(index, 1);
                    }
                });
                console.log("Si esta")
                i--;
            }
            console.log("dentro",mesas);
        }

        console.log("mesas", mesas);


        setMesas(mesas);
        mostrar();

    }
    const mostrar=()=>{

        console.log(mesas)
        setShowMesas(true);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("sad", cliente)
        if (cliente) {
            console.log("existe")
        } else {
            console.log("no existe")
            alert("No existe el cliente, Favor registarse");
            history.push('/cliente/add')
        }

        //validación de los datos
        console.log(form.mesa)

        let selectedHours = Object.keys(horarios);
        // console.log(selectedHours);
        console.log(form['h2']);


        for (let i = 0; i < selectedHours.length; i++) {
            let val = selectedHours[i]; //nombre de la clave
            let horario = horarios[val];
            let select = form[selectedHours[i]]; // Está seleccionado o no


            if (select) {
                let data = {
                    id_restaurante: form.restaurante,
                    id_mesa: form.mesa,
                    fecha: form.fecha,
                    rango: horario,
                    id_cliente: cliente.id,
                    cantidad: null,
                };

                console.log(data)
                // //consulta
                const requestInit = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                }

                fetch('http://localhost:9090/api/reserva/', requestInit)
                    .then(res => res.text())
                    .then(res => console.log(res, "Creado"))

                //reiniciando state del form
                // setRestaurante({
                //     nombre:'',
                //     direccion:''
                // })

                setForm("");
                history.push("/");

            }

        }


    }
    return (

        <form onSubmit={handleSubmit}>
            <div className="submit-form">
                <div>
                    <div className="form-group">
                        <label htmlFor="cedula">Cédula</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cedula"

                            value={form.cedula}
                            onChange={handleChangeCI}
                            name="cedula"
                        />
                        <input type="button" onClick={verificarCliente} className="m-1 btn badge-info"
                               value="Verificar"/>

                    </div>


                    <div className="form-group">
                        <label htmlFor="restaurante">Restaurantes</label>
                        <select className="form-control" id="restaurante" name="restaurante"
                                onChange={handleChangeRest} defaultValue="">
                            <option value="">---</option>
                            {data.map((item, index) => {
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
                            value={form.fecha}
                            onChange={handleChangeFecha}
                            name="fecha"
                            min={output}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="rango">Horarios</label><br/>

                        <div className="container-fluid overflow-scroll">
                            <input type="checkbox" id="h1" name="h1" className="form-check-inline"
                                   onChange={handleChecked}/>
                            <label htmlFor="h1" className="form-label">12 a 13 hs </label><br/>

                            <input type="checkbox" id="h2" name="h2" className="form-check-inline"
                                   onChange={handleChecked}/>
                            <label htmlFor="h2" className="form-label">13 a 14 hs </label><br/>

                            <input type="checkbox" id="h3" name="h3" className="form-check-inline"
                                   onChange={handleChecked}/>
                            <label htmlFor="h3" className="form-label">14 a 15 hs </label><br/>

                            <input type="checkbox" id="h4" name="h4" className="form-check-inline"
                                   onChange={handleChecked}/>
                            <label htmlFor="h4" className="form-label">19 a 20 hs </label><br/>

                            <input type="checkbox" id="h5" name="h5" className="form-check-inline"
                                   onChange={handleChecked}/>
                            <label htmlFor="h5" className="form-label">20 a 21 hs </label><br/>

                            <input type="checkbox" id="h6" name="h6" className="form-check-inline"
                                   onChange={handleChecked}/>
                            <label htmlFor="h6" className="form-label">21 a 22 hs </label><br/>

                            <input type="checkbox" id="h7" name="h7" className="form-check-inline"
                                   onChange={handleChecked}/>
                            <label htmlFor="h7" className="form-label">22 a 23 hs </label><br/>

                            <input type="button" onClick={()=>verificarMesas()} className="m-3 btn btn-primary"
                                   value="Listar Mesas"/>
                        </div>
                    </div>
                    {showMesas &&
                        <div className="container">
                            <div className="form-group">
                                <label htmlFor="mesas">Mesas</label>

                                <select required className="form-control" id="mesa" name="mesa"
                                        onChange={handleChange} defaultValue="">
                                    <option value="">---</option>
                                    {mesas.map((item, index) => {
                                        return (
                                            <option value={item.id}>
                                                {item.nombre}/ Capacidad:{item.capacidad}

                                            </option>
                                        )
                                    })}

                                </select>
                            </div>
                            <div className="col-md-12 text-center">
                                <button type="submit" className="btn btn-primary float-end"> Guardar< /button>
                            </div>
                        </div>
                    }
                </div>
            </div>


        </form>
    );
};

