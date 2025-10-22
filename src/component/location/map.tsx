import { useEffect, useState, useRef } from "react"
import nmapIcon from "../../icons/nmap-icon.png"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import LockIcon from "../../icons/lock-icon.svg?react"
import UnlockIcon from "../../icons/unlock-icon.svg?react"
import {
  KMAP_PLACE_ID,
  LOCATION,
  NMAP_PLACE_ID,
  WEDDING_HALL_POSITION,
} from "../../const"

declare global {
  interface Window {
    naver: any
    Kakao: any
  }
}

export const Map = () => {
  return import.meta.env.VITE_NAVER_MAP_CLIENT_ID ? <NaverMap /> : <div>Map is not available</div>
}

const NaverMap = () => {
  const mapElement = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const [locked, setLocked] = useState(true)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const lockMessageTimeout = useRef<NodeJS.Timeout>()

  const checkDevice = () => {
    const userAgent = window.navigator.userAgent
    if (userAgent.match(/(iPhone|iPod|iPad)/)) {
      return "ios"
    } else if (userAgent.match(/(Android)/)) {
      return "android"
    } else {
      return "other"
    }
  }

  useEffect(() => {
    const script = document.createElement("script")
    //ncpClientId >> ncpKeyId
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${
        import.meta.env.VITE_NAVER_MAP_CLIENT_ID}`
    script.async = true
    script.onload = () => {
      if (mapElement.current) {
        const map = new window.naver.maps.Map(mapElement.current, {
          center: new window.naver.maps.LatLng(WEDDING_HALL_POSITION[0], WEDDING_HALL_POSITION[1]),
          zoom: 17,
        })
        new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(WEDDING_HALL_POSITION[0], WEDDING_HALL_POSITION[1]),
            map
        })
        mapInstance.current = map
      }
    }
    document.head.appendChild(script)

    return () => {
      mapInstance.current?.destroy()
    }
  }, [])

  return (
    <>
      <div className="map-wrapper">
        {locked && (
          <div
            className="lock"
            onTouchStart={() => {
              setShowLockMessage(true)
              clearTimeout(lockMessageTimeout.current)
              lockMessageTimeout.current = setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
            onMouseDown={() => {
              setShowLockMessage(true)
              clearTimeout(lockMessageTimeout.current)
              lockMessageTimeout.current = setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
          >
            {showLockMessage && (
              <div className="lock-message">
                <LockIcon /> 자물쇠 버튼을 눌러
                <br />
                터치 잠금 해제 후 확대 및 이동해 주세요.
              </div>
            )}
          </div>
        )}
        <button
          className={"lock-button" + (locked ? "" : " unlocked")}
          onClick={() => {
            clearTimeout(lockMessageTimeout.current)
            setShowLockMessage(false)
            setLocked((locked) => !locked)
          }}
        >
          {locked ? <LockIcon /> : <UnlockIcon />}
        </button>

        { /*ref를 map-inner가 아닌 map-wrapper의 자식 div에 직접 연결*/ }
        <div className="map-inner" ref={mapElement} style={{ height: '100%' }}></div>
      </div>
      <div className="navigation">
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                window.open(`nmap://place?id=${NMAP_PLACE_ID}`, "_self")
                break
              default:
                window.open(
                  `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
                  "_blank",
                )
                break
            }
          }}
        >
          <img src={nmapIcon} alt="naver-map-icon" />
          네이버 지도
        </button>
        <button
          onClick={() => {
            if (window.Kakao && window.Kakao.isInitialized()) {
              window.Kakao.Navi.start({
                name: LOCATION,
                x: WEDDING_HALL_POSITION[0],
                y: WEDDING_HALL_POSITION[1],
                coordType: "wgs84",
              })
            } else {
              window.open(
                `https://map.kakao.com/link/map/${KMAP_PLACE_ID}`,
                "_blank",
              )
            }
          }}
        >
          <img src={knaviIcon} alt="kakao-navi-icon" />
          카카오 내비
        </button>
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android": {
                const params = new URLSearchParams({
                  goalx: WEDDING_HALL_POSITION[1].toString(),
                  goaly: WEDDING_HALL_POSITION[0].toString(),
                  goalName: LOCATION,
                })
                window.open(`tmap://route?${params.toString()}`, "_self")
                break
              }
              default: {
                alert("모바일에서 확인하실 수 있습니다.")
                break
              }
            }
          }}
        >
          <img src={tmapIcon} alt="t-map-icon" />
          티맵
        </button>
      </div>
    </>
  )
}