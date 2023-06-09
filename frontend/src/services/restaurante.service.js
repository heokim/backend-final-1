import http from "../http-common";

class RestauranteDataService {
  getAll() {
    return http.get("/restaurante");
  }

  get(id) {
    return http.get(`/restaurante/${id}`);
  }

  create(data) {
    return http.post("/restaurante", data);
  }

  update(id, data) {
    return http.put(`/restaurante/${id}`, data);
  }

  delete(id) {
    return http.delete(`/restaurante/${id}`);
  }

  deleteAll() {
    return http.delete(`/restaurante`);
  }

  findByTitle(title) {
    return http.get(`/restaurante?title=${title}`);
  }
}

export default new RestauranteDataService();