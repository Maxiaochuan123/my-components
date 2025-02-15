import { defineComponent as f, resolveComponent as d, createBlock as _, openBlock as b, mergeProps as g, withCtx as x, createTextVNode as C } from "vue";
import k from "naive-ui";
const v = /* @__PURE__ */ f({
  __name: "index",
  props: {
    text: { default: "默认按钮" }
  },
  emits: ["click"],
  setup(o, { emit: n }) {
    const c = n, r = (t) => {
      c("click", t);
    };
    return (t, s) => {
      const e = d("n-button");
      return b(), _(e, g(t.$attrs, { onClick: r }), {
        default: x(() => s[0] || (s[0] = [
          C(" 11111 ")
        ])),
        _: 1
      }, 16);
    };
  }
}), h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: v
}, Symbol.toStringTag, { value: "Module" })), j = {
  prefix: "My",
  nameStyle: "pascal"
}, y = /* @__PURE__ */ Object.assign({
  "./Button/index.vue": h
}), O = (o = {}) => {
  const n = { ...j, ...o }, { prefix: c, nameStyle: r } = n, t = (e) => {
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
  return Object.entries(y).reduce(
    (e, [l, m]) => {
      var i;
      const a = (i = l.match(/\.\/(.+)\/index\.vue/)) == null ? void 0 : i[1];
      if (a) {
        const p = t(a), u = `${c}${p}`;
        e[u] = m.default;
      }
      return e;
    },
    {}
  );
}, N = {
  install(o, n = {}) {
    o.config.globalProperties.$naive || o.use(k);
    const c = O(n);
    Object.entries(c).forEach(([r, t]) => {
      o.component(r, t);
    });
  }
};
export {
  N as default
};
