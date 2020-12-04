/*
    Treble Persist Module
*/

import { createModule } from 'treble-gsm';
import cacheState from './middleware/cache-state';
import HydrateStateTree from './render-comp';
import clearPersist from './dispatchers/clear-persist';

const TreblePersist = createModule({

    name: 'treble-persist',
    featureKeys: ['persist', 'persistTimeout'],
    renderComponent: HydrateStateTree,
    middleware: {
        callback: cacheState
    },
    dispatchers: {
        'clearPersist': clearPersist,
    }

});

export default TreblePersist

