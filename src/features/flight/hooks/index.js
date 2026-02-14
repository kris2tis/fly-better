"use client";
import { http } from "@/httpServices";
import { useQuery } from "@tanstack/react-query";

export const useGetFlightList = (queries) => {
  const { data: flightList, isLoading } = useQuery({
    queryKey: [queries, "flight-list"],
    queryFn: async () =>
      await http.get(`/flight${queries}`).then(({ data }) => data.data),
  });

  return { flightList, isLoading };
};

export const useGetFlightListByDate = () => {
  const { data: flightList, isLoading } = useQuery({
    queryKey: ["flight-list-date"],
    queryFn: async () =>
      await http.get(`/flight/date`).then(({ data }) => data.data),
  });

  return { flightList, isLoading:true };
};
