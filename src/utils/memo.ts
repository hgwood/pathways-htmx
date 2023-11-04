export default function memo<Args extends any[], R>(
  fn: (...args: Args) => R
): (...args: Args) => R {
  let value: R | undefined;
  return (...args: Args) => {
    if (!value) {
      value = fn(...args);
    }
    return value;
  };
}
