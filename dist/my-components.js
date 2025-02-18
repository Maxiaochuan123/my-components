import { defineComponent as i, resolveComponent as u, createBlock as p, openBlock as _, mergeProps as m, withCtx as f, createElementVNode as C, renderSlot as k, createTextVNode as v, toDisplayString as h } from "vue";
import y from "naive-ui";
const S = /* @__PURE__ */ i({
  __name: "index",
  props: {
    text: { default: "默认按钮" }
  },
  emits: ["click"],
  setup(n, { emit: o }) {
    const c = o, r = (e) => {
      c("click", e);
    };
    return (e, s) => {
      const t = u("n-button");
      return _(), p(t, m(e.$attrs, { onClick: r }), {
        default: f(() => s[0] || (s[0] = [
          C("span", null, "123", -1)
        ])),
        _: 1
      }, 16);
    };
  }
}), $ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: S
}, Symbol.toStringTag, { value: "Module" })), j = /* @__PURE__ */ i({
  __name: "index",
  props: {
    text: { default: "默认标签" }
  },
  emits: ["click"],
  setup(n, { emit: o }) {
    const c = o, r = (e) => {
      c("click", e);
    };
    return (e, s) => {
      const t = u("n-tag");
      return _(), p(t, m(e.$attrs, { onClick: r }), {
        default: f(() => [
          k(e.$slots, "default", {}, () => [
            v(h(e.text), 1)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
}), O = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: j
}, Symbol.toStringTag, { value: "Module" })), N = {
  prefix: "My",
  // 默认 My 前缀
  nameStyle: "pascal"
  // 默认 pascal 命名风格
}, w = /* @__PURE__ */ Object.assign({
  "./Button/index.vue": $,
  "./Tag/index.vue": O
}), M = (n = {}) => {
  const o = { ...N, ...n }, { prefix: c, nameStyle: r } = o, e = (t) => {
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
  return Object.entries(w).reduce(
    (t, [d, g]) => {
      var l;
      const a = (l = d.match(/\.\/(.+)\/index\.vue/)) == null ? void 0 : l[1];
      if (a) {
        const b = e(a), x = `${c}${b}`;
        t[x] = g.default;
      }
      return t;
    },
    {}
  );
}, A = {
  install(n, o = {}) {
    n.config.globalProperties.$naive || n.use(y);
    const c = M(o);
    Object.entries(c).forEach(([r, e]) => {
      n.component(r, e);
    });
  }
};
export {
  A as default,
  N as defaultConfig
};
