import React from 'react'

import Swiper from 'swiper'
import './Swiper.css'

// DOCS: https://framework7.io/react/swiper.html

const Utils = {
  isObject(o) {
    return (
      typeof o === 'object' &&
      o !== null &&
      o.constructor &&
      o.constructor === Object
    )
  },
  classNames(...args) {
    const classes = []
    args.forEach(arg => {
      if (typeof arg === 'object' && arg.constructor === Object) {
        Object.keys(arg).forEach(key => {
          if (arg[key]) classes.push(key)
        })
      } else if (arg) classes.push(arg)
    })
    const uniqueClasses = []
    classes.forEach(c => {
      if (uniqueClasses.indexOf(c) < 0) uniqueClasses.push(c)
    })
    return uniqueClasses.join(' ')
  },
  extend(...args) {
    let deep = true
    let to
    let from
    if (typeof args[0] === 'boolean') {
      ;[deep, to] = args
      args.splice(0, 2)
      from = args
    } else {
      ;[to] = args
      args.splice(0, 1)
      from = args
    }
    for (let i = 0; i < from.length; i += 1) {
      const nextSource = args[i]
      if (nextSource !== undefined && nextSource !== null) {
        const keysArray = Object.keys(Object(nextSource))
        for (
          let nextIndex = 0, len = keysArray.length;
          nextIndex < len;
          nextIndex += 1
        ) {
          const nextKey = keysArray[nextIndex]
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey)
          if (desc !== undefined && desc.enumerable) {
            if (!deep) {
              to[nextKey] = nextSource[nextKey]
            } else if (
              Utils.isObject(to[nextKey]) &&
              Utils.isObject(nextSource[nextKey])
            ) {
              Utils.extend(to[nextKey], nextSource[nextKey])
            } else if (
              !Utils.isObject(to[nextKey]) &&
              Utils.isObject(nextSource[nextKey])
            ) {
              to[nextKey] = {}
              Utils.extend(to[nextKey], nextSource[nextKey])
            } else {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
    }
    return to
  },
}
function __reactComponentSlots(props) {
  const slots = {}
  if (!props) return slots
  const children = props.children

  if (!children || children.length === 0) {
    return slots
  }

  function addChildToSlot(name, child) {
    if (!slots[name]) slots[name] = []
    slots[name].push(child)
  }

  if (Array.isArray(children)) {
    children.forEach(child => {
      if (!child) return
      const slotName = (child.props && child.props.slot) || 'default'
      addChildToSlot(slotName, child)
    })
  } else {
    let slotName = 'default'
    if (children.props && children.props.slot) slotName = children.props.slot
    addChildToSlot(slotName, children)
  }

  return slots
}

class F7Swiper extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.__reactRefs = {}
  }

  shouldComponentUpdate() {
    return false
  }

  get paginationComputed() {
    const self = this
    const { pagination, params } = self.props

    if (
      pagination === true ||
      (params && params.pagination && !params.pagination.el)
    ) {
      return true
    }

    return false
  }

  get scrollbarComputed() {
    const self = this
    const { scrollbar, params } = self.props

    if (
      scrollbar === true ||
      (params && params.scrollbar && !params.scrollbar.el)
    ) {
      return true
    }

    return false
  }

  get navigationComputed() {
    const self = this
    const { navigation, params } = self.props

    if (
      navigation === true ||
      (params &&
        params.navigation &&
        !params.navigation.nextEl &&
        !params.navigation.prevEl)
    ) {
      return true
    }

    return false
  }

  render() {
    const self = this
    const props = self.props
    const { id, style, className } = props
    let paginationEl
    let scrollbarEl
    let buttonNextEl
    let buttonPrevEl

    if (self.paginationComputed) {
      paginationEl = React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['paginationEl'] = __reactNode
        },
        className: 'swiper-pagination',
      })
    }

    if (self.scrollbarComputed) {
      scrollbarEl = React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['scrollbarEl'] = __reactNode
        },
        className: 'swiper-scrollbar',
      })
    }

    if (self.navigationComputed) {
      buttonNextEl = React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['nextEl'] = __reactNode
        },
        className: 'swiper-button-next',
      })
      buttonPrevEl = React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['prevEl'] = __reactNode
        },
        className: 'swiper-button-prev',
      })
    }

    const classes = Utils.classNames(className, 'swiper-container')
    return React.createElement(
      'div',
      {
        id: id,
        style: style,
        ref: __reactNode => {
          this.__reactRefs['el'] = __reactNode
        },
        className: classes,
      },
      this.slots['before-wrapper'],
      React.createElement(
        'div',
        {
          className: 'swiper-wrapper',
        },
        this.slots['default']
      ),
      paginationEl,
      scrollbarEl,
      buttonPrevEl,
      buttonNextEl,
      this.slots['after-wrapper']
    )
  }

  componentWillUnmount() {
    const self = this
    if (!self.props.init) return
    if (self.swiper && self.swiper.destroy) self.swiper.destroy()
  }

  componentDidMount() {
    const self = this
    if (!self.props.init) return

    const newParams = {
      pagination: {},
      navigation: {},
      scrollbar: {},
    }
    const { params, pagination, navigation, scrollbar } = self.props
    if (params) Utils.extend(newParams, params)
    if (pagination && !newParams.pagination.el)
      newParams.pagination.el = self.refs.paginationEl

    if (
      navigation &&
      !newParams.navigation.nextEl &&
      !newParams.navigation.prevEl
    ) {
      newParams.navigation.nextEl = self.refs.nextEl
      newParams.navigation.prevEl = self.refs.prevEl
    }

    if (scrollbar && !newParams.scrollbar.el)
      newParams.scrollbar.el = self.refs.scrollbarEl

    if (!Swiper) {
      console.error('Swiper.js is not installed, please read the README.md')
    }

    self.swiper = new Swiper(self.refs.el, newParams)
  }

  componentDidUpdate() {
    const self = this

    if (!self.initialUpdate) {
      self.initialUpdate = true
      return
    }

    if (self.swiper && self.swiper.update) self.swiper.update()
  }

  get slots() {
    return __reactComponentSlots(this.props)
  }

  get refs() {
    return this.__reactRefs
  }

  set refs(refs) {}
}
F7Swiper.defaultProps = {
  init: true,
}
export default F7Swiper
