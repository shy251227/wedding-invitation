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
//import { useKakao } from "../store"

//const baseUrl = import.meta.env.BASE_URL

/*export const ShareButton = () => {
  const kakao = useKakao()
  return (
    <LazyDiv className="footer share-button">
      <button
        className="ktalk-share"
        onClick={() => {
          if (!kakao) {
            return
          }

          kakao.Share.sendDefault({
            objectType: "feed",
            content: {
              title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
              //년 월 일
              description:'25년 12월 27일 토요일 오전 11시 W시티 컨벤션 울산 웨딩홀',
              //실제 청첩장 이미지
              imageUrl:'https://github.com/shy251227/wedding-invitation/blob/main/src/images/image1.png',
              link: {
                mobileWebUrl:'https://shy251227.github.io/wedding-invitation/',
                webUrl:'https://shy251227.github.io/wedding-invitation/',
              },
            },
            buttons: [
              {
                title: "초대장 보기",
                link: {
                  mobileWebUrl: 'https://shy251227.github.io/wedding-invitation/',
                  webUrl:
                    window.location.protocol +
                    "//" +
                    window.location.host +
                    baseUrl,
                },
              },
            ],
          })
        }}
      >
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  )
}
*/
export const ShareButton = () => {
  // 카카오톡 공유 버튼 클릭 시 실행될 함수
  const handleShareKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: `${GROOM_FULLNAME} ❤️ ${BRIDE_FULLNAME}의 결혼식에 초대합니다.`,
          description: "25년 12월 27일 토요일 오전 11시 W시티 컨벤션 울산 웨딩홀",
          // 카카오톡에 표시될 대표 이미지
          imageUrl:
            "https://raw.githubusercontent.com/shy251227/wedding-invitation/main/src/images/cover.png", // 예시 이미지 URL
          link: {
            // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 합니다.
            mobileWebUrl: "https://shy251227.github.io/wedding-invitation/",
            webUrl: "https://shy251227.github.io/wedding-invitation/",
          },
        },
        buttons: [
          {
            title: "초대장 보기",
            link: {
              mobileWebUrl: "https://shy251227.github.io/wedding-invitation/",
              webUrl: "https://shy251227.github.io/wedding-invitation/",
            },
          },
        ],
      });
    }
  };

  return (
    <LazyDiv className="footer share-button">
      <button className="ktalk-share" onClick={handleShareKakao}>
        <img src={ktalkIcon} alt="ktalk-icon" /> 카카오톡으로 공유하기
      </button>
    </LazyDiv>
  );
};
