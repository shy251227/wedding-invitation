import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2025-12-27 11:00", "Asia/Seoul")
export const HOLIDAYS = [15]

export const LOCATION = "W시티컨벤션 울산 웨딩홀"
export const LOCATION_ADDRESS = "울산 북구 진장17길 10"

export const SHARE_ADDRESS = LOCATION
export const SHARE_ADDRESS_TITLE = LOCATION

export const WEDDING_HALL_POSITION = [129.356197, 35.562663]

export const NMAP_PLACE_ID = 1946480978
export const KMAP_PLACE_ID = 1099072690

export const BRIDE_FULLNAME = "정하윤"
export const BRIDE_FIRSTNAME = "하윤"
export const BRIDE_TITLE = "장녀"
export const BRIDE_FATHER = "정길모"
export const BRIDE_MOTHER = "김차련"
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-9167-6675",
    account: "우리은행 0000000000000",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-0000-0000",
    account: "하나은행 00000000000",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-1234-0000",
    account: "하나은행 00000000000000",
  },
]

export const GROOM_FULLNAME = "차승훈"
export const GROOM_FIRSTNAME = "승훈"
export const GROOM_TITLE = "장남"
export const GROOM_FATHER = "차호준"
export const GROOM_MOTHER = "남미현"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-5513-7567",
    account: "하나은행 00000000000000",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-6653-7567",
    account: "신한은행 000000000000",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-5128-7567",
    account: "국민은행 000000000000",
  },
]
