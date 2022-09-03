<script lang="ts">
import { IModel, ISchema } from "../../../common/typings/explore";
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "@vue/composition-api";
import collections from "../../../data/explore/collections";

export default defineComponent({
  name: "Page1JsonPersonalDetails",
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

    const data = reactive({
      model: {} as any,
      schema: [] as ISchema[],
    });

    data.model = ref({});

    data.schema = [
      {
        component: "h5",
        children: "Personal details (Main applicant)",
      },
      {
        type: "group",
        name: "contact",
        children: [
          {
            type: "text",
            name: "FirstName",
            label: "First name (as seen in passport):",
            validation: "required",
          },
          {
            type: "text",
            name: "MiddleName",
            label: "Middle name:",
            validation: "required",
          },
          {
            type: "text",
            name: "LastName",
            label: "Last Name:",
            validation: "required",
          },
          {
            type: "text",
            name: "PassportNumber",
            label: "Passport number:",
          },
          {
            type: "yearmonthday",
            name: "PassportExpiryDate",
            label: "Passport expiry date:",
            validation: "required",
            format: "date",
          },
          {
            type: "yearmonthday",
            name: "DateOfBirth",
            label: "Date of birth:",
            validation: "required",
            format: "date",
          },
          {
            type: "radio",
            name: "Gender",
            label: "Gender:",
            placeholder: "-- Select --",
            options: [
              {
                label: "Male",
                value: 1,
              },
              {
                label: "Female",
                value: 2,
              },
            ],
          },
          {
            type: "radio",
            name: "criminalrecord",
            label: "Do you have a criminal record?",
            options: [
              {
                label: "Yes",
                value: "true",
              },
              {
                label: "No",
                value: "false",
              },
            ],
          },
          {
            type: "textarea",
            name: "criminalrecordmoreinfo",
            label: "Please provide details:",
            if: "$get(contact.criminalrecord)",
          },
        ],
      },
    ];

    const updateSchema = () => {
      console.log("updateSchema");

      data.schema = [
        {
          component: "h5",
          children: "Personal details (Main applicant)",
        },
        {
          type: "group",
          name: "contact",
          children: [
            {
              type: "text",
              name: "FirstName",
              label: "First name (as seen in passport):",
              validation: "required",
            },
            {
              type: "text",
              name: "MiddleName",
              label: "Middle name:",
              validation: "required",
            },
            {
              type: "text",
              name: "LastName",
              label: "Last Name:",
              validation: "required",
            },
            {
              type: "text",
              name: "PassportNumber",
              label: "Passport number:",
            },
            {
              type: "yearmonthday",
              name: "PassportExpiryDate",
              label: "Passport expiry date:",
              validation: "required",
              format: "date",
            },
            {
              type: "yearmonthday",
              name: "DateOfBirth",
              label: "Date of birth:",
              validation: "required",
              format: "date",
            },
            {
              type: "radio",
              name: "Gender",
              label: "Gender:",
              placeholder: "-- Select --",
              options: [
                {
                  label: "Male",
                  value: 1,
                },
                {
                  label: "Female",
                  value: 2,
                },
              ],
            },
            {
              type: "radio",
              name: "criminalrecord",
              label: "Do you have a criminal record?",
              options: [
                {
                  label: "Yes",
                  value: "true",
                },
                {
                  label: "No",
                  value: "false",
                },
              ],
            },
            {
              type: "textarea",
              name: "criminalrecordmoreinfo",
              label: "Please provide details:",
              if: "$get(contact.criminalrecord)",
            },
          ],
        },
      ] as ISchema[];
    };

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    onMounted(async () => {
      await nextTick();
      //data.model = props.modelProp;
    });

    watch(
      () => data.model,
      (newValue, oldValue) => {
        updateSchema();
      }
    );

    const computedSchema = computed(() => {
      // filter schema to show only...
      return data.schema.filter((a: ISchema) => {
        // items that do not have 'visible' property set
        // or where 'visible' property has a true value
        return typeof a.visible === "undefined" || a.visible;
      });
    });

    return {
      formRef,
      collections,
      data,
      handleSubmit,
      computedSchema,
    };
  },
});
</script>

<template>
  <div>
    <FormulateForm
      ref="formRef"
      :schema="computedSchema"
      v-model="data.model"
      @submit="handleSubmit"
    >
    </FormulateForm>
    <div class="d-flex">
      <div>
        <pre>{{ computedSchema }}</pre>
      </div>
      <div>
        <pre> {{ data.model }} </pre>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.d-flex {
  display: flex;
}
</style>
