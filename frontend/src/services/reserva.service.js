import http from "../http-common";

class ReservaDataService {
  getAll() {
    return http.get("/reserva");
  }

  get(id) {
    return http.get(`/reserva/${id}`);
  }

  create(data) {
    return http.post("/reserva", data);
  }

  update(id, data) {
    return http.put(`/reserva/${id}`, data);
  }

  delete(id) {
    return http.delete(`/reserva/${id}`);
  }

  deleteAll() {
    return http.delete(`/reserva`);
  }

  findByTitle(title) {
    return http.get(`/reserva?title=${title}`);
  }
}

export default new ReservaDataService();
