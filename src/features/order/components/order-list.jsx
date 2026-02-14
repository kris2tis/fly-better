import moment from "jalali-moment";
import { convertSecondToTime} from "../../../shared/function/hellpers";
import Link from "next/link";
import { Airplan, Arrow } from "@/shared/assets/icons/icons";

export default function OrderList({ orderList }) {
  return (
    <div className="flex flex-col gap-y-3 py-3">
      {orderList.map((order) => (
        <OrderCard key={order.id} {...order} />
      ))}
    </div>
  );
}

const statuses = {
  RESERVED: {
    message: "آغاز پرداخت",
    style: "bg-blue-100 text-blue-800 ",
  },
  PAID: {
    message: "پرداخت شده",
    style: "bg-green-100 text-green-800 ",
  },
};
const OrderCard = ({ id, status, trip }) => {
  const { flightDate, flightTime, price } = trip || {};
  const { destination, origin } = trip?.route || {};


  return (
    <Link href={`/pay/${id}`}>
      <div className="flex items-center justify-between gap-x-3 p-3 border rounded-2xl border-gray-300 text-sm">
        <Airplan />
        <div className="flex items-center gap-x-2 ">
          <span>{origin || ""}</span>
          <Arrow className="rotate-270" />
          <span>{destination || ""}</span>
        </div>

        <span>
          {convertSecondToTime(flightTime || "00:00")} -{" "}
          {moment(
            new Date(flightDate || "1970/0/0").toLocaleDateString(),
            "MM/DD/YYYY",
          )
            .locale("fa")
            .format("YYYY/MM/DD")}
        </span>
        <div>
          تومان
          <span className="font-extrabold mx-1">
            {price?.toLocaleString() || "000,000,000"}{" "}
          </span>
        </div>
        <div>
          <span
            className={`${statuses[status || "RESERVED"].style} py-1 px-2 rounded-full text-xs `}
          >
            {statuses[status || "RESERVED"]?.message}
          </span>
        </div>
      </div>
    </Link>
  );
};
