System.register(['./i18n'], function (_export) {
  'use strict';

  var I18N, DfValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_i18n) {
      I18N = _i18n.I18N;
    }],
    execute: function () {
      DfValueConverter = (function () {
        _createClass(DfValueConverter, null, [{
          key: 'inject',
          value: function inject() {
            return [I18N];
          }
        }]);

        function DfValueConverter(i18n) {
          _classCallCheck(this, DfValueConverter);

          this.service = i18n;
        }

        _createClass(DfValueConverter, [{
          key: 'toView',
          value: function toView(value, formatOptions, locale, dateFormat) {
            var ret = value;
            if (ret) {
              var df = dateFormat || this.service.df(formatOptions, locale || this.service.getLocale());
              ret = df.format(value);
            }
            return ret;
          }
        }]);

        return DfValueConverter;
      })();

      _export('DfValueConverter', DfValueConverter);
    }
  };
});