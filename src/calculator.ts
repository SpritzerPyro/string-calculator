import { Delimiter } from './delimiter';

export class Calculator {
  public add(payload: string): number {
    const delimiter = new Delimiter(payload);
    const data = delimiter.escapseString(payload);

    const numbers = data
      .split(delimiter.regexp)
      .map(x => Number(x))
      .filter(x => typeof x === 'number' && x <= 1000);

    this.interceptNegatives(numbers);

    return numbers.length > 0 ? numbers.reduce((a, b) => a + b) : 0;
  }

  private interceptNegatives(numbers: number[]): void {
    const negatives = numbers.filter(x => x < 0);

    if (negatives.length > 0) {
      throw new Error(`Negatives not allowed: ${negatives.join(',')}`);
    }
  }
}
