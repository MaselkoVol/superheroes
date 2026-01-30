import axios from "axios";
import { appConfig } from "./config";

const api = axios.create({
  baseURL: appConfig.baseUrl,
  paramsSerializer: {
    indexes: null,
  },
});

export default api;
