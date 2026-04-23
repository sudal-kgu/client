import styled from 'styled-components';

import KakaoLogin from '../components/auth/KakaoLogin';
import PageContainer from '../components/common/PageContainer';

const Login = () => {
    return (
        <PageContainer showHeader={false}>
            <StyledContainer>
                <div className="container">
                    <img className="logo" src="/images/logo.png" alt="수거의 달인 로고" />
                    <div className="text-wrap">
                        <p className="label">분리배출 가이드</p>
                        <p className="title">수거의 달인</p>
                        <p className="subtitle">올바른 분리배출로 지구를 함께 지켜요</p>
                    </div>
                    <div className="divider">
                        <span>소셜 로그인으로 시작하기</span>
                    </div>
                    <KakaoLogin />
                </div>
            </StyledContainer>
        </PageContainer>
    );
};

const StyledContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: radial-gradient(
        ellipse 80% 70% at 50% 50%,
        rgba(209, 236, 214, 0.9) 0%,
        transparent 70%
    );

    .container {
        padding: 56px 32px;
        width: 90%;
        display: flex;
        gap: 12px;
        flex-direction: column;
        align-items: center;
        border: none;
        border-radius: 20px;
        box-shadow: none;
    }

    .logo {
        width: 72px;
        height: 72px;
        object-fit: contain;
        margin-bottom: 4px;
    }

    .text-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        margin-bottom: 8px;
    }

    .label {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.15em;
        color: ${({ theme }) => theme.colors.primary800};
        text-transform: uppercase;
    }

    .title {
        font-size: 24px;
        font-weight: 900;
        color: ${({ theme }) => theme.colors.primary500};
        letter-spacing: -0.02em;
    }

    .subtitle {
        font-size: 13px;
        color: ${({ theme }) => theme.colors.primary700};
        opacity: 0.7;
    }

    .divider {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        margin: 8px 0;

        &::before,
        &::after {
            content: '';
            flex: 1;
            height: 1px;
            background-color: ${({ theme }) => theme.colors.primary300};
        }

        span {
            font-size: 11px;
            color: ${({ theme }) => theme.colors.black};
            opacity: 0.6;
            white-space: nowrap;
            letter-spacing: 0.05em;
        }
    }
`;

export default Login;
