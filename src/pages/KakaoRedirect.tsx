import { useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import useIsland from '../api/hooks/useIsland';
import OAuthAPI from '../api/oauth';

const KakaoRedirect = () => {
    const [search] = useSearchParams();
    const navigate = useNavigate();
    const { clearMe } = useIsland();

    useEffect(() => {
        const code = search.get('code');
        const state = search.get('state');
        if (!code) {
            navigate('/login', { replace: true });
            return;
        }
        OAuthAPI.kakao(code)
            .then(() => {
                clearMe();
                navigate(state ?? '/', { replace: true });
            })
            .catch(() => navigate('/login', { replace: true }));
    }, [clearMe, navigate, search]);

    return <></>;
};

export default KakaoRedirect;
