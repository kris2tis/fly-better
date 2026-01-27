import { headers } from "next/headers";
import { auth } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export async function addReservation(body) {
  const { tripId, travler } = body;
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id || null;
  console.log("_________",travler)
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

      await prisma.reservation.create({
        data: { travelerId: travevler.id, tripId: tripId },
      });

      await prisma.trip.update({
        where: { id: tripId },
        data: { capacity: trip.capacity - 1 },
      });

      return { message: "سفر شما با موفقیت ثبت شد" };
    } else {
      return { message: "ظرفیت سفر به اتمام رسیده است" };
    }
  } else {
    throw new Error("سفری وجود ندارد");
  }
}
