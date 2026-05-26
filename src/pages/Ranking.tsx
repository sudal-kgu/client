import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import useRanking from '../api/hooks/useRanking';
import type { IRanking, Region } from '../api/types';
import { REGION_LABELS } from '../api/types';
import KoreaMap from '../components/common/KoreaMap';
import PageContainer from '../components/common/PageContainer';

const PAGE_SIZES = [10, 50, 100] as const;
type PageSize = (typeof PAGE_SIZES)[number];

const Ranking = () => {
    const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
    const [pageSize, setPageSize] = useState<PageSize>(10);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const { rankings, me, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useRanking(
        selectedRegion ?? undefined,
        pageSize,
    );

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 },
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const showRegionMismatch = selectedRegion && !me && !isLoading;

    return (
        <PageContainer backTo="/">
            <StyledContainer>
                <h1 className="page-title">
                    랭킹
                    {selectedRegion && (
                        <span className="region-badge">{REGION_LABELS[selectedRegion]}</span>
                    )}
                </h1>

                <MapWrapper>
                    <KoreaMap selected={selectedRegion} onSelect={setSelectedRegion} />
                </MapWrapper>

                <ControlRow>
                    <span className="label">단위</span>
                    <SizeButtons>
                        {PAGE_SIZES.map((s) => (
                            <SizeButton
                                key={s}
                                $active={pageSize === s}
                                onClick={() => setPageSize(s)}
                            >
                                {s}
                            </SizeButton>
                        ))}
                    </SizeButtons>
                </ControlRow>

                {isLoading ? (
                    <Empty>불러오는 중...</Empty>
                ) : rankings.length === 0 ? (
                    <Empty>랭킹 정보가 없어요</Empty>
                ) : (
                    <>
                        <List>
                            {rankings.map((item) => (
                                <RankingRow
                                    key={item.rank}
                                    item={item}
                                    isMe={me?.rank === item.rank}
                                />
                            ))}
                        </List>
                        <Sentinel ref={sentinelRef}>
                            {isFetchingNextPage && <LoadingText>불러오는 중...</LoadingText>}
                        </Sentinel>
                    </>
                )}

                {showRegionMismatch && (
                    <RegionMismatch>내 지역이 선택한 지역에 해당하지 않아요</RegionMismatch>
                )}

                {me && (
                    <MyRankBar>
                        <span className="label">내 순위</span>
                        <RankingRow item={me} isMe />
                    </MyRankBar>
                )}
            </StyledContainer>
        </PageContainer>
    );
};

const RankingRow = ({ item, isMe }: { item: IRanking; isMe?: boolean }) => (
    <StyledRow $isMe={!!isMe}>
        <span className="rank">
            {item.rank <= 3 ? ['🥇', '🥈', '🥉'][item.rank - 1] : item.rank}
        </span>
        <div className="info">
            <span className="nickname">{item.nickname}</span>
            <span className="region">{REGION_LABELS[item.region]}</span>
        </div>
        <div className="stats">
            <span className="level">Lv.{item.level}</span>
            <span className="exp">{item.cumulativeExp.toLocaleString()} exp</span>
        </div>
    </StyledRow>
);

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 16px 0;

    .page-title {
        font-size: 20px;
        font-weight: 800;
        color: ${({ theme }) => theme.colors.primary800};
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .region-badge {
        font-size: 13px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary700};
        background-color: ${({ theme }) => theme.colors.primary200};
        padding: 2px 10px;
        border-radius: 20px;
    }
`;

const MapWrapper = styled.div`
    max-height: 500px;
    display: flex;
    justify-content: center;

    svg {
        max-height: 500px;
        width: auto;
    }
`;

const ControlRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 10px 0 4px;

    .label {
        font-size: 12px;
        color: ${({ theme }) => theme.colors.primary500};
    }
`;

const SizeButtons = styled.div`
    display: flex;
    gap: 4px;
`;

const SizeButton = styled.button<{ $active: boolean }>`
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    background-color: ${({ $active, theme }) =>
        $active ? theme.colors.primary700 : theme.colors.primary100};
    color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.primary700)};
    transition: background-color 0.15s;
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 0 0;
`;

const Sentinel = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoadingText = styled.span`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.primary500};
`;

const StyledRow = styled.li<{ $isMe: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 14px;
    background-color: ${({ $isMe, theme }) =>
        $isMe ? theme.colors.primary200 : theme.colors.white};
    border: 1.5px solid ${({ $isMe, theme }) => ($isMe ? theme.colors.primary400 : 'transparent')};

    .rank {
        font-size: 18px;
        font-weight: 700;
        min-width: 32px;
        text-align: center;
        color: ${({ theme }) => theme.colors.primary800};
    }

    .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;

        .nickname {
            font-size: 14px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.primary800};
        }

        .region {
            font-size: 11px;
            color: ${({ theme }) => theme.colors.primary500};
        }
    }

    .stats {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;

        .level {
            font-size: 13px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.primary700};
        }

        .exp {
            font-size: 11px;
            color: ${({ theme }) => theme.colors.primary500};
        }
    }
`;

const Empty = styled.div`
    padding: 24px 0;
    text-align: center;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary500};
`;

const RegionMismatch = styled.p`
    text-align: center;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.primary500};
    padding: 4px 0 12px;
`;

const MyRankBar = styled.div`
    position: sticky;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.background};
    border-top: 1px solid ${({ theme }) => theme.colors.primary200};
    padding: 12px 0 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .label {
        font-size: 12px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.primary500};
    }
`;

export default Ranking;
