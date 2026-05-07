import { useState } from 'react';

import ReactModal from 'react-modal';
import styled from 'styled-components';

import useBuilding from '../../../api/hooks/useBuilding';
import type { IBuildingCatalog } from '../../../api/types';
import { BuildingType } from '../../../api/types';
import useBuildModal from '../../../hooks/store/useBuildModal';

const CATEGORY_META: Record<string, { icon: string; label: string }> = {
    [BuildingType.PRODUCTION]: { icon: '🏭', label: '생산' },
    [BuildingType.PURIFICATION]: { icon: '🌊', label: '정화' },
};

const BuildModal = () => {
    const { isOpen, slotNumber, close } = useBuildModal();
    const { catalogs, isLoading, createBuilding, isCreating } = useBuilding();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const selected = catalogs.find((c) => c.buildingMetadataId === selectedId);

    const handleConfirm = () => {
        if (slotNumber === null || selectedId === null) return;
        createBuilding({ slotNumber, buildingMetadataId: selectedId }, { onSuccess: handleClose });
    };

    const handleClose = () => {
        setSelectedId(null);
        close();
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={handleClose}
            style={{
                content: {
                    padding: 0,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: 380,
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
                <p className="title">건물 건설</p>

                {isLoading ? (
                    <div className="empty">카탈로그 불러오는 중...</div>
                ) : catalogs.length === 0 ? (
                    <div className="empty">건설 가능한 건물이 없어요.</div>
                ) : (
                    <div className="catalog-list">
                        {catalogs.map((item) => (
                            <CatalogItem
                                key={item.buildingMetadataId}
                                item={item}
                                selected={item.buildingMetadataId === selectedId}
                                onClick={() => setSelectedId(item.buildingMetadataId)}
                            />
                        ))}
                    </div>
                )}

                <div className="selected-info">
                    {selected ? (
                        <>
                            <span>
                                {CATEGORY_META[selected.category]?.icon} {selected.name}
                            </span>
                            <span>💎 {selected.pph}/h</span>
                        </>
                    ) : (
                        <span className="placeholder">건물을 선택해주세요</span>
                    )}
                </div>

                <div className="actions">
                    <button className="cancel" onClick={handleClose} disabled={isCreating}>
                        취소
                    </button>
                    <button
                        className="confirm"
                        onClick={handleConfirm}
                        disabled={selectedId === null || isCreating}
                    >
                        {isCreating ? '건설 중...' : '건설하기'}
                    </button>
                </div>
            </StyledContainer>
        </ReactModal>
    );
};

const CatalogItem = ({
    item,
    selected,
    onClick,
}: {
    item: IBuildingCatalog;
    selected: boolean;
    onClick: () => void;
}) => {
    const meta = CATEGORY_META[item.category] ?? { icon: '🏗️', label: item.category };
    return (
        <StyledCatalogItem $selected={selected} onClick={onClick}>
            <div className="icon">{meta.icon}</div>
            <div className="info">
                <span className="name">{item.name}</span>
                <span className="category">
                    {meta.label} · Lv.{item.requiredLevel}
                </span>
            </div>
            <div className="cost">
                {item.costGems > 0 && <span>💎 {item.costGems}</span>}
                {item.costShells > 0 && <span>🐚 {item.costShells}</span>}
            </div>
        </StyledCatalogItem>
    );
};

const StyledContainer = styled.div`
    padding: 28px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background-color: ${({ theme }) => theme.colors.background};
    max-height: 80vh;

    .title {
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        color: ${({ theme }) => theme.colors.black};
    }

    .empty {
        text-align: center;
        font-size: 14px;
        color: ${({ theme }) => theme.colors.black};
        opacity: 0.5;
        padding: 24px 0;
    }

    .catalog-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow-y: auto;
        max-height: 320px;
    }

    .selected-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 14px;
        min-height: 42px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.colors.primary100};
        font-size: 13px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.black};

        .placeholder {
            width: 100%;
            text-align: center;
            opacity: 0.4;
            font-weight: 400;
        }
    }

    .actions {
        display: flex;
        gap: 8px;

        button {
            flex: 1;
            padding: 12px 0;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: opacity 0.15s;

            &:disabled {
                opacity: 0.35;
                cursor: not-allowed;
            }
        }

        .cancel {
            background-color: ${({ theme }) => theme.colors.primary100 ?? '#f0f0f0'};
            color: ${({ theme }) => theme.colors.black};
        }

        .confirm {
            background-color: ${({ theme }) => theme.colors.primary400};
            color: ${({ theme }) => theme.colors.black};
        }
    }
`;

const StyledCatalogItem = styled.div<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 12px;
    cursor: pointer;
    border: 2px solid
        ${({ $selected, theme }) => ($selected ? theme.colors.primary400 : 'transparent')};
    background-color: ${({ $selected, theme }) =>
        $selected ? theme.colors.primary100 : '#f8f8f8'};
    transition: all 0.15s;

    .icon {
        font-size: 28px;
        flex-shrink: 0;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1;

        .name {
            font-size: 14px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.black};
        }

        .category {
            font-size: 12px;
            color: ${({ theme }) => theme.colors.black};
            opacity: 0.5;
        }
    }

    .cost {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;
        font-size: 12px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black};
        flex-shrink: 0;
    }
`;

export default BuildModal;
