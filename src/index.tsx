import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { StoreProvider } from "./component/store"
import { ModalProvider } from "./component/modal"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <StoreProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </StoreProvider>
  </React.StrictMode>,
)