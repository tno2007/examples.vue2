<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useAppStore } from "../../../../stores/appStore";
import { get } from "get-wild";
import { set } from "lodash";
export default defineComponent({
  name: "Page4",

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

    const inp = (data: any) => {
      // console.log("input", a, b, c);

      var value = get(data, "biometricEnrollment.*.new_brpissued");
      if (value) {
        console.log("value", value);

        if (Array.isArray(value)) {
          console.log("is array");
          for (let i = 0; i < value.length; i++) {
            const v = value[i];
            set(
              store.formModel,
              `biometricEnrollment[${i}].new_brpissued`,
              v.toString()
            );
          }
        }
      }
    };

    return {
      store,
      submitRef,
      handleSubmit,
      validation,
      inp,
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
      @input="inp"
    >
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
    </FormulateForm>
  </div>
</template>
