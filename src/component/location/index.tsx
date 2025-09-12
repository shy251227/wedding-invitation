import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 울산 시내 버스 이용 시
            <br />
            <br />
             - 신복 로터리(114, 724, 1114번)
            <br />
             - 공업탑 로터리(724, 735번)
            <br />
             - 시외버스터미널(711, 721, 순환21번)
            <br />
             - 기타(118, 128, 762번)
            <br />
          </div>
          <div />
          <div className="content">
            * KTX 울산역 이용 시
            <br />
            - 5002번 리무진버스 <b>농심 메가마트 앞</b>에서 하차
            <br />
            - 5003번 리무진버스 <b>학성공원</b>에서 하차 후 <b>721번 환승</b>
            <br />
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            네이버 지도, 카카오 네비, 티맵 등 이용시
            <br />
            <b>W시티컨베션 울산 웨딩홀</b> 검색
            <br />
            <br />
            신선도원몰 <b>별관 1층부터 6층까지</b> 주차 가능합니다.
          </div>
          <div />
          <div className="content">
              ※ 식사 고객 <b>3시간 무료</b> 주차 가능하며,
              <br />
              주차권은 <b>답례품 교환처</b> 및 <b>뷔페 입구</b>에 준비되어있습니다.
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
