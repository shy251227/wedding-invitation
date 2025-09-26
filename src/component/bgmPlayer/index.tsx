import React, { useState, useRef, useEffect } from "react"
import "./index.scss"

import playIcon from "../../icons/play-icon.png"
import pauseIcon from "../../icons/pause-icon.png"

const musicPath = `${import.meta.env.BASE_URL}music/636_fall_in_love.mp3`;

export const BGMPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // ✅ 컴포넌트가 마운트될 때 한 번만 실행됩니다.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // play() 함수는 Promise를 반환합니다.
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // 자동 재생이 성공했을 때
          setIsPlaying(true);
          console.log("음악이 자동 재생되었습니다.");
        })
        .catch(error => {
          // 자동 재생이 브라우저에 의해 차단되었을 때
          setIsPlaying(false);
          console.log("자동 재생이 차단되었습니다:", error);
        });
      }
    }
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 함

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
            src={isPlaying ? pauseIcon : playIcon} // 아이콘 순서를 원래대로 되돌렸습니다.
            alt={isPlaying ? "Pause BGM" : "Play BGM"}
          />
        </button>
      </div>
    </>
  )
}