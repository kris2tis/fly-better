import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="w-full flex justify-between border-b border-b-gray-300 py-3 ">
      <div className="flex items-center gap-x-3">
        <Link href="/">
          <span className="font-semibold text-lg">فلای بتر</span>
        </Link>
        <Link href="/flight">
          <span>پرواز ها</span>
        </Link>
      </div>
      <div>
        <button className="border border-gray-300 p-2 rounded-md text-xs">
          <Link href="/auth">
            <span className="">ورود | ثبت نام</span>
          </Link>
        </button>
      </div>
    </header>
  );
}
