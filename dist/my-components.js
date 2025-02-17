import * as u from "./my-components2.js";
import p from "naive-ui";
import { defaultConfig as d } from "./my-components3.js";
const g = /* @__PURE__ */ Object.assign({
  "./Button/index.vue": u
}), x = (t = {}) => {
  const o = { ...d, ...t }, { prefix: n, nameStyle: s } = o, r = (e) => {
    switch (s) {
      case "camel":
        return e.charAt(0).toLowerCase() + e.slice(1);
      case "kebab":
        return e.replace(/([A-Z])/g, "-$1").toLowerCase();
      case "pascal":
      default:
        return e.charAt(0).toUpperCase() + e.slice(1);
    }
  };
  return Object.entries(g).reduce(
    (e, [i, f]) => {
      var a;
      const c = (a = i.match(/\.\/(.+)\/index\.vue/)) == null ? void 0 : a[1];
      if (c) {
        const m = r(c), l = `${n}${m}`;
        e[l] = f.default;
      }
      return e;
    },
    {}
  );
}, $ = {
  install(t, o = {}) {
    t.config.globalProperties.$naive || t.use(p);
    const n = x(o);
    Object.entries(n).forEach(([s, r]) => {
      t.component(s, r);
    });
  }
};
export {
  $ as default
};
