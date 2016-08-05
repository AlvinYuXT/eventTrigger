(function() {
  /*global mocha,chai,EventEmitter*/
  'use strict';

  // Setup Mocha and Chai.
  mocha.setup('tdd');
  var assert = chai.assert;

  function flattenCheck(check) {
    var sorted = check.slice(0);
    sorted.sort(function(a, b) {
      return a < b ? -1 : 1;
    });
    return sorted.join();
  }

  // Configure the tests
  suite('addListeners', function() {
    var ee;

    setup(function() {
      ee = new Event();
    });

    test('initialises the event object and a listener array', function() {
      ee.on('foo');
      assert.deepEqual(ee._events, {
        foo: []
      });
    });
  });

  suite('trigger', function() {
    var ee;

    setup(function() {
      ee = new Event();
    })

    test('trigger the event', function() {
      var run = false;

      ee.on('foo', function() {
        run = true;
      })

      ee.trigger('foo')

      assert.isTrue(run);
    })
  })

  // Execute the tests.
  mocha.run();
}.call(this));