/*
    Treble Persist Module
*/

import { createModule } from 'treble-gsm';
import cacheState from './middleware/cache-state';
import HydrateStateTree from './render-comp';
// import clearPersist from './dispatchers/clear-persist';
// import clearCache from './middleware/clear-cache';

const TreblePersist = createModule({

    name: 'treble-persist',
    namespace: 'tp',
    featureKeys: ['persist', 'persistTimeout', 'persistType'],
    renderComponent: HydrateStateTree,
    middleware: {
        //payloadListener: clearCache,
        callback: cacheState
    },
    dispatchers: {
        //'clearPersist': clearPersist,
    }

});

export default TreblePersist

