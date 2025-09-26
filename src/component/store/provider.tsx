/* eslint-disable @typescript-eslint/no-explicit-any */

import { PropsWithChildren, useState } from "react";
import { StoreContext } from "./context";

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [naver, setNaver] = useState<any>(null);
  const [kakao, setKakao] = useState<any>(null);

  // BGM과 커버 상태를 분리해서 만듭니다.
  const [isPlay, setIsPlay] = useState(false);
  const [isCoverOff, setIsCoverOff] = useState(false);

  // 모든 컴포넌트가 이 값들을 쓸 수 있도록 value에 담아줍니다.
  const value = {
    naver,
    setNaver,
    kakao,
    setKakao,
    isPlay,
    setIsPlay,
    isCoverOff,
    setIsCoverOff,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};