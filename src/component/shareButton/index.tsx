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
import { useKakao } from "../store"

const baseUrl = import.meta.env.BASE_URL

export const ShareButton = () => {
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
/*import { useEffect } from "react"
// ERROR FIX: 빌드 오류를 해결하기 위해 파일 경로를 상대 경로로 수정했습니다.
import ktalkIcon from "../../icons/ktalk-icon.png"
import "./index.scss"

// TypeScript가 window.Kakao를 인식하도록 설정합니다.
declare global {
  interface Window {
    Kakao: any
  }
}

export const ShareButton = () => {
  const currentUrl = window.location.href

  // 컴포넌트가 처음 로딩될 때 카카오 SDK를 초기화합니다.
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("7d71cfdbf0064e046226776f19adfde2")
    }
  }, [])

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      alert("링크가 복사되었습니다. 원하는 곳에 붙여넣기 하세요.")
    } catch (e) {
      alert("복사에 실패하였습니다")
    }
  }

  // 카카오톡 공유 버튼을 눌렀을 때 실행될 함수
  const handleShareKakao = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "정하윤 💕 차승훈 결혼합니다.",
          description: "25년 12월 27일 토요일 오전 11시 W시티 컨벤션 울산 웨딩홀",
          imageUrl:
            "https://raw.githubusercontent.com/shy251227/wedding-invitation/main/src/images/cover.png",
          link: {
            mobileWebUrl: "https://shy251227.github.io/wedding-invitation/",
            webUrl: "https://shy251227.github.io/wedding-invitation/",
          },
        },
        buttons: [
          {
            title: "청첩장 보러가기",
            link: {
              mobileWebUrl: "https://shy251227.github.io/wedding-invitation/",
              webUrl: "https://shy251227.github.io/wedding-invitation/",
            },
          },
        ],
      })
    }
  }

  return (
    <div className="share-button-container">
      <div className="text">공유하기</div>
      <div className="button-wrapper">
        {/* 카카오톡 공유 버튼에 onClick 이벤트 연결 }
        <div className="button" onClick={handleShareKakao}>
          <img src={ktalkIcon} alt="카카오톡으로 공유하기" />
        </div>
        <div className="button" onClick={handleCopyClipboard}>
          <i className="fa-solid fa-link" />
        </div>
      </div>
    </div>
  )
}*/
