import BookForm from "@/features/flight/components/book-form";
import { getFlight } from "@/shared/function/services";

export default async function Page({ params }) {
  const { id } = await params;

  const flight = await getFlight(id);

  return <BookForm data={{ ...flight, tripId: id }} />;
}
