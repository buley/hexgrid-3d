const noop = (..._args: unknown[]) => {}

declare const process: { env?: { NODE_ENV?: string } } | undefined

const isDev = typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production'

export const logger = {
  debug: isDev ? console.debug.bind(console) : noop,
  log: isDev ? console.log.bind(console) : noop,
  info: isDev ? console.info.bind(console) : noop,
  warn: console.warn.bind(console),
  error: console.error.bind(console),
}
