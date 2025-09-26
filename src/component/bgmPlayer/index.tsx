import "./index.scss";
import playIcon from "../../icons/play-icon.png";
import pauseIcon from "../../icons/pause-icon.png";

// isPlay와 onToggle 함수를 props로 전달받습니다.
export const BGMPlayer = ({ isPlay, onToggle }) => {
  return (
    <div className="bgm-player">
      <button onClick={onToggle} className="control-button">
        <img
          src={isPlay ? pauseIcon : playIcon}
          alt={isPlay ? "Pause BGM" : "Play BGM"}
        />
      </button>
    </div>
  );
};