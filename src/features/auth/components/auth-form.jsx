"use client";

import { useForm } from "react-hook-form";
import { authClient } from "../../../../lib/auth-client";
import RHFTextField from "@/shared/components/ui/RHFTextField";
import Image from "next/image";
import { useModal } from "@/shared/stores/modal-store";
import { toast } from "sonner";
import { useState } from "react";
import useIsDesktop from "@/shared/hooks/useIsDesktop";
import { Close } from "@/shared/assets/icons/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function AuthForm({ mode }) {
  const { handleSubmit, register } = useForm();
  const { openModal, closeModal } = useModal();
  const [isLoading, setIsLoading] = useState();
  const [formMode, setFormMode] = useState(mode);
  const isDesktop = useIsDesktop();
  const { push } = useRouter();
  const handleSignup = async (data) => {
    setIsLoading(true);
    await authClient.signUp.email({
      ...data,
      callbackURL : "/",
      fetchOptions: {
        onSuccess: () => {
          toast.success("با موفقیت ثبت نام شدید");
          push("/");
        },
        onError: (e) => toast.error(`عملیات با خطا مواجه شد ${e.error.status}`),
        onResponse: () => {
          setIsLoading(false);
          closeModal();
        },
      },
    });
  };
  const handleSignin = async (data) => {
    await authClient.signIn.email(data, {
      onSuccess: () => toast.success("با موفقیت وارد شدید"),
      onError: (e) => toast.error(`عملیات با خطا مواجه شد ${e.error.status}`),
      onResponse: () => {
        setIsLoading(false);
        closeModal();
      },
    });
  };

  const handleSubmitForm = (e) => {
    formMode === "sign-up" ? handleSignup(e) : handleSignin(e);
  };
  return (
    <div class="w-full lg:max-w-lg px-5">
      <div class="relative flex items-center justify-between w-full h-14 px-5 pt-5">
        <span class="icon-cross text-brand-600 text-2xl cursor-pointer"></span>
      </div>
      <div class="flex justify-between lg:justify-center">
        <Image
          alt="logo"
          fetchpriority="high"
          loading="eager"
          width="170"
          height="50"
          decoding="async"
          data-nimg="1"
          class="max-w-full object-contain"
          src="https://cdn-a.cdnfl2.ir/upload/flytoday/public/white-labels/flytoday/images/logo.svg"
        />
        <Link href={"/"} className="lg:hidden">
          <Close />
        </Link>
      </div>
      <div class="w-full  md:pb-12">
        <div>
          <div class="flex item-center justify-center mt-14 mb-8">
            <div class="text-base text-gray-900 border-l border-l-gray-400 pl-2 ">
              {formMode === "sign-up" ? "ثبت نام" : "ورود"}
            </div>
            <span className="pr-2">
              {formMode === "sign-up"
                ? "اطلاعات خود را وارد کنید"
                : "ایمیل و رمز عبور را وارد کنید"}
            </span>
          </div>
          <div class="flex flex-col gap-6">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div class="flex flex-col gap-y-2">
                {formMode === "sign-up" && (
                  <RHFTextField
                    label={"نام و نام خانوادگی"}
                    register={register}
                    name={"fullName"}
                  />
                )}

                <RHFTextField
                  label={"ایمیل"}
                  register={register}
                  name={"email"}
                />
                <RHFTextField
                  label={"رمز عبور"}
                  register={register}
                  name={"password"}
                />
                <button
                  class="border  bg-brand  text-white  hover:text-white transition duration-150 w-full md:w-auto md:mt-1 h-12 rounded-lg  disabled:bg-gray-300 disabled:text-white disabled:border-gray-300"
                  type="submit"
                  data-test=""
                >
                  {mode === "sign-up" ? "ثبت نام" : "ورود"}
                </button>
              </div>
            </form>
          </div>
          <div className="text-xs mt-3">
            {formMode === "sign-up"
              ? "حساب کاربری ندارد ؟"
              : "حساب کاربری دارید ؟"}
            <span
              className="font-black cursor-pointer mr-1"
              onClick={() => {
                if (isDesktop) {
                  openModal(
                    formMode === "sign-up" ? "auth/sign-in" : "auth/sign-up",
                  );
                  setFormMode(formMode === "sign-up" ? "sign-in" : "sign-up");
                }

                !isDesktop &&
                  setFormMode(formMode === "sign-up" ? "sign-in" : "sign-up");
              }}
            >
              {formMode === "sign-up"
                ? isLoading
                  ? "..."
                  : "وارد شوید"
                : isLoading
                  ? "..."
                  : "ثبت نام کنید"}
            </span>
          </div>
          <div class="text-xs text-gray-900 leading-6 mt-8">
            با ورود یا ثبت‌نام در فلای&nbsp;بتر شما موافقت خود را با{" "}
            <a
              href="https://www.flytoday.ir/privacypolicy"
              target="_blank"
              // style="font-weight:600"
            >
              قوانین و مقررات
            </a>{" "}
            استفاده از خدمات و سیاست‌های حریم خصوصی ما اعلام می‌کنید.
          </div>
        </div>
      </div>
    </div>
  );
}
