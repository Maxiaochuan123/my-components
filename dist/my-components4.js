import { defineComponent as c, resolveComponent as s, createBlock as l, openBlock as i, mergeProps as a, withCtx as p, renderSlot as m, createTextVNode as d, toDisplayString as u } from "vue";
const C = /* @__PURE__ */ c({
  __name: "index",
  props: {
    text: { default: "默认按钮" }
  },
  emits: ["click"],
  setup(_, { emit: e }) {
    const o = e, n = (t) => {
      o("click", t);
    };
    return (t, f) => {
      const r = s("n-button");
      return i(), l(r, a(t.$attrs, { onClick: n }), {
        default: p(() => [
          m(t.$slots, "default", {}, () => [
            d(u(t.text), 1)
          ])
        ]),
        _: 3
      }, 16);
    };
  }
});
export {
  C as default
};
