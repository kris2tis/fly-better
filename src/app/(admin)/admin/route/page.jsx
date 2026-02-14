"use client";

import { http } from "@/httpServices";
import { toast } from "sonner";

export default function page() {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const data = {
          origin: e.currentTarget.origin.value,
          destination: e.currentTarget.destination.value,
          distance: e.currentTarget.distance.value,

        };
        try {
          const { message } = await http
            .post("/route", data)
            .then(({ data }) => data);
          toast.success(message);
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.data?.message);
        }
      }}
    >
      <input type="text" name="origin" placeholder="مبدا" />
      <input type="text" name="destination" placeholder="مقصد" />
      <input type="text" name="distance" placeholder="فاصله" />

      <button>ایجاد مسیر</button>
    </form>
  );
}
