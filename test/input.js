// import morph from '..'
import morph from '../preact'
import { h } from 'preact'
import t from 'tape'
import html from 'nanohtml'
import enhook, { useState } from 'enhook/preact'

t.skip('input update does not lose focus', t => {
  let el = document.createElement('div')
  document.body.appendChild(el)

  /* @jsx h */
  enhook(() => {
    let [value, setValue] = useState('')
    morph(el, <input value={value} onInput={e => setValue(e.target.value)}/>)
  })()
})
