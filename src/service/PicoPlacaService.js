import axios from "axios";

export default class PicoPlacaService {
  url = "http://localhost:8090/picoplaca/"; //puerto que escucha

  getAll() {
    return axios.get(this.url + "listar");
  }
  save(picoplaca) {
    return axios.post(this.url + "registrar", picoplaca);
  }

  eliminar(id) {
    return axios.delete(this.url + "eliminar/" + id);
  }
  consultaPicoPlaca(id) {
    return axios.delete(this.url + "consultarPicoPlaca/" + id);
  }
}
