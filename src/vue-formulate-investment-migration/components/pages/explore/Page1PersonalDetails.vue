<script lang="ts">
import { filledIn } from "../../../common/composables/useFormHelper";
import { IModel } from "../../../common/typings/explore";
import {
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  reactive,
  ref,
} from "@vue/composition-api";
import collections from "../../../data/explore/collections";

export default defineComponent({
  name: "Page1PersonalDetails",
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
    });

    const v = (val: any) => {
      return val == null || val == "";
    };

    const isSectionComplete = async () => {
      var value =
        filledIn(data.model.PrimaryApplicant[0].PreferredTitle) &&
        filledIn(data.model.PrimaryApplicant[0].FirstName) &&
        filledIn(data.model.PrimaryApplicant[0].LastName);

      context.emit("isSectionComplete", value);
    };

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    onMounted(async () => {
      await nextTick();
      data.model = props.modelProp;
      //context.emit("isSectionComplete", isSectionComplete());
      await isSectionComplete();
    });

    return {
      formRef,
      collections,
      data,
      handleSubmit,
    };
  },
});
</script>

<template>
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
</template>
