import ReactQueryProvider from "./react-query-provider";

export default function Providers({ children }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
