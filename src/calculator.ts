export class Calculator {
  public add(data: string): number {
    const [first, rest] = data.split(/\n/, 2);
    const del = /^\/\//.test(first) ? new RegExp(first.substr(2)) : /(,|\n)/;
    const array = /^\/\//.test(first) ? rest : data;
    const numbers = array
      .split(del)
      .map(x => Number(x))
      .filter(x => typeof x === 'number' && x <= 1000);

    const negatives = numbers.filter(x => x < 0);

    if (negatives.length > 0) {
      throw new Error(`Negatives not allowed: ${negatives.join(',')}`);
    }

    return numbers.reduce((a, b) => a + b);
  }
}
