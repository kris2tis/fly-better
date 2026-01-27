"use client";

import RHFTextField from "@/shared/components/ui/RHFTextField";
import { toast } from "sonner";

import { app } from "@/httpServices";

import { useForm } from "react-hook-form";

export default function RouteForm() {
  const { handleSubmit, register } = useForm();
  const handleCreateTrip = async (data) => {
    try {
      const { message } = await app
        .post("/trip", data)
        .then(({ data }) => data);
      toast.success(message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="py-5">
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit(handleCreateTrip)}>
          <div className="grid grid-cols-6 gap-x-3 gap-y-3">
            <RHFTextField label={"مسیر"} name={"routeId"} register={register} />
            <RHFTextField
              label={"تعداد صندلی"}
              name={"capacity"}
              register={register}
            />
            <RHFTextField
              label={"نوع کابین"}
              name={"classMultiplier"}
              register={register}
            />
            <RHFTextField
              label={"تاریخ پرواز"}
              name={"flightDate"}
              type="date"
              register={register}
            />
            <RHFTextField
              label={"ساعت پرواز"}
              name={"flightTime"}
              type="time"
              register={register}
            />
            <RHFTextField
              label={"ساعت نشست"}
              name={"landingTime"}
              type="time"
              register={register}
            />
            <button className="border border-gray-400 rounded-md p-2 col-span-full">
              ساخت سفر
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
