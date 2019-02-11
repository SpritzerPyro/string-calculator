import { escapeRegExp } from 'lodash';

export class Delimiter {
  private _delimiter = /(,|\n)/;
  private readonly customStarter = /^\/\/.+\n/;
  private readonly multiStarter = /^\[.+\]$/;

  constructor(delimiter: string) {
    this.delimiter = delimiter;
  }

  public set delimiter(delimiter: string) {
    this._delimiter = this.getDelimiter(delimiter);
  }

  public escapseString(payload: string): string {
    if (!this.customStarter.test(payload)) {
      return payload;
    }

    return payload.split(/\n/, 2)[1] || '';
  }

  public get regexp(): RegExp {
    return this._delimiter;
  }

  public split(text: string): string[] {
    return text.split(this._delimiter);
  }

  private getCustomString(delimiter: string): string {
    if (!this.customStarter.test(delimiter)) {
      return '';
    }

    return delimiter.split(/\n/)[0].substring(2);
  }

  private getDelimiter(payload: string): RegExp {
    const custom = this.getCustomString(payload);

    if (!custom) {
      return /(,|\n)/;
    }

    if (this.multiStarter.test(custom)) {
      return this.getMultiRegExp(custom);
    }

    return new RegExp(custom);
  }

  private getMultiRegExp(delimiter: string): RegExp {
    const data = delimiter
      .substring(1, delimiter.length - 1)
      .split('][')
      .map(x => escapeRegExp(x))
      .join('|');

    return new RegExp(data);
  }
}
