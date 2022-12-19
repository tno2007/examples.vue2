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
    <h5>Please your referees here</h5>
    <FormulateInput
      type="group"
      :repeatable="true"
      name="referees"
      add-label="+ Add referee"
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
            name="dayTimeTelephone"
            label="Day time telephone number:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="emailAddress"
            label="Email address:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="passportNumber"
            label="Current British citizen passport number (if any) :"
          ></FormulateInput>
        </FormulateInput>
      </div>
    </FormulateInput>
  </div>
</template>

<style lang="scss"></style>
