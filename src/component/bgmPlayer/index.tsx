import { useRef, useEffect } from "react";
import "./index.scss";
import playIcon from "../../icons/play-icon.png";
import pauseIcon from "../../icons/pause-icon.png";
import { useStore } from "../store";

const musicPath = `${
  import.meta.env.BASE_URL
}music/635_Fall_in_Love.mp3`;

export const BGMPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlay, setIsPlay } = useStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlay) {
      console.log("[BGMPlayer] 'isPlay'가 true이므로, 음악 재생을 시도합니다.");
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("[BGMPlayer] 음악 재생에 성공했습니다.");
          })
          .catch((error) => {
            console.error(
              "[BGMPlayer] 음악 재생에 실패했습니다. (브라우저 정책 위반일 가능성이 높습니다) 오류:",
              error
            );
            setIsPlay(false); // 실패 시, 버튼 모양을 원래대로 돌리기 위해 상태를 동기화합니다.
          });
      }
    } else {
      audio.pause();
    }
  }, [isPlay, setIsPlay]);

  const togglePlayPause = () => {
    setIsPlay(!isPlay);
  };

  return (
    <>
      {/* ✅ audio 태그에 preload="auto"를 추가합니다. */}
      <audio ref={audioRef} src={musicPath} loop preload="auto" />
      <div className="bgm-player">
        <button onClick={togglePlayPause} className="control-button">
          <img
            src={isPlay ? pauseIcon : playIcon}
            alt={isPlay ? "Pause BGM" : "Play BGM"}
          />
        </button>
      </div>
    </>
  );
};