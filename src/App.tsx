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
import Intro from "./component/intro";

const musicPath = `${
  import.meta.env.BASE_URL
}music/635_Fall_in_Love.mp3`;

declare global {
  interface Window {
    Kakao: any;
  }
}

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const handleEnter = () => {
    setShowIntro(false);
    audioRef.current?.play().then(() => {
      setIsPlay(true);
    });
  };

  const toggleBGM = () => {
    if (!audioRef.current) return;
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlay(!isPlay);
  };

  useEffect(() => {
    const kakaoJavascriptKey = import.meta.env.VITE_KAKAO_SDK_JS_KEY;
    if (kakaoJavascriptKey && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoJavascriptKey);
    }
  }, []);

  return (
    <div className="App">
      {showIntro && <Intro onEnter={handleEnter} />}

      <div className={`background ${showIntro ? 'blurred' : ''}`}>
        <audio ref={audioRef} src={musicPath} loop preload="auto" />
        <BGEffect />
        <BGMPlayer isPlay={isPlay} onToggle={toggleBGM} />
        <div className="card-view">
          <LazyDiv className="card-group">
            {/* ▼▼▼ 이 부분을 isCoverOff={false} 로 수정합니다! ▼▼▼ */}
            <Cover isCoverOff={false} />
            {/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}
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
    </div>
  );
}

export default App;