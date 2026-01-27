import { getFlighList } from "../../services/flight.services";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const body = {};
  for (const [key, value] of searchParams.entries()) {
    body[key] = value;
  }
  try {
    const { message, data } = await getFlighList(body);

    return Response.json({ message: message, data: data }, { status: 200 });
  } catch (error) {
    const errorMessage = error?.message || "خطا";
    return Response.json({ message: errorMessage }, { status: 400 });
  }
}
