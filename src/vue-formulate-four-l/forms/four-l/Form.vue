<!--

# What was the purpose of externalizing the vf componenets?

Here's the thing.
I want to centralize the form props and events (define it in one place)
I wanted to auto-boolize the true/false values for radio buttons, in one place, not in 4 different places.
The best way I can do it is in the main Form.cue file.

Now that its in one place, I can create a common function for it



-->
<script lang="ts">
import { onMounted, ref, defineComponent, reactive, computed } from "vue";
import { useAppStore } from "../../stores/appStore";

import Page1 from "./form-pages/other/Page1.vue";
import Page2 from "./form-pages/other/Page2.vue";
import Page3 from "./form-pages/other/Page3.vue";
import Page4 from "./form-pages/other/Page4.vue";

import {
  set,
  toVueFormulateFormat,
} from "../../common/composables/useFormHelper";
import { get } from "get-wild";

export default defineComponent({
  components: {
    Page1,
    Page2,
    Page3,
    Page4,
  },
  setup(props, context) {
    const formRef = ref<any>(null);
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
      clickedIndex: -1,
    });

    // computed
    const activeIndex = computed(() => data.tabs.findIndex((t) => t.active));
    const activeComponent = computed(
      () => data.tabs[activeIndex.value].componentName
    );

    const tabClick = async (clickedIndex: number) => {
      // show modal/loader

      // submit form
      //console.log("formRef", formRef);

      data.clickedIndex = clickedIndex;

      const valid = formRef.value.formSubmitted();

      // post results

      /*
      fetch(
        "https://local-webservices.1stcontact.com/CrmProxy/api/v5/forms/fourl/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(store.formModel),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
        */

      // when ajax done, activate new tab index

      // now get results

      // when /get is done...

      // hide modal

      // deactivate current tab
      //data.tabs[activeIndex.value].active = false;
      // activate next tab
      //data.tabs[clickedIndex].active = true;
    };

    const handleSubmit = async (submitData: any) => {
      // context.emit("handleSubmit", data);
      console.log("data", submitData);

      // deactivate current tab
      data.tabs[activeIndex.value].active = false;
      // activate next tab
      data.tabs[data.clickedIndex].active = true;
    };

    const appRef = ref<any>(null);

    const model = ref<any>();

    const isSectionComplete = async (isComplete: boolean) => {
      console.log("isSectionComplete", isComplete);
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
      //const formRef = appRef.value.formRef;
      //console.log("formRef", formRef);
      const valid = formRef.formSubmitted();
    };

    let activeCmp: string | null = null;

    onMounted(async () => {
      getCollections();
      populateData();

      activeCmp = "Page4External";
    });

    const getCollections = () => {
      let url =
        "https://local-webservices.1stcontact.com/CrmProxy/api/v5/forms/fourl/collection";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          store.customCollections = data;
        });
    };

    const populateData = () => {
      // mimic getting data from an api
      var url =
        "https://local-webservices.1stcontact.com/odataformapi/api/fourl";
      //url = "http://localhost/Examples.NetFx.CrmODataFormApi/api/fourl";
      //url = "http://localhost:3002/db";
      url =
        "https://local-webservices.1stcontact.com/CrmProxy/api/v5/forms/fourl/get?contactId=a161b1bb-72a9-dd11-a616-001f2965fc1c";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          /**/
          let vfModel = data;

          //if (data.currentPartner.info == null) {
          //  data.currentPartner.info = {};
          //}
          if (data.biometricEnrollment == null) {
            data.biometricEnrollment = [];
          }

          vfModel = toVueFormulateFormat(data, [
            "biometricEnrollment",
            "currentPartner.info",
            "currentPartner.address",
            "currentPartner",
            "referees.*.info",
          ]);

          let boolArray = [
            "biometricEnrollment.*.new_brpissued",
            "biometricEnrollment.*.new_brplocation",
          ];

          /**/
          vfModel = boolToStringUpdate(vfModel, boolArray);

          store.formModel = vfModel;
          //store.formModel = data;
        });
    };

    const dataChange = (data: any) => {
      store.formModel = data;
    };

    const boolToStringUpdate = (obj: any, boolArray: string[]) => {
      let o = JSON.parse(JSON.stringify(obj));
      boolArray.forEach((b) => {
        var value = get(o, b);
        if (typeof value != undefined) {
          if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              const v = value[i];
              set(o, b.replace(`.*.`, `[${i}]`), v.toString());
            }
          }
        }
      });
      return o;
    };

    const onInput = (data: any) => {
      // handle bool as strings for type=radio
    };

    interface IValidation {
      errors: any[];
      hasErrors: boolean;
      name: string;
    }

    const validation = async (validation: IValidation) => {};

    return {
      data,
      Page1,
      Page2,
      Page3,
      Page4,
      handleSubmit,
      isSectionComplete,
      nextClick,
      model,
      appRef,
      tabClick,
      activeComponent,
      populateData,
      store,
      onInput,
      validation,
      dataChange,
      activeCmp,
      activeIndex,
      formRef,
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

    <!-- sections 
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
    -->

    <!-- external start -->
    <fieldset :disabled="data.questionnaireComplete" class="mt-4">
      <FormulateForm
        v-model="store.formModel"
        @submit="handleSubmit"
        ref="formRef"
      >
        <component
          :is="activeComponent"
          @isSectionComplete="isSectionComplete"
          :default-collections="store.defaultCollections"
          :custom-collections="store.customCollections"
        >
        </component>

        <!--
        <Page1
          v-show="activeIndex == 0"
          :default-collections="store.defaultCollections"
          :custom-collections="store.customCollections"
        />
        <Page2
          v-show="activeIndex == 1"
          :default-collections="store.defaultCollections"
          :custom-collections="store.customCollections"
        />
        <Page3
          v-show="activeIndex == 2"
          :default-collections="store.defaultCollections"
          :custom-collections="store.customCollections"
        />
        <Page4
          v-show="activeIndex == 3"
          :default-collections="store.defaultCollections"
          :custom-collections="store.customCollections"
        />
        -->
      </FormulateForm>
    </fieldset>
    <!-- external end -->

    <button @click="nextClick" class="col btn btn-primary ml-2" v-if="false">
      Submit
    </button>

    <!--
    <button @click="populateData">Get data</button>
    -->

    <!---->
    <hr />
    <p>store.formModel</p>
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

.formulate-input .formulate-input-element {
  max-width: none !important;
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
