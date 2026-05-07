import useSlot from '../../../../../api/hooks/useSlot';
import { BUILDING_SLOTS, GARBAGE_SPAWN_POINTS } from '../../config';
import Clouds from './Clouds';
import Garbage from './Garbage';
import Slot from './Slot';
import Terrain from './Terrain';

const IslandMesh = () => {
    const { slots } = useSlot();
    return (
        <group>
            <Terrain />
            <Clouds />
            {GARBAGE_SPAWN_POINTS.map((position) => (
                <Garbage key={position.id} postion={position} />
            ))}
            {slots.map((slot, index) => (
                <Slot key={index} position={BUILDING_SLOTS[index]} slot={slot} />
            ))}
        </group>
    );
};

export default IslandMesh;
