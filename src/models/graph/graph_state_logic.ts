import type { RemixedSegment, RemixedTimeInterval } from '../remix_types';
import type { Beat } from './tempo_control';

export type GraphState = {
    beats: Beat[];
    segments: RemixedSegment[];
    remixedBeats: RemixedTimeInterval[];
};
