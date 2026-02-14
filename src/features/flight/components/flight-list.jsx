"use client";

import { useGetFlightList } from "../hooks";
import Loading from "@/shared/components/ui/loading";
import { FlightCard } from "./flight-card";

export default function FlightList({ queries }) {
  const { flightList, isLoading } = useGetFlightList(queries);

  if (!isLoading && !flightList?.length) {
    return <span>سفری یافت نشد</span>;
  }

  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex flex-col gap-y-3">
        {!isLoading &&
          flightList.map((flight) => {
            const { id } = flight;
            return <FlightCard key={id} {...flight} />;
          })}
      </div>
    </div>
  );
}