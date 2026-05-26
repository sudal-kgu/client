import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import MeProvider from '../provider/MeProvider';

const RootLayout = () => {
    return (
        <MeProvider>
            <Outlet />
            <Toaster position="bottom-right" offset={16} />
        </MeProvider>
    );
};

export default RootLayout;
