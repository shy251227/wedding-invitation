import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  SHARE_ADDRESS,
  SHARE_ADDRESS_TITLE,
  WEDDING_DATE,
} from "../../const"
import ktalkIcon from "../../icons/ktalk-icon.png"
import { LazyDiv } from "../lazyDiv"

const baseUrl = import.meta.env.BASE_URL

export const ShareButton = () => {
  const handleShare = () => {
    // window.Kakao 객체가 존재하고 초기화되어 있는지 확인합니다.
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendDefault({
        objectType: "location",
        address: SHARE_ADDRESS,
        addressTitle: SHARE_ADDRESS_TITLE,
        content: {
          title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
          description:
            WEDDING_DATE.format("YY년 MMMM D일 dddd A h시") +
            "\n" +
            LOCATION,
          imageUrl:
            window.location.protocol +
            "//" +
            window.location.host +
            baseUrl +
            "/cover3.jpg",
            /*▲▲▲public 안에서 수정 하세요▲▲▲*/
          link: {
            mobileWebUrl:
              window.location.protocol + "//" + window.location.host + baseUrl,
            webUrl:
              window.location.protocol + "//" + window.location.host + baseUrl,
          },
        },
        buttons: [
          {
            title: "청접장 보기",
            link: {
              mobileWebUrl:
                window.location.protocol +
                "//" +
                window.location.host +
                baseUrl,
              webUrl:
                window.location.protocol +
                "//" +
                window.location.host +
                baseUrl,
            },
          },
        ],
      })
    } else {
      alert("카카오 SDK가 로드되지 않았습니다.")
    }
  }

  return (
    <LazyDiv className="footer share-button">
      <button className="ktalk-share" onClick={handleShare}>
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
