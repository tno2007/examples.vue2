<script lang="ts">
import { defineComponent } from "vue";
import MyTsx from "./form-pages/MyTsx";
import MyJsx from "./form-pages/MyJsx.vue";

export default defineComponent({
  components: {
    MyTsx,
  },
  setup() {
    const items = [
      {
        id: 1,
        component: "h2",
        text: "Elaine",
        children: [
          {
            id: 3,
            component: "FormulateInput",
            text: "Tatum",
            children: [
              {
                id: 2,
                component: "h2",
                text: "King",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        component: "h2",
        text: "Lyall",
      },
    ];
    return {
      items,
    };
  },
});
</script>

<template>
  <MyTsx :child="items" />
</template>
