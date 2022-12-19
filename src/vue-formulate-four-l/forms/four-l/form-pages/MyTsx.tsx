import { defineComponent, h, PropType } from "vue";
import MyTsx from "../form-pages/MyTsx";

export default defineComponent({
  props: {
    child: {
      type: Array,
      default: [],
    },
  },
  setup(props, context) {
    function fn(node: any) {
      // return <div>Heelloo</div>;
      if (Array.isArray(node)) {
        (node as any[]).forEach((n) => {
          console.log("inside loop", n);
          return fn(n);
        });
      } else {
        console.log("is not array", node);
        return <li key={node.id}>{node.text}</li>;
      }
    }

    function arrFn(node: any) {
      return (node as any[]).map((n) => {
        <li key={n.id}>{n.text}</li>;
      });
    }

    const recursive = (array: any, isChild?: boolean) => {
      return array.map((item: any) => (
        <li>
          {h(item.component, item.text)}
          {item?.children?.length ? (
            <ul> {recursive(item.children, true)}</ul>
          ) : null}
        </li>
      ));
    };

    return () => <ul>{recursive(props.child)}</ul>;
  },
});
