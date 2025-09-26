import "./index.scss";
import playIcon from "../../icons/play-icon.png";
import pauseIcon from "../../icons/pause-icon.png";

/**
 * BGM 플레이어의 UI를 담당하는 단순한 컴포넌트입니다.
 * @param {object} props - 상위 컴포넌트로부터 전달받는 속성
 * @param {boolean} props.isPlay - 현재 재생 중인지 여부
 * @param {Function} props.onToggle - 버튼 클릭 시 호출될 함수
 */
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