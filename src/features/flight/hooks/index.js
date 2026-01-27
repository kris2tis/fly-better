"use client";
import { app } from "@/httpServices";
import { useQuery } from "@tanstack/react-query";

export const useGetFlightList = (queries) => {
  const { data: flightList, isLoading } = useQuery({
    queryKey: [queries, "flight-list"],
    queryFn: async () =>
      await app.get(`/flight${queries}`).then(({ data }) => data.data),
  });

  return { flightList, isLoading };
};
