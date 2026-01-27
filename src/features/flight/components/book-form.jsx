"use client";

import { app } from "@/httpServices";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function BookForm({ data }) {
  const { register, handleSubmit } = useForm();
  const [travlerInfo, setTravlerInfo] = useState(null);
  const [step, setStep] = useState(1);

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return (
          <TravelerInformation
            handleSubmit={handleSubmit}
            register={register}
            setStep={() => setStep((prev) => prev + 1)}
            setTraveler={(data) => setTravlerInfo(data)}
          />
        );
      case 2:
        return (
          <Payment
            handleSubmit={async () => {
              await submitReserveTrip();
            }}
            data={data}
          />
        );
      case 3:
        return <ReceiveTicket data={travlerInfo} />;
      default:
        break;
    }
  };

  const submitReserveTrip = async () => {
    const bodyData = { travler: travlerInfo, tripId: data.tripId };
    try {
      const message = await app
        .post("/reservation", bodyData)
        .then(({ data }) => data.data);
      toast.success(message);
      setStep((prev) => prev + 1);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "خطا");
    }
  };
  return <div className="flex flex-col gap-y-3">{renderStep(step)}</div>;
}

const TravelerInformation = ({
  register,
  handleSubmit,
  setStep,
  setTraveler,
}) => {
  const submitReserveTrip = async (data) => {
    setStep();
    setTraveler(data);
  };
  return (
    <>
      <div className="border border-gray-500 rounded-md p-5">
        <div className="flex flex-col gap-y-3 ">
          <span>13:30</span>
          <span>قم</span>
        </div>
        <div className="w-1 h-20 my-3 bg-gray-500 rounded-md"></div>
        <div className="flex flex-col gap-y-3 ">
          <span>2:30</span>
          <span>تهران</span>
        </div>
      </div>

      {/* Traveler Form */}
      <form onSubmit={handleSubmit(submitReserveTrip)}>
        <div className="grid grid-cols-3 gap-4">
          <input
            {...register("name")}
            type="text"
            name="name"
            placeholder="نام به لاتین"
          />
          <input
            {...register("lastName")}
            type="text"
            name="lastName"
            placeholder="نام خانوادگی به لاتین"
          />
          <input
            {...register("dateOfBirth")}
            type="date"
            name="dateOfBirth"
            placeholder="تاریخ تولد"
          />
          <select {...register("gender")} name="gender">
            <option value="men">مرد</option>
            <option value="women">زن</option>
          </select>
          <input
            {...register("nationality")}
            type="text"
            name="nationality"
            placeholder="ملیت"
          />
        </div>
        <button>رزرو</button>
      </form>
    </>
  );
};

const Payment = ({ data, handleSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flex flex-col gap-y-3">
        <span>مبلغ قابل پرداخت</span>
        <span>{data.price.toLocaleString()}</span>
      </div>
      <button>پرداخت</button>
    </form>
  );
};

const ReceiveTicket = ({ data }) => {
  return (
    <div className="flex flex-col gap-y-3">
      <span className="my-3">اطلاعات بلیط شما</span>
      <div>{data?.name}</div>
      <div>{data?.lastName}</div>
      <div>{data?.dateOfBirth}</div>
      <div>{data?.gender}</div>
      <div>{data?.nationality}</div>
    </div>
  );
};
