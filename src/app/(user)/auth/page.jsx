import AuthForm from "@/features/auth/components/auth-form";
import { headers } from "next/headers";
import { auth } from "../../../../lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user?.id || null;
  if (user) {
    redirect("/");
  }
  return (
    <div className="max-w-2xl mx-auto py-5">
      <AuthForm mode={"sign-up"} />
    </div>
  );
}
