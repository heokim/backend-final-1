import http from "../http-common";

class MesaDataService {
    getAll() {
        return http.get("/mesa");
    }

    get(id) {
        return http.get(`/mesa/${id}`);
    }

    create(data) {
        return http.post("/mesa", data);
    }

    update(id, data) {
        return http.put(`/mesa/${id}`, data);
    }

    delete(id) {
        return http.delete(`/mesa/${id}`);
    }

    deleteAll() {
        return http.delete(`/mesa`);
    }

    findByTitle(title) {
        return http.get(`/mesa?title=${title}`);
    }

    getByAtr(id){
        return http.get(`mesa/${id}/mesas/`)
    }

}

export default new MesaDataService();