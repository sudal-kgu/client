export type TabType = '정화' | '시설' | '상품';

export type ShopItem = {
    id: number;
    name: string;
    description: string;
    cost: number;
    imageEmoji: string;
    locked?: boolean;
    requiredLevel?: number;
};

export const PURIFY_ITEMS: ShopItem[] = [
    {
        id: 1,
        name: '플라스틱 더미',
        description: '주변의 플라스틱 쓰레기를 정리합니다',
        cost: 50,
        imageEmoji: '🗑️',
    },
    {
        id: 2,
        name: '캔 쓰레기',
        description: '주변의 금속류 쓰레기를 정리합니다',
        cost: 50,
        imageEmoji: '🥫',
    },
    {
        id: 3,
        name: '종이/박스 더미',
        description: '주변의 종이 쓰레기를 정리합니다',
        cost: 50,
        imageEmoji: '📦',
    },
    {
        id: 4,
        name: '오염된 토양 정화',
        description: '오염된 땅을 깨끗한 흙으로 정화합니다',
        cost: 50,
        imageEmoji: '🌱',
    },
    {
        id: 5,
        name: '오염수 제거',
        description: '더러워진 물을 깨끗한 정수로 만듭니다',
        cost: 50,
        imageEmoji: '💧',
    },
    {
        id: 6,
        name: '풀 심기',
        description: '정화된 땅에 생명을 되찾습니다',
        cost: 50,
        imageEmoji: '🌿',
    },
];

export const FACILITY_ITEMS: ShopItem[] = [
    {
        id: 101,
        name: '재활용 분류기',
        description: '배출 품목 1개당 🐚200 추가 획득',
        cost: 10000,
        imageEmoji: '♻️',
        requiredLevel: 1,
    },
    {
        id: 102,
        name: '대기 정화 타워',
        description: '퀴즈 1회당 🐚500·☢️500 보너스',
        cost: 20000,
        imageEmoji: '🏭',
        requiredLevel: 2,
    },
    {
        id: 103,
        name: '풍력 발전소',
        description: '💎5/h 자동 생산 · 인접 구역 +5%',
        cost: 10000,
        imageEmoji: '🌬️',
        requiredLevel: 3,
    },
    {
        id: 104,
        name: '폐기물 분류기',
        description: '💎10/h 자동 생산',
        cost: 10000,
        imageEmoji: '🗂️',
        requiredLevel: 4,
    },
    {
        id: 105,
        name: '옷 재활용 공장',
        description: '퀴즈 보상 ☢️+25%',
        cost: 10000,
        imageEmoji: '👕',
        requiredLevel: 4,
    },
    {
        id: 106,
        name: '플라스틱 재활용 공장',
        description: '💎50/h · 섬 전체 생산량 +10%',
        cost: 100000,
        imageEmoji: '🏗️',
        requiredLevel: 5,
    },
];

export const REWARD_ITEMS: ShopItem[] = [
    {
        id: 201,
        name: '편의점 500원 할인쿠폰',
        description: 'CU, GS25, 세븐일레븐 · 월 3회 한도',
        cost: 100000,
        imageEmoji: '🏪',
    },
    {
        id: 202,
        name: '교통 마일리지 1,000점',
        description: '지자체 교통카드, 따릉이',
        cost: 200000,
        imageEmoji: '🚌',
    },
    {
        id: 203,
        name: '온라인 적립금 2,000원',
        description: '네이버쇼핑, 에코 전문몰',
        cost: 400000,
        imageEmoji: '🛍️',
    },
    {
        id: 204,
        name: '아메리카노 1잔 무료',
        description: '다회용컵 사용 카페',
        cost: 1000000,
        imageEmoji: '☕',
    },
];
