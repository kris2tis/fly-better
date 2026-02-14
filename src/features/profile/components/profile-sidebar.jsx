"use client";

import Link from "next/link";
import { authClient } from "../../../../lib/auth-client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfileSidebar({ className = "" }) {
  const session = authClient.useSession();
  const userName = session?.data?.user?.fullName || "";
  return (
    <div
      className={`${className} col-span-12 lg:col-span-5 flex flex-col gap-y-3`}
    >
      <div className="flex flex-col gap-y-2">
        <span className="text-sm">سلام</span>
        <div className="font-semibold text-lg lg:text-sm">{userName}</div>
      </div>
      <NavigaitonList />
    </div>
  );
}

const navigationList = [
  {
    title: "داشبورد",
    description: "پشتیبانی , باشگاه مشتریان",
    iconSrc: "/icons/grid.svg",
    href: "/profile",
  },
  {
    title: "اطلاعات کاربری",
    description: "ویرایش و افزودن اطلاعات شخصی",
    iconSrc: "/icons/profile.svg",
    href: "/profile/account",
  },
  {
    title: "سفارشات",
    description: "سفارشات لغو و انجام شده",
    iconSrc: "/icons/debit-purches.svg",
    href: "/profile/purchases",
  },
  {
    title: "علاقه مندی",
    description: "اطلاعات مسافر ها و مدیرت علاقه مندی ها",
    iconSrc: "/icons/heart.svg",
    href: "/profile/bookmarks",
  },
];

const NavigaitonList = () => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col gap-y-3">
      {navigationList.map((n, i) => (
        <NavigationCard key={i} {...n} />
      ))}
      <span
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                push("/");
                toast.success("از حساب خارج شدید");
              },
            },
          });
        }}
        className="text-red-500 text-center lg:hidden"
      >
        خروج
      </span>
    </div>
  );
};

const NavigationCard = ({ title, description, iconSrc, href }) => {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <Link
      class={`flex gap-3 justify-between items-center p-3 rounded-2xl border-solid bg-brand-50 border-2 border-slate-300 ${isActive && "lg:border-gray-900!"} transition-all duration-200`}
      href={href}
    >
      <div className="relative h-7 aspect-square">
        <Image src={iconSrc} alt={`${description} icon`} fill />
      </div>
      <div class="flex flex-col flex-1 shrink justify-center self-stretch w-1/2">
        <span class="text-sm font-medium leading-loose text-gray-900">
          {title}
        </span>
        <span class="mt-0 text-xs font-normal text-gray-700 truncate">
          {description}
        </span>
      </div>
      <span class="icon-chevron-left text-2xl text-slate-900"></span>
    </Link>
  );
};
