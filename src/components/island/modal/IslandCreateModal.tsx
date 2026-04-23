import { useState } from 'react';

import ReactModal from 'react-modal';
import styled from 'styled-components';

import useIsland from '../../../api/hooks/useIsland';

const IslandCreateModal = () => {
    const { createIsland, hasIsland } = useIsland();
    const [nickname, setNickname] = useState('');

    return (
        <ReactModal
            isOpen={!hasIsland}
            style={{
                content: {
                    padding: 0,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: 380,
                    width: '90%',
                    borderRadius: 24,
                    overflow: 'hidden',
                    border: 'none',
                },
                overlay: { backgroundColor: '#222222', zIndex: 999 },
            }}
        >
            <StyledContainer>
                <div className="hero">
                    <img src="/images/sudal.png" alt="수달" />
                </div>
                <div className="bottom">
                    <p className="title">우리 섬 이름을 지어줘!</p>
                    <p className="subtitle">함께 깨끗한 섬을 만들어봐요.</p>
                    <input
                        name="nickname"
                        value={nickname}
                        minLength={3}
                        maxLength={20}
                        placeholder="섬 이름 입력 (최소 3자, 최대 20자)"
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button
                        onClick={() => createIsland({ nickname })}
                        disabled={nickname.length < 3 || nickname.length > 20}
                    >
                        섬 만들기 🏝️
                    </button>
                </div>
            </StyledContainer>
        </ReactModal>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;

    .hero {
        background: white;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        height: 180px;

        img {
            width: 220px;
            object-fit: contain;
        }
    }

    .bottom {
        padding: 24px 24px 28px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .title {
        font-size: 18px;
        font-weight: 800;
        color: ${({ theme }) => theme.colors.primary800};
        letter-spacing: -0.02em;
    }

    .subtitle {
        font-size: 13px;
        color: ${({ theme }) => theme.colors.primary500};
        margin-top: -4px;
        margin-bottom: 4px;
    }

    input {
        padding: 13px 16px;
        border: 1.5px solid ${({ theme }) => theme.colors.primary300};
        border-radius: 12px;
        outline: none;
        font-size: 14px;
        transition: border-color 0.2s;

        &:focus {
            border-color: ${({ theme }) => theme.colors.primary500};
        }

        &::placeholder {
            color: ${({ theme }) => theme.colors.primary300};
        }
    }

    button {
        padding: 14px 0;
        width: 100%;
        font-size: 15px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.primary700};
        background-color: ${({ theme }) => theme.colors.primary400_op_70};
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
        margin-top: 2px;

        &:hover:not(:disabled) {
            background-color: ${({ theme }) => theme.colors.primary400};
        }

        &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
    }
`;

export default IslandCreateModal;
