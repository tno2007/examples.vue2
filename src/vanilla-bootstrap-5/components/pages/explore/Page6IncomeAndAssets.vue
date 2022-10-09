<script lang="ts">
import {
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
  name: "Page6IncomeAndAssets",
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

    const specificAdditionalIncome = (
      prefix: string,
      index: number,
      values: string[]
    ) => {
      const assetType = getObjectValue(
        data.model,
        `${prefix}[0].AdditionalIncome[${index}].Type`
      );

      return values.includes(assetType);
    };

    const specificAsset = (prefix: string, index: number, values: string[]) => {
      const assetType = getObjectValue(
        data.model,
        `${prefix}[0].Assets[${index}].Type`
      );

      return values.includes(assetType);
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
      specificAdditionalIncome,
      specificAsset,
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
          type="number"
          name="SalaryAndBonus"
          label="Annual salary (including bonus):"
        />
        <FormulateInput
          type="group"
          name="AdditionalIncome"
          :repeatable="true"
          #default="{ index }"
          add-label="+ Add additional income"
        >
          <h5 class="pt-2 pb-2">Additional income {{ index + 1 }}</h5>
          <FormulateInput
            type="select"
            name="Type"
            label="Type:"
            :options="collections.PrimaryApplicant.AdditionalIncome.Type"
            :validation="[['required']]"
            placeholder="-- Select --"
          />
          <FormulateInput
            type="text"
            name="Description"
            label="Description:"
            v-if="
              specificAdditionalIncome('PrimaryApplicant', index, ['100000004'])
            "
            :validation="[['required']]"
          />
          <FormulateInput
            type="number"
            name="Amount"
            label="Amount:"
            :validation="[['required']]"
          />
        </FormulateInput>
        <FormulateInput
          type="group"
          name="Assets"
          :repeatable="true"
          #default="{ index }"
          add-label="+ Add additional asset"
        >
          <h5 class="pt-2 pb-2">Additional asset {{ index + 1 }}</h5>
          <FormulateInput
            type="select"
            name="Type"
            label="Type:"
            :options="collections.PrimaryApplicant.Assets.Type"
            :validation="[['required']]"
            placeholder="-- Select --"
          />
          <div v-if="specificAsset('PrimaryApplicant', index, ['100000001'])">
            <FormulateInput
              type="text"
              name="Name"
              label="Description:"
              :validation="[['required']]"
            />
            <FormulateInput
              type="number"
              name="Value"
              label="Value:"
              :validation="[['required']]"
            />
          </div>

          <div v-if="specificAsset('PrimaryApplicant', index, ['100000000'])">
            <FormulateInput
              type="number"
              name="Value"
              label="Property value:"
              :validation="[['required']]"
            />
            <FormulateInput
              type="number"
              name="MortgageOwing"
              label="Mortgage owning:"
              :validation="[['required']]"
            />
          </div>
        </FormulateInput>
      </FormulateInput>

      <h5 class="pt-3" v-if="data.model.HavePartner">Partner</h5>
      <FormulateInput type="group" name="Partner" v-if="data.model.HavePartner">
        <FormulateInput
          type="number"
          name="SalaryAndBonus"
          label="Annual salary (including bonus):"
        />
        <FormulateInput
          type="group"
          name="AdditionalIncome"
          :repeatable="true"
          #default="{ index }"
          add-label="+ Add additional income"
        >
          <h5 class="pt-2 pb-2">Additional income {{ index + 1 }}</h5>
          <FormulateInput
            type="select"
            name="Type"
            label="Type:"
            :options="collections.Partner.AdditionalIncome.Type"
            placeholder="-- Select --"
          />
          <FormulateInput
            type="text"
            name="Description"
            label="Description:"
            v-if="specificAdditionalIncome('Partner', index, ['100000004'])"
            :validation="[['required']]"
          />
          <FormulateInput
            type="number"
            name="Amount"
            label="Amount:"
            :validation="[['required']]"
          />
        </FormulateInput>
        <FormulateInput
          type="group"
          name="Assets"
          :repeatable="true"
          #default="{ index }"
          add-label="+ Add additional asset"
        >
          <h5 class="pt-2 pb-2">Additional asset {{ index + 1 }}</h5>
          <FormulateInput
            type="select"
            name="Type"
            label="Type:"
            :options="collections.Partner.Assets.Type"
            :validation="[['required']]"
            placeholder="-- Select --"
          />
          <div v-if="specificAsset('Partner', index, ['100000001'])">
            <FormulateInput
              type="text"
              name="Name"
              label="Description:"
              :validation="[['required']]"
            />
            <FormulateInput
              type="number"
              name="Value"
              label="Value:"
              :validation="[['required']]"
            />
          </div>

          <div v-if="specificAsset('Partner', index, ['100000000'])">
            <FormulateInput
              type="number"
              name="Value"
              label="Property value:"
              :validation="[['required']]"
            />
            <FormulateInput
              type="number"
              name="MortgageOwing"
              label="Mortgage owning:"
              :validation="[['required']]"
            />
          </div>
        </FormulateInput>
      </FormulateInput>
    </FormulateForm>
  </div>
</template>
