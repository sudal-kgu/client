import usePurchasedItems from '../../../../../api/hooks/usePurchasedItems';
import useSlot from '../../../../../api/hooks/useSlot';
import { BUILDING_SLOTS } from '../../config';
import Clouds from './Clouds';
import Garbage from './Garbage';
import Slot from './Slot';
import Terrain from './Terrain';

const IslandMesh = () => {
    const { slots, maxActivatableSlots } = useSlot();
    const { visibleGarbage } = usePurchasedItems();

    const activatedCount = slots.filter((s) => s.activated).length;
    const canActivate = activatedCount < maxActivatableSlots;

    return (
        <group>
            <Terrain />
            <Clouds />
            {visibleGarbage.map((position) => (
                <Garbage key={position.id} postion={position} />
            ))}
            {slots.map((slot, index) => (
                <Slot
                    key={index}
                    position={BUILDING_SLOTS[index]}
                    slot={slot}
                    canActivate={canActivate}
                />
            ))}
        </group>
    );
};

export default IslandMesh;
