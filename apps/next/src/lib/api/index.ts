import axios from "axios";

export const nodeApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5050/api",
  withCredentials: true,
  timeout: 600000,
});
