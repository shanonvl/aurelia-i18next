System.register(['./i18n', 'aurelia-event-aggregator', './relativeTime', './df', './nf', './rt', './t'], function (_export) {
  'use strict';

  var I18N, EventAggregator;

  _export('configure', configure);

  function configure(aurelia, cb) {
    if (typeof cb !== 'function') {
      throw 'You need to provide a callback method to properly configure the library';
    }

    aurelia.globalizeResources('./t');
    aurelia.globalizeResources('./nf');
    aurelia.globalizeResources('./df');
    aurelia.globalizeResources('./rt');

    var ret = null,
        onIntlLoaded = function onIntlLoaded() {
      var instance = new I18N(aurelia.container.get(EventAggregator));
      aurelia.container.registerInstance(I18N, instance);
      var ret = cb(instance);
      return ret && ret instanceof Promise ? ret : Promise.resolve();
    };

    if (!window.Intl) {
      ret = new Promise(function (accept, reject) {
        System['import']('Intl').then(function (poly) {
          window.Intl = poly;
          onIntlLoaded().then(accept, reject);
        });
      });
    } else {
      ret = onIntlLoaded();
    }

    return ret;
  }

  return {
    setters: [function (_i18n) {
      I18N = _i18n.I18N;

      _export('I18N', _i18n.I18N);
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_relativeTime) {
      _export('RelativeTime', _relativeTime.RelativeTime);
    }, function (_df) {
      _export('DfValueConverter', _df.DfValueConverter);
    }, function (_nf) {
      _export('NfValueConverter', _nf.NfValueConverter);
    }, function (_rt) {
      _export('RtValueConverter', _rt.RtValueConverter);
    }, function (_t) {
      _export('TValueConverter', _t.TValueConverter);
    }],
    execute: function () {}
  };
});