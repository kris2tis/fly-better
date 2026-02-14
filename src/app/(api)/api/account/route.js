import { UpdateAccountData } from "../../services/account.services";

export async function PUT(req) {
  const body = await req.json();
    console.log("body : ",body)
  try {
    const { message, status } = await UpdateAccountData(body);
    return Response.json({ message: message }, { status: status });

  } catch (error) {
    return Response.json(
      {
        message: error?.message || "خطایی رخ داده است",
        data: error.data || null,
      },
      { status: error?.status || 500 },
    );
  }
}
