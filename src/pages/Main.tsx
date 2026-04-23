import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/camera');
    }, []);

    return <div />;
};

export default Main;
