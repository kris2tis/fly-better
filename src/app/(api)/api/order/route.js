import { headers } from "next/headers";
import { auth } from "../../../../../lib/auth";
import {
  getOrderList,
  order,
  updateOrderStatus,
} from "../../services/order.services";

export async function GET() {
  const userData = await auth.api.getSession({ headers: await headers() });
  const userId = userData?.user.id;

  if (!userId) throw { message: "لطفا وارد سایت شوید", status: 401 };
  try {
    const { message, data } = await getOrderList(userId);
    return Response.json({ message: message, data: data }, { status: 200 });
  } catch (error) {
    const errorMessage = error?.message || "خطا سمت سرور";

    return Response.json(
      { message: errorMessage },
      { status: error?.status || 500 },
    );
  }
}

export async function POST(req) {
  const body = await req.json();

  try {
    const { message, data } = await order(body);

    return Response.json(
      { message: message, data: { orderId: data } },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage = error?.message || "خطا";
    console.log(error);

    return Response.json({ message: errorMessage }, { status: 400 });
  }
}

// یک درخواست برای هربار اپدیت کردن وضعیت پرداخت
export async function PUT(req) {
  const { status, orderId } = await req.json();
  
  try {
    const { message } = await updateOrderStatus(status, orderId);

    return Response.json({ message: message }, { status: 200 });
  } catch (error) {

    const errorMessage = error?.message || "خطا";
    return Response.json(
      { message: errorMessage },
      { status: error.status || 500 },
    );
  }
}
