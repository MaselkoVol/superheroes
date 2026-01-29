import axios from "axios";
import { appConfig } from "./config";

const api = axios.create({
  baseURL: appConfig.serverUrl,
});

export default api;
