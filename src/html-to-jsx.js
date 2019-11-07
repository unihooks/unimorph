// fork of https://github.com/shaaijs/html-element-to-react
// FIXME: remove once https://github.com/shaaijs/html-element-to-react/issues/5 is fixed
import React from "react";

const EVT = {
  'onlostpointercapture': 'onLostPointerCapture',
  'ongotpointercapture': 'onGotPointerCapture',
  'onloadeddata': 'onLoadedData',
  'onloadedmetadata': 'onLoadedMetadata',
  'onsuspend': 'onSuspend'
}

function getProps(el) {
  let props = {}, events = {}

  // collect events
  for (let prop in el) {
    if (el[prop] && /^on/.test(prop)) {
      if (EVT[prop]) events[EVT[prop]] = el[prop]
      else {
        let cam = 'on' + prop[2].toUpperCase() + prop.slice(3)
        cam = cam
          .replace('fullscreen', 'Fullscreen')
          .replace('Dbl', 'Double')
          .replace('change', 'Change')
          .replace('update', 'Update')
          .replace('click', 'Click')
          .replace('error', 'Error')
          .replace('out', 'Out')
          .replace('over', 'Over')
          .replace('move', 'Move')
          .replace('leave', 'Leave')
          .replace('enter', 'Enter')
          .replace('cancel', 'Cancel')
          .replace('start', 'Start')
          .replace('press', 'Press')
          .replace('play', 'Play')
          .replace('through', 'Through')
          .replace('down', 'Down')
          .replace('menu', 'Menu')
          .replace('wheel', 'Wheel')
          .replace(/up$/, 'Up')
          .replace(/end$/, 'End')
        events[cam] = el[prop]
      }
    }
  }

  if (el.attributes) {
    for (let attr of el.attributes) {
      // normalize some html/react discrepancies
      if (attr.name === 'id') {
        props.key = props.id = attr.value
      }
      // xlink:href -> xlinkHref
      else if (/:[a-z]/.test(attr.name)) {
        let name = attr.name.replace(/:[a-z]/, (match) => match[1].toUpperCase())
        props[name] = attr.value
      }
      else {
        props[attr.name] = attr.value
      }
    }
  }

  if (el.tagName === 'OPTION') {
    let selected = props.selected
    props.ref = ref => {
      if (ref) {
        if (selected) ref.setAttribute('selected', selected)
        else ref.removeAttribute('selected')
      }
    }
  }

  if (el.tagName === 'INPUT') {
    let value = el.value
    props.ref = ref => {
      if (ref) {
        // nanomorph-compatible case
        if (value === 'undefined' || value === 'false' || value === 'null') {
          ref.removeAttribute('value')
          ref.value = null
        }
        else if (!value && typeof value !== 'number') {
          ref.removeAttribute('value')
          ref.value = value
        }
        else {
          ref.setAttribute('value', value)
          ref.value = value
        }
      }
    }
    delete props.value
  }

  return Object.assign(props, events);
}

export default function convert (el) {
    if (!el) return null;
    if (el.nodeType === 3) return el.textContent

    let props = getProps(el)

    let children = []
    for (let i = 0; i < el.childNodes.length; i++) {
        let child = el.childNodes[i];

        if (child.nodeType === 3) {
          children.push(child.textContent);
        }
        else if (child.nodeType === 1) {
          let childProps = getProps(child)
          if (childProps.selected) {
            props.value = child.value
            if (!props.onChange) props.onChange = () => {}
            delete childProps.selected
          }
          children.push(
            React.createElement(
              child.tagName.toLowerCase(),
              childProps,
              [ ...child.childNodes ].map(convert)
            )
          )
        }
    }

    return React.createElement(
        el.tagName ? el.tagName.toLowerCase() : React.Fragment,
        props,
        ...children
    );
};
