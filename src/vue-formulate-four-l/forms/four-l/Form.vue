<script lang="ts">
import { onMounted, ref, defineComponent, reactive, computed } from "vue";
import { useAppStore } from "../../stores/appStore";
import Page1 from "./form-pages/Page1.vue";
import Page2 from "./form-pages/Page2.vue";
import Page3 from "./form-pages/Page3.vue";
import Page4 from "./form-pages/Page4.vue";
import { toVueFormulateFormat } from "../../common/composables/useFormHelper";
import logicalDataModel from "../../data/logical-data-model";
import Test from "./Test.vue";

export default defineComponent({
  components: {
    Page1,
    Page2,
    Page3,
    Page4,
    Test,
  },
  setup(props, context) {
    const store = useAppStore();

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

    onMounted(async () => {
      console.log("Form.onMounted");

      getCollections();
      populateData();
    });

    const getCollections = () => {
      let url =
        "http://local-webservices.1stcontact.com/odataformapi/api/collection";
      url = "http://localhost/Examples.NetFx.CrmODataFormApi/api/collection";
      url = "http://localhost:3001/db";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          store.customCollections = data;
        });
    };

    const populateData = () => {
      // mimic getting data from an api
      var url =
        "http://local-webservices.1stcontact.com/odataformapi/api/fourl";
      url = "http://localhost/Examples.NetFx.CrmODataFormApi/api/fourl";
      url = "http://localhost:3002/db";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          //store.formModel = data;

          //store.formModel = logicalDataModel;

          //console.log("store.formModel", store.formModel);

          // console.log("data", data);

          // convert api data to a vue-formulate format (grouped keys becomes arrays)

          let parse1 = toVueFormulateFormat(data, ["currentPartner.info"]);
          let parse2 = toVueFormulateFormat(parse1, ["currentPartner.address"]);
          let vfModel = toVueFormulateFormat(parse2, ["currentPartner"]);
          //console.log("model.value", model.value);

          console.log("vfModel", vfModel);

          //store.formModel = data;

          store.formModel = vfModel;
        });
    };

    return {
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
      populateData,
      store,
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
      <transition-fade>
        <KeepAlive>
          <component
            :is="activeComponent"
            ref="appRef"
            @handleSubmit="handleSubmit"
            @isSectionComplete="isSectionComplete"
          >
          </component>
        </KeepAlive>
      </transition-fade>
    </fieldset>

    <button @click="nextClick" class="col btn btn-primary ml-2" v-if="false">
      Submit
    </button>

    <!--
    <button @click="populateData">Get data</button>
    -->

    <pre>{{ store.formModel }}</pre>
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
