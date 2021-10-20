import { Text, Button, Icon } from "./Components"

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

export { Text, Button, Icon }