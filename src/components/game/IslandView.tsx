import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import styled from 'styled-components';

import type { Currency, IslandInfo } from '../../api/types';
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
        <Wrapper>
            <CurrencyBar currency={currency} />
            <ZoomArea>
                <TransformWrapper minScale={1} maxScale={3} centerOnInit>
                    <TransformComponent
                        wrapperStyle={{ width: '100%', height: '100%' }}
                        contentStyle={{ width: '100%', height: '100%' }}
                    >
                        <IslandContainer>
                            <IslandImage src="/game/island.png" alt="섬" />
                        </IslandContainer>
                    </TransformComponent>
                </TransformWrapper>
            </ZoomArea>
            <LevelInfo
                level={level}
                islandName={islandName}
                recycleExp={recycleExp}
                recycleExpCap={recycleExpCap}
                recycleCount={recycleCount}
                recycleCountMax={recycleCountMax}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const ZoomArea = styled.div`
    flex: 1;
    overflow: hidden;
`;

const IslandImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const IslandContainer = styled.div`
    position: relative;
    width: 100vw;
    height: 100%;
`;

export default IslandView;
