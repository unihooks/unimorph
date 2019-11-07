import morph from '..'
// import morph from '../preact'
import t from 'tape'
import html from 'nanohtml'


Object.defineProperty(DocumentFragment.prototype, 'outerHTML', {
  get() {
    let str = '<>'
    this.childNodes.forEach(el => str += el.nodeType === 3 ? el.textContent : el.outerHTML)
    str += '</>'
    return str
  }
})


t('base', t => {
  let frag = document.createDocumentFragment()
  let a = document.createElement('a')
  let b = document.createElement('a')
  frag.appendChild(a)
  b.href = '#123'

  morph(a, b)

  t.equal(a.href, b.href)
  t.equal(frag.firstChild, a)

  t.end()
})

t('hydration', t => {
  let a = document.createElement('div')
  a.innerHTML = '<ul><li/></ul>'
  morph(a, a)
  t.end()
})


require('./diff.js')
require('./events.js')
