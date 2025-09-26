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
 * 메인 커버 UI를 담당하는 단순한 컴포넌트입니다.
 * @param {object} props - 상위 컴포넌트로부터 전달받는 속성
 * @param {boolean} props.isCoverOff - 커버 애니메이션 적용 여부
 * @param {Function} props.onCoverClick - 커버 클릭 시 호출될 함수
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