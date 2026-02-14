import { headers } from "next/headers";
import prisma from "../../../../lib/prisma";
import { auth } from "../../../../lib/auth";
import { generatePNR } from "../api/helpers/function";

export async function getOrder(id) {
  const order = await prisma.order.findUnique({
    where: { id: id },
    include: {
      trip: { include: { route: true, airline: true } },
      traveler: true,
    },
  });

  const data = { ...order, ...order?.trip };
  return { data: data };
}
export async function getOrderList(userId) {
  const orderList = await prisma.order.findMany({
    where: { userId: userId },
    include: { trip: { include: { route: true, airline: true } } },
  });

  return { data: orderList };
}

export async function order(body) {
  const { tripId, travler } = body;
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id || null;

  if (!userId) {
    throw new Error("لطفا وارد سایت شوید");
  }
  if (!tripId) {
    throw new Error("لطفا یک سفر را انتخاب کنید");
  }

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });

  if (trip?.id) {
    if (trip.capacity > 0) {
      const travevler = await prisma.traveler.create({
        data: {
          name: travler.name,
          lastName: travler.lastName,
          dateOfBirth: travler.dateOfBirth,
          gender: travler.gender,
          nationality: travler.nationality,
          userId: userId,
        },
      });

      const order = await prisma.order.create({
        data: {
          travelerId: travevler.id,
          tripId: tripId,
          userId: userId,
          status: "RESERVED",
        },
      });

      return { message: "سفر شما با موفقیت ثبت شد", data: order.id };
    } else {
      return { message: "ظرفیت سفر به اتمام رسیده است" };
    }
  } else {
    throw new Error("سفری وجود ندارد");
  }
}

export async function updateOrderStatus(status, orderId) {
  switch (status) {
    case "PAID":
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID", pnrCode: generatePNR() },
      });
      return { message: "پرداخت با موفقیت انجام شد", status: 200 };
    default:
      throw { message: "وضعیت معتبر نیست" };
  }
}
