import React, {useState,useEffect} from "react";

import { useHistory } from "react-router-dom";








export default function AddCliente() {
    let history = useHistory();

    const [form, setForm] = useState("");


    useEffect(() => {

    }, []);


    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }






    const handleSubmit = (e) => {
        e.preventDefault();

        //         // //consulta
        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        }

        fetch('http://localhost:9090/api/cliente/', requestInit)
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
                            onChange={handleChange}
                            name="cedula"
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            name="nombre"
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            id="apellido"
                            value={form.apellido}
                            onChange={handleChange}
                            name="apellido"
                        />

                    </div>
                </div>
            </div>
            <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-primary float-end"> Guardar< /button>
            </div>
        </form>
    );
};

