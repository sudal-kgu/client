export type Step = {
    title: string;
    desc: string;
};

export type DetailItem = {
    id: number;
    name: string;
    type: string;
    img: string;
    steps: Step[];
};

const BASE_DETAIL = [
    {
        id: 1,
        name: 'Clear PET Bottle',
        type: '일반페트병',
        img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20170310_116%2Fdameun2015_1489110502755e4vcC_JPEG%2F13454740554212189_-723787167.jpg&type=sc960_832',
        steps: [
            { title: '내용물 비우기', desc: '음료/이물질을 비우고 가볍게 헹궈주세요.' },
            { title: '라벨 분리', desc: '가능하면 라벨/비닐을 떼어 분리해주세요.' },
            { title: '부피 줄이기', desc: '찌그러뜨려 부피를 줄여 배출해주세요.' },
        ],
    },
    {
        id: 2,
        name: 'Aluminum Can',
        type: '음료',
        img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220318_255%2F1647565816861fUECG_JPEG%2F48701662564627048_1656266575.jpg&type=a340',
        steps: [
            { title: '비우고 헹구기', desc: '내용물을 비우고 간단히 헹궈주세요.' },
            { title: '물기 제거', desc: '물기를 털고 말린 뒤 배출해주세요.' },
            { title: '혼합 재질 분리', desc: '플라스틱 뚜껑/비닐 등은 분리해서 배출해주세요.' },
        ],
    },
    {
        id: 3,
        name: 'Cardboard Box',
        type: '포장상자',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8916534%2F89165343334.jpg&type=f372_372',
        steps: [
            { title: '테이프 제거', desc: '테이프/스티커는 최대한 제거해주세요.' },
            { title: '접어서 배출', desc: '상자를 접어 부피를 줄여 배출해주세요.' },
            { title: '건조 후 배출', desc: '젖으면 재활용이 어렵습니다. 건조하여 배출해주세요.' },
        ],
    },
];

export const DETAIL_MOCK: DetailItem[] = Array.from({ length: 100 }, (_, i) => {
    const base = BASE_DETAIL[i % 3];

    return {
        id: i + 1,
        name: `${base.name} ${i + 1}`,
        type: base.type,
        img: base.img,
        steps: base.steps,
    };
});
