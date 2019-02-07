import { escapeRegExp } from 'lodash';

export class Calculator {
  public add(data: string): number {
    const [first, rest] = data.split(/\n/, 2);

    let delimiter = /(,|\n)/;

    if (/^\/\//.test(first)) {
      delimiter = new RegExp(
        /^\/\/\[.+\]$/.test(first)
          ? first
              .substring(3, first.length - 1)
              .split('][')
              .map(x => escapeRegExp(x))
              .join('|')
          : first.substr(2)
      );
    }

    const array = /^\/\//.test(first) ? rest : data;
    const numbers = array
      .split(delimiter)
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
