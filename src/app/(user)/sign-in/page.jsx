import { headers } from "next/headers";
import { auth } from "../../../../lib/auth";
import { redirect } from "next/navigation";
import Auth from "@/features/auth/components/auth";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user?.id || null;
  if (user) {
    redirect("/");
  }
  return <Auth />;
}
