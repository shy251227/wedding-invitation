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
  const { isPlay, setIsPlay } = useStore();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    console.log("BGMPlayer: isPlay 상태가 변경되었습니다. 현재 값:", isPlay);

    if (isPlay) {
      console.log("BGMPlayer: 음악 재생을 시도합니다...");
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 재생에 성공했을 때
            console.log("BGMPlayer: 음악 재생에 성공했습니다.");
          })
          .catch((error) => {
            // 재생에 실패했을 때 (가장 중요한 부분!)
            console.error("BGMPlayer: 음악 재생에 실패했습니다. 오류:", error);
            // 재생에 실패했으므로, isPlay 상태를 다시 false로 되돌려 버튼 모양을 원래대로 맞춥니다.
            setIsPlay(false);
          });
      }
    } else {
      console.log("BGMPlayer: 음악을 일시 정지합니다.");
      audio.pause();
    }
  }, [isPlay, setIsPlay]);

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