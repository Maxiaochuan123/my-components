import { defineComponent as m, resolveComponent as d, createBlock as _, openBlock as b, mergeProps as g, withCtx as C, renderSlot as x, createTextVNode as h, toDisplayString as k } from "vue";
import v from "naive-ui";
const y = /* @__PURE__ */ m({
  __name: "index",
  props: {
    text: { default: "默认按钮" }
  },
  emits: ["click"],
  setup(o, { emit: n }) {
    const c = n, r = (t) => {
      c("click", t);
    };
    return (t, i) => {
      const e = d("n-button");
      return b(), _(e, g(t.$attrs, { onClick: r }), {
        default: C(() => [
          x(t.$slots, "default", {}, () => [
            h(k(t.text), 1)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), S = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: y
}, Symbol.toStringTag, { value: "Module" })), $ = {
  prefix: "My",
  // 默认 My 前缀
  nameStyle: "pascal"
  // 默认 pascal 命名风格
}, j = /* @__PURE__ */ Object.assign({
  "./Button/index.vue": S
}), O = (o = {}) => {
  const n = { ...$, ...o }, { prefix: c, nameStyle: r } = n, t = (e) => {
    switch (r) {
      case "camel":
        return e.charAt(0).toLowerCase() + e.slice(1);
      case "kebab":
        return e.replace(/([A-Z])/g, "-$1").toLowerCase();
      case "pascal":
      default:
        return e.charAt(0).toUpperCase() + e.slice(1);
    }
  };
  return Object.entries(j).reduce(
    (e, [l, p]) => {
      var a;
      const s = (a = l.match(/\.\/(.+)\/index\.vue/)) == null ? void 0 : a[1];
      if (s) {
        const u = t(s), f = `${c}${u}`;
        e[f] = p.default;
      }
      return e;
    },
    {}
  );
}, A = {
  install(o, n = {}) {
    o.config.globalProperties.$naive || o.use(v);
    const c = O(n);
    Object.entries(c).forEach(([r, t]) => {
      o.component(r, t);
    });
  }
};
export {
  A as default,
  $ as defaultConfig
};
