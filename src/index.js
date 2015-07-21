import {I18N} from './i18n';
import {EventAggregator} from 'aurelia-event-aggregator';

export {I18N} from './i18n';
export {RelativeTime} from './relativeTime';
export {DfValueConverter} from './df';
export {NfValueConverter} from './nf';
export {RtValueConverter} from './rt';
export {TValueConverter} from './t';

export function configure(aurelia, cb){
  if(typeof cb !== 'function') {
    throw 'You need to provide a callback method to properly configure the library';
  }

  aurelia.globalizeResources('./t');
  aurelia.globalizeResources('./nf');
  aurelia.globalizeResources('./df');
  aurelia.globalizeResources('./rt');

  let ret = null,
    onIntlLoaded = () => {
      var instance = new I18N(aurelia.container.get(EventAggregator));
      aurelia.container.registerInstance(I18N, instance);
      var ret = cb(instance);
      return ret && ret instanceof Promise ? ret : Promise.resolve();
    };

  // check whether Intl is available, otherwise load the polyfill
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
  if (!window.Intl) {
    ret = new Promise((accept,reject) => {
        System['import']('Intl').then((poly) => {
          window.Intl = poly;
          onIntlLoaded().then(accept,reject);
        });
    });
  }
  else {
    ret = onIntlLoaded();
  }

  return ret;
}
