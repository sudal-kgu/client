import type React from 'react';

import ReactModal from 'react-modal';
import styled from 'styled-components';

interface Props {
    isOpen: boolean;
    title: string;
    description?: string;
    icon: React.ReactNode;
    btnText: string;
    onClick: () => void;
}

const CommonModal = ({ isOpen, icon, title, description, btnText, onClick }: Props) => {
    return (
        <ReactModal
            isOpen={isOpen}
            style={{
                content: {
                    padding: 0,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: 400,
                    aspectRatio: 12 / 10,
                    width: '90%',
                },
                overlay: { backgroundColor: '#222222B3', zIndex: 20 },
            }}
        >
            <StyledContainer>
                <div className="icon">{icon}</div>
                <div className="title">{title}</div>
                {description && <div className="description">{description}</div>}
                <button onClick={onClick}>{btnText}</button>
            </StyledContainer>
        </ReactModal>
    );
};

const StyledContainer = styled.div`
    padding: 24px;
    display: flex;
    gap: 16px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background};

    .icon {
        font-size: 48px;
    }

    .title {
        white-space: pre-wrap;
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.black};
    }

    .description {
        white-space: pre-wrap;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
    }

    button {
        padding: 8px 12px;
        color: ${({ theme }) => theme.colors.black};
        background-color: ${({ theme }) => theme.colors.primary400};
        width: 100%;
        border-radius: 4px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
    }
`;

export default CommonModal;
