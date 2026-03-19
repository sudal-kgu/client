import type { Locale, Step } from 'react-joyride';

export const TOUR_STEPS: Step[] = [
    {
        target: '.tour-title',
        content: '여기는 쓰레기 분류 결과를 확인하는 페이지입니다.',
        disableBeacon: true,
        placement: 'bottom',
    },
    {
        target: '.tour-card',
        content: '각 카드에서 분류 결과와 이미지를 확인할 수 있습니다.',
    },
    {
        target: '.tour-detail-button',
        content: '카드를 누르면 상세 분류 페이지로 이동합니다.',
    },
    {
        target: '.tour-bottom',
        content: '아래로 스크롤하면 다음 결과를 계속 불러옵니다.',
    },
];
export const JOYRIDE_LOCALE: Locale = {
    back: '이전',
    close: '닫기',
    last: '완료',
    next: '다음',
    skip: '건너뛰기',
};
