import type { BuildingConfig, GarbageItemConfig, IslandLevelConfig } from '../../../types';
import { Building } from './Building';
import { GarbageItem } from './GarbageItem';
import { Terrain } from './Terrain';
import { Tree } from './Tree';

interface IslandMeshProps {
    levelConfig: IslandLevelConfig;
    garbageItems: GarbageItemConfig[];
    buildings: BuildingConfig[];
}

export const IslandMesh = ({ levelConfig, garbageItems, buildings }: IslandMeshProps) => (
    <group>
        <Terrain levelConfig={levelConfig} />
        {levelConfig.treePositions.map((pos, i) => (
            <Tree key={i} position={pos} />
        ))}
        {garbageItems.map((item) => (
            <GarbageItem key={item.id} config={item} />
        ))}
        {buildings.map((building) => (
            <Building key={building.slotId} config={building} />
        ))}
    </group>
);
