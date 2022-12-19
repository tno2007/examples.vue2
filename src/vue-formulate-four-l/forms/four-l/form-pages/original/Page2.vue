<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useAppStore } from "../../../../stores/appStore";

export default defineComponent({
  name: "Page2",
  setup(props, context) {
    const store = useAppStore();
    const formRef: any = ref(null);
    const submitRef: any = ref(null);

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    interface IValidation {
      errors: any[];
      hasErrors: boolean;
      name: string;
    }

    const validation = async (validation: IValidation) => {};

    return {
      store,
      formRef,
      submitRef,
      handleSubmit,
      validation,
    };
  },
});
</script>

<template>
  <div>
    <FormulateForm
      v-model="store.formModel"
      @submit="handleSubmit"
      ref="formRef"
    >
      <FormulateInput type="group" name="currentPartner" #default="{ index }">
        <FormulateInput type="group" name="info">
          <FormulateInput
            type="checkbox"
            name="new_iscurrent"
            label="Is current?"
            :value="true"
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
            :options="store.defaultCollections.boolean"
          ></FormulateInput>
          <FormulateInput
            type="textarea"
            name="isorhaveothernames_moredetail"
            label="Have your partner been known by any name or names apart from what is mentioned above?"
            :validation="[['required']]"
            v-if="
              store.formModel.currentPartner[0].info[0].new_knownbyothernames ==
              new Boolean(true).toString()
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
            v-if="false"
          ></FormulateInput>
          <FormulateInput
            type="select"
            name="new_countryofbirth"
            label="Country of birth:"
            :validation="[['required']]"
            :options="store.customCollections.countries"
          ></FormulateInput>
          <FormulateInput
            type="select"
            name="new_nationality"
            label="Your partner`s nationality:"
            :validation="[['required']]"
            :options="store.customCollections.countries"
          ></FormulateInput>
          <FormulateInput
            type="radio"
            name="new_naturalisedbritishcitizen"
            label="Is your partner is a naturalised British citizen?"
            :validation="[['required']]"
            placeholder="-- Select --"
            :options="store.defaultCollections.boolean"
          ></FormulateInput>
          <FormulateInput
            type="yearmonthday"
            name="new_citizenshipdate"
            label="Enter date they were granted this citizenship:"
            :validation="[['required']]"
            v-if="
              store.formModel.currentPartner[0].info[0]
                .new_naturalisedbritishcitizen == new Boolean(true).toString()
            "
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="new_citizenshipcertificatereference"
            label="Their citizenship certificate reference number:"
            :validation="[['required']]"
            v-if="
              store.formModel.currentPartner[0].info[0]
                .new_naturalisedbritishcitizen == new Boolean(true).toString()
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
        <h5>Partner's present address:</h5>
        <FormulateInput type="group" name="address">
          <FormulateInput
            type="select"
            name="new_country"
            label="Country:"
            :validation="[['required']]"
            :options="store.customCollections.countries"
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
      </FormulateInput>

      <h5>Previous partnerships:</h5>
      <FormulateInput
        type="radio"
        name="previouslymarried"
        label="Were you previously married or in a civil partnership?"
        :validation="[['required']]"
        :options="store.defaultCollections.boolean"
      ></FormulateInput>

      <FormulateInput
        type="group"
        name="previousPartners"
        :repeatable="true"
        #default="{ index }"
        add-label="+ Add another previous partner"
        v-if="store.formModel.previouslymarried == new Boolean(true).toString()"
      >
        <h5 class="pt-2 pb-2">Previous partner ({{ index + 1 }})</h5>
        <FormulateInput
          type="checkbox"
          name="new_iscurrent"
          label="Is current?"
          value="true"
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
          v-if="false"
        ></FormulateInput>
        <FormulateInput
          type="select"
          name="new_countryofbirth"
          label="Country of birth:"
          :validation="[['required']]"
          :options="store.customCollections.countries"
        ></FormulateInput>
        <FormulateInput
          type="select"
          name="new_nationality"
          label="Your partner`s nationality:"
          :validation="[['required']]"
          :options="store.customCollections.countries"
        ></FormulateInput>
        <FormulateInput
          type="yearmonthday"
          name="new_dateofmarriage"
          label="Date this previous partnership started:"
          :validation="[['required']]"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="new_partnershipplace"
          label="Place where this partnership started:"
          :validation="[['required']]"
        ></FormulateInput>
        <h5>Date, place and reason this partnership ended:</h5>
        <FormulateInput
          type="yearmonthday"
          name="new_partnershipenddate"
          label="Date when partnership ended:"
          :validation="[['required']]"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="new_partnershipendplace"
          label="Place where this partnership ended:"
        ></FormulateInput>
        <FormulateInput
          type="textarea"
          name="new_partnershipendreason"
          label="Reason for ending partnership:"
        ></FormulateInput>
      </FormulateInput>
    </FormulateForm>
  </div>
</template>

<style lang="scss"></style>
