import styles from './media_visualizer_style.module.scss';
import React, { useEffect } from 'react';
import { VisualizerSlice } from './visual_slice_logic';
import { VisualizerEdge } from './visual_edge_logic';
import type { GraphState } from '../../models/graph/graph_state_logic';
import {
    halfSize,
    initSvgDrawData,
    svgSize,
} from '../../helpers/visual_construction';

type Props = {
    state: GraphState;
};

// Reference: https://dev.to/mustapha/how-to-create-an-interactive-svg-donut-chart-using-angular-19eo

export function JukeboxVisualizer(props: Readonly<Props>): JSX.Element {
    useEffect(() => {
        const activeBranch = document.querySelector('svg path.is-active');
        if (activeBranch !== null) {
            pathToFront(activeBranch);
        }
    });

    if (props.state.beats.length === 0) {
        return <div>Loading...</div>;
    }

    const drawData = initSvgDrawData(props.state);

    function pathToFront(node: Node): void {
        const svg = document.getElementById('#jukebox-graph');
        svg?.firstChild?.appendChild(node);
    }

    return (
        <svg
            id="#jukebox-graph"
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className={styles['jukebox-graph']}
        >
            <g
                transform={`scale(-1,1) translate(${-svgSize}, 0) rotate(-90,${halfSize},${halfSize}) `}
            >
                {drawData.beats.map((currentData) => (
                    <VisualizerSlice
                        key={currentData.beat.index}
                        drawData={currentData}
                    />
                ))}
                {drawData.edges.map((currentData) => (
                    <VisualizerEdge
                        key={`${currentData.edge.source.index}-${currentData.edge.destination.index}`}
                        drawData={currentData}
                    />
                ))}
            </g>
        </svg>
    );
}
