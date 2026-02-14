import { Airplan } from "@/shared/assets/icons/icons";
import Button from "@/shared/components/ui/button";
import { convertDateToJalali, convertSecondToTime, getTimeDifference } from "@/shared/function/hellpers";

export const FlightInformation = ({ data }) => {
  const { flightTime, landingTime, flightDate } = data || {};

  const { route } = data || {};

  return (
    <div className="w-full bg-white border border-gray-300 rounded-2xl overflow-hidden">
      <div className="flex flex-col  flex-1 pt-6 flex-wrap relative">
        <div className="flex items-start justify-between">
          <div className="w-[70%] flex mb-1 pb-2 flex-col md:flex-row">
            <div className="flex items-center ps-6">
              <svg
                className="scale-x-[-1]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#001a4b"
                  d="M18.989 5.017a1.6 1.6 0 0 0-2.182-.6l-4.834 2.77L2.8 4.438.8 5.6l6.97 4-3.617 2.074L1.76 11 .006 12l2.606 1.955a1.6 1.6 0 0 0 1.317.279l3.537-.809a.788.788 0 0 0 .22-.086L18.394 7.2a1.6 1.6 0 0 0 .595-2.183z"
                ></path>
                <path
                  fill="#001a4b"
                  d="M18.4 19.2H.8a.8.8 0 0 1 0-1.6h17.6a.8.8 0 1 1 0 1.6z"
                ></path>
              </svg>
              <span className="ps-3 text-base font-semibold text-gray-900 w-fit max-w-full">
                پرواز رفت: {route.origin} به {route.destination}
              </span>
            </div>
            <div>
              <div className="flex ms-12 md:flex-row md:ms-2 md:ps-1 md:mt-0 md:pt-0 mt-2 pt-1 items-center">
                <div className="flex items-center flex-wrap gap-2 mb-0">
                  <div className="text-xs text-nowrap rounded-full py-1 px-2 bg-gray-50 text-gray-700">
                    سیستمی
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pl-6">
            <Button variant="secondary" className="rounded-full! text-sm!">
              تغییر بلیط
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4 ps-4">
            <div className="flex max-md:grid grid-cols-6">
              <div className="flex flex-col justify-between col-span-2">
                <div className="text-xl font-semibold text-center">
                  <span>{convertSecondToTime(flightTime)}</span>
                  <p className="text-xs text-blueTrout justify-center text-center font-medium leading-6 md:min-w-[115px] md:w-[115px]">
                    {convertDateToJalali(flightDate, "ddd d MMM")}
                  </p>
                </div>
                <p className="text-blueTrout justify-center text-center font-medium leading-6 lg:min-w-[115px] lg:w-[115px] flex items-center text-sm">
                  {getTimeDifference(
                    convertSecondToTime(landingTime),
                    convertSecondToTime(flightTime),
                  )}
                </p>
                <div className="text-xl font-semibold text-center">
                  <span>{convertSecondToTime(landingTime)}</span>
                  <p className="text-xs text-blueTrout justify-center text-center font-medium leading-6 md:min-w-[115px] md:w-[115px]">
                    {convertDateToJalali(flightDate, "ddd d MMM")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center relative col-span-1 mx-2.5 max-md:m-0 ">
                <div className="flex flex-col items-end max-md:items-center  relative">
                  <div className="font-bold text-base w-[55px] max-md:w-[45px] text-center relative flex justify-center">
                    {route?.origin || ""}
                  </div>
                </div>
                {/* Progres Line */}
                <div className="h-full flex flex-col items-center">
                  <Airplan className="rotate-135 mb-2" />
                  <div className="w-0.5 h-full bg-blue-300"></div>
                  <div className="w-2 h-2 rounded-full border-2 border-solid border-gray-600 bg-white"></div>
                </div>
                <div className="flex flex-col items-center relative">
                  <div className="font-bold text-base w-[55px] max-md:w-[45px] text-center relative flex justify-center pt-3">
                    {route?.destination || ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
