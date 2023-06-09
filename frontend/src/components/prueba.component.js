import React, {useState, useEffect} from "react";
import GetReservas from "../helpers/GetReservas";


const url = "http://localhost:9090/api/";


let initial={};


const Prueba =()=>{

    const [reservas,setReservas]=useState([initial]);

    const loadReservas = () => {
        console.log("carga")
        GetReservas()
            .then((newReservas) => {
            console.log("Dsfd")
            setReservas(newReservas);            
        }); 
    };

    useEffect(()=>{
        loadReservas();
    },[]);

    const modRes=()=>{
        reservas[0].id_restaurante="3sdfs"
        console.log();
        setReservas({...reservas});
    }
    return(
        <pre>
           <br/>
           <div>{reservas[0].id_restaurante}</div>
            <input type="button" onClick={modRes} value="sdfsd"/>
        </pre>

    );
}

export default Prueba;