import Header from "@/shared/components/layouts/header";
import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
