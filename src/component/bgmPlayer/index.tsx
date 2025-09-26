import React, { useState, useRef, useEffect } from "react"
import "./index.scss" // 스타일 파일을 import 합니다.

// 아이콘은 직접 준비하시거나, 텍스트/이모지를 사용하셔도 좋습니다.
import playIcon from "../../icons/play-icon.png"
import pauseIcon from "../../icons/pause-icon.png"

export const BGMPlayer = () => {
  // 오디오 요소에 접근하기 위한 ref
  const audioRef = useRef<HTMLAudioElement>(null)

  // 재생 상태를 관리하기 위한 state
  const [isPlaying, setIsPlaying] = useState(false)

  // 재생/일시정지 토글 함수
  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(error => {
        // 사용자가 상호작용하기 전에 자동재생이 차단될 경우를 대비
        console.log("Autoplay was prevented:", error)
      })
    }
    setIsPlaying(!isPlaying)
  }

  // 컴포넌트가 처음 로드될 때 자동 재생 시도
  useEffect(() => {
    // 최신 브라우저에서는 사용자의 상호작용 없이는 자동 재생이 막히는 경우가 많습니다.
    // 그래서 버튼을 한 번 눌러야 재생이 시작되는 것이 일반적입니다.
    // 여기서는 일단 시도만 해보고, 실패하면 사용자가 버튼을 누를 때 재생됩니다.
    setTimeout(() => {
      togglePlayPause()
    }, 1000); // 1초 후 자동 재생 시도
  }, [])

  return (
    <>
      {/* 실제 오디오 파일 (화면에는 보이지 않음) */}
      <audio ref={audioRef} src="/music/636_Fall_in_Love.mp3" loop />

      {/* 재생/일시정지 컨트롤 버튼 */}
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