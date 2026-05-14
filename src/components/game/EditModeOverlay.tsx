import styled from 'styled-components';

import useEditMode from '../../hooks/store/useEditMode';

const EditModeOverlay = () => {
    const { isActive, deactivate } = useEditMode();

    if (!isActive) return null;

    return (
        <StyledOverlay>
            <span className="label">이동할 슬롯을 선택하세요</span>
            <button className="cancel" onClick={deactivate}>
                취소
            </button>
        </StyledOverlay>
    );
};

const StyledOverlay = styled.div`
    position: fixed;
    top: 130px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    z-index: 200;
    backdrop-filter: blur(4px);

    .label {
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        white-space: nowrap;
    }

    .cancel {
        padding: 5px 14px;
        border-radius: 12px;
        background-color: rgba(255, 255, 255, 0.2);
        color: #ffffff;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.15s;

        &:hover {
            background-color: rgba(255, 255, 255, 0.35);
        }
    }
`;

export default EditModeOverlay;
