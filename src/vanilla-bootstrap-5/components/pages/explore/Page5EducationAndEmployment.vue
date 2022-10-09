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
import { IModel } from "../../../common/typings/explore";
import { getObjectValue } from "../../../common/composables/useFormHelper";
import collections from "../../../data/explore/collections";

export default defineComponent({
  name: "Page5EducationAndEmployment",
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

    const specificWorkStatus = (prefix: string, values: string[]) => {
      const workStatus = getObjectValue(data.model, `${prefix}[0].WorkStatus`);
      return values.includes(workStatus);
    };

    onMounted(async () => {
      await nextTick();
      data.model = props.modelProp;
    });

    return { formRef, collections, data, handleSubmit, specificWorkStatus };
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
          name="HighestTertiaryQualification"
          label="Highest tertiary qualification:"
          :options="collections.PrimaryApplicant.HighestTertiaryQualification"
          :validation="[['required']]"
          placeholder="-- Select --"
        />
        <FormulateInput
          type="group"
          name="AdditionalQualifications"
          label="Additional qualifications:"
          :repeatable="true"
          #default="{ index }"
          add-label="+ Add additional qualification"
        >
          <h5 class="pt-2 pb-2">Additional qualification {{ index + 1 }}</h5>
          <FormulateInput
            type="select"
            name="Code"
            label="Code:"
            :options="
              collections.PrimaryApplicant.AdditionalQualifications.Code
            "
            :validation="[['required']]"
            placeholder="-- Select --"
          />
          <FormulateInput
            type="text"
            name="Name"
            label="Name:"
            :validation="[['required']]"
          >
          </FormulateInput>
        </FormulateInput>
        <FormulateInput
          type="group"
          name="AdditionalLanguages"
          label="Additional languages:"
          :repeatable="true"
          #default="{ index }"
          add-label="+ Add additional language"
        >
          <h5 class="pt-2 pb-2">Additional language {{ index + 1 }}</h5>
          <FormulateInput
            type="select"
            name="Code"
            label="Language:"
            :options="collections.Languages"
            :validation="[['required']]"
            placeholder="-- Select --"
          />
        </FormulateInput>

        <FormulateInput
          type="select"
          name="WorkStatus"
          label="Work status:"
          :options="collections.PrimaryApplicant.WorkStatus"
          :validation="[['required']]"
          placeholder="-- Select --"
        />

        <div
          v-if="
            specificWorkStatus('PrimaryApplicant', [
              '100000000',
              '100000001',
              '100000006',
            ])
          "
        >
          <FormulateInput
            type="text"
            name="JobTitle"
            label="Job title:"
            :validation="[['required']]"
          />
          <FormulateInput
            type="text"
            name="Experience"
            label="How long have you been in this role?"
            :validation="[['required']]"
          />
          <FormulateInput
            type="select"
            name="InPersonOrRemote"
            label="In-person or remote work place?"
            :options="collections.PrimaryApplicant.InPersonOrRemote"
            :validation="[['required']]"
            placeholder="-- Select --"
          />
        </div>

        <div v-if="specificWorkStatus('PrimaryApplicant', ['100000002'])">
          <FormulateInput type="group" name="Holding">
            <FormulateInput
              type="number"
              name="ShareHolding"
              label="Shareholding (%):"
              :validation="[['required'], ['max', 100], ['min', 0]]"
            />
            <FormulateInput
              type="yearmonthday"
              name="StartDate"
              label="Start date:"
              :validation="[['required']]"
            />
            <FormulateInput
              type="text"
              name="Role"
              label="Your role:"
              :validation="[['required']]"
            />
            <FormulateInput
              type="number"
              name="TotalAnnualRevenue"
              label="Sales/Revenue/Turnover:"
              :validation="[['required'], ['number']]"
            />
            <FormulateInput
              type="number"
              name="ProfitBeforeTax"
              label="Profit before tax:"
              :validation="[['required'], ['number']]"
            />
            <FormulateInput
              type="number"
              name="ApproximateValue"
              label="Approximate value:"
              :validation="[['required'], ['number']]"
            />
          </FormulateInput>
        </div>
      </FormulateInput>

      <div v-if="data.model.HavePartner" class="mb-5">
        <h5 class="pt-3">Partner</h5>
        <FormulateInput type="group" name="Partner">
          <FormulateInput
            type="select"
            name="HighestTertiaryQualification"
            label="Highest tertiary qualification:"
            :options="collections.PrimaryApplicant.HighestTertiaryQualification"
            :validation="[['required']]"
            placeholder="-- Select --"
          />
          <FormulateInput
            type="group"
            name="AdditionalQualifications"
            label="Additional qualifications:"
            :repeatable="true"
            #default="{ index }"
            add-label="+ Add additional qualification"
          >
            <h5 class="pt-2 pb-2">Additional qualification {{ index + 1 }}</h5>
            <FormulateInput
              type="select"
              name="Code"
              label="Code:"
              :options="
                collections.PrimaryApplicant.AdditionalQualifications.Code
              "
              :validation="[['required']]"
              placeholder="-- Select --"
            />
            <FormulateInput
              type="text"
              name="Name"
              label="Name:"
              :validation="[['required']]"
            >
            </FormulateInput>
          </FormulateInput>
          <FormulateInput
            type="group"
            name="AdditionalLanguages"
            label="Additional languages:"
            :repeatable="true"
            #default="{ index }"
            add-label="+ Add additional language"
          >
            <h5 class="pt-2 pb-2">Additional language {{ index + 1 }}</h5>
            <FormulateInput
              type="select"
              name="Code"
              label="Language:"
              :options="collections.Languages"
              :validation="[['required']]"
              placeholder="-- Select --"
            />
          </FormulateInput>
          <FormulateInput
            type="select"
            name="WorkStatus"
            label="Work status:"
            :options="collections.PrimaryApplicant.WorkStatus"
            :validation="[['required']]"
            placeholder="-- Select --"
          />

          <div
            v-if="
              specificWorkStatus('Partner', [
                '100000000',
                '100000001',
                '100000006',
              ])
            "
          >
            <FormulateInput
              type="text"
              name="JobTitle"
              label="Job title:"
              :validation="[['required']]"
            />
            <FormulateInput
              type="text"
              name="Experience"
              label="How long have you been in this role?"
              :validation="[['required']]"
            />
            <FormulateInput
              type="select"
              name="InPersonOrRemote"
              label="In-person or remote work place?"
              :options="collections.PrimaryApplicant.InPersonOrRemote"
              :validation="[['required']]"
              placeholder="-- Select --"
            />
          </div>

          <div v-if="specificWorkStatus('Partner', ['100000002'])">
            <FormulateInput type="group" name="Holding">
              <FormulateInput
                type="number"
                name="ShareHolding"
                label="Shareholding (%):"
                :validation="[['required'], ['max', 100], ['min', 0]]"
              />
              <FormulateInput
                type="yearmonthday"
                name="StartDate"
                label="Start date:"
                :validation="[['required']]"
              />
              <FormulateInput
                type="text"
                name="Role"
                label="Your role:"
                :validation="[['required']]"
              />
              <FormulateInput
                type="number"
                name="TotalAnnualRevenue"
                label="Sales/Revenue/Turnover:"
                :validation="[['required'], ['number']]"
              />
              <FormulateInput
                type="number"
                name="ProfitBeforeTax"
                label="Profit before tax:"
                :validation="[['required'], ['number']]"
              />
              <FormulateInput
                type="number"
                name="ApproximateValue"
                label="Approximate value:"
                :validation="[['required'], ['number']]"
              />
            </FormulateInput>
          </div>
        </FormulateInput>
      </div>
    </FormulateForm>
  </div>
</template>
