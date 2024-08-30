import { waitForSpicetify } from '../libs/shared/utils/spicetify-utils';
import { waitForElement } from '../libs/shared/utils/dom-utils';
import { renderElement } from '../libs/shared/utils/react-utils';
import { addUpdateChecker } from '../libs/shared/utils/version-utils';
import { Jukebox } from '../models/audio_box';
import { version } from '../../package.json';
import { PlaybarButton } from '../components/control_bar_button';
import React from 'react';

// TODO: Add i18n

void (async () => {
    window.jukebox = new Jukebox();

    await waitForSpicetify();

    try {
        const element = await waitForElement('.player-controls__right');

        renderElement(<PlaybarButton />, element);

        await addUpdateChecker(version, 'eternal-jukebox');
    } catch (error) {
        console.error(error);
        Spicetify.showNotification(
            'Failed to register the eternal jukebox playbar button',
            true,
        );
    }
})();
