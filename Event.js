;(function (exports) {
  'use strict'

  /**
   * @class Event A pub/sub management class.
   */
  function Event() {
    this._events = {}
  }

  var proto = Event.prototype

  /**
   * Add listener or listeners to the listeners array
   * @param {String} evt Instance of event
   */
  proto.on = function (evt) {
    var args = Array.prototype.slice.call(arguments, 1)
    // if (typeof evt !== 'function' || typeof evt !== 'object') {
    //   throw new Error('You can only listen an event with a function')
    // }
    if (!this._events.hasOwnProperty(evt)) {
      this._events[evt] = []
    }
    Array.prototype.push.apply(this._events[evt], args)
  }

  /**
   * Emit an event. You can pass an array as arguments
   * and the callback function will be called with the arguments
   * @param {String} evt
   * @param {Array} args
   */
  proto.trigger = function (evt, args) {
    var args = Array.prototype.slice.call(arguments, 1)
    var listeners = this._events[evt]
    if (!this._events.hasOwnProperty(evt)) {
      throw new Error('This event has not been listen')
    }
    for (var i = 0, length = listeners.length; i < length; i++) {
      listeners[i].apply(this, args)
    }
  }


  /**
   * Remove an event From this._events.
   * You can pass the function name to remove the function instead of remove the event
   * @param {String} evt
   * @returns Instance of Event
   */
  proto.off = function (evt) {
    var listeners = this._events,
      args = Array.prototype.slice.call(arguments, 1)
    if (!listeners.hasOwnProperty(evt)) {
      throw new Error('You have not listen this event')
    }
    /* 这里打算删除指定的方法，但是没有indexOfFunction */
    // args? listeners[evt].slice()
    if (args !== undefined) {
      var index = indexOfFunction(listeners[evt], args)
    }
    index === -1 ? delete listeners[evt] : listeners[evt].slice(index, index + 1)
    return this
  }


  /**
   * Get listenr's index in events
   * @param {String} listeners
   * @param {String} evt
   * @returns {number} Index of the listeners
   */
  function indexOfFunction(listeners, evt) {
    for (var i = 0, length = listeners.length; i < length; i++) {
      if (evt === listeners[i]) {
        return i
      }
    }
    return -1
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return Event;
    });
  }
  else if (typeof module === 'object' && module.exports) {
    module.exports = Event;
  }
  else {
    window.Event = Event;
  }
}(window || {}))