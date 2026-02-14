import { getOrder } from "@/app/(api)/services/order.services";
import { FlightTicket } from "@/features/trick/flight-ticket";

export default async function page({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  return <FlightTicket ticket={order?.data || {}} />;
}
