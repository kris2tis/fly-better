import { getOrder } from "@/app/(api)/services/order.services";

export async function GET(req, { params }) {
  const { orderId } = await params;

  try {
    const { message, data } = await getOrder(orderId);

    return Response.json({ message: message, data: data }, { status: 200 });
  } catch (error) {
    const errorMessage = error?.message || "خطا";
    return Response.json({ message: errorMessage }, { status: 400 });
  }
}
