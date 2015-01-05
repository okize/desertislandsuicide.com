React = require 'react/addons'
_ = require 'lodash'
EventEmitter = require 'wolfy87-eventemitter'
emitter = new EventEmitter()

components = {}

EventEmitterMixin =
  addListener: (rootComponentName, eventName, listenerFunction) ->
    components[rootComponentName] = new EventEmitter()
    components[rootComponentName].on eventName, listenerFunction

  removeListener: (name) ->
    emitter = components[rootComponentName]
    emitter.off name

  #Payload should be an array
  emit: (rootComponentName, eventToFire, payload, callback) ->
    emitter = components[rootComponentName]
    emitter.emit eventToFire, payload
    callback.call this

module.exports = EventEmitterMixin
