import { getFlighList } from "../../services/flight.services";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const queriyParams = {};
  for (const [key, value] of searchParams.entries()) {
    queriyParams[key] = value;
  }
  try {
    const { message, data } = await getFlighList(queriyParams);
    
    return Response.json({ message: message, data: data }, { status: 200 });
  } catch (error) {
    const errorMessage = error?.message || "خطا";
    console.log(error.message);
    
    return Response.json({ message: errorMessage }, { status: 400 });
  }
}
