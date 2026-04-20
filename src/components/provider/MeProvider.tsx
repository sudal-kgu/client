import type React from 'react';
import { createContext, useContext, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import useIsland from '../../api/hooks/useIsland';
import type { Island } from '../../api/types';
import IslandCreateModal from '../island/modal/IslandCreateModal';

interface Props {
    children: React.ReactNode;
}

const WHITE_LIST: string[] = ['/login', '/kakao/redirect'];
const MeContext = createContext<Island | null>(null);

export const useMeContext = () => {
    const me = useContext(MeContext);
    if (!me) {
        throw new Error('MeProvider 내부, Whitelist가 아닌 곳에서만 사용 가능합니다.');
    }
    return me;
};

const MeProvider = ({ children }: Props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { island, isLoading, error, hasIsland } = useIsland();

    useEffect(() => {
        if (WHITE_LIST.includes(location.pathname) || isLoading || island !== null) return;
        if (error?.status === 404) {
            return;
        }
        navigate(`/login?redirectUri=${location.pathname}`);
    }, [island, isLoading, error]);

    if (WHITE_LIST.includes(location.pathname)) {
        return <>{children}</>;
    }

    return (
        <MeContext.Provider value={island}>
            {hasIsland && children}
            <IslandCreateModal />
        </MeContext.Provider>
    );
};

export default MeProvider;
