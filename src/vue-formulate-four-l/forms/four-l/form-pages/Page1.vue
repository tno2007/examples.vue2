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
export default defineComponent({
  name: "Page1",
  components: {},
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
        countries: [] as any[],
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

    data.model = props.modelProp;

    onMounted(async () => {
      console.log("modelProp", props.modelProp);

      fetch(
        "https://local-webservices.1stcontact.com/crmproxy/api/v5/optionset/lead/new_country"
      )
        .then((response) => response.json())
        .then((response) => {
          const result: any[] = response.value;
          const options = result.map(({ Description: label, Code: value }) => ({
            label,
            value,
          }));
          data.collections.countries = options;
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
    <FormulateForm v-model="data.model" @submit="handleSubmit" ref="formRef">
      <h5 class="mb-4">
        Please provide all your addresses for the past 5 years
      </h5>

      <FormulateInput
        type="group"
        :repeatable="true"
        name="addressHistory"
        #default="{ index }"
        add-label="+ Add address"
      >
        <h5 class="pt-2 pb-2">Address ({{ index + 1 }})</h5>
        <FormulateInput
          type="select"
          name="country"
          label="Country:"
          :validation="[['required']]"
          :options="data.collections.countries"
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
    </FormulateForm>

    <pre>{{ data.model }} </pre>
  </div>
</template>
