import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
  user: {
    additionalFields: {
      fullName: {
        type: "string",
        required: false,
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    customSession(async ({ user, session }) => {
      const userData = await prisma.user.findUnique({
        where: { id: session.userId },
      });

      return {
        user: {
          ...userData,
        },
        session: session,
      };
    }),
  ],
  emailAndPassword: { enabled: true },
});
