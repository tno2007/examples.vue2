<!--

# what we know

Setting an item to [] does not make it empty.

Eg.

```
data.model.Partner[0].AdditionalPassportsX = [];
set(data.model.Partner[0], "AdditionalPassportsX", []);

```
These only worked in 
    "@braid/vue-formulate": "2.4.3",
  
Not the latest version(s)

-->

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  nextTick,
} from "vue";
import { IModel } from "../../../common/typings/explore";
import { getObjectValue } from "../../../common/composables/useFormHelper";
import collections from "../../../data/explore/collections";

export default defineComponent({
  name: "Page3Nationalities",
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
    const ace: any = ref(null);

    const data = reactive({
      model: {
        HavePartner: true,
        HaveChildren: true,
      } as any,
    });

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    const isObjectEmpty = (obj: any) => {
      for (var i in obj) return false;
      return true;
    };

    onMounted(async () => {
      await nextTick();
      data.model = props.modelProp;
    });

    return {
      ace,
      formRef,
      collections,
      data,
      handleSubmit,
      getObjectValue,
      isObjectEmpty,
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
          name="PassportCountry"
          label="Main passport:"
          :options="collections.Countries"
          placeholder="-- Select --"
          :validation="[['required']]"
        />
        <FormulateInput
          type="group"
          :repeatable="true"
          name="AdditionalPassports"
          label="Additional passports:"
          add-label="+ Add additional passport"
        >
          <template #repeatable="{ model, index, removeItem }">
            <div class="formulate-input-group-repeatable">
              <a
                role="button"
                class="formulate-input-group-repeatable-remove"
                @click.prevent="removeItem"
                >Remove</a
              >
              <p>Additional passport {{ index + 1 }}</p>
              <FormulateInput
                type="select"
                name="PassportCountry"
                label="Passport country"
                :options="collections.Countries"
                placeholder="-- Select --"
                :validation="[['required']]"
              ></FormulateInput>
            </div>
          </template>
        </FormulateInput>
      </FormulateInput>

      <div v-if="data.model.HavePartner">
        <h5 class="pt-3">Partner</h5>
        <FormulateInput type="group" name="Partner" xlabel="Partner">
          <FormulateInput
            type="select"
            name="PassportCountry"
            label="Main passport:"
            :options="collections.Countries"
            placeholder="-- Select --"
            :validation="[['required']]"
          />
          <FormulateInput
            type="group"
            :repeatable="true"
            name="AdditionalPassports"
            label="Additional passports:"
            add-label="+ Add additional passport"
            #default="{ index }"
          >
            <p>Additional passport {{ index + 1 }}</p>
            <FormulateInput
              type="select"
              name="PassportCountry"
              label="Passport country"
              :options="collections.Countries"
              placeholder="-- Select --"
              :validation="[['required']]"
            ></FormulateInput>
          </FormulateInput>
        </FormulateInput>
      </div>

      <div v-if="data.model.HaveChildren">
        <h5 class="pt-3">Dependents</h5>
        <FormulateInput
          type="group"
          name="Dependents"
          xlabel="Dependents"
          #default="{ index }"
        >
          <h5 class="pt-2 pb-2">Dependent {{ index + 1 }}</h5>
          <FormulateInput
            type="select"
            name="PassportCountry"
            label="Main passport:"
            :options="collections.Countries"
            placeholder="-- Select --"
            :validation="[['required']]"
          />
          <FormulateInput
            type="group"
            :repeatable="true"
            name="AdditionalPassports"
            label="Additional passports:"
            #default="{ index }"
            add-label="+ Add additional passport"
          >
            <p>Additional passport {{ index + 1 }}</p>
            <FormulateInput
              type="select"
              name="PassportCountry"
              label="Passport country"
              :options="collections.Countries"
              placeholder="-- Select --"
              :validation="[['required']]"
            />
          </FormulateInput>
        </FormulateInput>
      </div>
    </FormulateForm>
  </div>
</template>
