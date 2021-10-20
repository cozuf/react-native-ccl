import Text from "./Components/Text"

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export { Text }