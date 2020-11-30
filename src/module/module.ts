/*
    Treble Persist Module
*/

import { createModule } from 'treble-gsm';
import cacheState from './middleware/cache-state';
import clearCache from './middleware/clear-cache';
import HydrateStateTree from './render-comp';

const TreblePersist = createModule({

    name: 'treble-persist',
    featureKeys: ['persist'],
    renderComponent: HydrateStateTree,
    middleware: {
        callback: cacheState,
        payloadListener: clearCache
    }

});

export default TreblePersist

