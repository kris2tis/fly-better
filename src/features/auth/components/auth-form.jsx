"use client";

import { useForm } from "react-hook-form";
import { authClient } from "../../../../lib/auth-client";
import RHFTextField from "@/shared/components/ui/RHFTextField";

export default function AuthForm({ mode, data }) {
  const { handleSubmit, register } = useForm();
  const handleSignup = async (params) => {
    await authClient.signUp.email(data, {
      onSuccess: () => console.log("موفقیت امیز بود , شما وارد سایت شدید"),
      onError: (e) => console.log("خطا", e.error),
    });
  };
  const handleSignin = async (params) => {};

  const handleSubmitForm = (e) => {
    mode === "sign-up" ? handleSignup(e) : handleSignin(e);
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col gap-y-3">
        <RHFTextField
          label={"نام و نام خانوادگی"}
          name={"name"}
          register={register}
        />
        <RHFTextField label={"ایمیل"} name={"email"} register={register} />
        <RHFTextField
          label={"رمز عبور"}
          name={"password"}
          register={register}
        />
      <button>ثبت نام</button>
      </div>
    </form>
  );
}
