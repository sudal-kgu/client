import type { Dispatch, SetStateAction } from 'react';

import { useNavigate, useOutletContext } from 'react-router-dom';

import TrashSelectModal from '../components/modals/TrashSelectModal';

export type CameraOutletContext = {
    detectedCount: number;
    setDetectedCount: Dispatch<SetStateAction<number>>;
};

const TrashSelectModalRoute = () => {
    const navigate = useNavigate();
    const { detectedCount } = useOutletContext<CameraOutletContext>();

    return (
        <TrashSelectModal
            isOpen={true}
            onClose={() => navigate(-1)}
            detectedCount={detectedCount}
        />
    );
};

export default TrashSelectModalRoute;
