<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from "vue";

export default defineComponent({
  name: "Page2",
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
    const removeItemRepeatableItem = (
      fn: Function,
      index: number,
      description: string = ""
    ) => {
      if (
        confirm(
          `Are you sure you want to remove this ${
            description.length ? `${description}` : "item"
          }?`
        )
      ) {
        fn();
      }
    };
    return { removeItemRepeatableItem };
  },
});

/*

*/
</script>

<template>
  <div>
    <h5>Please add your referees here</h5>
    <FormulateInput
      type="group"
      :repeatable="true"
      name="referees"
      add-label="+ Add another referee"
      #default="{ index }"
    >
      <div class="formulate-input-group-repeatable">
        <FormulateInput type="group" name="info">
          <FormulateInput
            type="text"
            name="new_firstname"
            label="First name:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="new_lastname"
            label="Last name:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="yearmonthday"
            name="new_dateofbirth"
            label="Date of birth:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="radio"
            name="new_gender"
            label="Sex:"
            :validation="[['required']]"
            :options="customCollections.genders"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="new_daytimenumber"
            label="Day time telephone number:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="new_emailaddress"
            label="Email address:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="new_passportnumber"
            label="Current British citizen passport number (if any) :"
          ></FormulateInput>
        </FormulateInput>
        <FormulateInput
          type="group"
          name="addresses"
          :repeatable="true"
          add-label="+ Add a previous address"
          #default="{ index }"
        >
          <h5 class="pt-2 pb-2">
            {{ index == 0 ? `Current Address` : `Previous address (${index})` }}
          </h5>
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
          <h5 v-if="index == 0">
            If this referee, have been at this address for less than 3 years,
            please add their previous addresses below:
          </h5>
        </FormulateInput>
      </div>
    </FormulateInput>
  </div>
</template>

<style lang="scss"></style>
