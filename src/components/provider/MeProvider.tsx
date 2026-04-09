import type React from 'react';
import { createContext, useContext, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import useMe from '../../api/hooks/useMe';
import type { Me } from '../../api/types';

interface Props {
    children: React.ReactNode;
}

const WHITE_LIST: string[] = ['/login', '/kakao/redirect'];
const MeContext = createContext<Me | null>(null);

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
    const { me, isLoading } = useMe();

    useEffect(() => {
        if (WHITE_LIST.includes(location.pathname) || isLoading || me !== null) return;
        navigate(`/login?redirectUri=${location.pathname}`);
    }, [me, isLoading]);

    if (WHITE_LIST.includes(location.pathname)) {
        return <>{children}</>;
    }

    if (!WHITE_LIST.includes(location.pathname) && isLoading) {
        return null;
    }

    return <MeContext.Provider value={me}>{children}</MeContext.Provider>;
};

export default MeProvider;
