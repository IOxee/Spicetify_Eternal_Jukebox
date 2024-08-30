import type { Jukebox } from '../models/audio_box';

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Window {
        jukebox: Jukebox;
    }
}
