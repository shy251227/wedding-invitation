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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isCoverOff, setIsCoverOff] = useState(false);

  // Cover를 클릭했을 때 실행될 함수
  const handleCoverClick = () => {
    if (isCoverOff) return; // 이미 열렸으면 중복 실행 방지

    audioRef.current?.play()
      .then(() => {
        // 재생에 '성공'했을 때만 상태를 업데이트합니다.
        setIsPlay(true);
        setIsCoverOff(true);
      })
      .catch(error => {
        // 음악 재생에 실패하더라도 청첩장은 볼 수 있도록 처리합니다.
        console.error("커버 클릭 후 음악 재생 실패:", error);
        setIsCoverOff(true);
      });
  };

  // BGM 아이콘을 클릭했을 때 실행될 함수
  const toggleBGM = () => {
    if (!audioRef.current) return;

    if (isPlay) {
      audioRef.current.pause();
      setIsPlay(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlay(true);
      }).catch(error => {
        console.error("BGM 아이콘 클릭 후 재생 실패:", error);
      });
    }
  };

  useEffect(() => {
    const kakaoJavascriptKey = import.meta.env.VITE_KAKAO_SDK_JS_KEY;
    if (kakaoJavascriptKey && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoJavascriptKey);
      console.log("Kakao SDK has been initialized.");
    }
  }, []);

  return (
    <div className="background">
      <audio ref={audioRef} src={musicPath} loop preload="auto" />
      <BGEffect />
      <BGMPlayer isPlay={isPlay} onToggle={toggleBGM} />
      <div className="card-view">
        <LazyDiv className="card-group">
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