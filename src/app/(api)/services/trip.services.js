import prisma from "../../../../lib/prisma";
import { converToSecound } from "@/shared/function/hellpers";
// import { changeDateToJalaaliDate } from "@/shared/function/hellpers";
const FuelCostPerKm = 25000;
const FixedCost = 20000000;
const classMultipliers = { Economy: 1, Business: 2.5, First: 4 };

// premition trip.create
export async function addTrip(body) {
  const {
    routeId,
    capacity,
    classMultiplier,
    flightDate,
    flightTime,
    landingTime,
    airlineId,
  } = body;

  if (!routeId) {
    throw new Error("لطفا یک مسیر انتخاب کنید");
  }

  if (!capacity) {
    throw new Error("لطفا ظرفیت سفر را انتخاب کنید");
  }
  const [y, m, d] = flightDate.split("-");
  const date = new Date(Date.UTC(y, m - 1, d));

  const route = await prisma.route.findUnique({
    where: { id: routeId },
    select: { distance: true },
  });
  const [flightTimeSeconds, landingTimeSeconds] = [flightTime, landingTime].map(
    (t) => converToSecound(t),
  );
  const price = priceCalculation(classMultiplier, route.distance, capacity);

  await prisma.trip.create({
    data: {
      routeId,
      capacity: parseInt(capacity),
      price,
      classMultiplier,
      flightDate: new Date(date),
      flightTime: flightTimeSeconds,
      landingTime: landingTimeSeconds,
      airlineId: airlineId,
    },
  });

  return { message: "سفر با موفقیت ساخته شد" };
}

const priceCalculation = (
  classMultiplier = "Economy",
  distance = 0,
  capacity = 0,
) => {
  const fuelCost = distance * FuelCostPerKm;
  const tripCost = FixedCost + fuelCost;
  return (tripCost / capacity) * classMultipliers[classMultiplier];
};
