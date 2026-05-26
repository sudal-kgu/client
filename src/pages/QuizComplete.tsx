import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import useQuizComplete from '../api/hooks/useQuizComplete';
import CommonModal from '../components/common/CommonModal';
import PageContainer from '../components/common/PageContainer';
import ProblemAccordion from '../components/quiz/ProblemAccordion';
import QuizExpBar from '../components/quiz/QuizExpBar';
import LevelUpNoticeModal from '../components/shop/LevelUpNoticeModal';

const CURRENCY_META = [
    { key: 'shell' as const, icon: '/game/shell.png', label: '조개' },
    { key: 'fuel' as const, icon: '/game/fuel.png', label: '연료' },
];

const QuizComplete = () => {
    const navigate = useNavigate();
    const { analysisId } = useParams();
    const { result, problems, correctCount } = useQuizComplete();

    const earnedCurrencies = CURRENCY_META.filter((c) => (result?.earned[c.key] ?? 0) > 0);

    return (
        <PageContainer>
            <CommonModal
                isOpen={!result}
                icon="⏰"
                title="만료된 세션"
                description="퀴즈 세션이 만료되었습니다."
                btnText="분석 결과로 돌아가기"
                onClick={() => navigate(`/analysis/${analysisId}`, { replace: true })}
            />
            <StyledContainer>
                {earnedCurrencies.length > 0 && (
                    <div className="currency-cards">
                        {earnedCurrencies.map(({ key, icon, label }) => (
                            <CurrencyCard key={key}>
                                <div className="icon-wrap">
                                    <img src={icon} alt={label} />
                                </div>
                                <span className="label">{label}</span>
                                <span className="amount">
                                    +{result!.earned[key].toLocaleString()}
                                </span>
                            </CurrencyCard>
                        ))}
                    </div>
                )}

                {result && (result.earned.exp ?? 0) > 0 && (
                    <QuizExpBar island={result.island} earnedExp={result.earned.exp} />
                )}

                <div className="result-header">
                    <span className="title">결과</span>
                    <ResultBadge>
                        {correctCount} / {problems.length}
                    </ResultBadge>
                </div>

                <div className="problem-list">
                    {problems.map((problem, idx) => (
                        <ProblemAccordion key={problem.problemId} problem={problem} index={idx} />
                    ))}
                </div>
            </StyledContainer>

            <StyledFooter>
                <HomeButton onClick={() => navigate(`/analysis/${analysisId}`, { replace: true })}>
                    분석 결과로 돌아가기
                </HomeButton>
            </StyledFooter>

            <LevelUpNoticeModal />
        </PageContainer>
    );
};

const StyledContainer = styled.div`
    padding: 24px 16px 120px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .currency-cards {
        display: flex;
        gap: 12px;
        justify-content: center;
    }

    .exp-row {
        display: flex;
        justify-content: center;
    }

    .result-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
            font-size: 18px;
            font-weight: 700;
            color: ${({ theme }) => theme.colors.black};
        }
    }

    .problem-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`;

const CurrencyCard = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px 16px 16px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    box-shadow: ${({ theme }) => theme.shadows.default};

    .icon-wrap {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.primary200};
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 28px;
            height: 28px;
            object-fit: contain;
        }
    }

    .label {
        font-size: 12px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.black_op_70};
    }

    .amount {
        font-size: 20px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.black};
    }
`;

const ResultBadge = styled.span`
    padding: 4px 12px;
    border-radius: 99px;
    background-color: ${({ theme }) => theme.colors.primary200};
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary800};
`;

const StyledFooter = styled.div`
    padding: 16px;
    width: 100%;
    max-width: 530px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(to top, ${({ theme }) => theme.colors.background} 80%, transparent);
`;

const HomeButton = styled.button`
    width: 100%;
    height: 52px;
    border-radius: 64px;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary700};
`;

export default QuizComplete;
