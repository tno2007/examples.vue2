<style lang="scss"></style>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  computed,
} from "@vue/composition-api";
import sampleData from "../common/data/sampleDataSet";
import { useAppHelper } from "../common/composables/useAppHelper";
export default defineComponent({
  name: "Home",
  components: {},
  props: {
    sampleProp: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const data = reactive({
      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "ID",
            model: "id",
            //readonly: true,
            //disabled: true,
          },
          {
            type: "input",
            inputType: "text",
            label: "Name",
            model: "name",
            placeholder: "Your name",
            featured: true,
            required: true,
          },
          {
            type: "array",
            label: "Array field",
            model: "array",
            showRemoveButton: true,
            items: {
              type: "object",
              default: {},
              schema: {
                fields: [
                  {
                    type: "input",
                    inputType: "text",
                    label: "Label",
                    model: "label",
                  },
                  {
                    type: "input",
                    inputType: "text",
                    label: "Field",
                    model: "field",
                  },
                  {
                    type: "sourcecode",
                    label: "Template",
                    model: "template",
                  },
                ],
              },
            },
          },
        ],
      },
      model: {},
      formOptions: {
        validateAfterChanged: true,
      },
    });

    const people = computed(() => {
      return sampleData;
    });

    const { x, y } = useAppHelper();

    onMounted(() => {});

    return {
      data,
      people,
      x,
      y,
    };
  },
});
</script>

<template>
  <div>
    <ul>
      <li v-for="p in people">{{ p.firstName }} {{ p.lastName }}</li>
    </ul>
    <vue-form-generator
      :schema="data.schema"
      :model="data.model"
      :options="data.formOptions"
    ></vue-form-generator>
  </div>
</template>
