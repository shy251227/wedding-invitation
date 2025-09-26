import { useRef, useEffect } from "react";
import "./index.scss";
import playIcon from "../../icons/play-icon.png";
import pauseIcon from "../../icons/pause-icon.png";
import { useStore } from "../store";

const musicPath = `${
  import.meta.env.BASE_URL
}music/636_Fall_in_Love.mp3`;

export const BGMPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  // ✅ BGM 플레이어는 오직 isPlay 상태만 신경 씁니다.
  const { isPlay, setIsPlay } = useStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlay) {
      audio.play().catch(() => setIsPlay(false));
    } else {
      audio.pause();
    }
  }, [isPlay, setIsPlay]);

  // ✅ 재생/일시정지 버튼은 isPlay 상태만 껐다 켰다 합니다.
  const togglePlayPause = () => {
    setIsPlay(!isPlay);
  };

  return (
    <>
      <audio ref={audioRef} src={musicPath} loop />
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