<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
} from "@vue/composition-api";
import { IModel } from "../../../common/typings/explore";
import collections from "../../../data/explore/collections";

export default defineComponent({
  name: "Page2ContactDetails",
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

    onMounted(async () => {
      await context.root.$nextTick();
      data.model = props.modelProp;
    });

    return { formRef, collections, data, handleSubmit };
  },
});
</script>

<template>
  <div>
    <FormulateForm v-model="data.model" @submit="handleSubmit" ref="formRef">
      <h5 class="pt-3">Primary applicant</h5>
      <FormulateInput type="group" name="PrimaryApplicant">
        <FormulateInput
          type="text"
          name="AddressLine1"
          label="Address Line 1:"
          :validation="[['required']]"
        />
        <FormulateInput
          type="text"
          name="AddressLine2"
          label="Address Line 2:"
          :validation="[['required']]"
        />
        <FormulateInput
          type="text"
          name="City"
          label="City:"
          :validation="[['required']]"
        />
        <FormulateInput
          type="text"
          name="PostalCode"
          label="Postal code:"
          :validation="[['required']]"
        />
        <FormulateInput
          type="select"
          name="PreferredContactMethod"
          label="Preferred contact method:"
          :options="collections.PrimaryApplicant.PreferredContactMethod"
          :validation="[['required']]"
          placeholder="-- Select --"
        />
        <FormulateInput
          type="text"
          name="MobilePhone"
          label="Mobile number:"
          :validation="[['required']]"
        />
        <FormulateInput type="text" name="HomeNumber" label="Home number:" />
        <FormulateInput type="text" name="WorkNumber" label="Work number:" />
        <FormulateInput
          type="email"
          name="EmailHome"
          label="Email address (Home):"
          :validation="[['required']]"
        />
        <FormulateInput
          type="email"
          name="EmailWork"
          label="Email address (Work):"
        />
      </FormulateInput>

      <h5 class="pt-3" v-if="data.model.HavePartner">Partner</h5>
      <FormulateInput type="group" name="Partner" v-if="data.model.HavePartner">
        <FormulateInput
          type="select"
          name="PreferredContactMethod"
          label="Preferred contact method:"
          :options="collections.Partner.PreferredContactMethod"
          :validation="[['required']]"
          placeholder="-- Select --"
        />
        <FormulateInput
          type="text"
          name="MobilePhone"
          label="Mobile number:"
          :validation="[['required']]"
        />
        <FormulateInput type="text" name="HomeNumber" label="Home number:" />
        <FormulateInput type="text" name="WorkNumber" label="Work number:" />
        <FormulateInput
          type="email"
          name="EmailHome"
          label="Email address (Home):"
          :validation="[['required']]"
        />
        <FormulateInput
          type="email"
          name="EmailWork"
          label="Email address (Work):"
        />
      </FormulateInput>
    </FormulateForm>
  </div>
</template>
