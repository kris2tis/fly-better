"use client";

import SearchFlightForm from "@/features/flight/components/search-flight-form";

export default function HeroSection() {
  return (
    <section className="border border-gray-300 px-3 py-5 rounded-2xl">
      <SearchFlightForm />
    </section>
  );
}
