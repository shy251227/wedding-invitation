import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
} from "../../const";
import { COVER_IMAGE } from "../../images";
import { LazyDiv } from "../lazyDiv";
import "./index.scss";

const DAY_OF_WEEK = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

/**
 * 웹사이트의 메인 커버를 표시하는 프레젠테이션 컴포넌트입니다.
 * @param {object} props - 컴포넌트 프로퍼티
 * @param {boolean} props.isCoverOff - 커버가 사라지는 애니메이션을 적용할지 여부
 * @param {Function} props.onCoverClick - 커버가 클릭되었을 때 호출될 함수
 */
export const Cover = ({ isCoverOff, onCoverClick }) => {
  return (
    <LazyDiv
      className={`card cover ${isCoverOff ? "off" : ""}`}
      onClick={onCoverClick}
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