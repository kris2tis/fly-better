import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { NextResponse } from "next/server";

export async function proxy(req) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user?.id || null;

  if (!user) {
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin",],
};
