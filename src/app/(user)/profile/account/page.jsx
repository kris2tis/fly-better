import AccountForm from "@/features/profile/components/account-form";
import { auth } from "../../../../../lib/auth";
import { headers } from "next/headers";
export const metadata = {
  title: "اطلاعات حساب",
  description: "ویرایش اطلاعات حساب کاربری شما در Fly Betteer.",
};

export default async function page() {
  const userData = await auth.api.getSession({ headers: await headers() });
  const user = userData?.user;
  return (
    <div className="flex flex-col gap-y-3">
     اطلاعات کاربری
      <AccountForm data={user} />
    </div>
  );
}
