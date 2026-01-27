import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // plugins: [
  //   customSession(async ({ user, session }) => {
  //     const userData = await prisma.user.findUnique({
  //       where: { id: session.userId },
  //       include: {
  //         cart: {
  //           include: {_count: { select: { productItems: true } } },
  //         },
  //       },
  //     });

  //     return {
  //       user: {
  //         ...user,
  //         role: userData.role,
  //         cart: userData.cart,
  //       },
  //       session: session,
  //     };
  //   }),
  // ],
  emailAndPassword: { enabled: true },
});
