import React, { useEffect, useState } from 'react';
import './index.scss';
import { GROOM_FIRSTNAME, BRIDE_FIRSTNAME } from '../../const';

interface IntroProps {
  onEnter: () => void;
}

// 한글 자음, 모음 배열
const INITIALS = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const MEDIALS = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const FINALS = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

// 일정 시간 동안 기다리는 함수 (애니메이션 속도 조절)
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Intro: React.FC<IntroProps> = ({ onEnter }) => {
  const [namesText, setNamesText] = useState('');
  const [titleText, setTitleText] = useState('');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 타이핑 효과를 처리하는 비동기 함수
    const typeAll = async () => {
      const nameTarget = `${BRIDE_FIRSTNAME} ❤️ ${GROOM_FIRSTNAME}`;
      const titleTarget = '저희, 결혼합니다';

      await type(nameTarget, setNamesText); // 이름 먼저 타이핑
      await sleep(200); // 잠깐 쉬고
      await type(titleTarget, setTitleText); // 제목 타이핑

      await sleep(1000); // 모든 타이핑 후 1초 대기

      // 스르륵 사라지는 효과 시작
      setIsExiting(true);
      await sleep(500); // 0.5초 기다린 후
      onEnter(); // 메인 화면으로 전환
    };

    typeAll();
  }, [onEnter]);

  // 한글 조합 타이핑 로직
  const type = async (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    let currentString = '';
    for (const char of text) {
      const charCode = char.charCodeAt(0);
      // 한글 유니코드 범위 (가 ~ 힣)
      if (charCode >= 0xAC00 && charCode <= 0xD7A3) {
        const syllableIndex = charCode - 0xAC00;
        const initialIndex = Math.floor(syllableIndex / (21 * 28));
        const medialIndex = Math.floor((syllableIndex % (21 * 28)) / 28);
        const finalIndex = syllableIndex % 28;

        // 1단계: 초성 추가
        currentString += INITIALS[initialIndex];
        setter(currentString);
        await sleep(80);

        // 2단계: 중성 조합
        const combinedWithMedial = String.fromCharCode(charCode - finalIndex);
        currentString = currentString.slice(0, -1) + combinedWithMedial;
        setter(currentString);
        await sleep(80);

        // 3단계: 종성 조합 (있는 경우)
        if (finalIndex > 0) {
          currentString = currentString.slice(0, -1) + char;
          setter(currentString);
          await sleep(80);
        }
      } else {
        // 한글이 아닌 경우 (공백, &, 특수문자 등) 그냥 추가
        currentString += char;
        setter(currentString);
        await sleep(80);
      }
    }
  };


  return (
    <div className={`intro-container ${isExiting ? 'fade-out' : ''}`}>
      <div className="content">
        {/* 이제 state에 따라 텍스트가 실시간으로 변경됩니다. */}
        <div className="names">{namesText}</div>
        <div className="title">{titleText}</div>
      </div>
    </div>
  );
};

export default Intro;