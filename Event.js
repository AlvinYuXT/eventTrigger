; (function (exports) {
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
   * @param {any} evt
   * @param {any} args
   */
  proto.trigger = function (evt, args) {
    var args = Array.prototype.slice.call(arguments, 1)
    var listeners = this._events[evt]
    if (!this._events.hasOwnProperty(evt)) {
      throw new Error('This event has not been listen')
    }
    for (var i = 0, length = listeners.length; i < length; i++) { 
      listeners[i].apply(this,args)
    }
    // for (var listener in listeners) {
    //   if(listeners.hasOwnProperty(listener)) {
    //     this._events[listener].apply(this, args)
    //   }
    // }
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
} (window || {}))