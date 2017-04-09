import React from 'react';
import EventEmitter from 'wolfy87-eventemitter';
let emitter = new EventEmitter();

const components = {};

const EventEmitterMixin = {
  addListener(rootComponentName, eventName, listenerFunction) {
    components[rootComponentName] = new EventEmitter();
    return components[rootComponentName].on(eventName, listenerFunction);
  },
  removeListener(name) {
    emitter = components[rootComponentName];
    return emitter.off(name);
  },
  // payload should be an array
  emit(rootComponentName, eventToFire, payload) {
    emitter = components[rootComponentName];
    return emitter.emit(eventToFire, payload);
  },
};

export default EventEmitterMixin;
