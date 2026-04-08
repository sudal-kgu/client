import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import UriUtils from '../../utils/uri-utils';

const KakaoLogin = () => {
    const [search] = useSearchParams();
    const to = UriUtils.makeUriWithSearchParam('https://kauth.kakao.com/oauth/authorize', {
        client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
        response_type: 'code',
        state: search.get('redirectUri') ?? null,
    });

    return <StyledKakaoLink to={to} $image={'/kakao/login.png'} />;
};

const StyledKakaoLink = styled(Link)<{ $image: string }>`
    width: 183px;
    height: 45px;
    background-image: url(${(props) => props.$image});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: block;
`;

export default KakaoLogin;
