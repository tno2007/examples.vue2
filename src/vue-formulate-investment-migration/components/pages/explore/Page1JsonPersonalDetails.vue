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
} from "vue";
import collections from "../../../data/explore/collections";
import jsonLogic from "json-logic-js";
import { $bool, $get } from "../../../common/composables/useJsonLogicHelper";

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
        name: "test1",
        component: "h5",
        children: "Personal details (Main applicant)",
        visible: true,
      },
      {
        type: "group",
        name: "contact",
        children: [
          {
            type: "group",
            name: "kids",
            children: [
              {
                type: "text",
                name: "FirstName",
                label: "First name (as seen in passport):",
                validation: "required",
              },
              {
                type: "group",
                name: "groupX",
                children: [
                  {
                    type: "text",
                    name: "Subfirstname",
                    label: "Sub First name:",
                    validation: "required",
                  },
                ],
              },
            ],
          },
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
            label: "Do you have a criminal record xxx?",
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
            visible: false,
          },
          {
            type: "textarea",
            name: "criminalrecordmoreinfo",
            label: "Please provide details:",
            //visible: "",
            //if: "$get(contact.criminalrecord)",
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
              visible: {},
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

    jsonLogic.apply();

    return {
      formRef,
      collections,
      data,
      handleSubmit,
      computedSchema,
      //logic3,
    };
  },
});
</script>

<template>
  <!--
  <div>
    <FormulateForm
      ref="formRef"
      :schema="computedSchema"
      v-model="data.model"
      @submit="handleSubmit"
    >
    </FormulateForm>
    <button @click="logic3">Click me</button>
    <div class="d-flex">
      <div class="d-none">
        <pre>{{ computedSchema }}</pre>
      </div>
      <div>
        <pre> {{ data.model }} </pre>
      </div>
    </div>
  </div>
  -->
  <div>
    <div>
      <pre>
        {{ computedSchema }}
      </pre>
    </div>
    <div></div>
  </div>
</template>

<style lang="scss">
.d-flex {
  display: flex;
}
.d-none {
  display: none;
}
</style>
