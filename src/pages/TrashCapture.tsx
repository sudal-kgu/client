import Camera from '../components/camera/Camera';
import CameraControls from '../components/camera/CameraControls';
import PageContainer from '../components/common/PageContainer';
import useAnalysis from '../hooks/useAnalysis';

const TrashCapture = () => {
    const { analysis, basket, subscribe } = useAnalysis();

    return (
        <PageContainer>
            <Camera captureCallback={subscribe} />
            <CameraControls analysis={analysis} basket={basket} />
        </PageContainer>
    );
};

export default TrashCapture;
