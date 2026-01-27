import { converToSecound } from "@/shared/function/hellpers";
import prisma from "../../../../lib/prisma";
export async function getFlighList(body) {
  const { origin, destination, flightDate, travelers, returnFlightDate } = body;
  const now = new Date();
  const newflightDate = new Date(flightDate);
  const flightTimeSeconds = converToSecound(now.toTimeString().split(" ")[0]);
  const isTodayFlightDate =
    newflightDate.getDay() === now.getDay() ? { gte: flightTimeSeconds } : {};
  let isReturnFlightDate = returnFlightDate ? true : false;

  const routeQuery = {
    origin: isReturnFlightDate ? { in: [origin, destination] } : origin,
    destination: isReturnFlightDate
      ? { in: [destination, origin] }
      : destination,
  };
  const flightList = await prisma.trip.findMany({
    where: {
      Route: routeQuery,
      flightDate: new Date(flightDate),
      flightTime: isTodayFlightDate,
      capacity: { gte: parseInt(travelers) },
    },
    include: { Route: true },
  });

  const message = `${flightList?.length ? "نتیجه جستجو" : "سفری یافت نشد"}`;
  return { data: flightList, message };
}
