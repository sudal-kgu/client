import styled from 'styled-components';

import BuildModal from '../island/modal/BuildModal';
import BuildingManageModal from '../island/modal/BuildingManageModal';
import SlotActivateModal from '../island/modal/SlotActivateModal';
import IslandScene from '../island/model/IslandScene';
import CurrencyBar from './CurrencyBar';
import EditModeOverlay from './EditModeOverlay';
import LevelInfo from './LevelInfo';

const IslandView = () => {
    return (
        <StyledContainer>
            <CurrencyBar />
            <IslandScene />
            <EditModeOverlay />
            <SlotActivateModal />
            <BuildModal />
            <BuildingManageModal />
            <LevelInfo />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    height: 100%;
`;

export default IslandView;
