const TAG_CLASS_MAP: Record<string, string> = {
    '공통(가구류)': 'text-rose-200 bg-rose-500/20 border-rose-400/50',

    '고철(고철류)': 'text-sky-200 bg-sky-500/20 border-sky-400/50',
    '비철금속(고철류)': 'text-blue-200 bg-blue-500/20 border-blue-400/50',
    '주전자(고철류)': 'text-cyan-200 bg-cyan-500/20 border-cyan-400/50',
    '프라이팬(고철류)': 'text-teal-200 bg-teal-500/20 border-teal-400/50',

    '도마(나무)': 'text-orange-200 bg-orange-500/20 border-orange-400/50',
    '액자(나무)': 'text-amber-200 bg-amber-500/20 border-amber-400/50',
    '장식품(나무)': 'text-yellow-200 bg-yellow-500/20 border-yellow-400/50',
    '주걱(나무)': 'text-lime-200 bg-lime-500/20 border-lime-400/50',
    '주방용품(나무)': 'text-emerald-200 bg-emerald-500/20 border-emerald-400/50',

    '그릇류(도기류)': 'text-amber-200 bg-amber-500/20 border-amber-400/50',
    '뚝배기(도기류)': 'text-yellow-200 bg-yellow-500/20 border-yellow-400/50',
    '병(도기류)': 'text-orange-200 bg-orange-500/20 border-orange-400/50',
    '컵(도기류)': 'text-amber-100 bg-amber-400/20 border-amber-300/50',
    '항아리(도기류)': 'text-yellow-100 bg-yellow-400/20 border-yellow-300/50',
    '화분(도기류)': 'text-orange-100 bg-orange-400/20 border-orange-300/50',

    '식품봉지(비닐)': 'text-pink-200 bg-pink-500/20 border-pink-400/50',
    '리필용기(비닐)': 'text-fuchsia-200 bg-fuchsia-500/20 border-fuchsia-400/50',
    '봉투(비닐)': 'text-violet-200 bg-violet-500/20 border-violet-400/50',
    '에어캡(비닐)': 'text-purple-200 bg-purple-500/20 border-purple-400/50',
    '포장재(비닐)': 'text-indigo-200 bg-indigo-500/20 border-indigo-400/50',

    '네모트레이(스티로폼류)': 'text-cyan-200 bg-cyan-500/20 border-cyan-400/50',
    '보호재(스티로폼류)': 'text-sky-200 bg-sky-500/20 border-sky-400/50',
    '일반스티로폼(스티로폼류)': 'text-blue-200 bg-blue-500/20 border-blue-400/50',
    '포장용기(스티로폼류)': 'text-teal-200 bg-teal-500/20 border-teal-400/50',

    '기타술병(유리병)': 'text-purple-200 bg-purple-500/20 border-purple-400/50',
    '맥주병(유리병)': 'text-violet-200 bg-violet-500/20 border-violet-400/50',
    '박카스병(유리병)': 'text-fuchsia-200 bg-fuchsia-500/20 border-fuchsia-400/50',
    '소주병(유리병)': 'text-indigo-200 bg-indigo-500/20 border-indigo-400/50',
    '음료병(유리병)': 'text-blue-200 bg-blue-500/20 border-blue-400/50',

    '상의(의류)': 'text-red-200 bg-red-500/20 border-red-400/50',
    '원피스(의류)': 'text-rose-200 bg-rose-500/20 border-rose-400/50',
    '하의(의류)': 'text-pink-200 bg-pink-500/20 border-pink-400/50',

    '두발자전거(자전거)': 'text-lime-200 bg-lime-500/20 border-lime-400/50',

    'TV(전자제품)': 'text-red-200 bg-red-500/20 border-red-400/50',
    '가습기(전자제품)': 'text-orange-200 bg-orange-500/20 border-orange-400/50',
    '냉장고(전자제품)': 'text-yellow-200 bg-yellow-500/20 border-yellow-400/50',
    '세탁기(전자제품)': 'text-green-200 bg-green-500/20 border-green-400/50',
    '컴퓨터(전자제품)': 'text-cyan-200 bg-cyan-500/20 border-cyan-400/50',

    '노트(종이)': 'text-amber-200 bg-amber-500/20 border-amber-400/50',
    '상자류(종이)': 'text-yellow-200 bg-yellow-500/20 border-yellow-400/50',
    '신문지(종이)': 'text-orange-200 bg-orange-500/20 border-orange-400/50',
    '음료수곽(종이)': 'text-lime-200 bg-lime-500/20 border-lime-400/50',
    '포장상자(종이)': 'text-emerald-200 bg-emerald-500/20 border-emerald-400/50',

    '음료(캔류)': 'text-sky-200 bg-sky-500/20 border-sky-400/50',
    '통조림(캔류)': 'text-blue-200 bg-blue-500/20 border-blue-400/50',

    '일회용컵(페트병류)': 'text-emerald-200 bg-emerald-500/20 border-emerald-400/50',
    '일반페트병(페트병류)': 'text-green-200 bg-green-500/20 border-green-400/50',

    '대용량통(플라스틱)': 'text-teal-200 bg-teal-500/20 border-teal-400/50',
    '밀폐용기(플라스틱)': 'text-cyan-200 bg-cyan-500/20 border-cyan-400/50',
    '바구니(플라스틱)': 'text-sky-200 bg-sky-500/20 border-sky-400/50',
    '욕실용품(플라스틱)': 'text-blue-200 bg-blue-500/20 border-blue-400/50',
    '장난감(플라스틱)': 'text-indigo-200 bg-indigo-500/20 border-indigo-400/50',

    '공통(형광등)': 'text-yellow-200 bg-yellow-500/20 border-yellow-400/50',
};
export function tagClass(type: string) {
    return TAG_CLASS_MAP[type];
}
