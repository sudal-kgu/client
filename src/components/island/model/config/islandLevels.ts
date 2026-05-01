import type {
    BuildingSlotConfig,
    GarbageItemConfig,
    IslandLevelConfig,
    Position3D,
} from '../../types';

const ALL_TREE_POSITIONS: Position3D[] = [
    [-5, 1.62, -3],
    [4, 1.62, -5],
    [6, 1.62, 2],
    [-4, 1.62, 4],
    [0, 1.62, -7],
    [7, 1.62, -2],
    [-7, 1.62, 1],
    [2, 1.62, 6],
    [-2, 1.62, -5],
    [5, 1.62, 5],
];

// 섬 위에 등장 가능한 쓰레기 위치 (클라이언트 정의)
export const GARBAGE_SPAWN_POINTS: GarbageItemConfig[] = [
    { id: 'g1', position: [8, 1.7, 3], type: 'medium' },
    { id: 'g2', position: [-7, 1.65, -4], type: 'small' },
    { id: 'g3', position: [4, 1.7, 6], type: 'large' },
    { id: 'g4', position: [-3, 1.7, 7], type: 'small' },
    { id: 'g5', position: [6, 1.7, -6], type: 'medium' },
    { id: 'g6', position: [-8, 1.7, 2], type: 'small' },
    { id: 'g7', position: [1, 1.7, -8], type: 'large' },
    { id: 'g8', position: [-5, 1.7, 6], type: 'medium' },
];

// 건물을 배치할 수 있는 슬롯 위치 (클라이언트 정의)
export const BUILDING_SLOTS: BuildingSlotConfig[] = [
    { id: 'slot-1', position: [3, 1.5, 0], rotationY: 0 },
    { id: 'slot-2', position: [-3, 1.5, -2], rotationY: Math.PI / 4 },
    { id: 'slot-3', position: [0, 1.5, 5], rotationY: Math.PI },
    { id: 'slot-4', position: [-1, 1.5, 1], rotationY: 0 },
    { id: 'slot-5', position: [5, 1.5, -6], rotationY: -Math.PI / 4 },
    { id: 'slot-6', position: [-6, 1.5, -4], rotationY: Math.PI / 2 },
];

const ISLAND_LEVEL_CONFIGS: Record<number, IslandLevelConfig> = {
    1: {
        level: 1,
        treePositions: ALL_TREE_POSITIONS.slice(0, 2),
        garbageSpawnPoints: GARBAGE_SPAWN_POINTS, // 쓰레기 가득
        buildingSlots: BUILDING_SLOTS.slice(0, 2),
    },
    2: {
        level: 2,
        treePositions: ALL_TREE_POSITIONS.slice(0, 4),
        garbageSpawnPoints: GARBAGE_SPAWN_POINTS.slice(0, 5),
        buildingSlots: BUILDING_SLOTS.slice(0, 3),
    },
    3: {
        level: 3,
        treePositions: ALL_TREE_POSITIONS.slice(0, 6),
        garbageSpawnPoints: GARBAGE_SPAWN_POINTS.slice(0, 3),
        buildingSlots: BUILDING_SLOTS.slice(0, 4),
    },
    4: {
        level: 4,
        treePositions: ALL_TREE_POSITIONS.slice(0, 8),
        garbageSpawnPoints: GARBAGE_SPAWN_POINTS.slice(0, 1),
        buildingSlots: BUILDING_SLOTS.slice(0, 5),
    },
    5: {
        level: 5,
        treePositions: ALL_TREE_POSITIONS,
        garbageSpawnPoints: [], // 쓰레기 없음
        buildingSlots: BUILDING_SLOTS,
    },
};

export const getIslandLevelConfig = (level: number): IslandLevelConfig =>
    ISLAND_LEVEL_CONFIGS[level] ?? ISLAND_LEVEL_CONFIGS[1];
