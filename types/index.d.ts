declare interface Resizer<T> {
  fire(): Resizer<T>
  remove(): void
}

declare type ResizeCallback = (
  width?: number,
  height?: number,
  evt?: Event
) => void

declare type OnResize = (
  callback: ResizeCallback,
  debounceTimeout?: number
) => Resizer<ResizeCallback>

export { Resizer, ResizeCallback, OnResize }
