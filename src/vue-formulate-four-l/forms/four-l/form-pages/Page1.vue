<script lang="ts">
import { IModel } from "../../../common/typings/explore";
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  reactive,
  ref,
} from "vue";
import { useAppStore } from "../../../stores/appStore";

export default defineComponent({
  name: "Page1",
  components: {},
  props: {
    modelProp: {
      type: Object, // as PropType<IModel>,
      required: false,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const store = useAppStore();
    const formRef: any = ref(null);
    const submitRef: any = ref(null);

    const data = reactive({
      model: props.modelProp,
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

    //data.model = props.modelProp;

    //const m = computed(() => props.modelProp);

    onMounted(async () => {
      //console.log("modelProp", props.modelProp);
      //await nextTick();
      /*
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
        
*/
      await nextTick();
    });

    return {
      formRef,
      submitRef,
      data,
      handleSubmit,
      validation,
      props,
      //m,
      store,
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
    >
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
        <h5 class="pt-2 pb-2">
          {{ index == 0 ? `Current Address` : `Previous address (${index})` }}
        </h5>

        <FormulateInput
          type="yearmonthday"
          name="new_fromdate"
          label="From date:"
          :validation="[['required']]"
          v-if="index > 0"
        ></FormulateInput>

        <FormulateInput
          type="yearmonthday"
          name="new_todate"
          label="To date:"
          :validation="[['required']]"
          v-if="index > 0"
        ></FormulateInput>

        <FormulateInput
          type="select"
          name="new_country"
          label="Country:"
          :validation="[['required']]"
          :options="data.collections.countries"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="new_addressline1"
          label="Address:"
          :validation="[['required']]"
          placeholder="Address line 1"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="new_addressline1"
          :validation="[['required']]"
          placeholder="Address line 2"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="new_posttownorcity"
          label="Post town / city:"
          :validation="[['required']]"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="new_stateorprovince"
          label="State / Province:"
          :validation="[['required']]"
        ></FormulateInput>
        <FormulateInput
          type="text"
          name="new_postalcode"
          label="Postal code:"
          :validation="[['required']]"
        ></FormulateInput>
      </FormulateInput>
    </FormulateForm>

    <pre>{{ data.model }} </pre>
  </div>
</template>
