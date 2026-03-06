export function neverGuard(x: never, msg: string): Error {
  return new Error(`${msg}: ${JSON.stringify(x)}`);
}
