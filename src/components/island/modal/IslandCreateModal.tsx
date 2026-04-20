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
                    maxWidth: 400,
                    aspectRatio: 10 / 12,
                    width: '90%',
                },
                overlay: { backgroundColor: '#222222', zIndex: 999 },
            }}
        >
            <StyledContainer>
                <img src="/images/sudal.png" />
                <div className="text">게임을 시작하기 앞서 섬 이름을 지어주세요.</div>
                <input
                    name="nickname"
                    value={nickname}
                    maxLength={20}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <button onClick={() => createIsland({ nickname })}>섬 만들기</button>
            </StyledContainer>
        </ReactModal>
    );
};

const StyledContainer = styled.div`
    padding: 12px 12px 0 12px;
    height: 100%;
    display: flex;
    gap: 12px;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.primary100};

    .text {
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
        text-align: center;
    }

    input {
        padding: 8px 12px;
        border: 1px solid ${({ theme }) => theme.colors.primary500};
        border-radius: 12px;
        outline: none;
    }

    button {
        padding: 12px 0px;
        width: 100%;
        font-size: 16px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.primary700};
        background-color: ${({ theme }) => theme.colors.primary400};
        border-radius: 12px;
    }
`;

export default IslandCreateModal;
