/*
    Treble Persist Module
*/

import { createModule } from 'treble-gsm';
import cacheState from './middleware/cache-state';
import HydrateStateTree from './render-comp';

const TreblePersist = createModule({

    name: 'treble-persist',
    featureKeys: ['persist'],
    renderComponent: HydrateStateTree,
    middleware: {
        callback: cacheState,
        payloadListener: () => null
    }

});

export default TreblePersist

