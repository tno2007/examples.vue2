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
  computed,
} from "vue";
import { IModel } from "../../../common/typings/explore";
import { getObjectValue as g } from "../../../common/composables/useFormHelper";
import collections from "../../../data/explore/collections";

export default defineComponent({
  name: "Testing",
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
      model: {
        HavePartner: true,
      } as any,
    });

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    onMounted(async () => {
      await nextTick();
      data.model = props.modelProp;
    });

    var $_a = 1;

    /**
     * i can't use watch() because i dont have access to Partner[0] yet
     */

    return {
      formRef,
      collections,
      data,
      handleSubmit,
      g,
    };
  },
});
</script>

<template>
  <div>
    <FormulateForm
      v-model="data.model"
      @submit="handleSubmit"
      ref="formRef"
      #default="{ model }"
    >
      <pre>{{ model }}</pre>
      <!-- Group test -->
      <FormulateInput
        type="group"
        name="PrimaryApplicant"
        label="PrimaryApplicant"
      >
        <FormulateInput
          type="group"
          name="AdditionalPassports"
          label="AdditionalPassports"
          :repeatable="true"
        >
          <template #repeatable="{ model, index, removeItem }">
            <div class="formulate-input-group-repeatable">
              <a
                role="button"
                class="formulate-input-group-repeatable-remove"
                @click.prevent="removeItem"
                >Remove</a
              >
              <FormulateInput
                type="text"
                name="PassportCountry"
                label="Passport Country:"
                :validation="[['required']]"
              />
            </div>
          </template>
        </FormulateInput>
      </FormulateInput>
      <!-- / Group test -->

      <FormulateInput
        type="checkbox"
        name="HavePartner"
        label="Have Partner?"
      ></FormulateInput>

      <!-- Group test -->
      <div>
        <FormulateInput
          type="group"
          name="Partner"
          label="Partner"
          v-if="data.model.HavePartner"
        >
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
            name="AdditionalPassports"
            label="AdditionalPassports"
            #default="{ model, index }"
            :repeatable="true"
          >
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
      <!-- / Group test -->
    </FormulateForm>
    <pre>{{ data.model }}</pre>
  </div>
</template>
