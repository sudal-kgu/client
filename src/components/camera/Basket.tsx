import { useState } from 'react';

import { FaRegTrashAlt } from 'react-icons/fa';
import { HiMiniXMark } from 'react-icons/hi2';
import { IoCheckmarkDone } from 'react-icons/io5';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styled from 'styled-components';

import type { AnalysisItem } from '../../api/types';
import BasketItem from './BasketItem';

const Basket = () => {
    const { items } = useOutletContext<{ items: AnalysisItem[] }>();
    const [selected, setSelected] = useState<string[]>(items.map((item) => item.trashUuid));
    const isSelectAll = items.length === selected.length;

    const navigate = useNavigate();
    const back = () => navigate(-1);
    const onSelect = (uuid: string) =>
        setSelected((prev) =>
            prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid],
        );
    const onSelectAll = () =>
        isSelectAll ? setSelected([]) : setSelected(items.map((item) => item.trashUuid));

    return (
        <StyledContainer onClick={back} $isSelectAll={isSelectAll}>
            <div className="basket" onClick={(e) => e.stopPropagation()}>
                <header>
                    <button onClick={back}>
                        <HiMiniXMark />
                    </button>
                    <div className="title">바구니</div>
                    <div className="invisible" />
                </header>
                {items.length === 0 ? (
                    <main>
                        <div className="empty">
                            <FaRegTrashAlt className="icon" />
                            <div className="label">
                                <div className="title">바구니가 비어 있습니다.</div>
                                <div className="subtitle">쓰레기를 촬영해 바구니를 채워보세요!</div>
                            </div>
                        </div>
                    </main>
                ) : (
                    <>
                        <main>
                            <div className="info">
                                <div className="total">{`총 ${items.length}개`}</div>
                                <button className="select-all" onClick={onSelectAll}>
                                    <IoCheckmarkDone className="icon" />
                                    <span>모두 선택</span>
                                </button>
                            </div>
                            <div className="items">
                                {items.map((item) => (
                                    <BasketItem
                                        key={item.trashUuid}
                                        item={item}
                                        isSelected={selected.includes(item.trashUuid)}
                                        onSelect={() => onSelect(item.trashUuid)}
                                    />
                                ))}
                            </div>
                        </main>
                        <footer>
                            <button>결과 보기</button>
                        </footer>
                    </>
                )}
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div<{ $isSelectAll: boolean }>`
    width: 100%;
    height: calc(100% + 72px);
    display: flex;
    align-items: flex-end;
    position: absolute;
    top: -72px;
    background-color: ${({ theme }) => theme.colors.backdrop};

    .basket {
        padding: 48px 24px 0 24px;
        width: 100%;
        height: 600px;
        max-height: 600px;
        background-color: ${({ theme }) => theme.colors.white};
        border-top-left-radius: 48px;
        border-top-right-radius: 48px;
        overflow: hidden;

        header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            button {
                width: 36px;
                height: 36px;
                font-size: 36px;
                color: ${({ theme }) => theme.colors.primary700};
            }

            .title {
                font-size: 24px;
                font-weight: 700;
                color: ${({ theme }) => theme.colors.primary800};
            }

            .invisible {
                width: 40px;
                visibility: hidden;
            }
        }

        main {
            margin-top: 48px;

            .info {
                margin-bottom: 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .total {
                    font-size: 16px;
                    font-weight: 700;
                    color: ${({ theme }) => theme.colors.primary700};
                }

                .select-all {
                    padding: 8px 16px;
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    font-weight: 700;
                    color: ${(props) =>
                        props.$isSelectAll
                            ? props.theme.colors.primary700
                            : props.theme.colors.gray400};
                    background-color: ${(props) =>
                        props.$isSelectAll
                            ? props.theme.colors.primary500
                            : props.theme.colors.gray200};
                    border: 1px solid
                        ${(props) =>
                            props.$isSelectAll
                                ? props.theme.colors.primary700
                                : props.theme.colors.gray400};
                    border-radius: 16px;
                }
            }

            .items {
                display: flex;
                gap: 16px;
                flex-direction: column;
                max-height: 330px;
                overflow: auto;

                scrollbar-width: none;
                -ms-overflow-style: none;
                &::-webkit-scrollbar {
                    display: none;
                }
            }

            .empty {
                padding-top: 48px;
                display: flex;
                gap: 24px;
                flex-direction: column;
                align-items: center;

                .icon {
                    font-size: 48px;
                    color: ${({ theme }) => theme.colors.primary700};
                }

                .label {
                    display: flex;
                    gap: 8px;
                    flex-direction: column;
                    align-items: center;

                    .title {
                        font-size: 20px;
                        font-weight: 700;
                    }

                    .subtitle {
                        font-size: 14px;
                        font-weight: 500;
                    }
                }
            }
        }

        footer {
            margin-top: 12px;

            button {
                width: 100%;
                height: 56px;
                font-size: 18px;
                font-weight: 700;
                border-radius: 64px;
                color: ${({ theme }) => theme.colors.white};
                background-color: ${({ theme }) => theme.colors.primary700};
            }
        }
    }
`;

export default Basket;
