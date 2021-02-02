import _Vue from 'vue'

export interface Resizer<T> {
  fire: T
  remove: Function
}

export type onResize = (
  cb: (width: number, height: number, evt?: UIEvent) => void,
  debounceTimeout?: number
) => Resizer<typeof cb>

declare module 'vue/types/vue' {
  interface Vue {
    $onResize: onResize
  }
}

function debounce(cb: EventListener, ms: number): (ev: UIEvent) => void {
  let timer: ReturnType<typeof setTimeout> = null

  return function (...args: [UIEvent]): void {
    const onComplete = (): void => {
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
  install(Vue: typeof _Vue, options?: any): void {
    const onResize: onResize = function (
      cb,
      debounceTimeout = 250
    ): Resizer<typeof cb> {
      const handler: EventListener = (evt?: UIEvent) =>
        cb(window.innerWidth, window.innerHeight, evt)

      const debouncedHandler: ReturnType<typeof debounce> = debounce(
        handler,
        debounceTimeout
      )

      const remove: Function = (): void => {
        window.removeEventListener('resize', debouncedHandler)
      }

      window.addEventListener('resize', debouncedHandler)
      this.$once('hook:beforeDestroy', remove)

      function fire(): Resizer<typeof cb> {
        handler(undefined)
        return { fire, remove }
      }

      return { fire, remove }
    }

    Vue.prototype.$onResize = onResize
  }
}
