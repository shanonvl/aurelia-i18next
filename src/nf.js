import {I18N} from './i18n';

export class NfValueConverter {
  static inject() { return [I18N]; }
  constructor(i18n) {
    this.service = i18n;
  }

  toView(value, formatOptions, locale, numberFormat) {
    let ret = value;
    if(ret) {
      var nf = numberFormat || this.service.nf(formatOptions, locale || this.service.getLocale());
      ret = nf.format(value);
    }
    return ret;
  }
}
