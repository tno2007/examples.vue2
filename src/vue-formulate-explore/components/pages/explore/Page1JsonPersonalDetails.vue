<script lang="ts">
import {
  IModel,
  ISchema,
  ISchemaOption,
} from "../../../common/typings/explore";
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

    const updateSchema = () => {
      data.schema = [
        {
          component: "h5",
          children: "Primary applicant",
        },
        {
          type: "group",
          name: "PrimaryApplicant",
          children: [
            {
              type: "select",
              name: "PreferredTitle",
              label: "Title",
              placeholder: "-- Select --",
              validation: "required",
              options: collections.PrimaryApplicant.Title,
            },
            {
              type: "text",
              name: "LastName",
              label: "Last Name:",
              validation: "required",
            },
            {
              type: "text",
              name: "FirstName",
              label: "First Name:",
              validation: "required",
            },
            {
              type: "select",
              name: "Gender",
              label: "Gender:",
              placeholder: "-- Select --",
              options: collections.PrimaryApplicant.Gender,
            },
            {
              type: "yearmonthday",
              name: "DateOfBirth",
              label: "Date of birth:",
              validation: "required",
              format: "date",
            },
          ],
        },
        {
          type: "checkbox",
          name: "HavePartner",
          label: "Do you have a partner?",
        },
        {
          component: "h5",
          children: "Partner",
          visible: data.model.HavePartner,
        },
        {
          type: "submit",
          label: "Order pizza",
        },
      ] as ISchema[];
    };

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    onMounted(async () => {
      await nextTick();
      data.model = props.modelProp;
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
    <pre>{{ data.model.HavePartner }}</pre>
    <pre>{{ computedSchema[3] }}</pre>
  </div>

  <!--
  <FormulateForm v-model="data.model" @submit="handleSubmit" ref="formRef">
    <h5 class="pt-3">Primary applicant</h5>
    <FormulateInput type="group" name="PrimaryApplicant">
      <FormulateInput
        type="select"
        name="PreferredTitle"
        label="Title:"
        :options="collections.PrimaryApplicant.Title"
        :validation="[['required']]"
        placeholder="-- Select --"
      />
      <FormulateInput
        type="text"
        name="FirstName"
        label="First Name:"
        :validation="[['required']]"
      />
      <FormulateInput
        type="text"
        name="LastName"
        label="Last Name:"
        :validation="[['required']]"
      />
      <FormulateInput
        type="select"
        name="Gender"
        label="Gender:"
        :options="collections.PrimaryApplicant.Gender"
        placeholder="-- Select --"
      />
      <FormulateInput
        type="yearmonthday"
        name="DateOfBirth"
        label="Date of birth"
        format="date"
        :validation-messages="{
          required: 'Please complete all date fields',
        }"
      />
    </FormulateInput>

    <FormulateInput
      type="checkbox"
      name="HavePartner"
      label="Do you have a partner?"
    />

    <div v-if="data.model.HavePartner" class="mb-5">
      <h5 class="pt-3">Partner</h5>
      <FormulateInput type="group" name="Partner" #default="{ index }">
        <FormulateInput
          type="select"
          name="PreferredTitle"
          label="Title:"
          :options="collections.Partner.Title"
          :validation="[['required']]"
          placeholder="-- Select --"
        />
        <FormulateInput
          type="text"
          name="FirstName"
          label="First Name:"
          :validation="[['required']]"
        />
        <FormulateInput
          type="text"
          name="LastName"
          label="Last Name:"
          :validation="[['required']]"
        />
        <FormulateInput
          type="select"
          name="Gender"
          label="Gender:"
          :options="collections.Partner.Gender"
          :validation="[['required']]"
          placeholder="-- Select --"
        />

        <FormulateInput
          type="yearmonthday"
          name="DateOfBirth"
          label="Date of birth"
          :validation="[['required']]"
          format="date"
          :validation-messages="{
            required: 'Please complete all date fields',
          }"
        />
        <FormulateInput
          type="select"
          name="MaritalStatus"
          label="Marital status:"
          :options="collections.Partner.MaritalStatus"
          placeholder="-- Select --"
        />
        <div
          v-if="
            data.model.Partner &&
            data.model.Partner[index] &&
            data.model.Partner[index].MaritalStatus == `2`
          "
        >
          <FormulateInput
            type="yearmonthday"
            name="DateOfMarriage"
            label="Date of marriage"
            :validation="[['required']]"
            format="date"
            :validation-messages="{
              required: 'Please complete all date fields',
            }"
          />
        </div>
      </FormulateInput>
    </div>

    <FormulateInput
      type="checkbox"
      name="HaveChildren"
      label="Do you have dependents?"
    />

    <div v-if="data.model.HaveChildren" class="mb-5">
      <h5 class="pt-3">Dependents</h5>
      <FormulateInput
        type="group"
        name="Dependents"
        #default="{ index }"
        add-label="+ Add dependent"
        :repeatable="true"
      >
        <h5 class="pt-2 pb-2">Dependent {{ index + 1 }}</h5>
        <FormulateInput
          type="text"
          name="FirstName"
          label="First Name:"
          :validation="[['required']]"
        />
        <FormulateInput
          type="text"
          name="LastName"
          label="Last Name:"
          :validation="[['required']]"
        />
        <FormulateInput
          type="select"
          name="Gender"
          label="Gender:"
          :options="collections.Dependents.Gender"
          :validation="[['required']]"
          placeholder="-- Select --"
        />
        <FormulateInput
          type="yearmonthday"
          name="DateOfBirth"
          label="Date of birth"
          :validation="[['required']]"
          format="date"
          :validation-messages="{
            required: 'Please complete all date fields',
          }"
        />
        <FormulateInput
          type="select"
          name="SpecialAttributes"
          label="Special attributes:"
          :options="collections.Dependents.SpecialAttributes"
          :validation="[['required']]"
          placeholder="-- Select --"
        />
      </FormulateInput>
    </div>
  </FormulateForm>
  -->
</template>
