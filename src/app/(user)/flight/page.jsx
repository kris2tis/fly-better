import FlightList from "@/features/flight/components/flight-list";
import SortDate from "@/features/flight/components/sort-date";

export default async function Page({ searchParams }) {
  const searchQuery = await searchParams;
  let queryParams = "?";
  for (const key in searchQuery) {
    const islastIndex = key === "returnFlightDate";
    if (searchQuery[key]) {
      queryParams += `${key}=${searchQuery[key]}${!islastIndex ? "&" : ""}`;
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-3">
      <div className="hidden lg:block lg:col-span-3"> فیلتر ها</div>
      <div className="col-span-1 lg:col-span-9 flex flex-col gap-y-3 ">
        <SortDate />
        <FlightList queries={queryParams} />
      </div>
    </div>
  );
}
