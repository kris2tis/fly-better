import Header from "../../shared/components/layouts/header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="max-w-7xl min-h-[400px] mx-auto py-5">{children}</main>
    </>
  );
}
