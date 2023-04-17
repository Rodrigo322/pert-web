import axios from "axios";

export const api = axios.create({
  baseURL: "https://pert-backend.vercel.app",
});
