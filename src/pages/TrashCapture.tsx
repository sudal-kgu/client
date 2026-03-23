import Camera from '../components/camera/Camera';
import CameraControls from '../components/camera/CameraControls';
import PageContainer from '../components/common/PageContainer';

const TrashCapture = () => {
    return (
        <PageContainer>
            <Camera />
            <CameraControls />
        </PageContainer>
    );
};

export default TrashCapture;
