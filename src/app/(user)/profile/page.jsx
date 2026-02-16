import ProfileSidebar from "@/features/profile/components/profile-sidebar";
export const metadata = {
  title: "حساب کاربری",
  description: "مدیریت حساب کاربری، سفارش‌ها و اطلاعات پروفایل شما.",
};

export default function Page() {
  return <ProfileSidebar className="lg:hidden" />;
}
