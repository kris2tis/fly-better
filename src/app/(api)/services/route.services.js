import prisma from "../../../lib/prisma";

export async function addRoute(body) {
  const { origin, destination, distance } = body;

  if (!origin || !destination) {
    throw new Error("مبدا یا مقصد وجود ندارد");
  }

  await prisma.route.create({
    data: {
      destination: destination,
      origin: origin,
      distance: parseInt(distance),
    },
  });

  return { message: "مسیر با موفقیت ساخته شد" };
}
