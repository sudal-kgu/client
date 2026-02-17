// 쓰레기 선택 모달 임시
import Modal from 'react-modal';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const TrashSelectModal = ({ isOpen, onClose }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Trash Select Modal"
            overlayClassName="fixed inset-0 z-50"
            className="absolute inset-0 bg-white"
        >
            <h1>Trash Select Modal</h1>
            <button onClick={onClose}>닫기</button>
        </Modal>
    );
};

export default TrashSelectModal;
