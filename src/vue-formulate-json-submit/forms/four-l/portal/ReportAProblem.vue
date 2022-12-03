<script lang="ts">
import { IModel } from "../../../common/typings/explore";
import { defineComponent, onMounted, PropType, reactive, ref } from "vue";

export default defineComponent({
  name: "ReportAProblem",
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
          type: "select",
          name: "new_type",
          label: "Select complaint type:",
          validation: "^required",
          validationName: "Email address",
          validationMessages: {
            required: "Please select complaint type",
          },
          inputClass: "form-control",
          options: [] as any[],
        },
        {
          type: "select",
          name: "new_serviceid",
          label: "Select a business:",
          validation: "^required",
          validationName: "Password",
          validationMessages: {
            required: "Please select a business",
          },
          inputClass: "form-control",
          options: [] as any[],
        },
        {
          type: "textarea",
          name: "new_detail",
          label: "What aspect of our service could we improve?",
          validation: "^required",
          validationName: "Password",
          validationMessages: {
            required: "Please complete this field",
          },
          inputClass: "form-control",
        },
      ],
      collections: {
        complaintType: [] as any[],
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
        "https://dev-webservices.1stcontact.com/crmproxy/api/entities/new_complaint/attributes/new_type"
      )
        .then((response) => response.json())
        .then((response) => {
          const result: any[] = response.Result.OptionSet;
          data.collections.complaintType = result.map(
            ({ Key: label, Value: value }) => ({ label, value })
          );
          console.log(data.collections.complaintType);

          data.schema[0].options = data.collections.complaintType;
        });

      data.schema[1].options = [{}];
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
