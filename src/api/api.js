import axios from "axios";

import { toUrl } from "./url";

// const root = "http://127.0.0.1:8000/";
const root = "/api";

export function getAPI(path, params = {}, config = {}) {
  return axios.get(toUrl(root, path), { params });
}

export const api = {
  getFoto: (index, params = {}) => getAPI(`fotos/${index}`, params),
  getFotos: (params = {}) => getAPI("fotos/", params)
};
