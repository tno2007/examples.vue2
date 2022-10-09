<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  reactive,
  ref,
} from "@vue/composition-api";
import { getObjectValue } from "../../../common/composables/useFormHelper";
import { IModel } from "../../../common/typings/explore";
import collections from "../../../data/explore/collections";

export default defineComponent({
  name: "Page4FamilyAncestry",
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

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    const threeYearsInUk = (prefix: string) => {
      const mainPassport = getObjectValue(
        data.model,
        `${prefix}[0].PassportCountry`
      );

      if (!mainPassport) return null;

      const additionalPassports: any[] = getObjectValue(
        data.model,
        `${prefix}[0].AdditionalPassports`
      );

      return (
        mainPassport == 5478 ||
        additionalPassports.find((p: any) => p.PassportCountry == 5478) != null
      );
    };

    onMounted(async () => {
      await nextTick();
      data.model = props.modelProp;
    });

    return {
      formRef,
      collections,
      data,
      handleSubmit,
      threeYearsInUk,
    };
  },
});
</script>

<template>
  <div>
    <FormulateForm v-model="data.model" @submit="handleSubmit" ref="formRef">
      <h5 class="pt-3">Primary applicant</h5>
      <FormulateInput type="group" name="PrimaryApplicant">
        <FormulateInput
          type="select"
          name="CountryOfBirth"
          label="Country of birth:"
          :options="collections.Countries"
          :validation="[['required']]"
          placeholder="-- Select --"
        />
        <FormulateInput type="checkbox" name="Adopted" label="Adopted?" />
        <FormulateInput
          type="checkbox"
          name="SpentThreeYearsInUk"
          label="Spent 3 Years in the UK?"
          v-if="threeYearsInUk('PrimaryApplicant')"
        />
        <FormulateInput type="group" name="Ancestry">
          <h5 class="pt-3">Father</h5>
          <FormulateInput
            type="select"
            name="FatherCountryOfBirth"
            label="Father's country of birth:"
            :options="collections.Countries"
            :validation="[['required']]"
            placeholder="-- Select --"
          />
          <FormulateInput
            type="yearmonthday"
            name="FatherDateOfBirth"
            label="Father's date of birth:"
            :validation="[['required']]"
            format="date"
            :validation-messages="{
              required: 'Please complete all date fields',
            }"
          />

          <h5 class="pt-3">Mother</h5>
          <FormulateInput
            type="select"
            name="MotherCountryOfBirth"
            label="Mother's country of birth:"
            :options="collections.Countries"
            :validation="[['required']]"
            placeholder="-- Select --"
          />
          <FormulateInput
            type="yearmonthday"
            name="MotherDateOfBirth"
            label="Mother's date of birth:"
            :validation="[['required']]"
            format="date"
            :validation-messages="{
              required: 'We need this information to assist you',
            }"
          />

          <h5 class="pt-3">Parents</h5>
          <FormulateInput
            type="yearmonthday"
            name="ParentsDateOfMarriage"
            label="Parents' date of marriage:"
            :validation="[['required']]"
            format="date"
            :validation-messages="{
              required: 'Please complete all date fields',
            }"
          />

          <h5 class="pt-3">Paternal grandfather:</h5>
          <FormulateInput
            type="select"
            name="FathersFatherCountryOfBirth"
            label="Father's father country of birth:"
            :options="collections.Countries"
            :validation="[['required']]"
            placeholder="-- Select --"
          />

          <h5 class="pt-3">Paternal grandmother:</h5>
          <FormulateInput
            type="select"
            name="FathersMotherCountryOfBirth"
            label="Father's mother country of birth:"
            :options="collections.Countries"
            :validation="[['required']]"
            placeholder="-- Select --"
          />

          <h5 class="pt-3">Maternal grandfather:</h5>
          <FormulateInput
            type="select"
            name="MothersFatherCountryOfBirth"
            label="Mother's father country of birth:"
            :options="collections.Countries"
            :validation="[['required']]"
            placeholder="-- Select --"
          />

          <h5 class="pt-3">Maternal grandfather:</h5>
          <FormulateInput
            type="select"
            name="MothersMotherCountryOfBirth"
            label="Mothers's mother country of birth:"
            :options="collections.Countries"
            :validation="[['required']]"
            placeholder="-- Select --"
          />
        </FormulateInput>
      </FormulateInput>

      <div v-if="data.model.HavePartner">
        <h5 class="pt-3">Partner</h5>
        <FormulateInput type="group" name="Partner">
          <FormulateInput
            type="select"
            name="CountryOfBirth"
            label="Country of birth:"
            :options="collections.Countries"
            :validation="[['required']]"
            placeholder="-- Select --"
          />
          <FormulateInput type="checkbox" name="Adopted" label="Adopted?" />
          <FormulateInput
            type="checkbox"
            name="SpentThreeYearsInUk"
            label="Spent 3 Years in the UK?"
            v-if="threeYearsInUk('Partner')"
          />
          <FormulateInput type="group" name="Ancestry">
            <h5 class="pt-3">Father</h5>
            <FormulateInput
              type="select"
              name="FatherCountryOfBirth"
              label="Father's country of birth:"
              :options="collections.Countries"
              :validation="[['required']]"
              placeholder="-- Select --"
            />
            <FormulateInput
              type="yearmonthday"
              name="FatherDateOfBirth"
              label="Father's date of birth:"
              :validation="[['required']]"
              format="date"
              :validation-messages="{
                required: 'Please complete all date fields',
              }"
            />

            <h5 class="pt-3">Mother</h5>
            <FormulateInput
              type="select"
              name="MotherCountryOfBirth"
              label="Mother's country of birth:"
              :options="collections.Countries"
              :validation="[['required']]"
              placeholder="-- Select --"
            />
            <FormulateInput
              type="yearmonthday"
              name="MotherDateOfBirth"
              label="Mother's date of birth:"
              :validation="[['required']]"
              format="date"
              :validation-messages="{
                required: 'Please complete all date fields',
              }"
            />

            <h5 class="pt-3">Parents</h5>
            <FormulateInput
              type="yearmonthday"
              name="ParentsDateOfMarriage"
              label="Parents' date of marriage:"
              :validation="[['required']]"
              format="date"
              :validation-messages="{
                required: 'Please complete all date fields',
              }"
            />

            <h5 class="pt-3">Paternal grandfather:</h5>
            <FormulateInput
              type="select"
              name="FathersFatherCountryOfBirth"
              label="Father's father country of birth:"
              :options="collections.Countries"
              :validation="[['required']]"
              placeholder="-- Select --"
            />

            <h5 class="pt-3">Paternal grandmother:</h5>
            <FormulateInput
              type="select"
              name="FathersMotherCountryOfBirth"
              label="Father's mother country of birth:"
              :options="collections.Countries"
              :validation="[['required']]"
              placeholder="-- Select --"
            />

            <h5 class="pt-3">Maternal grandfather:</h5>
            <FormulateInput
              type="select"
              name="MothersFatherCountryOfBirth"
              label="Mother's father country of birth:"
              :options="collections.Countries"
              :validation="[['required']]"
              placeholder="-- Select --"
            />

            <h5 class="pt-3">Maternal grandfather:</h5>
            <FormulateInput
              type="select"
              name="MothersMotherCountryOfBirth"
              label="Mothers's mother country of birth:"
              :options="collections.Countries"
              :validation="[['required']]"
              placeholder="-- Select --"
            />
          </FormulateInput>
        </FormulateInput>
      </div>
    </FormulateForm>
  </div>
</template>
