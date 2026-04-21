import styled from 'styled-components';

import Header from '../components/common/Header';
import IslandView from '../components/game/IslandView';

const MOCK_CURRENCY = { shell: 123, gem: 456, fuel: 789 };
const MOCK_ISLAND = { level: 1, progress: 1, maxProgress: 3 };

const Game = () => {
    return (
        <StyledContainer>
            <div id="page">
                <Header />
                <IslandView {...MOCK_ISLAND} currency={MOCK_CURRENCY} />
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    height: 100dvh;
    background-color: ${({ theme }) => theme.colors.background};

    #page {
        margin: 0 auto;
        max-width: 530px;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
`;

export default Game;
