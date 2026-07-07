import axios from "axios";

const api = axios.create({
    baseURL: "https://mini-inventory-backend-2mip.onrender.com",
    timeout: 10000,
});

export default api;