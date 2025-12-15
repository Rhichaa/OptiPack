import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:49331/api",
});

export default api;
