import { useEffect, useState } from 'react';

import ReactModal from 'react-modal';
import styled from 'styled-components';

import useBuilding from '../../../api/hooks/useBuilding';
import useBuildingStats from '../../../api/hooks/useBuildingStats';
import useSlot from '../../../api/hooks/useSlot';
import { BuildingType } from '../../../api/types';
import useBuildingManageModal from '../../../hooks/store/useBuildingManageModal';
import useEditMode from '../../../hooks/store/useEditMode';
import cn from '../../../utils/cn';
import DateUtils from '../../../utils/date-utils';

const CATEGORY_META: Record<string, { icon: string; label: string }> = {
    [BuildingType.PRODUCTION]: { icon: '🏭', label: '생산 시설' },
    [BuildingType.PURIFICATION]: { icon: '🌊', label: '정화 시설' },
};

const BuildingManageModal = () => {
    const { isOpen, slotNumber, close } = useBuildingManageModal();
    const { slots } = useSlot();
    const { operate, harvest, removeBuilding, isBusy } = useBuilding();
    const { activate: activateEditMode } = useEditMode();

    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState(0);

    const slot = slots.find((s) => s.slotNumber === slotNumber);
    const building = slot?.activated ? slot.building : null;

    const meta = building
        ? (CATEGORY_META[building.category] ?? { icon: '🏗️', label: building.category })
        : null;

    const isPurification = building?.category === BuildingType.PURIFICATION;

    const { isOperating, showHarvestUI, harvestGems, fuelCost, fuelBalance } = useBuildingStats(
        slotNumber,
        building,
        isOpen,
    );

    useEffect(() => {
        if (!isOperating || !building?.fuelExpiredAt) return;
        setRemainingSeconds(DateUtils.getRemainingSeconds(building.fuelExpiredAt));
        const timer = setInterval(() => {
            setRemainingSeconds(DateUtils.getRemainingSeconds(building.fuelExpiredAt!));
        }, 1000);
        return () => clearInterval(timer);
    }, [isOperating, building?.fuelExpiredAt]);

    const handleOperate = () => {
        if (slotNumber === null) return;
        operate(slotNumber);
    };

    const handleHarvest = () => {
        if (slotNumber === null) return;
        harvest(slotNumber);
    };

    const handleDelete = () => {
        if (slotNumber === null) return;
        removeBuilding(slotNumber, { onSuccess: close });
    };

    const handleMove = () => {
        if (slotNumber === null) return;
        activateEditMode(slotNumber);
        close();
    };

    const handleClose = () => {
        setConfirmingDelete(false);
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
                    maxWidth: 360,
                    width: '90%',
                    height: 'fit-content',
                    borderRadius: 20,
                    overflow: 'hidden',
                    border: 'none',
                },
                overlay: { backgroundColor: '#22222299', zIndex: 400 },
            }}
        >
            {building && meta && (
                <StyledContainer>
                    <div className="header">
                        <div className="icon">{meta.icon}</div>
                        <div className="info">
                            <span className="name">{building.name}</span>
                            <span className="label">{meta.label}</span>
                            {isOperating && (
                                <span className="countdown">
                                    ⏱ {DateUtils.formatRemaining(remainingSeconds)} 후 소진
                                </span>
                            )}
                        </div>
                        <div className={cn('status-badge', isOperating ? 'running' : 'idle')}>
                            {isOperating ? '운영 중' : '대기 중'}
                        </div>
                    </div>

                    {!isPurification &&
                        (showHarvestUI ? (
                            <div className="stats harvest-stats">
                                <span className="stats-label">수확 대기</span>
                                <span className="stats-value">
                                    💎 {harvestGems?.toLocaleString() ?? '-'} 젬
                                </span>
                            </div>
                        ) : (
                            <div className="stats fuel-stats">
                                <span className="stats-label">연료 필요량</span>
                                <span className="stats-value">
                                    ⛽ {fuelCost?.toLocaleString() ?? '—'}
                                    <span className="stats-balance">
                                        &nbsp;/ 보유 {fuelBalance.toLocaleString()}
                                    </span>
                                </span>
                            </div>
                        ))}

                    <div className="actions">
                        {!isPurification &&
                            (showHarvestUI ? (
                                <button
                                    className="action primary harvest"
                                    onClick={handleHarvest}
                                    disabled={isBusy}
                                >
                                    {isBusy ? '처리 중...' : '🌾 수확하기'}
                                </button>
                            ) : (
                                <button
                                    className="action primary operate"
                                    onClick={handleOperate}
                                    disabled={isBusy}
                                >
                                    {isBusy ? '처리 중...' : '⛽ 연료 주입'}
                                </button>
                            ))}
                        <div className="secondary-row">
                            <button
                                className="action secondary move"
                                onClick={handleMove}
                                disabled={isBusy}
                            >
                                📦 이동
                            </button>
                            <button
                                className={cn('action secondary delete', {
                                    confirming: confirmingDelete,
                                })}
                                onClick={
                                    confirmingDelete
                                        ? handleDelete
                                        : () => setConfirmingDelete(true)
                                }
                                disabled={isBusy}
                            >
                                {isBusy
                                    ? '철거 중...'
                                    : confirmingDelete
                                      ? '한 번 더 누르면 철거'
                                      : '🗑️ 철거'}
                            </button>
                        </div>
                    </div>
                </StyledContainer>
            )}
        </ReactModal>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.background};

    .header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 24px 20px 16px;
        border-bottom: 1px solid ${({ theme }) => theme.colors.primary100};

        .icon {
            font-size: 36px;
            flex-shrink: 0;
        }

        .info {
            display: flex;
            flex-direction: column;
            gap: 2px;
            flex: 1;

            .name {
                font-size: 16px;
                font-weight: 700;
                color: ${({ theme }) => theme.colors.black};
            }

            .label {
                font-size: 12px;
                color: ${({ theme }) => theme.colors.black};
                opacity: 0.5;
            }

            .countdown {
                font-size: 11px;
                font-weight: 600;
                color: #1a6b2e;
            }
        }

        .status-badge {
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            flex-shrink: 0;

            &.running {
                background-color: #d4edda;
                color: #1a6b2e;
            }

            &.idle {
                background-color: ${({ theme }) => theme.colors.primary100};
                color: ${({ theme }) => theme.colors.black};
                opacity: 0.6;
            }
        }
    }

    .stats {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        border-bottom: 1px solid ${({ theme }) => theme.colors.primary100};

        .stats-label {
            font-size: 12px;
            color: ${({ theme }) => theme.colors.black};
            opacity: 0.45;
        }

        .stats-value {
            font-size: 14px;
            font-weight: 700;
        }

        .stats-balance {
            font-size: 12px;
            font-weight: 400;
            opacity: 0.5;
        }

        &.harvest-stats .stats-value {
            color: #1a6b2e;
        }

        &.fuel-stats .stats-value {
            color: ${({ theme }) => theme.colors.primary700};
        }
    }

    .actions {
        padding: 16px 20px 20px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        .secondary-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .action {
            border-radius: 12px;
            cursor: pointer;
            font-weight: 700;
            transition: opacity 0.15s;

            &:disabled {
                opacity: 0.35;
                cursor: not-allowed;
            }

            &.primary {
                width: 100%;
                padding: 14px 0;
                font-size: 15px;

                &.operate {
                    background-color: ${({ theme }) => theme.colors.primary400};
                    color: ${({ theme }) => theme.colors.black};
                }

                &.harvest {
                    background-color: #a8d8a8;
                    color: #1a4a1a;
                }
            }

            &.secondary {
                padding: 12px 0;
                font-size: 14px;

                &.move {
                    background-color: ${({ theme }) => theme.colors.primary100};
                    color: ${({ theme }) => theme.colors.black};
                }

                &.delete {
                    background-color: #f8e8e8;
                    color: #c0392b;
                    transition:
                        background-color 0.15s,
                        color 0.15s,
                        opacity 0.15s;

                    &.confirming {
                        background-color: #c0392b;
                        color: #ffffff;
                    }
                }
            }
        }
    }
`;

export default BuildingManageModal;
