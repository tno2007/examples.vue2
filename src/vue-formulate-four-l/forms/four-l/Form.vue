<script lang="ts">
import {
  onMounted,
  ref,
  defineComponent,
  reactive,
  computed,
} from "@vue/composition-api";
import { useAppStore } from "../../stores/appStore";
import Page1 from "./form-pages/Page1.vue";
import Page2 from "./form-pages/Page2.vue";
import { toVueFormulateFormat } from "../../common/composables/useFormHelper";

import axios, { AxiosError, AxiosResponse } from "axios";

export default defineComponent({
  components: {
    Page1,
  },
  setup(props, context) {
    const store = useAppStore();

    const data = reactive({
      questionnaireComplete: true,
      tabs: [
        {
          label: "Address history",
          componentName: "Page1",
          active: true,
          completed: false,
        },
        {
          label: "Details of your partner",
          componentName: "Page2",
          active: false,
          completed: false,
        },
      ],
    });

    const tabClick = async (clickedIndex: number) => {
      data.tabs[activeIndex.value].active = false;
      data.tabs[clickedIndex].active = true;
    };

    // computed
    const activeIndex = computed(() => data.tabs.findIndex((t) => t.active));
    const activeComponent = computed(
      () => data.tabs[activeIndex.value].componentName
    );

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
      data,
      Page1,
      handleSubmit,
      isSectionComplete,
      nextClick,
      model,
      appRef,
      tabClick,

      activeComponent,
    };
  },
});

// **********************
</script>

<template>
  <div class="p-5">
    <!-- tabs -->
    <ul class="nav nav-tabs">
      <li class="nav-item" v-for="(t, index) in data.tabs">
        <button
          class="nav-link"
          :class="{
            active: t.active,
            'tab-button-final': index == 7,
          }"
          href="#"
          :aria-current="t.active"
          @click="tabClick(index)"
        >
          {{ t.label }}
        </button>
      </li>
    </ul>
    <!--/tabs -->

    <!-- sections -->
    <fieldset :disabled="data.questionnaireComplete">
      <component
        :is="activeComponent"
        ref="appRef"
        @handleSubmit="handleSubmit"
        @isSectionComplete="isSectionComplete"
        :modelProp="model"
      >
      </component>
    </fieldset>

    <button @click="nextClick" class="col btn btn-secondary ml-2">
      Submit
    </button>
  </div>
</template>

<style lang="scss">
ul.nav.nav-tabs {
  li.nav-item {
    button.nav-link {
      background-color: #115577;
      margin-right: 5px;
      margin-left: 5px;
      color: #fff;
      font-weight: bold;
      &.active {
        background-color: #fff;
        color: #000;
      }
    }
  }
}

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
