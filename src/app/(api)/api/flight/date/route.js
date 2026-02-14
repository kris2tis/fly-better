import { getFlightDate } from "@/app/(api)/services/flight.services";

export async function GET() {
  try {
    const { flightList } = await getFlightDate();
    return Response.json({ data: flightList }, { status: 200 });
  } catch (error) {
    const { status } = error.response;
    return Response.json({ message: "خطایی رخ داده است" }, { status: status });
  }
}
 