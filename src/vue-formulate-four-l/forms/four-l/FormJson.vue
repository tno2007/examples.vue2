<script lang="ts">
import {
  onMounted,
  ref,
  defineComponent,
  reactive,
  computed,
  onUpdated,
} from "vue";
import { useAppStore } from "../../stores/appStore";
import Page1 from "./form-pages/Page1.vue";
import Page2 from "./form-pages/Page2.vue";
import Page3 from "./form-pages/Page3.vue";
import Page4 from "./form-pages/Page4.vue";
import { toVueFormulateFormat } from "../../common/composables/useFormHelper";
import logicalDataModel from "../../data/logical-data-model";

export default defineComponent({
  components: {
    Page1,
    Page2,
    Page3,
    Page4,
  },
  setup(props, context) {
    const store = useAppStore();

    const refForm = ref(null);

    const data = reactive({
      questionnaireComplete: false,
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
        {
          label: "Referees and identity",
          componentName: "Page3",
          active: false,
          completed: false,
        },
        {
          label: "Biometric enrolment",
          componentName: "Page4",
          active: false,
          completed: false,
        },
      ],
      model: {},
      schema: [
        {
          component: "h5",
          children: "Please provide all your addresses for the past 5 years",
          class: "mb-4",
        },
        {
          type: "group",
          repeatable: true,
          name: "addresses",
          addLabel: "+ Address",
          default: "",
          children: [
            {
              component: "h5",
              children: "Address $index",
              class: "pt-2 pb-2",
            },
            {
              name: "Country",
              label: "Country $index",
            },
            {
              name: "addressline1",
              label: "Address",
              placeholder: "Address line 1",
            },
            {
              name: "addressline2",
              placeholder: "Address line 2",
            },
          ],
        },
        {
          type: "group",
          repeatable: true,
          name: "people",
          addLabel: "+ Address",
          default: "",
          children: [
            {
              name: "First name",
              label: "First name $index",
            },
          ],
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

    const model = ref<any>();

    const isSectionComplete = async (isComplete: boolean) => {
      console.log("isSectionComplete", isComplete);
    };

    const handleSubmit = async (data: any) => {
      //context.emit("handleSubmit", data);
      console.log("submit data", data);
    };

    const nextClick = async () => {
      const formRef = appRef.value.formRef;
      const valid = formRef.formSubmitted();
    };

    // mimic getting data from an api
    store.formModel = logicalDataModel;

    console.log("store.formModel", store.formModel);

    // convert api data to a vue-formulate format (grouped keys becomes arrays)
    model.value = toVueFormulateFormat(store.formModel, []);

    let rCount = 0;
    let rIndex = 0;

    const loopRepeatableChildren = (children: any, repeatableIndex: number) => {
      if (!children) return;
      children.forEach((c: any) => {
        if (c.$vnode.tag.endsWith("-FormulateInput")) {
          console.log("lrc", repeatableIndex, c.label);
        }
      });
    };

    // loop children
    const loopChildren = (children: any) => {
      if (!children) return;
      //if (!children.$children) return;
      let repeatableIndex = 0;
      children.forEach((c: any) => {
        const tag: string = c.$vnode.tag;

        if (tag.endsWith("-FormulateInputGroup")) {
          console.log("FormulateInputGroup");
        }

        if (tag.endsWith("-FormulateRepeatableProvider")) {
          // ++rCount;
          // ++repeatableIndex;
          //loopRepeatableChildren(c.$children, rCount);
          //if (c.$children) loopChildren(c.$children);
          console.log("FormulateRepeatableProvider");
        }

        if (tag.endsWith("-FormulateInput")) {
          if (c.type == "group") {
            if (c.repeatable) {
              console.log("is repeatable");
            }
          }
        }

        if (c.$children) loopChildren(c.$children);
      });
    };

    const inspectRefValueForChildren = (refValue: any) => {
      if (!refValue) return;
      if (!refValue.$children) return;
      loopChildren(refValue.$children);
    };

    const computedLabel = computed(() => {
      inspectRefValueForChildren(refForm.value);

      // find the named child
      //if (!refForm.value) return;
      //refForm.value.$children.forEach((e: any) => {});
    });

    const evaluate = () => {
      inspectRefValueForChildren(refForm.value);
    };

    onMounted(() => {
      //console.log("refForm.value", refForm.value);

      inspectRefValueForChildren(refForm.value);

      // find how many 'FormulateRepeatableProvider' there is
    });

    onUpdated(() => {});

    return {
      refForm,
      data,
      Page1,
      Page2,
      handleSubmit,
      isSectionComplete,
      nextClick,
      model,
      appRef,
      tabClick,
      activeComponent,
      evaluate,
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
    <fieldset :disabled="data.questionnaireComplete" class="mt-4">
      <FormulateForm v-model="data.model" :schema="data.schema" ref="refForm" />
    </fieldset>

    <button @click="evaluate">Evaluate</button>
    <pre>{{ data.model }}</pre>

    <button @click="nextClick" class="col btn btn-primary ml-2" v-if="false">
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
