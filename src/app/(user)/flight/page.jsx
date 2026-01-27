import FlightList from "@/features/flight/components/flight-list";

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
    <div className="flex flex-col gap-y-3">
      <span>لیست پرواز ها</span>
      <FlightList queries={queryParams} />
    </div>
  );
}
