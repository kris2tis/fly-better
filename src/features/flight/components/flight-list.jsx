"use client";

import Link from "next/link";
import { useGetFlightList } from "../hooks";

export default function FlightList({ queries }) {
  const { flightList, isLoading } = useGetFlightList(queries);
  if (!isLoading && !flightList?.length) {
    return <span>سفری یافت نشد</span>;
  }
  
  return (
    <div className="max-w-lg">
      {isLoading && <span>درحال یافتن سفرها</span>}
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

const FlightCard = ({ id, Route, price, flightTime, landingTime }) => {
  const { origin, destination } = Route;
  return (
    <div className="flex items-center justify-between p-2 px-4 border border-gray-400 rounded-md">
      {" "}
      <div className="flex items-center gap-x-3 ">
        <div className="flex flex-col gap-y-3">
          <span className="text-lg font-bold">{flightTime}</span>
          <span className="text-sm">{origin}</span>
        </div>
        <div className="flex flex-col gap-y-3">
          <span className="text-lg font-bold">{landingTime}</span>
          <span className="text-sm">{destination}</span>
        </div>
      </div>
      <div className="border-r border-r-gray-300 flex flex-col gap-y-2 pr-3">
        <span>{price.toLocaleString()} تومان</span>
        <Link href={`/flight/book/${id}`}>
          <button className="bg-[#30a75e] text-white text-sm p-2 rounded-md">
            خرید
          </button>
        </Link>
      </div>
    </div>
  );
};
