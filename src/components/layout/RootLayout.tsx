import { Outlet } from 'react-router-dom';

import MeProvider from '../provider/MeProvider';

const RootLayout = () => {
    return (
        <MeProvider>
            <Outlet />
        </MeProvider>
    );
};

export default RootLayout;
