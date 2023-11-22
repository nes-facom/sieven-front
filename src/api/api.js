import axios from "axios";

const apiSieven = axios.create({
  baseURL: "https://sieven-backend.onrender.com/api",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiSieven };
