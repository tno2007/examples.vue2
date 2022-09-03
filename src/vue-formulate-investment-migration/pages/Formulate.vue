<script setup lang="ts">
import { defineComponent, onMounted, ref } from "@vue/composition-api";
import { useAppStore } from "../stores/appStore";

import { logicalDataModel } from "../data/logical-data-model";

import Page1JsonPersonalDetails from "../components/pages/explore/Page1JsonPersonalDetails.vue";
import Page1PersonalDetails from "../components/pages/explore/Page1PersonalDetails.vue";
import Page2ContactDetails from "../components/pages/explore/Page2ContactDetails.vue";
import Page3Nationalities from "../components/pages/explore/Page3Nationalities.vue";
import Page4FamilyAncestry from "../components/pages/explore/Page4FamilyAncestry.vue";
import Page5EducationAndEmployment from "../components/pages/explore/Page5EducationAndEmployment.vue";
import Page6IncomeAndAssets from "../components/pages/explore/Page6IncomeAndAssets.vue";
import Page7LifeStyle from "../components/pages/explore/Page7LifeStyle.vue";
import Page8Objectives from "../components/pages/explore/Page8Objectives.vue";
import Testing from "../components/pages/explore/Testing.vue";
import { get, set } from "lodash";
import StepProgress from "vue-step-progress";

const store = useAppStore();

const formRef: any = ref(null);

const activePage = "Page1PersonalDetails";

const isSectionComplete = async (isComplete: boolean) => {
  console.log("isSectionComplete", isComplete);
};

const handleSubmit = async (data: any) => {
  //context.emit("handleSubmit", data);
  console.log("submit data", data);
};

const setObjectsAsArrays = (obj: object, keys: string[]) => {
  keys.forEach((k, index) => {
    const value = get(obj, k) ?? {};
    set(obj, k, [value]);
  });
  return obj;
};

const nextClick = async () => {
  const appRef: any = context.refs.appRef;
  const valid = await appRef.$refs.formRef.formSubmitted();

  if (valid) {
    console.log("valid!");
  } else {
    console.log("NOT valid!");
  }
};

onMounted(() => {
  // TODO: re-add explore and primary-applicant
  const structuredResponse = setObjectsAsArrays(logicalDataModel, [
    "Explore",
    "PrimaryApplicant",
    "Partner",
  ]);

  store.logicalDataModel = structuredResponse;
});

// **********************
</script>

<template>
  <div>
    <component
      :is="Page1JsonPersonalDetails"
      ref="appRef"
      @handleSubmit="handleSubmit"
      @isSectionComplete="isSectionComplete"
      :modelProp="store.logicalDataModel"
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
