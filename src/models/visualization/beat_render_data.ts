import type { Beat } from '../graph/tempo_control';
import type { Point } from './coordinate_point';

export type BeatDrawData = {
    beat: Beat;

    percentFromStart: number;
    percentOfSong: number;

    // Outer arc
    outerArcStart: Point;
    outerArcEnd: Point;

    // Inner arc
    innerArcStart: Point;
    innerArcEnd: Point;

    drawCommand: string;

    color: string;
    activeColor: string;
};
