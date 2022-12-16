<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useAppStore } from "../../../stores/appStore";

export default defineComponent({
  name: "Page3",
  setup(props, context) {
    const store = useAppStore();
    const formRef: any = ref(null);
    const submitRef: any = ref(null);

    const data = reactive({
      model: {} as any,
      schema: [],
      collections: {
        boolean: [
          {
            label: "Yes",
            value: "true",
          },
          {
            label: "No",
            value: "false",
          },
        ],
        country: [] as any[],
        gender: [
          {
            label: "Male",
            value: "1",
          },
          {
            label: "Female",
            value: "2",
          },
        ],
      },
    });

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    interface IValidation {
      errors: any[];
      hasErrors: boolean;
      name: string;
    }

    const validation = async (validation: IValidation) => {};

    //data.model = props.modelProp;

    onMounted(async () => {
      fetch(
        "https://webservices.1stcontact.com/crmproxy/api/v2/entities/lead/attributes/new_country"
      )
        .then((response) => response.json())
        .then((response) => {
          const result: any[] = response.Result;
          const options = result.map(({ Description: label, Code: value }) => ({
            label,
            value,
          }));
          data.collections.country = options;
        });
    });

    return {
      formRef,
      submitRef,
      data,
      handleSubmit,
      validation,
      store,
    };
  },
});
</script>

<template>
  <div>
    <FormulateForm v-model="data.model" @submit="handleSubmit" ref="formRef">
      <h5>Please add your referees here</h5>
      <FormulateInput
        type="group"
        :repeatable="true"
        name="referees"
        #default="{ index }"
        add-label="+ Add another referee"
      >
        <FormulateInput type="group" name="info">
          <h5 class="pt-2 pb-2">Referee ({{ index + 1 }})</h5>
          <FormulateInput
            type="text"
            name="new_firstname"
            label="First name:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="new_lastname"
            label="Last name:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="yearmonthday"
            name="new_dateofbirth"
            label="Date of birth:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="radio"
            name="new_gender"
            label="Sex:"
            :validation="[['required']]"
            :options="data.collections.gender"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="dayTimeTelephone"
            label="Day time telephone number:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="emailAddress"
            label="Email address:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="radio"
            name="havePassport"
            label="Have passport:"
            :validation="[['required']]"
            :options="data.collections.boolean"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="passportNumber"
            label="Passport number:"
            :validation="[['required']]"
          ></FormulateInput>
        </FormulateInput>
        <FormulateInput type="group" name="address">
          <FormulateInput
            type="select"
            name="new_country"
            label="Country:"
            :validation="[['required']]"
            :options="store.customCollections.countries"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="new_addressline1"
            label="Address:"
            :validation="[['required']]"
            placeholder="Address line 1"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="new_addressline2"
            :validation="[['required']]"
            placeholder="Address line 2"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="new_posttownorcity"
            label="Post town / city:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="new_stateorprovince"
            label="State / Province:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="new_postalcode"
            label="Postal code:"
            :validation="[['required']]"
          ></FormulateInput>
        </FormulateInput>

        <FormulateInput
          type="radio"
          name="new_ataddresslessthan3years"
          label="Been at this address for more than three years:"
          :validation="[['required']]"
          :options="data.collections.boolean"
        ></FormulateInput>
        <FormulateInput
          type="group"
          :repeatable="true"
          name="previousAddresses"
          #default="{ index }"
          add-label="+ Add another previous address"
          v-if="
            store.formModel.referees &&
            store.formModel.referees[0].new_ataddresslessthan3years == 'true'
          "
        >
          <h5 class="pt-2 pb-2">Previous address ({{ index + 1 }})</h5>
          <FormulateInput
            type="select"
            name="country"
            label="Country:"
            :validation="[['required']]"
            :options="data.collections.country"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="addressline1"
            label="Address:"
            :validation="[['required']]"
            placeholder="Address line 1"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="addressline2"
            :validation="[['required']]"
            placeholder="Address line 2"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="posttownorcity"
            label="Post town / city:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="stateorprovince"
            label="State / Province:"
            :validation="[['required']]"
          ></FormulateInput>
          <FormulateInput
            type="text"
            name="postalcode"
            label="Postal code:"
            :validation="[['required']]"
          ></FormulateInput>
        </FormulateInput>
      </FormulateInput>
    </FormulateForm>
    <pre>{{ data.model }}</pre>
  </div>
</template>

<style lang="scss">
//.formulate-input .formulate-input-element {
//max-width: none;
//}
</style>
