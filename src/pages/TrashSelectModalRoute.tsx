import { useNavigate } from 'react-router-dom';

import TrashSelectModal from '../components/modals/TrashSelectModal';

const TrashSelectModalRoute = () => {
    const navigate = useNavigate();

    return <TrashSelectModal isOpen={true} onClose={() => navigate(-1)} />;
};

export default TrashSelectModalRoute;
