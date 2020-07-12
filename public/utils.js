import ButtonElement from './elements/button.js'

export const createElement = (type, props, children) => {
  const mapTypes = {
    button: ButtonElement
  }

  return new mapTypes[type](props, children)
}

export const getProp = (self, key) => {
  return self.props[key] || self.constructor.defaultProps[key]
}

export const getStyle = (self, key) => {
  return self.props.style[key] || self.constructor.defaultProps.style[key]
}
