<script lang="tsx">
interface ISelectOption {
  label: string;
  id: string | number;
  value: string | number;
}

import {
  defineComponent,
  reactive,
  computed,
  watch,
  onMounted,
  nextTick,
  h,
} from "vue";

const app = defineComponent({
  currencyName: "CustomGroupFormulateInput",
  components: {},
  props: {
    context: {
      type: Object,
      required: true,
    },
    format: {
      type: String,
      required: false,
      default: "datetime",
    },
  },
  setup(props, ctx) {
    const data = reactive({
      isEventCausedByUiChange: false,
      timeZone: "",
      selectedYear: 0,
      selectedMonth: 0,
      selectedDay: 0,
      years: [] as ISelectOption[],
      months: [] as ISelectOption[],
      days: [] as ISelectOption[],
      updatedContextModel: false,
    });

    const mixinContext: any = ctx;

    nextTick(() => {
      /*
      var randomNumber = random();
      if (isDate(props.context.model)) {
        let date: Date = new Date(props.context.model);
        update(date, "nextTick");
      } else {
        console.log(
          `nextTick - value passed in, (${props.context.model}) is not a validate date.`
        );
      }
      */
    });

    watch(
      () => props.context.model,
      (newValue, oldValue) => {
        // var randomNumber = random();

        if (data.updatedContextModel) {
          data.updatedContextModel = false;
          return;
        }
      }
    );

    const model = computed(() => {
      return props.context.model;
    });

    onMounted(() => {
      console.log("ctx", props.context);
    });

    /*
    return {
      data,
      model,
      props,
    };
    */

    //return () => h("div", "this is rendered by h");

    const items = [
      {
        id: 1,
        text: "hello",
      },
    ];

    //return () => h("Formu//lateInput");

    return (
      <ul>
        {items.map(({ id, text }) => {
          return <li key={id}>{text}</li>;
        })}
      </ul>
    );
  },
});

export default app;
</script>

<template>
  <div
    class="custom-group"
    :class="context.classes.element"
    :data-type="context.type"
  >
    <template
      v-for="(child, index) in props.context.slotProps.component.groupChildren"
    >
      <template v-if="child.component">
        <component :is="child.component">{{
          child.children.replace("$index", index)
        }}</component>
      </template>
    </template>

    <!-- from the json -->
    <FormulateInput
      type="group"
      :repeatable="true"
      :name="props.context.name"
      #default="{ index }"
      :add-label="props.context.addLabel"
    >
      <!--  -->
      <!--
        in here render the group children, recursively
        You might have to put the type=group in a render function itse;f
      -->

      <!-- from the json -->
      <h5>
        {{ `Previous address (${index})` }}
      </h5>

      <!-- from the json -->
      <FormulateInput type="checkbox" name="new_iscurrent"></FormulateInput>
    </FormulateInput>
  </div>
</template>

<style lang="scss" scoped></style>
