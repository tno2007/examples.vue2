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
    return {};
  },
});
</script>

<template>
  <div>
    <FormulateInput
      type="group"
      name="partners"
      xrepeatable="true"
      #default="{ index, model }"
    >
      <FormulateInput
        type="checkbox"
        name="new_iscurrent"
        label="Is current?"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="new_forename"
        label="First name:"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="new_surname"
        label="Last name:"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="radio"
        name="new_knownbyothernames"
        label="Have your partner been known by any name or names apart from what is mentioned above?"
        :validation="[['required']]"
        :options="defaultCollections.boolean"
      ></FormulateInput>
      <FormulateInput
        type="textarea"
        name="isorhaveothernames_moredetail"
        label="Have your partner been known by any name or names apart from what is mentioned above?"
        :validation="[['required']]"
        x-v-if="
            model.currentPartner[0].info[0].new_knownbyothernames ==
              new Boolean(true).toString() && index == 0
          "
      ></FormulateInput>
      <FormulateInput
        type="yearmonthday"
        name="new_dateofbirth"
        label="Date of birth:"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="new_villagetownorcity"
        label="Partner’s village, town or city:"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="select"
        name="new_countryofbirth"
        label="Country of birth:"
        :validation="[['required']]"
        :options="customCollections.countries"
      ></FormulateInput>
      <FormulateInput
        type="select"
        name="new_nationality"
        label="Your partner`s nationality:"
        :validation="[['required']]"
        :options="customCollections.countries"
      ></FormulateInput>
      <FormulateInput
        type="radio"
        name="new_naturalisedbritishcitizen"
        label="Is your partner is a naturalised British citizen?"
        :validation="[['required']]"
        placeholder="-- Select --"
        :options="defaultCollections.boolean"
      ></FormulateInput>
      <FormulateInput
        type="yearmonthday"
        name="new_citizenshipdate"
        label="Enter date they were granted this citizenship:"
        :validation="[['required']]"
        x-v-if="
            model.currentPartner[0].info[0].new_naturalisedbritishcitizen ==
              new Boolean(true).toString() && index == 0
          "
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="new_citizenshipcertificatereference"
        label="Their citizenship certificate reference number:"
        :validation="[['required']]"
        x-v-if="
            model.currentPartner[0].info[0].new_naturalisedbritishcitizen ==
              new Boolean(true).toString() && index == 0
          "
      ></FormulateInput>
      <h5>Marriage / Civil partnership:</h5>
      <FormulateInput
        type="yearmonthday"
        name="new_dateofmarriage"
        label="Date of marriage/civil partnership:"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="new_partnershipplace"
        label="Place of marriage/civil partnership:"
      ></FormulateInput>
    </FormulateInput>
  </div>
</template>

<style lang="scss"></style>
