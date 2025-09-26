import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StoreProvider } from "./component/store"; // ✅ StoreProvider를 가져옵니다.
import { ModalProvider } from "./component/modal";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* ✅ <App /> 전체를 <StoreProvider>로 감싸줍니다. */}
    <StoreProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </StoreProvider>
  </React.StrictMode>
);