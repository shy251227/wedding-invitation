import React, { useState, useRef, useEffect } from "react"
import "./index.scss"

import playIcon from "../../icons/play-icon.png"
import pauseIcon from "../../icons/pause-icon.png"

// GitHub Pages 경로에 맞게 Vite 환경 변수를 사용하여 최종 경로 생성
const musicPath = `${import.meta.env.BASE_URL}music/636_fall_in_love.mp3`;

export const BGMPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // 자동 재생 시도 로직
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          setIsPlaying(true);
          console.log("음악 자동 재생 성공");
        }).catch(error => {
          setIsPlaying(false);
          console.log("자동 재생이 브라우저 정책에 의해 차단되었습니다.", error);
        });
      }
    }
  }, []); // 컴포넌트가 처음 로드될 때 한 번만 실행

  // 재생/일시정지 버튼 클릭 함수
  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <audio ref={audioRef} src={musicPath} loop />
      <div className="bgm-player">
        <button onClick={togglePlayPause} className="control-button">
          <img
            src={isPlaying ? pauseIcon : playIcon}
            alt={isPlaying ? "Pause BGM" : "Play BGM"}
          />
        </button>
      </div>
    </>
  )
}