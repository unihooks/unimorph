// fork of https://github.com/shaaijs/html-element-to-react
// FIXME: remove once https://github.com/shaaijs/html-element-to-react/issues/5 is fixed
import React from "react";

function getProps(el) {
  let props = {};

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

  return props;
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
            props.value = childProps.selected
            // delete childProps.selected
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
