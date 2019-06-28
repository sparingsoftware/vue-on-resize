function debounce (cb, ms) {
  let timer = null

  return function (...args) {
    const onComplete = () => {
      cb.apply(this, args)
      timer = null
    }

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(onComplete, ms)
  }
}

export default {
  install (Vue) {
    Vue.prototype.$onResize = function (cb, debounceTimeout = 250) {
      const handler = e => cb(window.innerWidth, window.innerHeight, e)
      const debouncedHandler = debounce(handler, debounceTimeout)

      window.addEventListener('resize', debouncedHandler)
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', debouncedHandler)
      })

      function fire () {
        handler()
        return { fire }
      }

      return { fire }
    }
  }
}
