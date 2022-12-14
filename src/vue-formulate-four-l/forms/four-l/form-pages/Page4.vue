<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useAppStore } from "../../../stores/appStore";

export default defineComponent({
  name: "Page4",

  setup(props, context) {
    const store = useAppStore();
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
        gender: [
          {
            label: "Male",
            value: "1",
          },
          {
            label: "Female",
            value: "2",
          },
        ],
        brpLocation: [
          {
            label: "Returned to home office",
            value: "returnedToHomeOffice",
          },
          {
            label: "Lost",
            value: "lost",
          },
          {
            label: "Stolen",
            value: "stolen",
          },
          {
            label: "Other",
            value: "other",
          },
        ],
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
        type="radio"
        name="issuedWithBiometricResidencePermit"
        label="Have you been issued with a biometric residence permit?"
        :validation="[['required']]"
        :options="data.collections.boolean"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="brpNumber"
        label="BRP Number"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="yearmonthday"
        name="issueDate"
        label="Issue date"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="yearmonthday"
        name="expiryDate"
        label="Expiry date"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="placeOfIssue"
        label="Place of issue"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="radio"
        name="brpEnclosed"
        label="BRP enclosed?"
        :validation="[['required']]"
        :options="data.collections.boolean"
      ></FormulateInput>
      <FormulateInput
        type="radio"
        name="locationOfBRP"
        label="Location ofB BRP:"
        :validation="[['required']]"
        :options="data.collections.brpLocation"
      ></FormulateInput>

      <FormulateInput
        type="textarea"
        name="returnedReasonSentToUs"
        label="Reason sent to us:"
        :validation="[['required']]"
        v-if="data.model.locationOfBRP == 'returnedToHomeOffice'"
      ></FormulateInput>

      <FormulateInput
        type="yearmonthday"
        name="returnedDateSentToUs"
        label="Date it was sent to us:"
        :validation="[['required']]"
        v-if="data.model.locationOfBRP == 'returnedToHomeOffice'"
      ></FormulateInput>

      <FormulateInput
        type="yearmonthday"
        name="lostDateReportedBrp"
        label="Date this was reported to the Home Office:"
        :validation="[['required']]"
        v-if="data.model.locationOfBRP == 'lost'"
      ></FormulateInput>

      <FormulateInput
        type="text"
        name="stolenPoliceReportNumber"
        label="Police report number:"
        :validation="[['required']]"
        v-if="data.model.locationOfBRP == 'stolen'"
      ></FormulateInput>

      <FormulateInput
        type="text"
        name="stolenCrimeReferenceNumber"
        label="Crime reference number:"
        :validation="[['required']]"
        v-if="data.model.locationOfBRP == 'stolen'"
      ></FormulateInput>

      <FormulateInput
        type="text"
        name="stolenPoliceStation"
        label="Police station:"
        :validation="[['required']]"
        v-if="data.model.locationOfBRP == 'stolen'"
      ></FormulateInput>

      <FormulateInput
        type="yearmonthday"
        name="stolenDateReportedToPolice"
        label="Date reported to the Police:"
        :validation="[['required']]"
        v-if="data.model.locationOfBRP == 'stolen'"
      ></FormulateInput>

      <FormulateInput
        type="textarea"
        name="otherReasonUnableToProvideBrp"
        label="Please give details why you are unable to provide it:"
        :validation="[['required']]"
        v-if="data.model.locationOfBRP == 'other'"
      ></FormulateInput>

      <FormulateInput
        type="radio"
        name="hadFingerprintsTakenPartOfImmigrationApplication"
        label="Have you had your fingerprints taken as part of a previous UK or British Overseas
Territory immigration application made in the UK, a British Overseas Territory or abroad?"
        :validation="[['required']]"
        :options="data.collections.boolean"
      ></FormulateInput>

      <FormulateInput
        type="yearmonthday"
        name="fingerprintsTakenDate"
        label="Date your fingerprints were taken:"
        :validation="[['required']]"
        v-if="
          data.model.hadFingerprintsTakenPartOfImmigrationApplication == 'other'
        "
      ></FormulateInput>

      <FormulateInput
        type="textarea"
        name="fingerprintsTakenWhereabouts"
        label="Give details where your fingerprints were taken:"
        :validation="[['required']]"
        :options="data.collections.brpLocation"
        v-if="
          data.model.hadFingerprintsTakenPartOfImmigrationApplication == 'other'
        "
      ></FormulateInput>

      <FormulateInput
        type="text"
        name="fingerprintsTakenTownCity"
        label="City or town where prints was taken:"
        :validation="[['required']]"
        v-if="
          data.model.hadFingerprintsTakenPartOfImmigrationApplication == 'other'
        "
      ></FormulateInput>

      <FormulateInput
        type="select"
        name="fingerprintsTakenCountry"
        label="Country where prints was taken:"
        :validation="[['required']]"
        :options="data.collections.country"
        v-if="
          data.model.hadFingerprintsTakenPartOfImmigrationApplication == 'other'
        "
      ></FormulateInput>

      <FormulateInput
        type="textarea"
        name="applicationMadeAbroadDetails"
        label="Give details of the British diplomatic post or posts involved if the application or
applications was or were made abroad:"
        :validation="[['required']]"
      ></FormulateInput>

      <FormulateInput
        type="radio"
        name="medicalOrPhysicalConditionForSpecialNeeds"
        label="Do you have a medical or physical condition which may require special arrangements for
your biometrics to be recorded?"
        :validation="[['required']]"
        :options="data.collections.boolean"
      ></FormulateInput>

      <p v-if="data.model.medicalOrPhysicalConditionForSpecialNeeds == 'true'">
        Please make sure you provide us with a letter from a doctor registered
        with the General Medical Council (GMC) giving details of the condition
        and/or special needs and explaining any arrangements that may be
        necessary.
      </p>
    </FormulateForm>
  </div>
</template>

<style lang="scss">
.formulate-input .formulate-input-element {
  max-width: none;
}
</style>
