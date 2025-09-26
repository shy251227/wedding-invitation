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
  // ✅ 게시판에서 필요한 기능들을 가져옵니다.
  const { isCoverOff, setIsCoverOff, setIsPlay } = useStore();

  const handleClick = () => {
    // 클릭되면 '커버 사라져라!' 라고 상태를 변경하고,
    setIsCoverOff(true);
    // 동시에 '음악 켜져라!' 라고 상태를 변경합니다.
    setIsPlay(true);
  };

  return (
    // ✅ className은 isCoverOff 상태에만 반응하도록 하고, 클릭 이벤트를 연결합니다.
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