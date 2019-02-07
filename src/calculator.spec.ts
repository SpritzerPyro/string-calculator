import { Calculator } from './calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('empty string returns 0', () => {
    expect(calculator.add('')).toEqual(0);
  });

  test('sums up numbers of string', () => {
    expect(calculator.add('2,4,6,8')).toEqual(20);
  });

  test('allows new line delimitter', () => {
    expect(calculator.add('2\n4,6,8')).toEqual(20);
  });

  test('ignores numbers greater than 1000', () => {
    expect(calculator.add('2,4,6,8,1001,2002')).toEqual(20);
  });

  test('throws on negative numbers', () => {
    expect(() => calculator.add('2,-4,3,-5')).toThrowError(
      'Negatives not allowed: -4,-5'
    );
  });
});
