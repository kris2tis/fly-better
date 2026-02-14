"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useGetFlightListByDate } from "../hooks";
import { useEffect, useState } from "react";
import moment from "jalali-moment";
import { ShotArrow } from "../../../shared/assets/icons/icons";

export default function SortDate() {
  const allSearchParams = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const { flightList, isLoading } = useGetFlightListByDate();
  const [daysArray, setDaysArray] = useState();

  useEffect(() => {
    let days = [{ day: 1, date: new Date() }];
    let date = new Date();

    for (let index = 0; index < 20; index++) {
      var lastDayOfMonth = new Date(2025, date.getMonth() + 1, 0);

      if (lastDayOfMonth.getDate() === date.getDate()) {
        const currentUtcMonth = date.getUTCMonth() + 1;

        date.setUTCMonth(currentUtcMonth);
        date.setUTCDate(0);
      }

      days.push({
        day: index + 1,
        date: new Date(`2026-${date.getUTCMonth() + 1}-${date.getDate() + 1}`),
      });

      date.setDate(date.getDate() + 1);
    }
    setDaysArray(days);
  }, []);

  const handleClick = (date) => {
    const searchParams = new URLSearchParams(allSearchParams);
    const formatedDate = new Date(date).toLocaleDateString().split("/");

    searchParams.set(
      "flightDate",
      `${formatedDate[2]}-${formatedDate[0].padStart(2, "0")}-${formatedDate[1].padStart(2, "0")}`,
    );
    push(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <DaysList
        daysArray={daysArray}
        flightList={flightList}
        onClick={handleClick}
      />
      <DaysControler />
    </div>
  );
}

const DaysList = ({ daysArray, flightList, onClick }) => {
  return (
    <div className="mx-auto flex items-center gap-x-3 overflow-y-auto w-full py-3 px-2 hidden-scrool">
      {daysArray?.length &&
        daysArray.map((day , i) => (
          <DaysCard
            key={i}
            onClick={onClick}
            {...{ ...day, flightList }}
          />
        ))}
    </div>
  );
};

const DaysCard = ({ date, flightList, onClick }) => {
  const formatedDate = moment(date.toLocaleDateString(), "MM/DD/YYYY")
    .locale("fa")
    .format("dddd-jD MM");

  const hasFlight =
    flightList?.length &&
    flightList.find((f) => {
      const fDate = new Date(f.flightDate).toLocaleDateString();
      const d = new Date(date).toLocaleDateString();

      if (new Date(fDate).getTime() === new Date(d).getTime()) {
        return f;
      }
    });

  return (
    <div
      key={date}
      onClick={() => onClick(date.toLocaleDateString())}
      className="cursor-pointer p-2 rounded-md border flex flex-col gap-y-2 border-gray-500 text-xs min-w-[120px] text-center"
    >
      <span className="">{formatedDate}</span>
      {hasFlight ? (
        <span className="text-red-400">{hasFlight.price.toLocaleString()}</span>
      ) : (
        <span className="text-blue-500">پروازی وجود ندارد</span>
      )}
    </div>
  );
};

const DaysControler = () => {
  return (
    <div className="flex justify-end">
      <div className="flex items-center border border-gray-300 rounded-lg bg-white hover:text-brand-600 overflow-hidden w-[150px] h-12 ">
        <div className="flex cursor-pointer py-2 text-xs text-gray-800 flex-1 items-center leading-none border-l border-gray-300   ">
          <div className="flex justify-between items-center flex-nowrap gap-1 py-2 px-2.5 p-1">
            <ShotArrow />
            <span className="text-xs text-gray-800  text-nowrap">روز قبل</span>
          </div>
        </div>
        <div className="flex cursor-pointer py-2 text-xs text-gray-800 flex-1 items-center leading-none   ">
          <div className="flex justify-between items-center flex-nowrap gap-1 py-2 px-2.5 p-1">
            <span className="text-xs text-gray-800  text-nowrap">روز بعد</span>
            <ShotArrow className="rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
};
