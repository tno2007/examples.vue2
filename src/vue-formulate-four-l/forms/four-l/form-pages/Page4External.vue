<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from "vue";

export default defineComponent({
  name: "Page4External",
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
    const submitRef: any = ref(null);

    const data = reactive({
      model: {
        currentPartner: {
          id: "",
        },
      },
    });

    watch(
      () => data.model,
      (newValue, oldValue) => {
        context.emit("modelChange", newValue);
      }
    );

    return {
      //data,
    };
  },
});
</script>

<template>
  <div>
    <FormulateInput type="group" name="currentPartner" #default="{ model }">
      <FormulateInput type="text" name="id"></FormulateInput>
      <FormulateInput type="checkbox" name="enabled"></FormulateInput>
      <FormulateInput
        type="text"
        name="test"
        v-show="model[0].enabled"
      ></FormulateInput>
    </FormulateInput>

    <FormulateInput
      type="group"
      name="biometricEnrollment"
      #default="{ index, model }"
    >
      <FormulateInput
        type="radio"
        name="new_brpissued"
        label="Have you been issued with a biometric residence permit?"
        :validation="[['required']]"
        :options="defaultCollections.boolean"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="new_brpnumber"
        label="BRP Number"
        :validation="[['required']]"
        v-show="model[index]?.new_brpissued == new Boolean(true).toString()"
      ></FormulateInput>
      <FormulateInput
        type="yearmonthday"
        name="new_brpissuedate"
        label="Issue date"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="radio"
        name="new_brplocation"
        label="Location of BRP:"
        :validation="[['required']]"
        :options="customCollections.brplocations"
      ></FormulateInput>
      <FormulateInput
        type="textarea"
        name="new_returnedreasonsenttous"
        label="Reason sent to us:"
        :validation="[['required']]"
        v-if="model[index]?.new_brplocation == new Number(100000000).toString()"
      ></FormulateInput>
    </FormulateInput>

    <!--
    <FormulateInput type="group" name="biometricEnrollment">
      <FormulateInput
        type="radio"
        name="new_brpissued"
        label="Have you been issued with a
          biometric residence permit?"
        :validation="[['required']]"
        :options="store.defaultCollections.boolean"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="new_brpnumber"
        label="BRP Number"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="yearmonthday"
        name="new_brpissuedate"
        label="Issue date"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="yearmonthday"
        name="new_brpexpirydate"
        label="Expiry date"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="text"
        name="new_brpissueplace"
        label="Place of issue"
        :validation="[['required']]"
      ></FormulateInput>
      <FormulateInput
        type="radio"
        name="new_brpenclosed"
        label="BRP enclosed?"
        :validation="[['required']]"
        :options="store.defaultCollections.boolean"
      ></FormulateInput>
      <FormulateInput
        type="radio"
        name="new_brplocation"
        label="Location ofB BRP:"
        :validation="[['required']]"
        :options="store.customCollections.BrpLocations"
      ></FormulateInput>

      <FormulateInput
        type="textarea"
        name="new_returnedreasonsenttous"
        label="Reason sent to us:"
        :validation="[['required']]"
        v-if="
          store.formModel.biometricEnrollment[0].new_brplocation ==
          new Number(100000000).toString()
        "
      ></FormulateInput>

      <FormulateInput
        type="yearmonthday"
        name="new_returneddatesendtous"
        label="Date it was sent to us:"
        :validation="[['required']]"
        v-if="
          store.formModel.biometricEnrollment[0].new_brplocation ==
          new Number(100000000).toString()
        "
      ></FormulateInput>

      <FormulateInput
        type="yearmonthday"
        name="new_lostdatereportedbrp"
        label="Date this was reported to the Home Office:"
        :validation="[['required']]"
        v-if="
          store.formModel.biometricEnrollment[0].new_brplocation ==
          new Number(100000001).toString()
        "
      ></FormulateInput>

      <FormulateInput
        type="text"
        name="new_stolenpolicereportnumber"
        label="Police report number:"
        :validation="[['required']]"
        v-if="
          store.formModel.biometricEnrollment[0].new_brplocation ==
          new Number(100000002).toString()
        "
      ></FormulateInput>

      <FormulateInput
        type="text"
        name="new_stolencrimereferencenumber"
        label="Crime reference number:"
        :validation="[['required']]"
        v-if="
          store.formModel.biometricEnrollment[0].new_brplocation ==
          new Number(100000002).toString()
        "
      ></FormulateInput>

      <FormulateInput
        type="text"
        name="new_stolenpolicestation"
        label="Police station:"
        :validation="[['required']]"
        v-if="
          store.formModel.biometricEnrollment[0].new_brplocation ==
          new Number(100000002).toString()
        "
      ></FormulateInput>

      <FormulateInput
        type="yearmonthday"
        name="new_stolendatereportedtothepolice"
        label="Date reported to the Police:"
        :validation="[['required']]"
        v-if="
          store.formModel.biometricEnrollment[0].new_brplocation ==
          new Number(100000002).toString()
        "
      ></FormulateInput>

      <FormulateInput
        type="textarea"
        name="new_otherreasonunabletoprovidebrp"
        label="Please give details why you are unable to provide it:"
        :validation="[['required']]"
        v-if="
          store.formModel.biometricEnrollment[0].new_brplocation ==
          new Number(100000003).toString()
        "
      ></FormulateInput>

      <FormulateInput
        type="radio"
        name="new_hadfingerprintstakenpartofimmigrationapp"
        label="Have you had your fingerprints taken as part of a previous UK or British Overseas Territory immigration application made in the UK, a British Overseas Territory or abroad?"
        :validation="[['required']]"
        :options="store.defaultCollections.boolean"
      ></FormulateInput>

      <FormulateInput
        type="yearmonthday"
        name="new_fingerprintstakendate"
        label="Date your fingerprints were taken:"
        :validation="[['required']]"
        v-if="
          store.formModel.biometricEnrollment[0]
            .new_hadfingerprintstakenpartofimmigrationapp ==
          new Boolean(true).toString()
        "
      ></FormulateInput>

      <FormulateInput
        type="textarea"
        name="new_fingerprintstakenwhereabouts"
        label="Give details where your fingerprints were taken:"
        :validation="[['required']]"
        :options="store.customCollections.BrpLocations"
        v-if="
          store.formModel.biometricEnrollment[0]
            .new_hadfingerprintstakenpartofimmigrationapp ==
          new Boolean(true).toString()
        "
      ></FormulateInput>

      <FormulateInput
        type="text"
        name="new_fingerprintstakentowncity"
        label="City or town where prints was taken:"
        :validation="[['required']]"
        v-if="
          store.formModel.biometricEnrollment[0]
            .new_hadfingerprintstakenpartofimmigrationapp ==
          new Boolean(true).toString()
        "
      ></FormulateInput>

      <FormulateInput
        type="select"
        name="new_fingerpintstakencountry"
        label="Country where prints was taken:"
        :validation="[['required']]"
        :options="store.customCollections.countries"
        v-if="
          store.formModel.biometricEnrollment[0]
            .new_hadfingerprintstakenpartofimmigrationapp ==
          new Boolean(true).toString()
        "
      ></FormulateInput>

      <FormulateInput
        type="textarea"
        name="new_applicationmadeabroaddetails"
        label="Give details of the British diplomatic post or posts involved if the application or
applications was or were made abroad:"
        :validation="[['required']]"
      ></FormulateInput>

      <FormulateInput
        type="radio"
        name="new_medicalorphysicalconditionforspecialneeds"
        label="Do you have a medical or physical condition which may require special arrangements for
your biometrics to be recorded?"
        :validation="[['required']]"
        :options="store.defaultCollections.boolean"
      ></FormulateInput>

      <p
        v-if="
          store.formModel.biometricEnrollment[0]
            .new_medicalorphysicalconditionforspecialneeds ==
          new Boolean(true).toString()
        "
      >
        Please make sure you provide us with a letter from a doctor registered
        with the General Medical Council (GMC) giving details of the condition
        and/or special needs and explaining any arrangements that may be
        necessary.
      </p>
    </FormulateInput>
    -->
  </div>
</template>
