import {I18N} from './i18n';
export {I18N} from './i18n';

export function install(aurelia){
  aurelia.globalizeResources('./t');
  aurelia.container.registerInstance(I18N, new I18N());
}