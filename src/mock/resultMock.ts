export type TrashItem = {
    id: number;
    name: string;
    type: string;
    img: string;
};

const BASE_ITEMS = [
    {
        id: 1,
        name: 'Clear PET Bottle',
        type: 'PLASTIC',
        img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20170310_116%2Fdameun2015_1489110502755e4vcC_JPEG%2F13454740554212189_-723787167.jpg&type=sc960_832',
    },
    {
        id: 2,
        name: 'Aluminum Can',
        type: 'METAL',
        img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20220318_255%2F1647565816861fUECG_JPEG%2F48701662564627048_1656266575.jpg&type=a340',
    },
    {
        id: 3,
        name: 'Cardboard Box',
        type: 'PAPER',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fshopping-phinf.pstatic.net%2Fmain_8916534%2F89165343334.jpg&type=f372_372',
    },
];

export const MOCK_ITEMS: TrashItem[] = Array.from({ length: 100 }, (_, i) => {
    const base = BASE_ITEMS[i % 3];

    return {
        id: i + 1,
        name: `${base.name} ${i + 1}`,
        type: base.type,
        img: base.img,
    };
});
