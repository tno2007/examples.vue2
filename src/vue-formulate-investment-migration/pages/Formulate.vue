<script lang="ts">
import {
  onMounted,
  ref,
  useAttrs,
  defineComponent,
} from "@vue/composition-api";
import { useAppStore } from "../stores/appStore";
import Page1PersonalDetails from "../components/pages/explore/Page1PersonalDetails.vue";
import Page2ContactDetails from "../components/pages/explore/Page2ContactDetails.vue";
import Page3Nationalities from "../components/pages/explore/Page3Nationalities.vue";
import Page4FamilyAncestry from "../components/pages/explore/Page4FamilyAncestry.vue";
import Page5EducationAndEmployment from "../components/pages/explore/Page5EducationAndEmployment.vue";
import Page6IncomeAndAssets from "../components/pages/explore/Page6IncomeAndAssets.vue";
import Page7LifeStyle from "../components/pages/explore/Page7LifeStyle.vue";
import Page8Objectives from "../components/pages/explore/Page8Objectives.vue";
import Testing from "../components/pages/explore/Testing.vue";
import { toVueFormulateFormat } from "../common/composables/useFormHelper";

import axios, { AxiosError, AxiosResponse } from "axios";

export default defineComponent({
  setup(props, context) {
    const store = useAppStore();

    //console.log("store model", store.formModel);

    console.log(context);

    const appRef = ref<any>(null);
    const r = ref<HTMLElement | null>(null);
    const formRef = ref<any>(null);

    const model = ref<any>();

    const activePage = "Page1PersonalDetails";

    const isSectionComplete = async (isComplete: boolean) => {
      console.log("isSectionComplete", isComplete);
    };

    const handleSubmit = async (data: any) => {
      //context.emit("handleSubmit", data);
      console.log("submit data", data);
    };

    const nextClick = async () => {
      // submit programmatically here...
      //context.root.$formulate.submit("myForm");\

      /*
      console.log("appRef.value", appRef);
      const submitRef = appRef.value.$refs.submitRef;
      submitRef.$el.click();
*/

      //const formRef = appRef.value.$refs.formRef;
      const formRef = appRef.value.formRef;
      //console.log("formRef", formRef);
      const valid = formRef.formSubmitted();

      /*
      if (valid) {
        console.log("valid!");
      } else {
        console.log("NOT valid!");
      }

      return;

      */
    };

    //store.formModel.PrimaryApplicant.CriminalRecord = "true";

    model.value = toVueFormulateFormat(store.formModel, ["PrimaryApplicant"]);
    console.log("Formulate-model.value", model.value);

    onMounted(() => {
      // TODO: re-add explore and primary-applicant
    });
    return {
      Page1PersonalDetails,
      handleSubmit,
      isSectionComplete,
      nextClick,
      model,
      appRef,
    };
  },
});

// **********************
</script>

<template>
  <div>
    <component
      :is="Page1PersonalDetails"
      ref="appRef"
      @handleSubmit="handleSubmit"
      @isSectionComplete="isSectionComplete"
      :modelProp="model"
    >
    </component>
    <button @click="nextClick" class="col btn btn-secondary ml-2">
      Submit
    </button>
  </div>
</template>

<style lang="scss">
[data-classification="text"][data-is-showing-errors="true"],
[data-classification="select"][data-is-showing-errors="true"] {
  .formulate-input-wrapper {
    .formulate-input-element--text,
    .formulate-input-element--email,
    .formulate-input-element--number {
      input {
        border: 1px solid red;
        background-color: rgba(255, 0, 0, 0.15);
      }
    }

    .formulate-input-element--select,
    .formulate-input-element--yearmonthday {
      select {
        border: 1px solid red;
        background-color: rgba(255, 0, 0, 0.15);
      }
    }
  }
}
</style>
