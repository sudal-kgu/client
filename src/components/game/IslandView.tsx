import styled from 'styled-components';

import type { IslandInfo } from '../../api/types';
import SlotActivateModal from '../island/modal/SlotActivateModal';
import IslandScene from '../island/model/IslandScene';
import CurrencyBar from './CurrencyBar';
import LevelInfo from './LevelInfo';

interface Props extends IslandInfo {}

const IslandView = ({
    level,
    islandName,
    recycleExp,
    recycleExpCap,
    recycleCount,
    recycleCountMax,
}: Props) => {
    return (
        <StyledContainer>
            <CurrencyBar />
            <IslandScene />
            <SlotActivateModal />
            <LevelInfo
                level={level}
                islandName={islandName}
                recycleExp={recycleExp}
                recycleExpCap={recycleExpCap}
                recycleCount={recycleCount}
                recycleCountMax={recycleCountMax}
            />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    height: 100%;
`;

export default IslandView;
