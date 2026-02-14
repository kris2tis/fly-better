"use client";
import { http } from "@/httpServices";
import RHFTextField from "@/shared/components/ui/RHFTextField";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AccountForm({ data }) {
  const { register, handleSubmit } = useForm({ defaultValues: data });

  const handleUpdateAccount = async (accountData) => {
    try {
      const { message } = await http
        .put("/account", accountData)
        .then(({ data }) => data);
      toast.success(message);
    } catch (error) {
      const errorMessage = error?.response?.data?.data[0]?.errorMessage;
      console.log(error);
      toast.error(errorMessage);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleUpdateAccount)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        <RHFTextField
          register={register}
          label={"نام و نام خانوادگی"}  
          name={"fullName"}
        />
        <RHFTextField
          register={register}
          label={"کد ملی"}
          name={"nationalCode"}
        />
        <RHFTextField 
          register={register}
          label={"شماره موبایل"}
          name={"phoneNumber"}
        />
        <RHFTextField register={register} label={"ملیت"} name={"nationality"} />
        <RHFTextField register={register} label={"جنسیت"} name={"gender"} />
        <RHFTextField
          register={register}
          label={"تاریخ تولد"}
          name={"dateOfBirth"}
          type="date"
        />
        <button className="col-span-full bg-gray-400 py-3 rounded-md text-white">
          ذخیره اطلاعات
        </button>
      </div>
    </form>
  );
}
