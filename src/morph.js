import convert from './html-to-jsx'
const cache = new WeakMap()

export default function morph(fromHTML, toHTML) {
  let root, placeholder = document.createTextNode(''), fromRoot = fromHTML.parentNode

  let toVDOM = toHTML.nodeType ? convert.call(this, toHTML) : toHTML

  if (!cache.has(fromHTML)) {
    cache.set(fromHTML, root = document.createDocumentFragment())
    // hydrate root to enable react/preact patching
    // FIXME: here can be required trimming to avoid react error
    let initVDOM = convert.call(this, fromHTML, true)
    if (fromRoot) fromHTML.replaceWith(placeholder)
    root.appendChild(fromHTML)

    this.hydrate(initVDOM, root)
  }
  else {
    root = cache.get(fromHTML)
    if (fromRoot) fromHTML.replaceWith(placeholder)
    root.appendChild(fromHTML)
  }
  this.render(toVDOM, root)

  // attached DOM
  if (fromRoot) {
    let children = [...root.childNodes]
    placeholder.replaceWith(root)
    return children.length > 1 ? children : children[0]
  }

  // detached DOM
  let children = [...root.childNodes].map(child => (child.remove(), child))
  return children.length > 1 ? children : children[0]
}
