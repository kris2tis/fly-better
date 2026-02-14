"use client";

import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";

import SearchFormTextDield from "./ui/search-form-text-field";
import { SelectItem } from "@/components/ui/select";
import RHFSelect from "./ui/RHFSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { flightSearchSchema } from "../helpers/function";
import { memo, useEffect, useState } from "react";
import { Exchange } from "@/shared/assets/icons/icons";
import Button from "@/shared/components/ui/button";
import { cities } from "@/shared/assets";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar } from "react-multi-date-picker";
import moment from "jalali-moment";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SearchFlightForm() {
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(flightSearchSchema),
    mode: "all",
    defaultValues: {
      travelers: 1,
      classMultiplier: "Economy",
      isReturnFlightDate: "OneWay",
    },
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const [returnFlight, setReturnFlight] = useState(false);
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

  useEffect(() => {
    clearErrors();
    if (watch("isReturnFlightDate") === "OneWay") {
      setValue("isReturnFlightDate", "OneWay");
      setValue("returnFlightDate", undefined);
      clearErrors("returnFlightDate");
    }
  }, [watch("isReturnFlightDate")]);

  const changeOriginAndDestination = () => {
    const values = ["origin", "destination"].map((i) => getValues(i));

    ["destination", "origin"].forEach((key, index) =>
      setValue(key, values[index]),
    );
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <div className="w-full flex flex-col gap-y-3">
        <div className="flex items-center gap-x-3 w-fit">
          <RHFSelect
            showedLabel={false}
            name={"isReturnFlightDate"}
            label={"یک طرفه"}
            control={control}
            onValueChange={(value) =>
              setReturnFlight(value === "Return" ? true : false)
            }
          >
            <SelectItem value="OneWay">یک طرفه</SelectItem>
            <SelectItem value="Return">رفت و برگشت</SelectItem>
          </RHFSelect>
          <RHFSelect
            label={"اکونومی"}
            showedLabel={false}
            name={"classMultiplier"}
            control={control}
          >
            <SelectItem value="Economy">اکونومی</SelectItem>
            <SelectItem value="Business">بیزنس</SelectItem>
            <SelectItem value="First">فرست</SelectItem>
          </RHFSelect>
        </div>
        <div className="flex flex-col gap-y-3 2xl:flex-row 2xl:w-full 2xl:gap-x-3">
          {/* origin & destination */}
          <div className="flex flex-col gap-y-3 md:flex-row gap-x-8 relative 2xl:w-full">
            <RHFSelect
              errors={errors}
              className="w-full"
              name={"origin"}
              control={control}
              label={"مبدا"}
              showedLabel={true}
            >
              <CityList />
            </RHFSelect>

            <RHFSelect
              errors={errors}
              className="w-full"
              name={"destination"}
              control={control}
              label={"مقصد"}
              showedLabel={true}
            >
              <CityList />
            </RHFSelect>
            <button
              type="button"
              onClick={changeOriginAndDestination}
              className="absolute rotate-90 md:rotate-0 right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-white border border-slate-200 size-10 rounded-full shadow hover:text-primary transition"
            >
              <Exchange />
            </button>
          </div>

          <div className="flex flex-col md:flex-row   md:items-start md:gap-x-3  gap-y-3 lg::w-full [&>div]:h-full!">
            {/* flight and return date */}
            <div className="flex items-start gap-3 lg:w-full md:grow">
              <PersianDatePicker
                label={"تاریخ رفت"}
                name={"flightDate"}
                control={control}
                errors={errors}
              />

              {returnFlight && (
                <PersianDatePicker
                  errors={errors}
                  label={"تاریخ برگشت"}
                  name={"returnFlightDate"}
                  control={control}
                />
              )}
            </div>

            {/* travelers */}
            <div>
              <SearchFormTextDield
                parentClassName="w-full 2xl:min-w-[200px]"
                label={"تعداد مسافر"}
                name={"travelers"}
                register={register}
              />
            </div>

            <div>
              <Button className="w-full text-white rounded-2xl! bg-brand text-sm h-15 grow ">
                جستجو
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

const CityList = memo(function CityList() {
  return cities.map((c) => (
    <SelectItem key={c.id} value={c.name}>
      {c.name}
    </SelectItem>
  ));
});

export function PersianDatePicker({ label, control, name, errors }) {
  const [currentDate, setCurrentDate] = useState();
  const hasError = errors && errors[name];

  return (
    <Popover>
      <div className="w-full 2xl:min-w-[200px] flex flex-col gap-y-2">
        <PopoverTrigger
          className={` ${hasError && "border-red-400"} min-h-[62px]`}
        >
          <div className={`flex justify-start items-start flex-col gap-y-2`}>
            <span className={`${currentDate && "text-xs"}`}>{label}</span>

            {currentDate && (
              <span className="pointer-events-none text-xs">{currentDate}</span>
            )}
          </div>
        </PopoverTrigger>

        {hasError && (
          <span className="text-red-400 text-xs">{errors[name].message}</span>
        )}
      </div>

      <PopoverContent className="w-80" align="start">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange }, formState: { errors } }) => (
            <Calendar
              calendar={persian}
              locale={persian_fa}
              onChange={(date) => {
                const { year, month, day } = date;
                const jalalyDate = `${year}/${month}/${day}`;
                let toGeorgianDate = moment
                  .from(jalalyDate, "fa", "YYYY/MM/DD")
                  .locale("en")
                  .format("YYYY/MM/DD");
                setCurrentDate(jalalyDate);
                onChange(date?.isValid ? toGeorgianDate : "");
              }}
              format={"YYYY/MM/DD"}
            />
          )}
        />
      </PopoverContent>
    </Popover>
  );
}
