<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
} from "@vue/composition-api";

import VueFormGenerator from "c:\\apps\\vue\\vue-form-generator-custom-ts\\src";

export default defineComponent({
  components: {},
  name: "App",
  props: {},
  setup: (props, context) => {
    const data = reactive({
      model: {
        id: 1,
        name: "John Doe",
        password: "J0hnD03!x4",
        skills: ["Javascript", "VueJS"],
        email: "john.doe@gmail.com",
        status: true,
      },
      schema: {
        groups: [
          {
            fields: [
              {
                type: "input",
                inputType: "text",
                label: "ID (disabled text field)",
                model: "id",
                readonly: true,
                disabled: true,
                attributes: {
                  wrapper: { "data-toggle": "collapse" },
                  input: {
                    "data-toggle": "tooltip",
                    title: "Some Tooltip to be displayed by Bootstrap Tooltips",
                  },
                  label: { "custom-attr": "custom-value" },
                },
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
                type: "input",
                inputType: "password",
                label: "Password",
                model: "password",
                min: 6,
                required: true,
                hint: "Minimum 6 characters",
                //validator: VueFormGenerator.validators.string,
                validator: VueFormGenerator.validators.string.locale({
                  fieldIsRequired: "The paaaaaass is required!",
                  textTooSmall: "Password must be at least {1} characters",
                }),
              },
              {
                type: "select",
                label: "Skills",
                model: "skills",
                values: ["Javascript", "VueJS", "CSS3", "HTML5"],
              },
              {
                type: "input",
                inputType: "email",
                label: "E-mail",
                model: "email",
                placeholder: "User's e-mail address",
              },
              {
                type: "checkbox",
                label: "Status",
                model: "status",
                default: true,
              },
            ],
          },
        ],
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true,
      },
    });

    return {
      props,
      data,
    };
  },
});
</script>

<template>
  <div id="app">
    <!--
<BootstrapTabs />
    -->
    <VueFormGenerator
      :schema="data.schema"
      :model="data.model"
      :options="data.formOptions"
    ></VueFormGenerator>
  </div>
</template>

<style lang="scss"></style>
