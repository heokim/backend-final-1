const GetReservas = async () => {
    const url = "http://localhost:9090/api/";
    const res = await fetch(url +  'reserva/');

    return await res.json();
}

export default GetReservas;