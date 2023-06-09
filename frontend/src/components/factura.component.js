import "bootstrap/dist/css/bootstrap.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

import Pdf from "react-to-pdf";

import React, { useEffect, useState } from "react";

import axios from "axios";
import NewConsumo from "./newConsumo.component";
import FacturaPDF from "./facturaPdf";
import { Link } from "react-router-dom";

const url = "http://localhost:9090/api/";

const FacturaComponent = ({
  cabecera,
  setCabecera,
  detalles,
  setDetalles,
  id_reserva,
}) => {
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [state, setState] = useState(true);

  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState("");

  const [showPDF, setShowPDF] = useState(false);

  let date = new Date();

  const columns = [
    { dataField: "nombre", text: "Nombre", filter: textFilter(), sort: true },
    { dataField: "apellido", text: "Apellido", filter: textFilter() },
    {
      dataField: "id",
      text: "Opcion",
      editable: false,
      formatter: (cellContent, row) => {
        return (
          <button
            className="badge btn-info "
            onClick={() => handleSubmit(row.id)}
          >
            Seleccionar
          </button>
        );
      },
    },
  ];

  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [10, 6],
  };

  async function getDetalle() {
    if (cabecera[0]?.id) {
      const response = await axios.get(
        url + "detalle/cabecera/" + cabecera[0]?.id
      );

      setDetalles(response.data);
    }
  }

  useEffect(() => {
    const getClientes = () => {
      fetch(url + "cliente")
        .then((res) => res.json())
        .then((res) => setClientes(res));
    };
    getDetalle().then((r) => console.log(r));
    getClientes();
  }, [show]);
  const getSubtotal = () => {
    let tot = 0;
    for (let i = 0; i < detalles.length; i++) {
      tot += detalles[i].total;
    }
    setSubtotal(tot);
    setTotal(tot);
  };

  const handleMouseChange = (e) => {
    getSubtotal();
    if (cabecera[0]?.estado === "cerrado") {
      setState(false);
    }
    setShow(true);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const ClickClient = (e) => {
    setShowForm(true);
  };
  const ChangeEstado = async () => {
    await axios.put(url + "cabecera/" + cabecera[0].id, { estado: "cerrado" });

    setShow(false);
    setShowPDF(true);

    let cierre = date.getDate();

    // setCabecera(
    //     {    ...cabecera[0],
    //         ['cierre']:cierre
    //     }
    // )
    //
    //
    // console.log(cabecera)

    let update = {
      id_cliente: 1,
      estado: "abierto",
      total: 0,
      cierre: cierre,
    };

    await axios.delete(url + "detalle/" + cabecera[0]?.id);

    await axios.put(url + "cabecera/" + cabecera[0]?.id, update);

    // window.location.reload(false);
  };
  const handleSubmit = async (id) => {
    await axios.put(url + "cabecera/" + cabecera[0]?.id, { id_cliente: id });
    window.location.reload(false);
  };

  const handleDelete = (id) => {
    console.log(id);
    fetch(url + "detalle/id/" + id, { method: "DELETE" }).then((res) =>
      res.text()
    );
    window.location.reload(false);
  };

  return (
    <div className="container">
      {!show && <button onClick={handleMouseChange}>Mostrar</button>}
      {show && (
        <div className="col-16">
          <div className="panel invoice-list">
            <div className="list-group animate__animated animate__fadeInLeft">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">
                  {!showForm && state && (
                    <div>
                      Nombre: {cabecera[0]?.nombre} {cabecera[0]?.apellido}
                      <button
                        className="btn  btn-dark m-3"
                        onClick={ClickClient}
                      >
                        Cambiar cliente
                      </button>
                    </div>
                  )}
                  {showForm && (
                    <div className="col-5 m-1">
                      <BootstrapTable
                        bootstrap4
                        keyField="id"
                        columns={columns}
                        data={clientes}
                        filter={filterFactory()}
                      />
                      <Link to="/cliente/add">
                        <button className="btn btn-outline-danger">
                          Crear Cliente
                        </button>
                      </Link>
                    </div>
                  )}
                </h5>
              </div>
              <strong className="amount mb-0">
                TOTAL: {detalles[0]?.suma} Gs.
              </strong>
            </div>
          </div>

          <div className="main">
            <div className="container mt-3">
              <div className="card animate__animated animate__fadeIn">
                <div className="card-header">
                  Fecha: {cabecera[0]?.createdAt}
                  <strong> </strong>
                  <span className="float-right">
                    {" "}
                    <strong>Estado:</strong> {cabecera[0]?.estado}
                    {state && (
                      <button
                        className="btn btn-primary m-1"
                        onClick={ChangeEstado}
                      >
                        {" "}
                        Cerrar Mesa
                      </button>
                    )}
                  </span>
                </div>
                <div className="card-body">
                  <div className="table-responsive-sm">
                    <table className="table table-sm table-striped">
                      <thead>
                        <tr>
                          <th scope="col" width="2%" className="center">
                            #
                          </th>
                          <th
                            scope="col"
                            className="text-center d-none d-sm-table-cell"
                            width="50%"
                          >
                            Descripción
                          </th>

                          <th scope="col" width="10%" className="text-right">
                            Precio/Unidad
                          </th>
                          <th scope="col" width="8%" className="text-right">
                            Cantidad
                          </th>
                          <th scope="col" width="10%" className="text-center">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {detalles.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td className="text-center">{index}</td>
                              <th className="text-center">{item.nombre}</th>
                              <th className="text-center">{item.precio} Gs.</th>
                              <th className="text-center">{item.cantidad}</th>
                              <th className="text-center">{item.total} Gs.</th>
                              <th>
                                <button
                                  className="badge badge-danger"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Eliminar
                                </button>
                              </th>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {state && <NewConsumo id_cabecera={cabecera[0]?.id} />}
                  <div className="row">
                    <div className="col-lg-4 col-sm-5 ml-auto">
                      <table className="table table-sm table-clear">
                        <tbody>
                          <tr>
                            <td className="left">
                              <strong>Subtotal</strong>
                            </td>
                            <td className="text-right bg-light">
                              {detalles[0]?.suma} Gs
                            </td>
                          </tr>

                          <tr>
                            <td className="left">
                              <strong>Total</strong>
                            </td>
                            <td className="text-right bg-light">
                              <strong>{detalles[0]?.suma} Gs</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div></div>
      {showPDF && (
        <div>
          <div ref={ref}>
            <FacturaPDF cabecera={cabecera} detalles={detalles} />
          </div>
          <Pdf
            targetRef={ref}
            filename={"factura_" + cabecera[0].nombre + ".pdf"}
            options={options}
            scale={0.9}
          >
            {({ toPdf }) => (
              <button className="btn btn-primary m-2" onClick={toPdf}>
                Generar PDF
              </button>
            )}
          </Pdf>
        </div>
      )}
    </div>
  );
};
export default FacturaComponent;
