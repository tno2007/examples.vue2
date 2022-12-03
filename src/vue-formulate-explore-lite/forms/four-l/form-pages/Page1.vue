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
import { get, set } from "lodash";

export default defineComponent({
  name: "Page1",
  components: {
    //TransitionExpand,
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
      schema: [
        {
          component: "h5",
          children: "Please provide all your addresses for the past 5 years:",
          class: "mb-4",
        },
        {
          type: "group",
          repeatable: true,
          name: "AddressHistory",
          addLabel: "+ Add address",
          children: [
            //{
            //component: "h5",
            //children: "Address 1",
            //class: "mb-4",
            //},
            {
              type: "yearmonthday",
              name: "FromDate",
              label: "From Date:",
              validation: "^required",
              validationMessages: {
                required: "We need this information to assist you",
              },
            },
            {
              type: "yearmonthday",
              name: "ToDate",
              label: "To Date:",
              validation: "^required",
              validationMessages: {
                required: "We need this information to assist you",
              },
            },
            {
              type: "select",
              name: "Country",
              label: "Country:",
              validation: "^required",
              validationMessages: {
                required: "We need this information to assist you",
              },
              options: [],
            },
            {
              type: "text",
              name: "AddressLine1",
              label: "Address:",
              validation: "^required",
              validationMessages: {
                required: "We need this information to assist you",
              },
              placeholder: "Address line 1",
            },
            {
              type: "text",
              name: "AddressLine2",
              validation: "^required",
              validationMessages: {
                required: "We need this information to assist you",
              },
              placeholder: "Address line 2",
            },
            {
              type: "text",
              name: "PostTownOrCity",
              label: "Post town/City:",
              validation: "^required",
              validationMessages: {
                required: "We need this information to assist you",
              },
            },
            {
              type: "text",
              name: "StateOrProvince",
              label: "State/Province:",
              validation: "^required",
              validationMessages: {
                required: "We need this information to assist you",
              },
            },
            {
              type: "text",
              name: "PostalCode",
              label: "Postal code:",
              validation: "^required",
              validationMessages: {
                required: "We need this information to assist you",
              },
            },
          ],
        },
      ] as any,
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

    const parsedSchema = computed(() => {
      for (let index = 0; index < data.schema[1].children.length; index++) {
        const child: any = data.schema[1].children[index];
        child.children = `Address ${++index}`;
        break;
      }
      return data.schema;
    });

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
          data.schema[1].children[2].options = options;
        });
    });

    return {
      formRef,
      submitRef,
      data,
      handleSubmit,
      validation,
      parsedSchema,
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
        name="AddressHistory"
        #default="{ index }"
        add-label="+ Add address"
      >
        <h5 class="pt-2 pb-2">Address ({{ index + 1 }})</h5>
        <FormulateInput
          type="select"
          name="country"
          label="Country:"
          :validation="[['required']]"
          :options="data.collections.country"
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
  </div>
</template>
