import { Delimiter } from './delimiter';

describe('Delimiter', () => {
  test('defaults on invalid string', () => {
    const deli = new Delimiter('//;');
    expect(deli.regexp).toEqual(/(,|\n)/);
    deli.delimiter = '//lorem impsum';
    expect(deli.regexp).toEqual(/(,|\n)/);
  });

  test('sets custom delimiter on custom string', () => {
    const deli = new Delimiter('//;\nlorem');
    expect(deli.regexp).toEqual(/;/);
  });

  test('sets custom delimiter of any length on custom string', () => {
    const deli = new Delimiter('//lorem\nipsum');
    expect(deli.regexp).toEqual(/lorem/);
  });

  test('sets multiple custom delimiter on custom multiple string', () => {
    const deli = new Delimiter('//[||][;;]\nlorem');
    expect(deli.regexp).toEqual(/\|\||;;/);
  });

  test('splits text with its delimiter', () => {
    const deli = new Delimiter('//;\n');

    const res = deli.split('lorem;ipsum;sid');

    expect(res).toEqual(['lorem', 'ipsum', 'sid']);
  });
});
