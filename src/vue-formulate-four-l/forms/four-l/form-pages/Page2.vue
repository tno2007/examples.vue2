<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useAppStore } from "../../../stores/appStore";

export default defineComponent({
  name: "Page2",
  setup(props, context) {
    const store = useAppStore();
    const formRef: any = ref(null);
    const submitRef: any = ref(null);

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    interface IValidation {
      errors: any[];
      hasErrors: boolean;
      name: string;
    }

    const validation = async (validation: IValidation) => {};

    return {
      store,
      formRef,
      submitRef,
      handleSubmit,
      validation,
    };
  },
});
</script>

<template>
  <div>
    <FormulateForm
      v-model="store.formModel"
      @submit="handleSubmit"
      ref="formRef"
    >
      <FormulateInput
        type="group"
        :repeatable="true"
        name="partner"
        #default="{ index }"
        add-label="+ Add previous marriage"
      >
        <FormulateInput
          type="text"
          name="new_forename"
          label="First name:"
          :validation="[['required']]"
          placeholder="-- Select --"
        ></FormulateInput>
      </FormulateInput>
    </FormulateForm>
  </div>
</template>

<style lang="scss">
//.formulate-input .formulate-input-element {
//max-width: none;
//}
</style>
