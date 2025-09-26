import "./index.scss";
import playIcon from "../../icons/play-icon.png";
import pauseIcon from "../../icons/pause-icon.png";

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