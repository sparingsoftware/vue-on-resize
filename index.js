import debounce from 'lodash.debounce'

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
