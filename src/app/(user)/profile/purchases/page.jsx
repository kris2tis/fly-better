import { getOrderList } from "@/shared/function/services";
import OrderList from "../../../../features/order/components/order-list";

export const metadata = {
  title: "سفارش‌های من",
  description: "لیست سفارش‌ها و وضعیت خریدهای شما در Fly Betteer.",
};

export default async function page() {
  const orderlist = await getOrderList();

  if (!orderlist?.length) {
    return <div className="flex justify-center items-center pt-5 h-full">
      <span className="text-sm">سفارشی وجود ندارد!</span>
    </div>;
  }

  return (
    <div className="flex flex-col gap-y-3">
      سفارشات
      <OrderList orderList={orderlist} />
    </div>
  );
}
