import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';

import Component0 from '@/components/apps/AppHash';

Vue.use(VueCustomElement);

async function polyfill () {
  if (!(('customElements' in window) || ('registerElement' in document))) {
    return await import('document-register-element/build/document-register-element'); // For cross-browser compatibility (IE9+) use Custom Elements polyfill.
  } else {
    return;
  }
}

polyfill().then(() => {
  Vue.customElement('custom-element-app-hash', Component0, {"shadow":false,"props":{"basePath":"./"}});
});
