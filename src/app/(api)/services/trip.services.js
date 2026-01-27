import moment from "jalali-moment";
import prisma from "../../../lib/prisma";
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
  } = body;
  // const flightDate = changeDateToJalaaliDate(date);
  if (!routeId) {
    throw new Error("لطفا یک مسیر انتخاب کنید");
  }

  if (!capacity) {
    throw new Error("لطفا ظرفیت سفر را انتخاب کنید");
  }

  const route = await prisma.route.findUnique({
    where: { id: routeId },
    select: { distance: true },
  });
  const [flightTimeSeconds, landingTimeSeconds] = [flightTime, landingTime].map(
    (t) => converToSecound(t)
  );
  console.log("__________",flightTimeSeconds, landingTimeSeconds)
  const price = priceCalculation(classMultiplier, route.distance, capacity);

  await prisma.trip.create({
    data: {
      routeId,
      capacity: parseInt(capacity),
      price,
      classMultiplier,
      flightDate: new Date(flightDate),
      flightTime:flightTimeSeconds,
      landingTime:landingTimeSeconds,
    },
  });

  return { message: "سفر با موفقیت ساخته شد" };
}

const priceCalculation = (
  classMultiplier = "Economy",
  distance = 0,
  capacity = 0
) => {
  const fuelCost = distance * FuelCostPerKm;
  const tripCost = FixedCost + fuelCost;
  return (tripCost / capacity) * classMultipliers[classMultiplier];
};

//  تبدیل تایم به ثانیه
// گرفتن پرواز هایی که تاریخ بزرگ تر از انتخاب کاربر دارند و زمانشون هم بزرگتر از الان هست
// به حاظر اینکه ما میخوام بلیط هایی رو بگیریم که هنوز وقط برای گرفتن داریم
