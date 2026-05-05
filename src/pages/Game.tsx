import type { IslandInfo } from '../api/types';
import PageContainer from '../components/common/PageContainer';
import IslandView from '../components/game/IslandView';

const MOCK_ISLAND: IslandInfo = {
    level: 1,
    islandName: '수달이의 섬',
    recycleExp: 100,
    recycleExpCap: 500,
    recycleCount: 1,
    recycleCountMax: 5,
};

const Game = () => {
    return (
        <PageContainer>
            <IslandView {...MOCK_ISLAND} />
        </PageContainer>
    );
};

export default Game;
