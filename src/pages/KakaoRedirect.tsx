import { useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import OAuthAPI from '../api/oauth';

const KakaoRedirect = () => {
    const [search] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const code = search.get('code');
        const state = search.get('state');
        if (!code) {
            navigate('/login', { replace: true });
            return;
        }
        OAuthAPI.kakao(code)
            .then(() => navigate(state ?? '/', { replace: true }))
            .catch(() => navigate('/login', { replace: true }));
    }, [navigate, search]);

    return <></>;
};

export default KakaoRedirect;
