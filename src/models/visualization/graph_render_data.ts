import type { BeatDrawData } from './beat_render_data';
import type { EdgeDrawData } from './edge_render_data';

export type GraphDrawData = {
    beats: BeatDrawData[];
    edges: EdgeDrawData[];
};
