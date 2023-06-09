import React, {useEffect, useState} from "react";
import axios from "axios";


const url = "http://localhost:9090/api/";


const NewConsumo = ({id_cabecera}) => {


    let id_producto=0;
    let cantidad=1;
    const [categorias,setCategorias]=useState([]);
    const [productos,setProductos]=useState([]);



    useEffect(() => {
        const getCategorias = () => {
            fetch(url + 'categoria')
                .then(res => res.json())
                .then(res => setCategorias(res))
        }

        getCategorias();


    }, []);
    const handleChange= (e)=>{

        let id_categoria=e.target.value;
        if(e.target.value){
            // const response= await axios.put(url + 'prodcuto/categpria/' + id_categoria);
            fetch(url + 'producto/categoria/' + id_categoria)
                .then(res => res.json())
                .then(res => setProductos(res))
        }else{
            setProductos([]);
        }



    }

    const handleSelectProduct=(e)=>{
        id_producto=e.target.value;
    }
    const handleChangeCantidad=(e)=>{
        cantidad=e.target.value;
    }
    const handleSubmit=async (e)=>{
        //crear un nuevo detalle
        if(id_producto>0 && cantidad>0) {
            let nuevo = {
                id_producto: id_producto,
                cantidad: cantidad,
                id_cabecera: id_cabecera
            }
            console.log(nuevo)
            await axios.post(url + 'detalle/' ,nuevo);

            window.location.reload(false);

        }

    }

    return (
        <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col" width="2%" className="center">#</th>
                    <th scope="col" className="text-center">Categoria
                    </th>
                    <th scope="col" className="text-center ">Producto
                    </th>
                    <th>
                        Cantidad
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th><div className="form-group">
                            <select className="form-control" id="categoria" name="categoria"
                                    onChange={handleChange} defaultValue="">
                                <option value="">---</option>
                                {categorias.map((item, index) => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.nombre}</option>
                                    )
                                })}

                            </select>
                        </div></th>
                        <th><div className="form-group">
                            <select className="form-control" id="producto" name="producto"
                                    onChange={handleSelectProduct} defaultValue="">
                                <option value="">---</option>
                                {productos.map((item, index) => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.nombre}</option>
                                    )
                                })}

                            </select>
                        </div></th>
                        <th>

                            <input onChange={handleChangeCantidad} type="number" id="tentacles" name="tentacles" min="1" max="100" defaultValue="1"/>

                        </th>
                        <th>
                            <button  className="badge badge-danger float-right" onClick={handleSubmit}>Agregar Consumo</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>

    );
}
export default NewConsumo;