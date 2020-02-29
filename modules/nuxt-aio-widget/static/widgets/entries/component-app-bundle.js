import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';

Vue.use(VueCustomElement);

async function polyfill () {
  if (!(('customElements' in window) || ('registerElement' in document))) {
    return await import('document-register-element/build/document-register-element'); // For cross-browser compatibility (IE9+) use Custom Elements polyfill.
  } else {
    return;
  }
}

polyfill().then(() => {
  Vue.customElement('custom-element-app-abstract', () => { return import('@/components/apps/AppAbstract').then(module => module.default); }, {"shadow":false,"props":{"basePath":"./"}});
  Vue.customElement('custom-element-app-hash', () => { return import('@/components/apps/AppHash').then(module => module.default); }, {"shadow":false,"props":{"basePath":"./"}});
  Vue.customElement('custom-element-app-history', () => { return import('@/components/apps/AppHistory').then(module => module.default); }, {"shadow":false,"props":{"basePath":"./"}});
});
