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

declare global {
  interface Window {
    Kakao: any;
  }
}

function App() {
  useEffect(() => {
    // Kakao SDK가 로드되었는지, 그리고 초기화되지 않았는지 확인합니다.
    if (window.Kakao && !window.Kakao.isInitialized()) {
      // .env 파일에서 JavaScript 키를 가져옵니다.
      const jsKey = import.meta.env.VITE_KAKAO_SDK_JS_KEY;

      if (jsKey) {
        window.Kakao.init(jsKey);
      } else {
        console.error("Kakao JavaScript Key가 .env 파일에 설정되지 않았습니다.");
      }
    }
  }, []);

function App() {
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
