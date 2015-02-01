React = require 'react'

ReactLayeredComponentMixin =
  componentWillUnmount: ->
    @_unrenderLayer()
    document.body.removeChild @_target

  componentDidUpdate: ->
    @_renderLayer()

  componentDidMount: ->
    # Appending to the body is easier than managing the z-index of everything on the page.
    # It's also better for accessibility and makes stacking a snap (since components will stack
    # in mount order).
    @_target = document.createElement('div')
    document.body.appendChild @_target
    @_renderLayer()

  _renderLayer: ->
    # By calling this method in componentDidMount() and componentDidUpdate(), you're effectively
    # creating a "wormhole" that funnels React's hierarchical updates through to a DOM node on an
    # entirely different part of the page.
    React.render @renderLayer(), @_target

  _unrenderLayer: ->
    React.unmountComponentAtNode @_target

  _getLayerNode: ->
    @_target.getDOMNode()

module.exports = ReactLayeredComponentMixin
