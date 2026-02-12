import { useNavigate } from 'react-router-dom';

type TrashItem = {
    id: number;
    name: string;
    type: string;
    img: string;
};

type Props = {
    items: TrashItem[];
};

export default function TrashResult({ items }: Props) {
    const navigate = useNavigate();

    return (
        <div className="trashPage">
            <div className="trashHeader">
                <button className="iconBtn" onClick={() => navigate(-1)} aria-label="back">
                    ←
                </button>
                <div className="trashHeaderTitle">쓰레기 분류 결과</div>
            </div>

            <div className="trashGrid">
                {items.map((item) => (
                    <div key={item.id} className="trashCard">
                        <img className="trashCardImg" src={item.img} alt={item.name} />
                        <div className="trashTag">{item.type}</div>
                        <div className="trashName">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
