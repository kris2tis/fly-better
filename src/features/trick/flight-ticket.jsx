import { Airplan } from "@/shared/assets/icons/icons";
import {
  changeDateToJalaaliDate,
  convertSecondToTime,
  getTimeDifference,
} from "@/shared/function/hellpers";
import Image from "next/image";

export function FlightTicket({ ticket }) {
  const {
    flightTime,
    classMultiplier,
    flightDate,
    landingTime,
    airline,
    traveler,
    route,
  } = ticket;

  const { origin, destination } = route;
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#1a1d29] p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">شماره پرواز</p>
            <p className="text-2xl font-bold">{ticket.id}</p>
            <p className="text-sm mt-1 text-gray-300">
              {/* {ticket.flight.airline} */}
              {airline.name}
            </p>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-400">کد رزرو</p>
            <p className="text-2xl font-bold tracking-wider text-[#fdb913]">
              {ticket.pnrCode}
            </p>
          </div>
        </div>
      </div>

      {/* Flight Route  */}
      <div className="p-6 bg-linear-to-b from-gray-50 to-white">
        <div className="flex items-center justify-between gap-4">
          {/* Origin */}
          <div className="flex-1 text-center">
            <p className="text-sm text-gray-600">{origin}</p>
            <div className="mt-3">
              <p className="text-xl font-semibold text-[#1a1d29]">
                {convertSecondToTime(flightTime)}
              </p>
              <p className="text-xs text-gray-500">
                {changeDateToJalaaliDate(flightDate)}
              </p>
            </div>
          </div>

          {/* destination */}
          <div className="flex-1 text-center">
            <p className="text-sm text-gray-600">{destination}</p>
            <div className="mt-3">
              <p className="text-xl font-semibold text-[#1a1d29]">
                {convertSecondToTime(landingTime)}
              </p>
              <p className="text-xs text-gray-500">
                {" "}
                {changeDateToJalaaliDate(flightDate)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashed Line Separator */}
      <div className="w-full flex flex-col justify-center items-center gap-y-3 px-10 ">
        {getTimeDifference(
          convertSecondToTime(landingTime),
          convertSecondToTime(flightTime),
        )}
        <div className="border-t-2 border-dashed border-gray-300 relative w-full lg:w-2xl">
          <div className="absolute -right-6 -top-4 w-8 h-8 bg-white rounded-full border-2 border-dashed border-gray-300"></div>
          <div className="absolute -left-6 -top-4 w-8 h-8 bg-white rounded-full border-2 border-dashed border-gray-300"></div>
        </div>
      </div>

      {/* Passenger & Flight Details */}
      <div className="p-6 mt-5" >
        <div className="grid grid-cols-2 gap-6 mb-6 [&>div]:mx-auto">
          <div className="flex items-start gap-3">
            <div className=" w-10 h-10 bg-[#fdb913]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="relative h-7 aspect-square">
                <Image src={"/icons/profile.svg"} alt="profile icon" fill />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">مسافر</p>
              <p className="font-semibold text-[#1a1d29]">
                {traveler.name} {traveler.lastName}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#fdb913]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Airplan />
            </div>
            <div>
              <p className="text-xs text-gray-500">کلاس پروازی</p>
              <p className="font-semibold text-[#1a1d29]">{classMultiplier}</p>
            </div>
          </div>
        </div>

        {/* Barcode */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-[#1a1d29] p-4 rounded-lg">
            <div className="flex gap-0.5 h-16">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white"
                  style={{ height: "100%" }}
                ></div>
              ))}
            </div>
            <p className="text-xs text-[#fdb913] mt-2 tracking-wider font-semibold">
              {/* {ticket.bookingReference} */}
            </p>
          </div>
        </div>

        {/* Footer Info */}
        {/* <div className="mt-6 text-center text-xs text-gray-500">
          <p>لطفاً 2 ساعت قبل از پرواز در فرودگاه حضور داشته باشید</p>
        </div> */}
      </div>
    </div>
  );
}
