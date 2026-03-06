type LogFn = (...args: unknown[]) => void;

const ENABLE_TRACE =
  typeof process === 'object' &&
  typeof process.env === 'object' &&
  process.env.BITBANKTRACE;

let customErrorLogger: LogFn | undefined;
let customInfoLogger: LogFn | undefined;

export function setLogger(options: { error?: LogFn; info?: LogFn }): void {
  customErrorLogger = options.error;
  customInfoLogger = options.info;
}

export function logError(...args: unknown[]): void {
  (customErrorLogger ?? console.error)(new Date(), ...args);
}

export function logInfo(...args: unknown[]): void {
  if (customInfoLogger) {
    customInfoLogger(new Date(), ...args);
  } else if (ENABLE_TRACE) {
    console.info(new Date(), ...args);
  }
}
