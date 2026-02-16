"use client";

import { authClient } from "../../../../lib/auth-client";

import { useModal } from "@/shared/stores/modal-store";
import Button from "../ui/button";
import BackButton from "../ui/back-button";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { openModal } = useModal();
  const session = authClient.useSession();
  const user = session?.data?.session?.id;
  return (
    <header className="sticky top-0 z-50 text-xs bg-white">
      <div className="relative h-15 max-w-7xl mx-auto px-4 lg:px-0 py-3 flex items-center justify-start lg:justify-between border-b border-gray-300">
        <div className="absolute left-1/2 -translate-x-1/2 lg:static h-15 aspect-video">
          <Link href={"/"}>
            <div className="relative h-full">
              <Image src={"/brand/text-logo.svg"} alt="fly-today icon" fill />
            </div>
          </Link>
        </div>

        <div className=" flex items-center justify-between gap-10">
          <BackButton />
        </div>

        <Button className="hidden lg:block" variant="secondary">
          {user ? (
            <Link href={`/profile/dashboard`}>حساب کاربری</Link>
          ) : (
            <div onClick={() => openModal("auth/sign-up")}>
              <span className=" border-l pl-2 border-l-gray-300">ورود</span>
              <span className=" pr-2">ثبت نام</span>
            </div>
          )}
        </Button>
      </div>
    </header>
  );
}
