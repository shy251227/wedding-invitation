import { useEffect, useRef, useState } from "react";
import { Cover } from "./component/cover";
import { Location } from "./component/location";
import "./App.scss";
import { BGEffect } from "./component/bgEffect";
import { Invitation } from "./component/invitation";
import { Calendar } from "./component/calendar";
import { Gallery } from "./component/gallery";
import { Information } from "./component/information";
import { GuestBook } from "./component/guestbook";
import { LazyDiv } from "./component/lazyDiv";
import { ShareButton } from "./component/shareButton";
import { BGMPlayer } from "./component/bgmPlayer";
import { STATIC_ONLY } from "./env";

const musicPath = `${
  import.meta.env.BASE_URL
}music/635_Fall_in_Love.mp3`;

declare global {
  interface Window {
    Kakao: any;
  }
}

function App() {
  // --- BGM 중앙 관제 로직 ---
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isCoverOff, setIsCoverOff] = useState(false);

  // Cover를 클릭했을 때 실행될 함수
  const handleCoverClick = () => {
    if (isCoverOff) return; // 이미 열렸으면 중복 실행 방지

    const audio = audioRef.current;
    if (audio) {
      // 클릭과 동시에 바로 재생을 시도 (가장 확실한 방법)
      audio.play()
        .then(() => {
          // 재생 성공 시에만 상태를 업데이트합니다.
          setIsPlay(true);
          setIsCoverOff(true);
        })
        .catch(error => {
          // 실패 시 콘솔에 로그를 남겨 원인을 파악합니다.
          console.error("음악 재생 실패 (브라우저 정책 위반 가능):", error);
        });
    }
  };

  // BGM 아이콘을 클릭했을 때 실행될 함수
  const toggleBGM = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlay) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlay(!isPlay);
    }
  };
  // --- BGM 로직 끝 ---

  useEffect(() => {
    const kakaoJavascriptKey = import.meta.env.VITE_KAKAO_SDK_JS_KEY;
    if (kakaoJavascriptKey && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoJavascriptKey);
      console.log("Kakao SDK has been initialized.");
    }
  }, []);

  return (
    <div className="background">
      {/* audio 태그를 눈에 보이는 곳에 직접 배치하고 ref로 관리합니다. */}
      <audio ref={audioRef} src={musicPath} loop preload="auto" />

      <BGEffect />

      {/* BGMPlayer에게 현재 상태와 제어 함수를 props로 내려줍니다. */}
      <BGMPlayer isPlay={isPlay} onToggle={toggleBGM} />

      <div className="card-view">
        <LazyDiv className="card-group">
          {/* Cover에게 현재 상태와 제어 함수를 props로 내려줍니다. */}
          <Cover isCoverOff={isCoverOff} onCoverClick={handleCoverClick} />
          <Invitation />
        </LazyDiv>

        <LazyDiv className="card-group">
          <Calendar />
          <Gallery />
        </LazyDiv>
        <LazyDiv className="card-group">
          <Location />
        </LazyDiv>
        <LazyDiv className="card-group">
          <Information />
          {!STATIC_ONLY && <GuestBook />}
        </LazyDiv>
        <ShareButton />
      </div>
    </div>
  );
}

export default App;