<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useAppStore } from "../../../stores/appStore";

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
      <FormulateInput type="group" name="partner">
        <FormulateInput type="group" name="info">
          <FormulateInput
            type="text"
            name="new_forename"
            label="First name:"
            :validation="[['required']]"
            placeholder="-- Select --"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="new_surname"
            label="Last name:"
            :validation="[['required']]"
            placeholder="-- Select --"
          ></FormulateInput>
          <FormulateInput
            type="radio"
            name="isorhaveothernames"
            label="Have your partner been known by any name or names apart from what is mentioned above?"
            :validation="[['required']]"
            placeholder="-- Select --"
            :options="store.defaultCollections.boolean"
          ></FormulateInput>
          <FormulateInput
            type="textarea"
            name="isorhaveothernames_moredetail"
            label="Have your partner been known by any name or names apart from what is mentioned above?"
            :validation="[['required']]"
            v-if="store.formModel.partner.info.isorhaveothernames == 'true'"
          ></FormulateInput>
          <FormulateInput
            type="yearmonthday"
            name="dateofbirth"
            label="Date of birth:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="villagetownorcity"
            label="Partner’s village, town or city:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="select"
            name="countryofbirth"
            label="Country of birth:"
            :validation="[['required']]"
            :options="store.collections.countries"
          ></FormulateInput>
          <FormulateInput
            type="select"
            name="nationality"
            label="Your partner’s nationality:"
            :validation="[['required']]"
            :options="store.collections.countries"
          ></FormulateInput>
          <FormulateInput
            type="radio"
            name="isnaturalisebritishcitizen"
            label="Is your partner is a naturalised British citizen?"
            :validation="[['required']]"
            placeholder="-- Select --"
            :options="data.collections.boolean"
          ></FormulateInput>
          <FormulateInput
            type="yearmonthday"
            name="NaturalisedBritishCitizenDate"
            label="Enter date they were granted this citizenship:"
            :validation="[['required']]"
            v-if="data.model.isnaturalisebritishcitizen == 'true'"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="CitizenshipCertificateReferenceNumber"
            label="Their citizenship certificate reference number:"
            :validation="[['required']]"
            v-if="data.model.isnaturalisebritishcitizen == 'true'"
          ></FormulateInput>
          <h5>Marriage / Civil partnership:</h5>
          <FormulateInput
            type="yearmonthday"
            name="DateOfMarriageCivilPartnership"
            label="Date of marriage/civil partnership:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="PlaceOfMarriageCivilPartnership"
            label="Place of marriage/civil partnership:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="radio"
            name="previouslymarried"
            label="Were you previously married or in a civil partnership?"
            :validation="[['required']]"
            placeholder="-- Select --"
            :options="data.collections.boolean"
          ></FormulateInput>
        </FormulateInput>
        <FormulateInput type="group" name="address">
          <h5>Partners present address:</h5>
          <FormulateInput
            type="select"
            name="country"
            label="Country:"
            :validation="[['required']]"
            :options="store.collections.countries"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="addressline1"
            label="Address:"
            :validation="[['required']]"
            placeholder="Address line 1"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="addressline2"
            :validation="[['required']]"
            placeholder="Address line 2"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="posttownorcity"
            label="Post town / city:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="stateorprovince"
            label="State / Province:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="postalcode"
            label="Postal code:"
            :validation="[['required']]"
          ></FormulateInput>
        </FormulateInput>
        <FormulateInput
          type="group"
          :repeatable="true"
          name="previousPartners"
          :validation="[['required']]"
          #default="{ index }"
          add-label="+ Add another previous partnership"
          v-if="data.model.previouslymarried == 'true'"
        >
          <h5 class="pt-2 pb-2">
            Details of previous partnership ({{ index + 1 }})
          </h5>
          <FormulateInput
            type="text"
            name="FirstName"
            label="First name:"
            :validation="[['required']]"
            placeholder="-- Select --"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="LastName"
            label="Last name:"
            :validation="[['required']]"
            placeholder="-- Select --"
          ></FormulateInput>
          <FormulateInput
            type="yearmonthday"
            name="dateofbirth"
            label="Date of birth:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="villagetownorcity"
            label="Partner’s village, town or city:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="select"
            name="countryofbirth"
            label="Country of birth:"
            :validation="[['required']]"
            :options="data.collections.country"
          ></FormulateInput>
          <FormulateInput
            type="select"
            name="nationality"
            label="Partner’s nationality:"
            :validation="[['required']]"
            :options="data.collections.country"
          ></FormulateInput>
          <FormulateInput
            type="yearmonthday"
            name="DateOfMarriageCivilPartnership"
            label="Date of partnership:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="PlaceOfMarriageCivilPartnership"
            label="Place of partnership:"
            :validation="[['required']]"
          ></FormulateInput>
          <h5>Date, place and reason for the ending of this partnership:</h5>
          <FormulateInput
            type="yearmonthday"
            name="DateOfEndingPartnership"
            label="Date when partnership ended:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="PlaceOfEndingPartnership"
            label="Place where partnership ended:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="textarea"
            name="ReasonForEndingPartnership"
            label="Reason for ending partnership:"
            :validation="[['required']]"
          ></FormulateInput>
        </FormulateInput>
      </FormulateInput>
    </FormulateForm>
  </div>
</template>

<style lang="scss">
//.formulate-input .formulate-input-element {
//max-width: none;
//}
</style>
