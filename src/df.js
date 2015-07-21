import {I18N} from './i18n';

export class DfValueConverter {
  static inject() { return [I18N]; }
  constructor(i18n) {
    this.service = i18n;
  }

  toView(value, formatOptions, locale, dateFormat) {
    let ret = value;
    if (ret) {
      var df = dateFormat || this.service.df(formatOptions, locale || this.service.getLocale());
      ret =  df.format(value);
    }
    return ret;
  }
}
