"use client";

import { http } from "@/httpServices";
import Button from "@/shared/components/ui/button";
import RHFTextField from "@/shared/components/ui/RHFTextField";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import RHFSelect from "./ui/RHFSelect";
import { SelectItem } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTravelerSchema } from "../helpers/function";
import { FlightInformation } from "./flight-information";
import { memo } from "react";
import { countryList } from "../../../shared/assets";

export default function BookForm({ data }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addTravelerSchema), mode: "all" });
  return (
    <div className="flex flex-col gap-y-3">
      <FlightInformation data={data} />
      <TravelerInformation
        data={data}
        handleSubmit={handleSubmit}
        register={register}
        control={control}
        errors={errors}
        setStep={() => setStep((prev) => prev + 1)}
        setTraveler={(data) => setTravlerInfo(data)}
      />
    </div>
  );
}

const TravelerInformation = ({
  register,
  handleSubmit,
  data,
  control,
  errors,
}) => {
  const { push } = useRouter();
  const submitCreateTraveler = async (travlerData) => {
    const bodyData = { travler: travlerData, tripId: data.tripId };

    try {
      const {
        data: { orderId },
        message,
      } = await http.post("/order", bodyData).then(({ data }) => data);
      toast.success(message);

      push(`/pay/${orderId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitCreateTraveler)}>
      <div className="grid grid-cols-3 gap-4">
        <RHFTextField
          errors={errors}
          register={register}
          label={"نام به لاتین"}
          name={"name"}
        />
        <RHFTextField
          errors={errors}
          register={register}
          label={"نام خانوادگی به لاتین"}
          name={"lastName"}
        />
        <RHFTextField
          errors={errors}
          register={register}
          label={"تاریخ تولد"}
          name={"dateOfBirth"}
          type="date"
        />
        <RHFSelect
          control={control}
          className="rounded-2xl"
          errors={errors}
          name={"gender"}
          label={"جنسیت"}
          showedLabel={true}
        >
          {[
            { id: 1, title: "مرد", value: "male" },
            { id: 2, title: "زن", value: "fmale" },
          ].map((val) => (
            <SelectItem key={val.id} value={val.value}>
              {val.title}
            </SelectItem>
          ))}
        </RHFSelect>
        <CountryList control={control} errors={errors} />
      </div>
      <div className="w-full fixed z-fixed bottom-0 left-0 right-0 flex justify-center items-center transition-transform bg-white shadow-2md shadow-gray-900 lg:static lg:items-start lg:col-span-2">
        <div className="flex flex-row-reverse items-center justify-between lg:flex-col w-full border lg:border-0 p-3 lg:rounded-2xl">
          <span className="lg:hidden">{data.price.toLocaleString()}</span>
          <Button className="w-max lg:w-full mt-2" variant="primary">
            ادامه
          </Button>
        </div>
      </div>
    </form>
  );
};

const CountryList = memo(function CountryList({ control, errors }) {
  return (
    <RHFSelect
      control={control}
      className="rounded-2xl"
      errors={errors}
      name={"nationality"}
      label={"ملیت"}
      showedLabel={true}
    >
      {countryList.map((val) => (
        <SelectItem key={val.id} value={val.name}>
          {val.name_fa}
        </SelectItem>
      ))}
    </RHFSelect>
  );
});
