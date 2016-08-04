(function () {
  /*global mocha,chai,EventEmitter*/
  'use strict';

  // Setup Mocha and Chai.
  mocha.setup('tdd');
  var assert = chai.assert;

  function flattenCheck(check) {
    var sorted = check.slice(0);
    sorted.sort(function (a, b) {
      return a < b ? -1 : 1;
    });
    return sorted.join();
  }

  // Configure the tests
  suite('getListeners', function () {
    var ee;

    setup(function () {
      ee = new EventEmitter();
    });

    test('initialises the event object and a listener array', function () {
      ee.getListeners('foo');
      assert.deepEqual(ee._events, {
        foo: []
      });
    });

    test('does not overwrite listener arrays', function () {
      var listeners = ee.getListeners('foo');
      listeners.push('bar');

      assert.deepEqual(ee._events, {
        foo: ['bar']
      });

      ee.getListeners('foo');

      assert.deepEqual(ee._events, {
        foo: ['bar']
      });
    });

    test('allows you to fetch listeners by regex', function () {
      var check = [];

      ee.addListener('foo', function () { check.push(1); });
      ee.addListener('bar', function () { check.push(2); return 'bar'; });
      ee.addListener('baz', function () { check.push(3); return 'baz'; });

      var listeners = ee.getListeners(/ba[rz]/);

      assert.strictEqual(listeners.bar.length + listeners.baz.length, 2);
      assert.strictEqual(listeners.bar[0].listener(), 'bar');
      assert.strictEqual(listeners.baz[0].listener(), 'baz');
    });

    test('does not return matched sub-strings', function () {
      var check = function () { };

      ee.addListener('foo', function () { });
      ee.addListener('fooBar', check);

      var listeners = ee.getListeners('fooBar');
      assert.strictEqual(listeners.length, 1);
      assert.strictEqual(listeners[0].listener, check);
    });
  });

  // Execute the tests.
  mocha.run();
}.call(this));