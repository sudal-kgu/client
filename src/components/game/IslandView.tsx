import styled from 'styled-components';

import type { Currency, IslandInfo } from '../../api/types';
import IslandScene from '../island/model/IslandScene';
import CurrencyBar from './CurrencyBar';
import LevelInfo from './LevelInfo';

interface Props extends IslandInfo {
    currency: Currency;
}

const IslandView = ({
    level,
    islandName,
    recycleExp,
    recycleExpCap,
    recycleCount,
    recycleCountMax,
    currency,
}: Props) => {
    return (
        <StyledContainer>
            <CurrencyBar currency={currency} />
            <IslandScene />
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
