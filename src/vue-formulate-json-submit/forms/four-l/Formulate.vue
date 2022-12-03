<script lang="ts">
/*
- Notes:

It gets really complex storing json data in relation tables.
Especially when it comes to answers or responses.

Json works on the basis that it will have nested choldren.
Json fields or keys, would normally be table field names.

With nested JSON children, this would mean it belongs to separate tables.

{
  first_name:
  dependentants: [
    first_name: ""
    last_name: ""
  ]
}

its too complex to store json in CRM or SQL Server, as its not geared towards data like JSON.

The simplest you can do is have a questions table, but there should be no children records, or there should just be one child maximum.


// todo:
see if you can store this json in LiteDB, and query it to crm/sql using an api.
litedb already allows sql queries on litedb json data.
however, to store the answers (from JSON) in crm is too complex.

The simple answer would be to just store it in SQL server.
But its just moving the problem from on place to another (CRM to SqlServer).

The most elegant solution would be storing it in a JSON database,
and you should be able to query the data using an API, or just sql.

you cannot write sql in CRM *to retrieve data*.
CRM is all about entites.

Storing it in JSON is the best.

JSON has structure, its not just text.
You can query it. Using sql.

But if CRM does not allow us to save json , it makes CRM not a candidate to store this.

- all you can do is parse json and store that in CRM Entity tables.
- *** json data is sort of dynamic sql tables. you can query it, but its not really tables.
you dont need tables to store it, just a field.



*/

import { onMounted, ref, defineComponent, reactive, computed } from "vue";
import { useAppStore } from "../../stores/appStore";

import AdminPortalConsultantLogin from "./portal/AdminPortalConsultantLogin.vue";
import ForgotPassword from "./portal/ForgotPassword.vue";
import Login from "./portal/Login.vue";
import Profile from "./portal/Profile.vue";
import ReportAProblem from "./portal/ReportAProblem.vue";
import ResetPassword from "./portal/ResetPassword.vue";
import { toVueFormulateFormat } from "../../common/composables/useFormHelper";

export default defineComponent({
  components: {
    AdminPortalConsultantLogin,
    ForgotPassword,
    Login,
    Profile,
    ReportAProblem,
    ResetPassword,
  },
  setup(props, context) {
    const store = useAppStore();

    const data = reactive({
      tabs: [],
      model: {},
      schema: [
        {
          type: "text",
          name: "firstName",
          label: "First name",
          validation: "required",
        },
        {
          type: "group",
          repeatable: true,
          name: "dependants",
          addLabel: "+ Dependant",
          children: [
            {
              type: "text",
              name: "firstName",
              label: "First name",
              validation: "required",
              help: "Please fill in all your first names",
            },
            {
              type: "text",
              name: "lastName",
              label: "Last name",
              validation: "required",
            },
            {
              id: 5,
              type: "group",
              repeatable: true,
              name: "subjects",
              addLabel: "+ Subjects",
              children: [
                {
                  id: 6,
                  type: "text",
                  name: "subject",
                  label: "Subject name",
                  validation: "required",
                },
              ],
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
      // submit programmatically here...
      //context.root.$formulate.submit("myForm");\

      /*
      console.log("appRef.value", appRef);
      const submitRef = appRef.value.$refs.submitRef;
      submitRef.$el.click();
*/

      //const formRef = appRef.value.$refs.formRef;
      const formRef = appRef.value.formRef;
      console.log("formRef", formRef);
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

    console.log("store.formModel", store.formModel);

    store.formModel.PrimaryApplicant.CriminalRecord = "true";

    model.value = toVueFormulateFormat(store.formModel, [
      "PrimaryApplicant",
      "Partner",
    ]);

    onMounted(() => {
      // TODO: re-add explore and primary-applicant
    });
    return {
      data,
      Login,
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
    <FormulateForm v-model="data.model" :schema="data.schema" />
    <pre>{{ data.model }}</pre>
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
