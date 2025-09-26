import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
} from "../../const";
import { COVER_IMAGE } from "../../images";
import { LazyDiv } from "../lazyDiv";
import { useStore } from "../store";
import "./index.scss";

const DAY_OF_WEEK = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

export const Cover = () => {
  const { isCoverOff, setIsCoverOff, setIsPlay } = useStore();

  const handleClick = () => {
    // 진단용 로그: 클릭 이벤트가 실행되는지 확인합니다.
    console.log("[Cover] handleClick: 커버가 클릭되었습니다.");

    // 이미 커버가 열려있으면 중복 실행을 방지합니다.
    if (isCoverOff) return;

    // "커버 열어줘!" 신호 보내기
    setIsCoverOff(true);
    // "음악 재생해줘!" 신호 보내기
    setIsPlay(true);
    console.log("[Cover] handleClick: isCoverOff와 isPlay 상태를 true로 변경했습니다.");
  };

  return (
    <LazyDiv
      className={`card cover ${isCoverOff ? "off" : ""}`}
      onClick={handleClick}
    >
      <div className="wedding-date">
        {WEDDING_DATE.format("YYYY")}
        <div className="divider" />
        {WEDDING_DATE.format("MM")}
        <div className="divider" />
        {WEDDING_DATE.format("DD")}
      </div>
      <div className="wedding-day-of-week">
        {DAY_OF_WEEK[WEDDING_DATE.day()]}
      </div>
      <div className="image-wrapper">
        <img src={COVER_IMAGE} alt="sample" />
      </div>
      <div className="subtitle">Save the date for the wedding of</div>
      <div className="names">
        {GROOM_FULLNAME}
        <div className="divider" />
        {BRIDE_FULLNAME}
      </div>
      <div className="info">
        {WEDDING_DATE.format("YYYY년 MMMM D일 dddd A h시")}
      </div>
      <div className="info">{LOCATION}</div>
    </LazyDiv>
  );
};