import { Suspense } from "react";
import Loading from "../../../shared/components/ui/loading";
import ProfileSidebar from "@/features/profile/components/profile-sidebar";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-12 gap-x-5">
      <ProfileSidebar className="hidden lg:flex" />
      <div className="col-span-12 lg:col-span-7">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
