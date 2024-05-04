<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
// import type { ISchema } from "../typings";
import { apply } from "json-logic-js";
import { useVeeIf, type ISchema } from "../composables/veeIf";

const data = ref<any>({});
const data2 = ref<any>({});

const schema = ref<ISchema[]>([
  {
    type: "text",
    name: "firstname",
    label: "First name X",
    autocomplete: "-",
  },
  {
    type: "checkbox",
    name: "available",
    label: "Are you available?",
    vif: { "==": [{ var: "firstname" }, "a"] },
  },
  {
    type: "text",
    name: "middlename",
    label: "Middle name",
    vif: { "==": [{ var: "available" }, true] },
  },
  {
    type: "text",
    name: "lastname",
    label: "Last name",
    vif: { "==": [{ var: "firstname" }, "a"] },
  },
  {
    type: "group",
    name: "personalDetails",
    children: [
      {
        type: "group",
        name: "extraDetails",
        children: [
          {
            type: "text",
            name: "age",
            label: "How old are you 1 (text)?",
            validation: "required|number|between:0,5",
            vif: { "==": [{ var: "lastname" }, "b"] },
          },
        ],
      },
    ],
  },
  {
    type: "group",
    name: "pd",
    children: [
      {
        type: "number",
        name: "age",
        label: "How old are you 2 (number)?",
        vif: { "==": [{ var: "lastname" }, "b"] },
      },
    ],
  },
  {
    type: "text",
    name: "star1",
    label: "Star me 1",
    vif: { "==": [{ var: "personalDetails.0.extraDetails.0.age" }, "1"] },
  },
  {
    type: "text",
    name: "star2",
    label: "Star me 2",
    vif: { "==": [{ var: "pd.0.age" }, "2"] },
  },
]);

const { veeIfSchema } = useVeeIf(data2, schema);

// const flattened = computed(() => {
//   return flatten(data2.value, schema.value);
// });

// const restructured = computed(() => {
//   return restructure(flattened.value.filter((f) => f.visible !== false));
// });

const jsonLogic = (rule: object, dataObj: any): boolean => {
  const value = apply(rule, data.value);

  if ("boolean" === typeof value) return value;

  return false;
};
</script>

<template>
  <div class="row">
    <div class="col">
      <FormulateForm v-model="data" v-auto-animate>
        <FormulateInput
          type="text"
          name="firstname"
          label="First name X"
          autocomplete="-"
          list="autocompleteOff"
        />
        <FormulateInput
          type="checkbox"
          name="available"
          label="Are you available?"
          v-if="data.firstname === 'a'"
        />
        <FormulateInput
          type="text"
          name="middlename"
          label="Middle name"
          v-if="data.available === true"
        />
        <FormulateInput
          type="text"
          name="lastname"
          label="Last name"
          v-if="data.firstname === 'a'"
        />

        <FormulateInput type="group" name="personalDetails">
          <FormulateInput type="group" name="extraDetails">
            <FormulateInput
              type="text"
              name="age"
              label="How old are you 1?"
              v-if="data.lastname === 'b'"
            />
          </FormulateInput>
        </FormulateInput>

        <FormulateInput type="group" name="pd">
          <FormulateInput
            type="text"
            name="age"
            label="How old are you 2?"
            v-if="data.lastname === 'b'"
          />
        </FormulateInput>

        <FormulateInput
          type="text"
          name="testfield"
          label="testfield"
          v-if="
            jsonLogic(
              {
                '==': [{ var: 'personalDetails.0.extraDetails.0.age' }, '1'],
              },
              data
            )
          "
        />

        <FormulateInput
          type="text"
          name="star1"
          label="Star 1"
          v-if="
            jsonLogic(
              {
                '==': [{ var: 'personalDetails.0.extraDetails.0.age' }, '1'],
              },
              data
            )
          "
        />
        <FormulateInput
          type="text"
          name="star2"
          label="Star 2"
          v-if="
            jsonLogic(
              {
                '==': [{ var: 'pd.0.age' }, '2'],
              },
              data
            )
          "
        />
        <pre>{{ data }}</pre>
      </FormulateForm>
    </div>
    <div class="col">
      <FormulateForm v-model="data2" v-auto-animate>
        <FormulateSchema :schema="veeIfSchema" />
        <pre>{{ data2 }}</pre>
      </FormulateForm>
    </div>
  </div>
</template>

<style>
.double-row {
  background-color: lightgrey;
}
</style>
