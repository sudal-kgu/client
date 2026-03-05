import React from 'react';

import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import overlay from '../assets/Overlay.svg';

Modal.setAppElement('#root');
export default function ExitModal() {
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const subtitleRef = React.useRef<HTMLHeadingElement | null>(null);
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        if (subtitleRef.current) subtitleRef.current.style.color = '#00ff14';
    }
    function closeModal() {
        setIsOpen(false);
    }
    function exitPage() {
        setIsOpen(false);
        navigate(-1);
    }
    return (
        <div>
            <button onClick={openModal} />
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Exit Modal"
                className="outline-none"
                overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
            >
                <div className="w-full max-w-[340px] overflow-hidden rounded-[18px] border border-white/10 bg-[#162019] p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                    <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-amber-400/10">
                        <img src={overlay} alt="warning" />
                    </div>
                    <h2
                        ref={subtitleRef}
                        className="text-center text-[16px] font-semibold leading-6"
                    >
                        지금 돌아가면 분석 결과가 사라져요!
                    </h2>
                    <div className="mt-2 text-center text-[13px] text-white/70">
                        정말 나가시겠습니까?
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                        <button
                            onClick={closeModal}
                            className="h-11 rounded-[12px] bg-emerald-400 text-[14px] font-semibold text-[#0b120e] hover:brightness-95 active:scale-[0.99]"
                        >
                            계속하기
                        </button>
                        <button
                            onClick={exitPage}
                            className="h-11 rounded-[12px] border border-white/10 bg-white/5 text-[14px] font-medium text-white/85 hover:bg-white/10 active:scale-[0.99]"
                        >
                            나가기
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
