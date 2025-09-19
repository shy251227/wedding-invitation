// src/index.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ModalProvider } from "./component/modal";
import { StoreProvider } from "./component/store";
// ❗ 추가: 카카오 SDK 초기화 함수를 불러옵니다.
import { initializeKakao } from "./kakao";
// ❗ 추가: .env 파일에서 카카오 SDK 키를 불러옵니다.
import { KAKAO_SDK_JS_KEY } from "./env";

// ❗ 추가: KAKAO_SDK_JS_KEY가 존재하면 카카오 SDK를 초기화합니다.
if (KAKAO_SDK_JS_KEY) {
  initializeKakao(KAKAO_SDK_JS_KEY);
} else {
  console.warn("VITE_KAKAO_SDK_JS_KEY 환경 변수가 설정되지 않았습니다. 카카오 공유 기능이 비활성화됩니다.");
}

// index.html 파일에서 'root' ID를 가진 DOM 요소를 찾아 React 앱의 루트로 설정합니다.
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// React 앱을 렌더링합니다.
root.render(
  // 개발 중 잠재적인 문제를 감지하기 위한 React StrictMode를 사용합니다.
  <React.StrictMode>
    {/* StoreProvider는 앱 전체의 전역 상태(예: SDK 로딩 여부)를 관리합니다. */}
    <StoreProvider>
      {/* ModalProvider는 앱 전체에서 사용될 모달(팝업) 기능을 제공합니다. */}
      <ModalProvider>
        {/* App 컴포넌트는 청첩장의 모든 내용을 담고 있는 최상위 컴포넌트입니다. */}
        <App />
      </ModalProvider>
    </StoreProvider>
  </React.StrictMode>
);

/*import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ModalProvider } from "./component/modal"
import { StoreProvider } from "./component/store"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <ModalProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ModalProvider>
  </React.StrictMode>,
)
*/