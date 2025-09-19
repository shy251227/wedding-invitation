// src/kakao.ts

// 전역 Window 객체에 Kakao가 있음을 선언 (TypeScript 오류 방지용)
declare global {
  interface Window {
    Kakao: any;
  }
}

/**
 * 카카오 SDK를 동적으로 로드하고 초기화하는 함수
 * @param jsKey 카카오 개발자 사이트에서 발급받은 JavaScript 키
 */
export const initializeKakao = (jsKey: string) => {
  // 스크립트가 이미 존재하는지 ID로 확인하여 중복 로드를 방지합니다.
  if (document.getElementById("kakao-sdk-script")) {
    console.log("Kakao SDK 스크립트가 이미 존재합니다. 재초기화 시도.");
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(jsKey);
      console.log("Kakao SDK 재초기화 완료 (스크립트 이미 존재).");
    }
    return;
  }

  // 새로운 script 태그를 생성합니다.
  const script = document.createElement("script");
  script.id = "kakao-sdk-script"; // 스크립트의 고유 ID 설정
  // ⭐⭐⭐ 이 부분이 가장 중요합니다! 카카오 CDN URL을 직접 지정 ⭐⭐⭐
  script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
  script.async = true; // 스크립트를 비동기적으로 로드하여 페이지 렌더링을 막지 않습니다.

  // 스크립트 로드가 완료되면 실행될 함수를 정의합니다.
  script.onload = () => {
    // window.Kakao 객체가 유효하고 아직 초기화되지 않았다면 초기화합니다.
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(jsKey);
      console.log("Kakao SDK 초기화 완료:", window.Kakao.isInitialized());
    } else if (window.Kakao) {
      console.log("Kakao SDK는 이미 초기화되어 있습니다.");
    } else {
      console.error("Kakao SDK 로드 실패: window.Kakao 객체 없음 또는 로드 실패.");
    }
  };

  // 스크립트 로드 중 오류가 발생하면 실행될 함수를 정의합니다.
  script.onerror = (error) => {
    console.error("Kakao SDK 스크립트 로드 중 오류 발생:", error);
  };

  // 생성한 스크립트 태그를 HTML 문서의 <head> 부분에 추가합니다.
  document.head.appendChild(script);
};