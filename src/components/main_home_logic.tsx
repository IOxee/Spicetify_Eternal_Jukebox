import styles from './main_home_logic.module.scss';
import React, { useEffect, useState } from 'react';
import { JukeboxVisualizer } from './visualizer/media_visualizer_logic';
import { millisToMinutesAndSeconds } from '../utils/time_functions';
import { type GraphState } from '../models/graph/graph_state_logic';
import { SettingsButton } from './settings/settings_button_logic';

type TrackState = {
    trackName: string;
    artistName: string;
};

type StatsState = {
    beatsPlayed: number;
    currentRandomBranchChance: number;
    listenTime: string;
};

export function Home(): JSX.Element {
    const [trackState, setTrackState] = useState<TrackState>({
        trackName: '',
        artistName: '',
    });

    const [graphState, setGraphState] = useState<GraphState>({
        beats: [],
        remixedBeats: [],
        segments: [],
    });

    const [statsState, setStatsState] = useState<StatsState>({
        beatsPlayed: 0,
        listenTime: '0',
        currentRandomBranchChance: 0,
    });

    useEffect(() => {
        const subscription = window.jukebox.songState$.subscribe(
            (songState) => {
                setTrackState({
                    trackName: songState?.track?.metadata?.title ?? '',
                    artistName: songState?.track?.metadata?.artist_name ?? '',
                });

                setGraphState({
                    beats: songState?.graph.beats ?? [],
                    segments: songState?.analysis.segments ?? [],
                    remixedBeats: songState?.analysis.beats ?? [],
                });
            },
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const subscription = window.jukebox.statsChanged$.subscribe((stats: { beatsPlayed: any; currentRandomBranchChance: number; listenTime: number; }) => {
            setStatsState({
                beatsPlayed: stats.beatsPlayed,
                currentRandomBranchChance:
                    stats.currentRandomBranchChance * 100,
                listenTime: millisToMinutesAndSeconds(stats.listenTime),
            });
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles['title']}>
                <h1>{trackState.trackName}</h1>
                <p>by</p>
                <h2>{trackState.artistName}</h2>
            </div>

            <div className={styles['button']}>
                <SettingsButton />
            </div>

            <div className={styles['content']}>
                <JukeboxVisualizer state={graphState}></JukeboxVisualizer>
            </div>

            <div className={styles.stats}>
                <span>{`Total Beats: ${statsState.beatsPlayed}`}</span>
                <span>
                    {`Current branch change: ${Math.round(
                        statsState.currentRandomBranchChance,
                    )}%`}
                </span>
                <span>{`Listen Time: ${statsState.listenTime}`}</span>
            </div>
        </div>
    );
}
