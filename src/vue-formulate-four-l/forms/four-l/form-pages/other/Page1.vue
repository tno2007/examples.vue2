<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from "vue";

export default defineComponent({
  name: "Page1",
  props: {
    defaultCollections: {
      type: Object as PropType<any>,
      required: false,
      default: () => ({}),
    },
    customCollections: {
      type: Object as PropType<any>,
      required: false,
      default: () => ({}),
    },
  },
  setup(props, context) {
    return {};
  },
});
</script>

<template>
  <div>
    <h5 class="mb-4">Please provide all your addresses for the past 5 years</h5>

    <FormulateInput
      type="group"
      :repeatable="true"
      name="addressHistory"
      #default="{ index, model }"
      add-label="+ Add address"
    >
      <h5 class="pt-2 pb-2">
        {{ index == 0 ? `Current Address` : `Previous address (${index})` }}
      </h5>

      <FormulateInput
        type="checkbox"
        name="new_iscurrent"
        :v-model="index == 0 ? true : false"
        v-show="false"
      ></FormulateInput>

      <FormulateInput
        type="yearmonthday"
        name="new_fromdate"
        label="From date:"
        :validation="[['required']]"
        v-if="index > 0"
      ></FormulateInput>

      <FormulateInput
        type="yearmonthday"
        name="new_todate"
        label="To date:"
        :validation="[['required']]"
        v-if="index > 0"
      ></FormulateInput>

      <FormulateInput
        type="select"
        name="new_country"
        label="Country:"
        :validation="[['required']]"
        :options="customCollections.countries"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="new_addressline1"
        label="Address:"
        :validation="[['required']]"
        placeholder="Address line 1"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="new_addressline2"
        :validation="[['required']]"
        placeholder="Address line 2"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="new_posttownorcity"
        label="Post town / city:"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="new_stateorprovince"
        label="State / Province:"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="new_postalcode"
        label="Postal code:"
        :validation="[['required']]"
      ></FormulateInput>
    </FormulateInput>
  </div>
</template>
