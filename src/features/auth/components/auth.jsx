"use client";

import useIsDesktop from "@/shared/hooks/useIsDesktop";
import { useModal } from "@/shared/stores/modal-store";
import { useEffect } from "react";
import AuthForm from "./auth-form";

export default function Auth() {
  const { openModal, closeModal } = useModal();

  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (isDesktop) {
      openModal("auth/sign-in");
    } else {
      closeModal();
    }

    return () => closeModal();
  }, [isDesktop]);

  if (isDesktop) {
    return null;
  }

  return (
    <div className="fixed top-0 right-1/2 translate-x-1/2 w-full min-h-dvh bg-white z-100 flex justify-center">
      <AuthForm mode={"sign-in"} />
    </div>
  );
}
