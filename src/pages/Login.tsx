import styled from 'styled-components';

import KakaoLogin from '../components/auth/KakaoLogin';
import PageContainer from '../components/common/PageContainer';

const Login = () => {
    return (
        <PageContainer showHeader={false}>
            <StyledContainer>
                <div className="container">
                    <p>로그인</p>
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

    .container {
        padding: 32px;
        width: 90%;
        display: flex;
        gap: 12px;
        flex-direction: column;
        align-items: center;
        border: 1px solid ${({ theme }) => theme.colors.black_op_70};
        border-radius: 12px;
        box-shadow: ${({ theme }) => theme.shadows.default};

        p {
            font-size: 18px;
        }
    }
`;

export default Login;
