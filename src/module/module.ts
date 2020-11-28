/*
    Treble Persist Module
*/

import { createModule } from 'treble-gsm';
import cacheState from './middleware/cache-state';
import RenderComp from './render-comp';

const TreblePersist = createModule({

    name: 'treble-persist',
    featureKeys: ['persist'],
    renderComponent: RenderComp,
    middleware: {
        callback: cacheState
    }

});

export default TreblePersist

