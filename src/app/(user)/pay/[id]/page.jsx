import { FlightInformation } from "@/features/flight/components/flight-information";
import OrderDetils from "@/features/order/components/order-detils";
import { getOrder } from "@/shared/function/services";

export default async function page({ params }) {
  const { id } = await params;
  
  const order = await getOrder(id);

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-3">
      <div className="w-full lg:col-span-10">
        <FlightInformation data={order} />
      </div>
      <div className="w-full fixed z-fixed bottom-0 left-0 right-0 flex justify-center items-center transition-transform bg-white shadow-2md shadow-gray-900 lg:static lg:items-start lg:col-span-2">
        <OrderDetils data={{...order , orderId:id}} />
      </div>
    </div>
  );
}
