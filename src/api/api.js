import axios from "axios";

const apiSieven = axios.create({
  baseURL: "http://52.206.163.83/api",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiSieven };
