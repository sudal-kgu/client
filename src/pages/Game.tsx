import type { Currency, IslandInfo } from '../api/types';
import PageContainer from '../components/common/PageContainer';
import IslandView from '../components/game/IslandView';

const MOCK_CURRENCY: Currency = { shell: 123, gem: 456, fuel: 789 };
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
            <IslandView {...MOCK_ISLAND} currency={MOCK_CURRENCY} />
        </PageContainer>
    );
};

export default Game;
