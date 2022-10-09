<script lang="ts">
import { IModel } from "../../../common/typings/explore";
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
} from "@vue/composition-api";
import collections from "../../../data/explore/collections";
import TransitionExpand from "../../../components/transitions/TransitionExpand.vue";

export default defineComponent({
  name: "Page1",
  components: {
    TransitionExpand,
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
    const fiRef: any = ref();

    const data = reactive({
      model: {} as any,
      collections: {
        maritalStatus: [] as any[],
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

    const validation = async (validation: IValidation) => {
      //console.log("b", validation);
    };

    //console.log("data.model", data.model);

    data.model = props.modelProp;

    //console.log("data.model", data.model);

    onMounted(async () => {
      // await nextTick();

      fetch(
        "https://dev-webservices.1stcontact.com/crmproxy/api/entities/contact/attributes/new_maritalstatus"
      )
        .then((response) => response.json())
        .then((response) => {
          const result: any[] = response.Result.OptionSet;
          data.collections.maritalStatus = result.map(
            ({ Key: label, Value: value }) => ({ label, value })
          );
          //console.log(data.collections.maritalStatus);
        });

      //await isSectionComplete();
    });

    return {
      formRef,
      submitRef,
      collections,
      data,
      handleSubmit,
      validation,
    };
  },
});
</script>

<template>
  <FormulateForm
    name="myForm"
    v-model="data.model"
    @submit="handleSubmit"
    ref="formRef"
    @validation="validation"
  >
    <h5 class="pt-3">Personal details (Main applicant)</h5>
    <FormulateInput type="group" name="PrimaryApplicant">
      <FormulateInput
        type="text"
        name="FirstName"
        label="First name (as seen in passport):"
        :validation="[['required']]"
      />
      <FormulateInput type="text" name="MiddleName" label="Middle name:" />
      <FormulateInput
        type="text"
        name="LastName"
        label="Last Name:"
        :validation="[['required']]"
      />
      <FormulateInput
        type="text"
        name="LastName"
        label="Passport number:"
        :validation="[['required']]"
      />
      <FormulateInput
        type="yearmonthday"
        name="PassportExpiryDate"
        label="Passport expiry date:"
        :validation="[['required']]"
      />
      <FormulateInput
        type="yearmonthday"
        name="DateOfBirth"
        label="Date of birth"
        format="date"
        :validation-messages="{
          required: 'Please complete all date fields',
        }"
      />
      <FormulateInput
        type="radio"
        name="Gender"
        label="Gender:"
        :options="collections.Gender"
        :validation="[['required']]"
      />
      <FormulateInput
        type="radio"
        name="CriminalRecord"
        label="Do you have a criminal record?"
        :options="collections.Boolean"
        :validation="[['required']]"
      />
      <TransitionExpand>
        <FormulateInput
          type="textarea"
          name="CriminalRecordMoreInfo"
          label="Please provide more detail:"
          :validation="[['required']]"
          v-if="data.model.PrimaryApplicant[0].CriminalRecord === 'true'"
        />
      </TransitionExpand>
      <!--
        # MaritalStatus
        https://dev-webservices.1stcontact.com/crmproxy/api/entities/contact/attributes/new_maritalstatus
      -->
      <FormulateInput
        type="radio"
        name="MaritalStatus"
        label="Please indicate your marital status"
        :options="data.collections.maritalStatus"
        :validation="[['required']]"
      />
      <!--
      <FormulateInput ref="submitRef" type="submit" label="Click me" />        
      -->
    </FormulateInput>
    <div>
      <span>data model</span>
      <pre>{{ data.model }}</pre>
    </div>
  </FormulateForm>
</template>
