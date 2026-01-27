"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SearchFlightForm() {
  const { register, handleSubmit } = useForm();
  const [isReturnFlightDate, setIsReturnFlightDate] = useState(false);

  const { push } = useRouter();
  const handleSearch = (e) => {
    let searchQueries = "?";

    const lastIndex = Object.keys(e)[Object.keys(e).length - 1];
    for (const key in e) {
      const islastIndex = key === lastIndex;
      if (e[key]) {
        searchQueries += `${key}=${e[key]}${!islastIndex ? "&" : ""}`;
      }
    }

    push(`/flight${searchQueries}`);
  };
  return (
    <div className="py-5">
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit(handleSearch)}>
          <div className="grid grid-cols-5 gap-x-3 gap-y-3">
            <div className="flex flex-col p-2 gap-y-2 border border-gray-400 rounded-md">
              <label htmlFor="">مبدا</label>
              <input
                type="text"
                name="origin"
                {...register("origin")}
                // onChange={(e) => setQueryParams("origin", e.target.value)}
              />
            </div>
            <div className="flex flex-col p-2 gap-y-2 border border-gray-400 rounded-md">
              <label htmlFor="">مقصد</label>
              <input
                type="text"
                // onChange={(e) => setQueryParams("destination", e.target.value)}
                name="destination"
                {...register("destination")}
              />
            </div>
            <div className="flex flex-col p-2 gap-y-2 border border-gray-400 rounded-md">
              <label htmlFor="">تاریخ رفت</label>
              <input
                type="date"
                // onChange={(e) => setQueryParams("flightDate", e.target.value)}
                name="flightDate"
                {...register("flightDate")}
              />
            </div>
            <div className="flex flex-col p-2 gap-y-2 border border-gray-400 rounded-md">
              {!isReturnFlightDate ? (
                <>
                  <span>ایا میخواهید برگردید ؟</span>
                  <button
                    type="button"
                    onClick={() => setIsReturnFlightDate(true)}
                  >
                    بله
                  </button>
                </>
              ) : (
                <>
                  <label htmlFor="">تاریخ برگشت</label>
                  <input
                    type="date"
                    name="returnFlightDate"
                    {...register("returnFlightDate")}
                  />
                </>
              )}
            </div>
            <div className="flex flex-col p-2 gap-y-2 border border-gray-400 rounded-md">
              <label htmlFor="">تعداد مسافر</label>
              <input
                type="text"
                name="travelers"
                {...register("travelers")}
                // onChange={(e) => setQueryParams("travelers", e.target.value)}
              />
            </div>
            <button className="border border-gray-400 rounded-md p-2 col-span-5">
              جستجو
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
