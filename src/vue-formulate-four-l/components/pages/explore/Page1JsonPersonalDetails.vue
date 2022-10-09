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

import jsonLogic from "json-logic-js";

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
        //visible: true,
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
            label: "Please provide detailssss:",
            visible: false,
            // if: "$get(contact.criminalrecord)",
          },
        ],
      },
    ];

    /*
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
    */

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
        //updateSchema();
      }
    );

    /*
    const eachFn = (array: ISchema[], key: string[] = []) => {
      if (Array.isArray(array)) {
        array.forEach((field) => {
          // ...
          var keys = [] as string[];
          if (key.length) {
            key.push(field.name as string);
            keys = key;
          } else {
            keys = [field.name as string];
          }
          console.log(field.name, typeof field.visible === "undefined", keys);
          if (field.children) eachFn(field.children as ISchema[], keys);
          else keys = [];
        });
      }
    };
    */

    const eachFn = (array: ISchema[], keyz: string[] = []) => {
      if (Array.isArray(array)) {
        array.forEach((field) => {
          var keys = [];
          if (keyz.length) {
            //console.warn("incoming", keyz);
            keys = keyz;
            keys.push(field.name as string);
          } else {
            keys = [field.name];
          }

          console.log(
            field.name,
            typeof field.visible === "undefined",
            field.type,
            keys
          );

          if (field.children && Array.isArray(field.children)) {
            eachFn(field.children as ISchema[], keys as string[]);
            keys.pop();
          } else {
            keys.pop();
          }
        });
      }
    };

    const eachFnX = (array: ISchema[], keyz: string[] = []) => {
      var arr = [...array];

      if (Array.isArray(arr)) {
        arr.forEach((field) => {
          var keys = [];

          if (keyz.length) {
            //console.warn("incoming", keyz);
            keys = keyz;
            keys.push(field.name as string);
          } else {
            keys = [field.name];
          }

          console.log(
            field.name,
            typeof field.visible === "undefined",
            field.type,
            keys
          );

          field.visible = typeof field.visible === "undefined";

          if (field.children && Array.isArray(field.children)) {
            eachFnX(field.children as ISchema[], keys as string[]);
            keys.pop();
          } else {
            keys.pop();
          }
        });
      }
      return arr;
    };

    const computedSchemaX = computed(() => {
      // filter schema to show only...
      return data.schema.filter((a: ISchema) => {
        // items that do not have 'visible' property set
        // or where 'visible' property has a true value
        return typeof a.visible === "undefined" || a.visible === true;
      });
    });

    const applyFilter = (array: any[]) => {
      return array.filter((a) => {
        return typeof a.visible === "undefined" || a.visible === true;
      });
    };

    const computedSchema = computed(() => {
      let a = eachFnX(data.schema);

      return a.filter((a: ISchema) => {
        if (a.children && Array.isArray(a.children)) {
          return applyFilter(a.children as ISchema[]);
        }

        return typeof a.visible === "undefined" || a.visible === true;
      });
    });

    //jsonLogic.apply();

    function removeCriteria(node: any, criteria) {
      if (criteria.length == 0) {
        return;
      }
      if (node.children) {
        node.children = node.children.filter(
          (child: any) => !child.isCriteria || criteria.includes(child.id)
        );
        node.children.forEach((child: any) => removeCriteria(child, criteria));
      }
    }

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
  <!--
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
</style>
