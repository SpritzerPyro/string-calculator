export class Calculator {
  public add(data: string): number {
    const numbers = data
      .split(/(,|\n)/)
      .map(x => Number(x))
      .filter(x => typeof x === 'number' && x <= 1000);

    const negatives = numbers.filter(x => x < 0);

    if (negatives.length > 0) {
      throw new Error(`Negatives not allowed: ${negatives.join(',')}`);
    }

    return numbers.reduce((a, b) => a + b);
  }
}
