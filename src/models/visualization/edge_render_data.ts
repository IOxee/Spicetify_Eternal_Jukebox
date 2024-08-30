import type { Edge } from '../graph/connection_line';

export type EdgeDrawData = {
    edge: Edge;

    strokeWidth: number;
    drawCommand: string;

    color: string;
    activeColor: string;
};
