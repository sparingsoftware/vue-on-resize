import { PluginFunction, PluginObject, VueConstructor } from 'vue'
import { ResizeCallback, Resizer, OnResize } from '../types'

declare module 'vue/types/vue' {
  interface Vue {
    $onResize: OnResize
  }
}

function debounce(cb: EventListener, ms: number): (ev: UIEvent) => void {
  let timer: ReturnType<typeof setTimeout> | null  = null

  return function (this: Vue, ...args: [UIEvent]): void {
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

const install: PluginFunction<undefined> = (Vue): void => {
  Vue.prototype.$onResize = function (
    this: Vue,
    callback: ResizeCallback,
    debounceTimeout = 250
  ): Resizer<ResizeCallback> {
    const handler: EventListener = (evt) =>
      callback(window.innerWidth, window.innerHeight, evt)

    const debouncedHandler: ReturnType<typeof debounce> = debounce(
      handler,
      debounceTimeout
    )

    const remove = () => {
      window.removeEventListener('resize', debouncedHandler)
    }

    window.addEventListener('resize', debouncedHandler)
    this.$once('hook:beforeDestroy', remove)

    function fire(): Resizer<ResizeCallback> {
      callback(window.innerWidth, window.innerHeight)
      return { fire, remove }
    }

    return { fire, remove }
  }
}

export const Plugin: PluginObject<undefined> = {
  install: (Vue: VueConstructor) => install(Vue)
}

export default Plugin
