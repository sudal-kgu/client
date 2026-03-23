import type React from 'react';

import styled from 'styled-components';

import Header from './Header';

interface Props {
    children?: React.ReactNode;
}

const PageContainer = ({ children }: Props) => {
    return (
        <StyledContainer>
            <div id="page">
                <Header />
                <div id="page-container">{children}</div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    height: 100dvh;
    background-color: ${({ theme }) => theme.colors.primary500};

    #page {
        margin: 0 auto;
        max-width: 530px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    #page-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
`;

export default PageContainer;
