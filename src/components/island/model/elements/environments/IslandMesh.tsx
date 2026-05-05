import { BUILDING_SLOTS, GARBAGE_SPAWN_POINTS } from '../../config';
import Garbage from './Garbage';
import Slot from './Slot';
import Terrain from './Terrain';

const IslandMesh = () => {
    return (
        <group>
            <Terrain />
            {GARBAGE_SPAWN_POINTS.map((position) => (
                <Garbage key={position.id} postion={position} />
            ))}
            {BUILDING_SLOTS.map((position) => (
                <Slot key={position.id} position={position} />
            ))}
        </group>
    );
};

export default IslandMesh;
