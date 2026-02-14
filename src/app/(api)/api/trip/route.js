import { addTrip } from "../../services/trip.services";

export async function POST(req) {
     const body = await req.json();
    
      try {
        const { message } = await addTrip(body);
    
        return Response.json({ message: message }, { status: 200 });
      } catch (error) {
        const errorMessage = error?.message || "خطا";
        return Response.json({ message: errorMessage }, { status: 400 });
      }
}

