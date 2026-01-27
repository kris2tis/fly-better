import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  withCredentials: true,
});

export const app = { post: http.post,get:http.get };
