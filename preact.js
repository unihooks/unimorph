import { hydrate, render, h, Fragment } from 'preact'

import morph from './src/morph'

export default morph.bind({ render, hydrate, createElement: h, Fragment })
