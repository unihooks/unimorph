import ReactDOM from 'react-dom'
import React from 'react'
import convert from './src/html-to-jsx'

const cache = new WeakMap()
export default function morph(fromHTML, toHTML) {
  let frag, placeholder = document.createTextNode('')

  let toVDOM = toHTML.nodeType ? convert(toHTML) : toHTML

  if (!cache.has(fromHTML)) {
    cache.set(fromHTML, frag = document.createDocumentFragment())
    // hydrate frag to enable react/preact patching
    // FIXME: here can be required trimming to avoid react error
    let initVDOM = convert(fromHTML)
    fromHTML.replaceWith(placeholder)
    frag.appendChild(fromHTML)
    ReactDOM.hydrate(initVDOM, frag)
  }
  else {
    frag = cache.get(fromHTML)
    fromHTML.replaceWith(placeholder)
    frag.appendChild(fromHTML)
  }

  ReactDOM.render(toVDOM, frag)

  // attached DOM
  if (placeholder.parentNode) {
    let children = [...frag.childNodes]
    placeholder.replaceWith(frag)
    return children.length ? children : children[0]
  }

  // detached DOM
  if (frag.childNodes.length > 1) return frag
  return frag.firstChild
}
