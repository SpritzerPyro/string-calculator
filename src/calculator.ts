export class Calculator {
  public add(data: string): number {
    return data
      .split(/(,|\n)/)
      .map(x => Number(x))
      .filter(x => typeof x === 'number' && x <= 1000)
      .reduce((a, b) => a + b);
  }
}
