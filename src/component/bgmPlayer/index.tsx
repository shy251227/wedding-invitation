import React, { useState, useRef, useEffect } from "react";
import "./index.scss";

import playIcon from "../../icons/play-icon.png";
import pauseIcon from "../../icons/pause-icon.png";

// ✅ 실제 파일 이름과 대소문자를 정확하게 일치시켰습니다.
const musicPath = `${import.meta.env.BASE_URL}music/635_Fall_in_Love.mp3`;

export const BGMPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 자동 재생 시도 로직
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // play() 함수는 Promise를 반환합니다. 이를 통해 성공/실패 여부를 알 수 있습니다.
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 자동 재생에 성공한 경우
            setIsPlaying(true);
            console.log("BGM 자동 재생에 성공했습니다.");
          })
          .catch((error) => {
            // 자동 재생에 실패한 경우 (브라우저 정책에 의해 차단될 확률이 높음)
            setIsPlaying(false);
            console.log("BGM 자동 재생이 브라우저 정책에 의해 차단되었습니다. 오류:", error);
          });
      }
    }
  }, []); // 이 컴포넌트가 처음 로드될 때 한 번만 실행됩니다.

  // 재생/일시정지 버튼 클릭 함수
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
};

  return (
    <>
      <audio ref={audioRef} src={musicPath} loop preload="auto" />
      <div className="bgm-player">
        <button onClick={togglePlayPause} className="control-button">
          <img
            src={isPlaying ? pauseIcon : playIcon}
            alt={isPlaying ? "Pause BGM" : "Play BGM"}
          />
        </button>
      </div>
    </>
  );
};