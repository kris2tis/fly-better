import { Airplan } from "@/shared/assets/icons/icons";
import { convertSecondToTime } from "@/shared/function/hellpers";
import Link from "next/link";

export const FlightCard = ({
  id,
  route,
  price,
  flightTime,
  landingTime,
  airline,
  capacity,
}) => {
  const { origin, destination } = route || {};

  return (
    <div class="relative mb-3 md:mb-4">
      <div class="border rounded-2xl hover:md:shadow transition-all duration-150 relative select-auto bg-white border-gray-300 px-4">
        <div class="flex flex-col md:flex-row flex-wrap  m-0">
          {/*  */}
          <Link
            href={`/flight/book/${id || ""}`}
            className="md:pointer-events-none w-full md:w-9/12 p-0"
          >
            <div class="">
              <div class="relative w-full flex h-full justify-center flex-col pt-2 border-l border-l-gray-100 max-md:border-l-0">
                <div class="w-full flex flex-col gap-4 md:gap-0">
                  <div class="relative ">
                    {/*  */}
                    <div class="w-full text-sm flex flex-col items-start md:flex-row">
                      <div class="w-3/12 md:w-2/12 px-0 flex md:items-center">
                        {/*  */}
                        <div class="flex flex-col justify-between items-start md:items-center max-md:mb-3 lg:flex-1 lg:basis-full lg:grow-0 mt-0 me-2">
                          <div class="flex flex-col items-center justify-center flex-1 max-md:items-start md:mt-2">
                            <div class="inline-block relative">
                              <p class="leading-6 font-bold text-center text-gray-900">
                                {airline?.name}
                              </p>
                            </div>
                            <div class="inline-block relative">
                              <p class="en-font text-gray-600 max-md:text-xs mt-1 text-xs font-bold">
                                VRH5800
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-9/12 md:w-10/12 flex flex-col md:flex-row justify-between ps-0 md:ps-4 md:pe-0 py-4 sm:py-0 ">
                        {/* origin */}

                        <div class="flex flex-col justify-start gap-x-2 mt-2 max-lg:mt-3.5 max-md:items-center max-md:flex-row max-md:mt-0">
                          {/* flight time */}
                          <div class="text-xl font-bold text-black-primary max-md:text-sm md:text-end justify-end items-end ">
                            <div class="inline-block relative py-1">
                              {convertSecondToTime(flightTime || 0)}
                            </div>
                          </div>
                          <div class="inline-block relative md:mt-2">
                            {/* origin */}
                            <div class="flex flex-col font-bold text-sm text-gray-900  max-md:text-center max-md:text-xs max-md:font-semibold max-md:[direction:revert]  text-end justify-end items-end w-full">
                              {origin || "قم"}
                            </div>
                          </div>
                        </div>
                        {/*  */}
                        <div class="hidden mx-0 md:mx-2 select-none md:flex items-center flex-1 mt-8 max-md:[position:unset]">
                          <div class="md:flex flex-col relative">
                            <span class=" icon-flight-left-direction z-1 absolute text-xl leading-none right-2.5 top-[12px]">
                              <Airplan className="rotate-227!" />
                            </span>
                            <span class="text-xs font-bold mt-4 pt-4 relative right-[9px]">
                              THR
                            </span>
                          </div>
                          <div class="relative md:flex flex-1">
                            <div class="border-none w-full h-px bg-gray-300"></div>
                            <div class="inline-block absolute -top-11 right-0 left-0">
                              <div class="flex justify-center">
                                <span class="whitespace-nowrap text-xs font-bold text-center px-3 text-brand-600 bg-bgBlueSky rounded-[14px] border border-secondaryBlueSky leading-5">
                                  30 دقیقه
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="hidden md:flex md:flex-col relative">
                            <div class="w-2 h-2 rounded-full border border-secondaryBlack absolute top-[20px]"></div>
                            {/* english destination */}
                            <span class="text-xs font-bold mt-4 pt-4 relative left-[7px]">
                              SRY
                            </span>
                          </div>
                        </div>

                        {/*  */}
                        <div className="flex items-center ">
                          <div class="flex flex-col md:hidden">
                            <div className="relative h-15 w-0.5 bg-gray-300">
                              <div className="absolute top-0 size-2 aspect-square bg-black right-1/2 translate-x-1/2 rounded-full"></div>
                              <div className="absolute bottom-0 size-2 aspect-square bg-black right-1/2 translate-x-1/2 rounded-full"></div>
                            </div>
                          </div>
                          {/*  */}
                          <div class=" w-full md:w-3/12 ps-0 md:ml-4 font-medium md:hidden flex-row-reverse md:flex-col py-2 justify-between items-end">
                            <div class="inline-block relative max-w-full">
                              <div class="flex items-center justify-center">
                                <div class="flex text-xs text-nowrap items-center justify-center py-1 px-2 rounded-full bg-gray-50 mr-3 text-gray-700 w-full">
                                  <div class="flex items-center w-full">
                                    <div class="text-black-secondary truncate p-0">
                                      20 کیلوگرم
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="inline-block relative me-4 md:me-0 md:my-2">
                              <div class="flex text-xs text-nowrap items-center justify-center py-1 px-2 rounded-full bg-gray-50 mr-3 text-gray-700">
                                {/* Flight type */}
                                <div class="flex flex-wrap">
                                  <span class="text-black-secondary">
                                    اکونومی
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* destination */}

                        <div class="flex flex-col mt-2 max-lg:mt-3.5 max-md:items-center max-md:flex-row max-md:mt-0">
                          <div class="text-xl font-bold w-[55px] text-black-primary max-md:text-sm text-start justify-start items-start max-md:text-center max-md:w-max max-md:mx-auto max-md:mr-0 max-md:ml-0">
                            <div class="inline-block relative py-1">
                              {convertSecondToTime(landingTime || 0)}
                            </div>
                          </div>
                          {/* destination */}
                          <div class="inline-block relative md:mt-2">
                            <div class="flex flex-col font-bold text-sm text-gray-900 [&amp;_p]:en-font [&amp;_p]:text-xs [&amp;_p]:text-center [&amp;_p]:text-blueTrout [&amp;_p]:m-0 max-md:text-xs max-md:font-semibold max-md:[direction:revert] max-md:[&amp;_p]:inline text-start justify-start items-start max-md:text-center max-md:w-max max-md:mx-auto max-md:mr-2 max-md:ml-0">
                              {destination || "0"}
                            </div>
                          </div>
                        </div>

                        <div class="hidden w-full md:w-3/12 ps-0 md:ml-4 font-medium md:flex flex-row-reverse md:flex-col py-2 justify-between items-end">
                          <div class="inline-block relative max-w-full">
                            <div class="flex items-center justify-center">
                              <div class="flex text-xs text-nowrap items-center justify-center py-1 px-2 rounded-full bg-gray-50 mr-3 text-gray-700 w-full">
                                <div class="flex items-center w-full">
                                  <span class=" icon-itinerary-luggage text-black-secondary me-1 text-lg leading-none"></span>
                                  <div class="text-black-secondary truncate p-0">
                                    20 کیلوگرم
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="inline-block relative me-4 md:me-0 md:my-2">
                            <div class="flex text-xs text-nowrap items-center justify-center py-1 px-2 rounded-full bg-gray-50 mr-3 text-gray-700">
                              {/* Flight type */}
                              <div class="flex flex-wrap">
                                <span class="text-black-secondary">
                                  اکونومی
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="me-3">
                            {/* chars */}
                            <span class="text-tn md:text-xs text-green-700 text-nowrap">
                              {capacity} باقیمانده
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/*  */}
          <div class="w-full md:w-1/4 min-h-[115px] ml-0 text-center flex p-3 flex-col justify-center items-center border-s border-[#eee] max-md:flex-row-reverse max-md:min-h-0 max-md:h-12 max-md:rounded-none max-md:border-t max-sm:border-[#d7d4d2] max-md:border-s-0 max-md:px-3   ">
            <div class="w-full flex flex-col justify-center max-md:flex-row max-md:[direction:initial] max-md:justify-between ">
              <div class="text-center text-gray-900 font-semibold leading-[1.83] max-md:flex max-md:leading-[2.2] max-md:items-center max-md:text-base [&amp;_p]:text-center [&amp;_p]:select-none [&amp;_p]:text-xs [&amp;_p]:block [&amp;_p]:whitespace-nowrap [&amp;_p]:leading-4 [&amp;_p]:max-md:text-base [&amp;_p]:max-md:ml-2 [&amp;_span:last-child]:select-none [&amp;_span:last-child]:text-gray-600 [&amp;_span:last-child]:text-[13px] [&amp;_span:last-child]:mr-[3px] [&amp;_span:last-child]:font-medium [&amp;_span:last-child]:max-md:text-xs">
                <div class="flex items-center text-green-secondary justify-center text-xl rtl">
                  <div class="flex justify-between items-center">
                    <div class="leading-none">
                      <span class="ltr text-xl">
                        {price?.toLocaleString() || "00,000,000"}
                      </span>{" "}
                      <span class="font-semibold text-xs text-green-secondary ms-0">
                        ریال
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Link href={`/flight/book/${id || ""}`}>
                <button
                  class="rounded-full border border-brand bg-brand text-white hover:bg-brand-700 hover:border-brand-700 hover:text-white transition duration-150 disabled:bg-zinc-300 disabled:text-zinc-600 disabled:border-zinc-300 w-full h-[42px] font-bold text-sm leading-none hidden md:block [&amp;_*]:no-underline [&amp;_*]:text-white"
                  type="submit"
                  data-test="show-flight-more-detail-0"
                >
                  جزئیات و خرید
                </button>
              </Link>
            </div>
            <div class="flex w-full items-center justify-start md:justify-center mt-1 flex-wrap content-end gap-1">
              <div class="flex text-xs md:hidden w-max text-nowrap items-center justify-center py-1 px-2 rounded-full bg-gray-50 mr-3 text-gray-700 ">
                <div class="flex items-center w-full">
                  <div class="text-black-secondary truncate p-0">
                    20 کیلوگرم
                  </div>
                </div>
              </div>
              <button
                class="hidden bg-white text-brand-600 hover:text-brand-900 [&amp;_path]:hover:fill-brand-900 transition duration-150 disabled:bg-zinc-300 disabled:text-zinc-600 disabled:border-zinc-300 transform scale-90 text-xs p-0 font-medium flex-1"
                type="submit"
                data-test=""
              >
                بار و قوانین
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
