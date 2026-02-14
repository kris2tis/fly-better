"use client";

import { http } from "@/httpServices";
import Button from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function OrderDetils({ data }) {
  const { push } = useRouter();
  const handlePay = async () => {
    const { message } = await http
      .put("/order", {
        status: "PAID",
        orderId: data.orderId,
      })
      .then(({ data }) => data);
    toast.success(message);
    push(`/ticket/${data.orderId}`);
  };
  return (
    <div className="flex flex-row-reverse items-center justify-between lg:flex-col w-full border p-3 lg:rounded-2xl">
      <div className="lg:border-b lg:py-1 lg:w-full flex flex-col items-start lg:flex-row lg:justify-between lg:items-center text-xs">
        <span>مبلغ</span>
        <span>{data?.price.toLocaleString()} تومان</span>
      </div>
      <Button
        className="w-max lg:w-full mt-2"
        variant="primary"
        onClick={handlePay}
      >
        تایید و پرداخت
      </Button>
    </div>
  );
}
