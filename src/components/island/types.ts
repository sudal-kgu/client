import type * as THREE from 'three';

export type Position3D = [number, number, number];

export interface TreeProps {
    position: Position3D;
}

export interface OceanProps {
    color?: THREE.ColorRepresentation;
    speed?: number;
    height?: number;
}

export interface CloudConfig {
    position: Position3D;
    segments?: number;
    bounds?: Position3D;
    volume?: number;
    color?: string;
    speed?: number;
}

export interface CloudsProps {
    clouds?: CloudConfig[];
}

export type GarbageType = 'small' | 'medium' | 'large';

export interface GarbageItemConfig {
    id: string;
    position: Position3D;
    type: GarbageType;
}

export type BuildingType = string;

export interface BuildingSlotConfig {
    id: string;
    position: Position3D;
    rotationY?: number;
}

export interface BuildingConfig {
    slotId: string;
    type: BuildingType;
    position: Position3D;
    rotationY?: number;
}

export interface IslandLevelConfig {
    level: number;
    terrainModelPath?: string;
    treePositions: Position3D[];
    garbageSpawnPoints: GarbageItemConfig[];
    buildingSlots: BuildingSlotConfig[];
}
