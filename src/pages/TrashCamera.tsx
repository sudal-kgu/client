import { Outlet } from 'react-router-dom';

import Camera from '../components/camera/Camera';
import CameraControls from '../components/camera/CameraControls';
import PageContainer from '../components/common/PageContainer';
import useAnalysis from '../hooks/useAnalysis';

const TrashCamera = () => {
    const { analysis, items, subscribe } = useAnalysis();

    return (
        <PageContainer backTo="/">
            <Camera captureCallback={subscribe} />
            <CameraControls analysis={analysis} items={items} />
            <Outlet context={{ items }} />
        </PageContainer>
    );
};

export default TrashCamera;
