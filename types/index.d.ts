declare interface Resizer<T> {
  /**
   * Immediately call the resize handler.
   *
   * @returns `{ fire, remove }`
   */
  fire(): Resizer<T>

  /**
   * Remove the resize listener.
   */
  remove(): void
}

/**
 * Function to execute on resize
 *
 * @param width - value of window.innerWidth
 * @param height - value of window.innerHeight
 * @param evt - Resize event
 */
declare type ResizeCallback = (
  width?: number,
  height?: number,
  evt?: Event
) => void

/**
 * onResize debounced listener
 *
 * @param callback - Function to execute on resize
 * @param [debounceTimeout=250] - Timeout between calls in ms
 */
declare type OnResize = (
  callback: ResizeCallback,
  debounceTimeout?: number
) => Resizer<ResizeCallback>

export { Resizer, ResizeCallback, OnResize }
