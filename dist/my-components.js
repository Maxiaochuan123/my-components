import { defineComponent as m, createBlock as d, openBlock as _, unref as g, mergeProps as x, withCtx as C, renderSlot as b, createTextVNode as h, toDisplayString as k } from "vue";
import y, { NButton as S } from "naive-ui";
const j = /* @__PURE__ */ m({
  __name: "index",
  props: {
    text: { default: "默认按钮" }
  },
  emits: ["click"],
  setup(o, { emit: n }) {
    const c = n, r = (e) => {
      c("click", e);
    };
    return (e, i) => (_(), d(g(S), x(e.$attrs, { onClick: r }), {
      default: C(() => [
        b(e.$slots, "default", {}, () => [
          h(k(e.text), 1)
        ])
      ]),
      _: 3
    }, 16));
  }
}), v = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: j
}, Symbol.toStringTag, { value: "Module" })), N = {
  prefix: "My",
  nameStyle: "pascal"
}, O = /* @__PURE__ */ Object.assign({
  "./Button/index.vue": v
}), $ = (o = {}) => {
  const n = { ...N, ...o }, { prefix: c, nameStyle: r } = n, e = (t) => {
    switch (r) {
      case "camel":
        return t.charAt(0).toLowerCase() + t.slice(1);
      case "kebab":
        return t.replace(/([A-Z])/g, "-$1").toLowerCase();
      case "pascal":
      default:
        return t.charAt(0).toUpperCase() + t.slice(1);
    }
  };
  return Object.entries(O).reduce(
    (t, [l, u]) => {
      var a;
      const s = (a = l.match(/\.\/(.+)\/index\.vue/)) == null ? void 0 : a[1];
      if (s) {
        const p = e(s), f = `${c}${p}`;
        t[f] = u.default;
      }
      return t;
    },
    {}
  );
}, A = {
  install(o, n = {}) {
    o.use(y);
    const c = $(n);
    Object.entries(c).forEach(([r, e]) => {
      o.component(r, e);
    });
  }
};
export {
  A as default
};
