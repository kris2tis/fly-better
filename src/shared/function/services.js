import { headers } from "next/headers";
import { http } from "@/httpServices";

export const getFlight = async (id) => {
  return await http.get(`/flight/book/${id}`).then(({ data }) => data.data);
};

export const getOrder = async (id) => {
  return await http.get(`/order/${id}`).then(({ data }) => data.data);
};

export const getOrderList = async () => {
  return await http
    .get(`/order`, { headers: await headers() })
    .then(({ data }) => data.data);
};
