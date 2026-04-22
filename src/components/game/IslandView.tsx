import styled from 'styled-components';

import type { Currency } from '../../api/types';
import CurrencyBar from './CurrencyBar';
import LevelInfo from './LevelInfo';
import SideActions from './SideActions';

interface Props {
    level: number;
    progress: number;
    maxProgress: number;
    currency: Currency;
}

const IslandView = ({ level, progress, maxProgress, currency }: Props) => {
    return (
        <StyledContainer>
            <img className="island-bg" src="/island.png" alt="섬" />
            <CurrencyBar currency={currency} />
            <LevelInfo level={level} progress={progress} maxProgress={maxProgress} />
            <div className="side-actions">
                <SideActions />
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    flex: 1;
    position: relative;
    overflow: hidden;

    .island-bg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    .side-actions {
        position: absolute;
        top: 60px;
        right: 16px;
        z-index: 2;
    }
`;

export default IslandView;
