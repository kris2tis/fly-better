import ModalProvider from "./modal-provider";
import ReactQueryProvider from "./react-query-provider";

export default function Providers({ children }) {
  return (
    <ReactQueryProvider>
      {children}
      <ModalProvider />
    </ReactQueryProvider>
  );
}
