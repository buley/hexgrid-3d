const noop = (..._args: unknown[]) => {}

declare const process: { env?: { NODE_ENV?: string } } | undefined

const isDev = typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production'

export const logger = {
  debug: isDev ? console.debug.bind(console) : noop,
  log: console.log.bind(console),
  info: console.info.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
}
