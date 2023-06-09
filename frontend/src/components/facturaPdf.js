import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import NewConsumo from "./newConsumo.component";

const url = "http://localhost:9090/api/";

const FacturaPDF = ({ cabecera, detalles }) => {
  return (
    <div className="container">
      <div className="col-16">
        <strong>Factura</strong>
        <div className="panel invoice-list">
          <div className="list-group animate__animated animate__fadeInLeft">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">
                <div>
                  Nombre: {cabecera[0]?.nombre} {cabecera[0]?.apellido}
                </div>
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
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

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
    </div>
  );
};
export default FacturaPDF;
