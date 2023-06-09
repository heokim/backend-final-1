import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import FacturaComponent from "./factura.component";

const url = "http://localhost:9090/api/";

let init = {
  id_mesa: 0,
  id_cliente: 0,
  estado: "abierto",
  total: 0,
  cierre: null,
};
const ConsumoComponent = () => {
  const [cabecera, setCabecera] = useState(init);
  const [detalles, setDetalles] = useState([]);

  const { id_reserva } = useParams();

  useEffect(() => {
    const getCabecera = () => {
      fetch(url + "cabecera/mesa/" + id_reserva)
        .then((res) => res.json())
        .then((res) => setCabecera(res));
    };
    getCabecera();
  }, []);

  return (
    <div className="container">
      <FacturaComponent
        cabecera={cabecera}
        setCabecera={setCabecera}
        detalles={detalles}
        setDetalles={setDetalles}
        id={id_reserva}
      />
    </div>
  );
};
export default ConsumoComponent;
