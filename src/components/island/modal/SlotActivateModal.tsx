import ReactModal from 'react-modal';
import styled from 'styled-components';

import useSlot from '../../../api/hooks/useSlot';
import useSlotActivateModal from '../../../hooks/store/useSlotActivateModal';

const SlotActivateModal = () => {
    const { isOpen, slot, close } = useSlotActivateModal();
    const { activateCost, activateSlot, isActivating } = useSlot();

    const handleConfirm = () => {
        if (!slot) return;
        activateSlot(slot.slotNumber, { onSuccess: close });
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={close}
            style={{
                content: {
                    padding: 0,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: 360,
                    width: '90%',
                    height: 'fit-content',
                    borderRadius: 20,
                    overflow: 'hidden',
                    border: 'none',
                },
                overlay: { backgroundColor: '#22222299', zIndex: 400 },
            }}
        >
            <StyledContainer>
                <div className="icon">🏗️</div>
                <p className="title">슬롯 활성화</p>
                <p className="description">이 슬롯을 활성화하면{'\n'}건물을 지을 수 있어요.</p>
                {activateCost && (
                    <div className="cost">
                        <span className="cost-label">활성화 비용</span>
                        <span className="cost-value">🐚 {activateCost.shell.toLocaleString()}</span>
                    </div>
                )}
                <div className="actions">
                    <button className="cancel" onClick={close} disabled={isActivating}>
                        취소
                    </button>
                    <button className="confirm" onClick={handleConfirm} disabled={isActivating}>
                        {isActivating ? '활성화 중...' : '활성화하기'}
                    </button>
                </div>
            </StyledContainer>
        </ReactModal>
    );
};

const StyledContainer = styled.div`
    padding: 32px 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    background-color: ${({ theme }) => theme.colors.background};

    .icon {
        font-size: 48px;
    }

    .title {
        font-size: 18px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.black};
    }

    .description {
        white-space: pre-wrap;
        text-align: center;
        font-size: 14px;
        color: ${({ theme }) => theme.colors.black};
        opacity: 0.6;
        line-height: 1.5;
    }

    .cost {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 10px 16px;
        background-color: ${({ theme }) => theme.colors.primary100};
        border-radius: 10px;

        .cost-label {
            font-size: 13px;
            color: ${({ theme }) => theme.colors.black};
            opacity: 0.6;
        }

        .cost-value {
            font-size: 15px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.primary800};
        }
    }

    .actions {
        display: flex;
        gap: 8px;
        width: 100%;
        margin-top: 8px;

        button {
            flex: 1;
            padding: 12px 0;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: opacity 0.15s;

            &:disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }
        }

        .cancel {
            background-color: ${({ theme }) => theme.colors.primary100 ?? '#f0f0f0'};
            color: ${({ theme }) => theme.colors.black};
        }

        .confirm {
            background-color: ${({ theme }) => theme.colors.primary400};
            color: ${({ theme }) => theme.colors.black};
        }
    }
`;

export default SlotActivateModal;
