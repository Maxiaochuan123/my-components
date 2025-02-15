import { defineComponent as m, createBlock as d, openBlock as _, unref as g, mergeProps as x, withCtx as C, renderSlot as b, createTextVNode as h, toDisplayString as k } from "vue";
import { NButton as y } from "naive-ui";
const S = /* @__PURE__ */ m({
  __name: "index",
  props: {
    text: { default: "默认按钮" }
  },
  emits: ["click"],
  setup(r, { emit: o }) {
    const n = o, c = (e) => {
      n("click", e);
    };
    return (e, l) => (_(), d(g(y), x(e.$attrs, { onClick: c }), {
      default: C(() => [
        b(e.$slots, "default", {}, () => [
          h(k(e.text), 1)
        ])
      ]),
      _: 3
    }, 16));
  }
}), j = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: S
}, Symbol.toStringTag, { value: "Module" })), N = {
  prefix: "My",
  nameStyle: "pascal"
}, O = /* @__PURE__ */ Object.assign({
  "./Button/index.vue": j
}), $ = (r = {}) => {
  const o = { ...N, ...r }, { prefix: n, nameStyle: c } = o, e = (t) => {
    switch (c) {
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
    (t, [i, p]) => {
      var a;
      const s = (a = i.match(/\.\/(.+)\/index\.vue/)) == null ? void 0 : a[1];
      if (s) {
        const u = e(s), f = `${n}${u}`;
        t[f] = p.default;
      }
      return t;
    },
    {}
  );
}, B = {
  install(r, o = {}) {
    const n = $(o);
    Object.entries(n).forEach(([c, e]) => {
      r.component(c, e);
    });
  }
};
export {
  B as default
};
