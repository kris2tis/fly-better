"use client";

import { Arrow } from "@/shared/assets/icons/icons";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const { back } = useRouter();
  const pathname = usePathname();
  const pathNameLength = pathname === "/" ? 1 : 2;
  const isShowBackBtn = pathNameLength > 1;
  return (
    isShowBackBtn && (
      <Arrow
        onClick={back}
        className="lg:hidden rotate-90 fill-brand"
        stroke="stroke-brand!"
        h="27"
        w="27"
      />
    )
  );
}
