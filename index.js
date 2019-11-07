import { hydrate, render } from 'react-dom'
import { createElement, Fragment } from 'react'

import morph from './src/morph'

export default morph.bind({ render, hydrate, createElement, Fragment })
