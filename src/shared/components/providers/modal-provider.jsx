"use client";

import AuthForm from "@/features/auth/components/auth-form";
import { useModal } from "@/shared/stores/modal-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ModalProvider() {
  const { closeModal, isOpen, type } = useModal();
  const modalRef = useRef();
  const pathname = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (pathname === "/sign-in") {
          closeModal();
          push("/");
        } else {
          closeModal();
        }
      }
    }

    window.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("click", handleClick, true);
    };
  }, []);

  const renderComponent = (type) => {
    switch (type) {
      case "auth/sign-up":
        return <AuthForm mode={"sign-up"} />;
      case "auth/sign-in":
        return <AuthForm mode={"sign-in"} />;
      default:
        break;
    }
  };

  return (
    isOpen && (
      <div className="z-[1100] bg-black/50 fixed top-0 left-0 w-full h-full">
        <div
          ref={modalRef}
          className="fixed top-1/2 left-1/2 min-w-[250px] min-h-[100px] p-4 bg-white overflow-hidden rounded-2xl md:-translate-x-1/2 md:-translate-y-1/2 md:p-0 max-h-full"
        >
          {renderComponent(type)}
        </div>
      </div>
    )
  );
}
