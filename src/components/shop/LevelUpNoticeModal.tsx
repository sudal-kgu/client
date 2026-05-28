import ReactModal from 'react-modal';
import styled from 'styled-components';

import type { IBuildingCatalog, Item } from '../../api/types';
import { BuildingType } from '../../api/types';
import useLevelUpNoticeModal from '../../hooks/store/useLevelUpNoticeModal';

const BUILDING_META: Record<string, { icon: string; label: string }> = {
    [BuildingType.PRODUCTION]: { icon: '🏭', label: '생산 시설' },
    [BuildingType.PURIFICATION]: { icon: '🌊', label: '정화 시설' },
};

const LevelUpNoticeModal = () => {
    const { isOpen, unlockedItems, unlockedBuildings, maxSlotCount, close } =
        useLevelUpNoticeModal();

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={close}
            shouldCloseOnOverlayClick={false}
            style={{
                content: {
                    padding: 0,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: 360,
                    width: '90%',
                    height: 'fit-content',
                    maxHeight: '80vh',
                    borderRadius: 20,
                    overflow: 'hidden',
                    border: 'none',
                },
                overlay: { backgroundColor: '#22222299', zIndex: 400 },
            }}
        >
            <StyledContainer>
                <div className="title">🎉 새로운 컨텐츠 해금!</div>

                {maxSlotCount != null && (
                    <section>
                        <div className="section-label">슬롯</div>
                        <ul className="list">
                            <StyledRow>
                                <span className="icon">🏝️</span>
                                <div className="info">
                                    <span className="name">활성화 가능 슬롯 증가</span>
                                    <span className="sub">
                                        최대 {maxSlotCount}개 슬롯 활성화 가능
                                    </span>
                                </div>
                            </StyledRow>
                        </ul>
                    </section>
                )}

                {unlockedBuildings.length > 0 && (
                    <section>
                        <div className="section-label">건물</div>
                        <ul className="list">
                            {unlockedBuildings.map((b) => (
                                <BuildingRow key={b.buildingMetadataId} building={b} />
                            ))}
                        </ul>
                    </section>
                )}

                {unlockedItems.length > 0 && (
                    <section>
                        <div className="section-label">아이템</div>
                        <ul className="list">
                            {unlockedItems.map((item) => (
                                <ItemRow key={item.itemId} item={item} />
                            ))}
                        </ul>
                    </section>
                )}

                <button className="confirm" onClick={close}>
                    확인
                </button>
            </StyledContainer>
        </ReactModal>
    );
};

const BuildingRow = ({ building }: { building: IBuildingCatalog }) => {
    const meta = BUILDING_META[building.category] ?? { icon: '🏗️', label: building.category };
    return (
        <StyledRow>
            <span className="icon">{meta.icon}</span>
            <div className="info">
                <span className="name">{building.name}</span>
                <span className="sub">
                    {meta.label} · {building.pph}/h
                </span>
            </div>
            <span className="badge">Lv.{building.requiredLevel}</span>
        </StyledRow>
    );
};

const ItemRow = ({ item }: { item: Item }) => (
    <StyledRow>
        <span className="icon">🧪</span>
        <div className="info">
            <span className="name">{item.name}</span>
            <span className="sub">
                🐚 {item.price.toLocaleString()} · +{item.expReward.toLocaleString()} exp
            </span>
        </div>
        <span className="badge">Lv.{item.unlockLevel}</span>
    </StyledRow>
);

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 28px 20px 20px;
    background-color: ${({ theme }) => theme.colors.background};
    max-height: 80vh;
    overflow-y: auto;

    .title {
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        color: ${({ theme }) => theme.colors.black};
    }

    section {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .section-label {
        font-size: 12px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.black};
        opacity: 0.4;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .confirm {
        width: 100%;
        padding: 13px 0;
        border-radius: 12px;
        background-color: ${({ theme }) => theme.colors.primary400};
        color: ${({ theme }) => theme.colors.black};
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        transition: opacity 0.15s;

        &:active {
            opacity: 0.8;
        }
    }
`;

const StyledRow = styled.li`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    background-color: ${({ theme }) => theme.colors.primary100};
    border-radius: 12px;

    .icon {
        font-size: 24px;
        flex-shrink: 0;
    }

    .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;

        .name {
            font-size: 14px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.black};
        }

        .sub {
            font-size: 11px;
            color: ${({ theme }) => theme.colors.black};
            opacity: 0.5;
        }
    }

    .badge {
        font-size: 11px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary700};
        background-color: ${({ theme }) => theme.colors.primary200};
        padding: 2px 8px;
        border-radius: 8px;
        flex-shrink: 0;
    }
`;

export default LevelUpNoticeModal;
