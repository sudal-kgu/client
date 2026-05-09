import type React from 'react';

import { Toaster } from 'sonner';
import styled from 'styled-components';

import Header from './Header';

interface Props {
    children?: React.ReactNode;
    showHeader?: boolean;
}

const PageContainer = ({ children, showHeader = true }: Props) => {
    return (
        <StyledContainer>
            <div id="page">
                {showHeader && <Header />}
                <div id="page-container">{children}</div>
                <Toaster position="bottom-right" offset={16} />
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    height: 100dvh;
    background-color: ${({ theme }) => theme.colors.background};

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
