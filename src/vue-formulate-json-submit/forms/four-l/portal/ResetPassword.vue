<script lang="ts">
import { IModel } from "../../../common/typings/explore";
import { defineComponent, onMounted, PropType, reactive, ref } from "vue";

export default defineComponent({
  name: "ResetPassword",
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
          type: "text",
          name: "newPassword",
          label: "New password:",
          validation: "^required",
          validationMessages: {
            required: "Please enter your new password",
          },
          autocomplete: "email",
          inputClass: "form-control",
        },
        {
          type: "text",
          name: "newPassword_confirm",
          label: "Confirm password:",
          validation: "^required|confirm",
          validationName: "Password",
          validationMessages: {
            required: "Please confirm your password",
          },
          autocomplete: "email",
          inputClass: "form-control",
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
