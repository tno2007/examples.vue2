<script lang="ts">
import { IModel } from "../../../common/typings/explore";
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
} from "vue";
import { get, set } from "lodash";

export default defineComponent({
  name: "Page2",
  components: {
    //TransitionExpand,
  },
  props: {
    modelProp: {
      type: Object as PropType<IModel>,
      required: true,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const formRef: any = ref(null);
    const submitRef: any = ref(null);

    const data = reactive({
      model: {} as any,
      schema: [
        {
          component: "h5",
          children: "Full name of partner",
          class: "mb-4",
        },
        {
          type: "text",
          name: "FirstName",
          label: "First name:",
          validation: "^required",
          validationMessages: {
            required: "We need this information to assist you",
          },
        },
        {
          type: "text",
          name: "LastName",
          label: "Last name:",
          validation: "^required",
          validationMessages: {
            required: "We need this information to assist you",
          },
        },
        {
          type: "radio",
          name: "isorhaveothernames",
          label:
            "Have your partner been known by any name or names apart from what is mentioned above?",
          validation: "^required",
          validationMessages: {
            required: "We need this information to assist you",
          },
          options: [
            {
              label: "Yes",
              value: "true",
            },
            {
              label: "No",
              value: "false",
            },
          ],
        },
      ],
      collections: {
        boolean: [
          {
            label: "Yes",
            value: "true",
          },
          {
            label: "No",
            value: "false",
          },
        ],
        country: [] as any[],
      },
    });

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    interface IValidation {
      errors: any[];
      hasErrors: boolean;
      name: string;
    }

    const validation = async (validation: IValidation) => {};

    //data.model = props.modelProp;

    onMounted(async () => {
      fetch(
        "https://webservices.1stcontact.com/crmproxy/api/v2/entities/lead/attributes/new_country"
      )
        .then((response) => response.json())
        .then((response) => {
          const result: any[] = response.Result;
          const options = result.map(({ Description: label, Code: value }) => ({
            label,
            value,
          }));
          data.collections.country = options;
        });
    });

    return {
      formRef,
      submitRef,
      data,
      handleSubmit,
      validation,
    };
  },
});
</script>

<template>
  <div>
    <!--
    <FormulateForm v-model="data.model" :schema="data.schema" ref="formRef" />
    -->
    <FormulateForm v-model="data.model" @submit="handleSubmit" ref="formRef">
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
        type="radio"
        name="isorhaveothernames"
        label="Have your partner been known by any name or names apart from what is mentioned above?"
        :validation="[['required']]"
        placeholder="-- Select --"
        :options="data.collections.boolean"
      ></FormulateInput>
      <FormulateInput
        type="textarea"
        name="isorhaveothernames_moredetail"
        label="Have your partner been known by any name or names apart from what is mentioned above?"
        :validation="[['required']]"
        v-if="data.model.isorhaveothernames == 'true'"
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
        label="Your partner’s nationality:"
        :validation="[['required']]"
        :options="data.collections.country"
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
      <h5>Partners present address:</h5>
      <FormulateInput
        type="select"
        name="country"
        label="Country:"
        :validation="[['required']]"
        :options="data.collections.country"
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
      <FormulateInput
        type="group"
        :repeatable="true"
        name="previousmarriagespartnerships"
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
    </FormulateForm>
    <pre>{{ data.model }}</pre>
  </div>
</template>

<style lang="scss">
//.formulate-input .formulate-input-element {
//max-width: none;
//}
</style>
