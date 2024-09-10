import axios from "axios";

const baseUrl = import.meta.env.VITE_DOMAIN_URL || 'http://localhost:8000/';
const instance = axios.create({
  baseURL: baseUrl,

  headers: { "Content-Type": "application/json" },
});

export default instance;
