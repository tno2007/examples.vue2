<script lang="ts">
import { IModel } from "../../../common/typings/explore";
import { defineComponent, onMounted, PropType, reactive, ref } from "vue";

export default defineComponent({
  name: "Profile",
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
      model: {
        VvcForename: "",
        VvcSurname: "",
        VvcPhoneMobile: "",
        LoginEmail: "lyall.vanderlinde@novationtech.co.za",
        VvcAddress1: "",
        VvcAddress2: "",
        VvcAddress3: "",
        VvcPostTown: "",
        VvcPostCode: "",
        VinifksAddressCountryID: "",
      },
      schema: [
        {
          type: "text",
          name: "VvcForename",
          label: "First name(s):",
          validation: "^required",
          inputClass: "form-control",
          validationMessages: {
            required: "Please complete this field",
          },
        },
        {
          type: "text",
          name: "VvcSurname",
          label: "Last name:",
          validation: "^required",
          inputClass: "form-control",
          validationMessages: {
            required: "Please complete this field",
          },
        },
        {
          type: "text",
          name: "LoginEmail",
          label: "Email address:",
          validation: "^required",
          inputClass: "form-control",
          validationMessages: {
            required: "Please complete this field",
          },
          disabled: "disabled",
          readonly: "readonly",
        },
        {
          type: "text",
          name: "VvcPhoneMobile",
          label: "Contact number:",
          validation: "^required",
          inputClass: "form-control",
          validationMessages: {
            required: "Please complete this field",
          },
        },
        {
          type: "text",
          name: "VvcAddress1",
          label: "Address:",
          validation: "^required",
          inputClass: "form-control",
          validationMessages: {
            required: "Please complete this field",
          },
        },
        {
          type: "text",
          name: "VvcAddress2",
          validation: "^required",
          inputClass: "form-control",
          validationMessages: {
            required: "Please complete this field",
          },
        },
        {
          type: "text",
          name: "VvcAddress3",
          inputClass: "form-control",
        },
        {
          type: "text",
          name: "VvcPostTown",
          label: "Post town:",
          validation: "^required",
          inputClass: "form-control",
          validationMessages: {
            required: "Please complete this field",
          },
        },
        {
          type: "text",
          name: "VvcPostCode",
          label: "Post code:",
          validation: "^required",
          inputClass: "form-control",
          validationMessages: {
            required: "Please complete this field",
          },
        },
        {
          type: "text",
          name: "VinifksAddressCountryID",
          label: "Country of residence:",
          validation: "^required",
          inputClass: "form-control",
          validationMessages: {
            required: "Please complete this field",
          },
        },
      ],
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

    const validation = async (validation: IValidation) => {};

    //data.model = props.modelProp;

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
    };
  },
});
</script>

<template>
  <div>
    <FormulateForm v-model="data.model" :schema="data.schema" ref="formRef" />
    <pre>{{ data.model }}</pre>
  </div>
</template>
