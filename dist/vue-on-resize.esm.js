function debounce(cb, ms) {
  var timer = null;
  return function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var onComplete = function onComplete() {
      cb.apply(_this, args);
      timer = null;
    };

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, ms);
  };
}

var index = {
  install: function install(Vue) {
    Vue.prototype.$onResize = function (cb) {
      var debounceTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;

      var handler = function handler(e) {
        return cb(window.innerWidth, window.innerHeight, e);
      };

      var debouncedHandler = debounce(handler, debounceTimeout);
      window.addEventListener('resize', debouncedHandler);
      this.$once('hook:beforeDestroy', function () {
        window.removeEventListener('resize', debouncedHandler);
      });

      function fire() {
        handler();
        return {
          fire: fire
        };
      }

      return {
        fire: fire
      };
    };
  }
};

export default index;
