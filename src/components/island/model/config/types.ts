export type Position3D = [number, number, number];

export interface ICloudConfig {
    position: Position3D;
    segments: number;
    bounds: Position3D;
    volume: number;
    color: string;
    speed: number;
}

export const enum GarbageType {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export interface IGarbagePosition {
    id: string;
    pos: Position3D;
    type: GarbageType;
}

export interface ISlotPosition {
    id: string;
    pos: Position3D;
    rotationY?: number;
}
