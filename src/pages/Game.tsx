import PageContainer from '../components/common/PageContainer';
import IslandView from '../components/game/IslandView';

const MOCK_CURRENCY = { shell: 123, gem: 456, fuel: 789 };
const MOCK_ISLAND = { level: 1, progress: 1, maxProgress: 3 };

const Game = () => {
    return (
        <PageContainer>
            <IslandView {...MOCK_ISLAND} currency={MOCK_CURRENCY} />
        </PageContainer>
    );
};

export default Game;
