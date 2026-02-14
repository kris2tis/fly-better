import { converToSecound } from "@/shared/function/hellpers";
import prisma from "../../../../lib/prisma";

export async function getFlighList(body) {
  const {
    origin,
    destination,
    flightDate,
    classMultiplier,
    travelers,
    isReturnFlightDate,
    returnFlightDate,
  } = body;
  const now = new Date();

  const newflightDate = new Date(flightDate || now.toLocaleDateString());
  const returnFlight =
    isReturnFlightDate === "Return" && new Date(returnFlightDate);

  const flightTimeToSeconds = converToSecound(now.toTimeString().split(" ")[0]);
  const isTodayFlightDate =
    newflightDate.getDay() === now.getDay() ? { gte: flightTimeToSeconds } : {};

  const flightList = await prisma.trip.findMany({
    where: {
      route: {
        origin:
          isReturnFlightDate === "Return"
            ? { in: [origin, destination] }
            : origin,
        destination:
          isReturnFlightDate === "Return"
            ? { in: [destination, origin] }
            : destination,
      },
      classMultiplier: classMultiplier,
      flightDate:
        isReturnFlightDate === "Return"
          ? {
              in: [new Date(newflightDate), new Date(returnFlight)],
            }
          : new Date(newflightDate),
      flightTime: isTodayFlightDate,
      capacity: { gte: parseInt(travelers) },
    },
    include: { route: true },
  });

  const message = `${flightList?.length ? "نتیجه جستجو" : "سفری یافت نشد"}`;
  return { data: flightList, message };
}

export async function getFlightDate() {
  const flightList = await prisma.trip.findMany({
    select: { price: true, flightDate: true },
  });

  return { flightList };
}
