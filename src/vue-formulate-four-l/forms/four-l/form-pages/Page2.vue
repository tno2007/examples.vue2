<script lang="ts">
import { IModel } from "../../../common/typings/explore";
import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
import TransitionExpand from "../../../components/transitions/TransitionExpand.vue";

export default defineComponent({
  name: "Page2",
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

    const data = reactive({
      model: {} as any,
      collections: {
        maritalStatus: [] as any[],
      },
    });

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    const boolCollection = [
      {
        label: "Yes",
        value: "true",
      },
      {
        label: "No",
        value: "false",
      },
    ];

    interface IValidation {
      errors: any[];
      hasErrors: boolean;
      name: string;
    }

    const validation = async (validation: IValidation) => {};

    data.model = props.modelProp;

    onMounted(async () => {
      fetch(
        "https://dev-webservices.1stcontact.com/crmproxy/api/entities/contact/attributes/new_maritalstatus"
      )
        .then((response) => response.json())
        .then((response) => {
          const result: any[] = response.Result.OptionSet;
          data.collections.maritalStatus = result.map(
            ({ Key: label, Value: value }) => ({ label, value })
          );
        });
    });

    return {
      formRef,
      submitRef,
      data,
      handleSubmit,
      validation,
      boolCollection,
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
    <FormulateInput type="group" name="Partner" class="py-5">
      <FormulateInput
        type="text"
        name="FirstName"
        label="First name:"
        :validation="[['required']]"
      />
      <FormulateInput
        type="text"
        name="LastName"
        label="Last Name:"
        :validation="[['required']]"
      />
      <FormulateInput
        type="radio"
        name="HadOtherNames"
        label="Is, or have your partner ever been known by any other name(s)?"
        :validation="[['required']]"
        :options="boolCollection"
      />
      <FormulateInput
        type="textarea"
        name="HadOtherNamesDescription"
        label="Please provide some details"
        v-if="data.model.Partner[0].HadOtherNames === 'true'"
      />
      <FormulateInput
        type="radio"
        name="Gender"
        label="Gender:"
        :options="[]"
        :validation="[['required']]"
      />
      <FormulateInput
        type="radio"
        name="CriminalRecord"
        label="Do you have a criminal record?"
        :options="[]"
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
