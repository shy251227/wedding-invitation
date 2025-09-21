import { useEffect } from "react"
import { Cover } from "./component/cover"
import { Location } from "./component/location"
import "./App.scss"
import { BGEffect } from "./component/bgEffect"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery"
import { Information } from "./component/information"
import { GuestBook } from "./component/guestbook"
import { LazyDiv } from "./component/lazyDiv"
import { ShareButton } from "./component/shareButton"
import { STATIC_ONLY } from "./env"

// TypeScript가 window.Kakao 객체를 인식할 수 있도록 전역 타입으로 선언합니다.
declare global {
  interface Window {
    Kakao: any
  }
}

function App() {
  // 앱이 처음 렌더링될 때 카카오 SDK를 초기화합니다.
  useEffect(() => {
    // .env 파일에서 Vite 환경 변수를 가져옵니다. (VITE_ 접두사 필요)
    const kakaoJavascriptKey = import.meta.env.VITE_KAKAO_SDK_JS_KEY

    // 키가 존재하고, window.Kakao 객체가 있으며, 아직 초기화되지 않았을 때 초기화를 실행합니다.
    if (kakaoJavascriptKey && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoJavascriptKey)
      console.log("Kakao SDK has been initialized.")
    }
  }, [])

  return (
    <div className="background">
      <BGEffect />
      <div className="card-view">
        <LazyDiv className="card-group">
          {/* 표지 */}
          <Cover />

          {/* 모시는 글 */}
          <Invitation />
        </LazyDiv>

        <LazyDiv className="card-group">
          {/* 결혼식 날짜 (달력) */}
          <Calendar />

          {/* 겔러리 */}
          <Gallery />
        </LazyDiv>

        <LazyDiv className="card-group">
          {/* 오시는길 */}
          <Location />
        </LazyDiv>

        <LazyDiv className="card-group">
          {/* 마음 전하기 */}
          <Information />
          {/* 방명록 */}
          {!STATIC_ONLY && <GuestBook />}
        </LazyDiv>

        <ShareButton />
      </div>
    </div>
  )
}

export default App