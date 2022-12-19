<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useAppStore } from "../../../../stores/appStore";

export default defineComponent({
  name: "Page3",
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

    const removeItemRepeatableItem = (
      fn: Function,
      index: number,
      description: string = ""
    ) => {
      if (
        confirm(
          `Are you sure you want to remove this ${
            description.length ? `${description}` : "item"
          }?`
        )
      ) {
        fn();
      }
    };

    return {
      formRef,
      submitRef,
      handleSubmit,
      validation,
      store,
      removeItemRepeatableItem,
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
      <h5>Please your referees here</h5>
      <FormulateInput
        type="group"
        :repeatable="true"
        name="referees"
        add-label="+ Add referee"
        limit="2"
      >
        <template #repeatable="{ model, index, removeItem }">
          <div class="formulate-input-group-repeatable">
            <a
              role="button"
              class="formulate-input-group-repeatable-remove"
              @click.prevent="
                removeItemRepeatableItem(removeItem, index, 'Referee')
              "
              >Remove</a
            >
            <FormulateInput type="group" name="info">
              <h5 class="pt-2 pb-2">Referee {{ index + 1 }}</h5>
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
                :options="store.customCollections.genders"
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
                type="text"
                name="passportNumber"
                label="Current British citizen passport number (if any) :"
              ></FormulateInput>
            </FormulateInput>
            <FormulateInput
              type="group"
              name="addresses"
              :repeatable="true"
              add-label="+ Add previous address"
            >
              <template #repeatable="{ model, index, removeItem }">
                <div class="formulate-input-group-repeatable">
                  <a
                    role="button"
                    class="formulate-input-group-repeatable-remove"
                    @click.prevent="
                      removeItemRepeatableItem(removeItem, index, 'Address')
                    "
                    v-show="index > 0"
                    >Remove</a
                  >
                  <h5 class="pt-2 pb-2">
                    {{
                      index == 0
                        ? `Current Address`
                        : `Previous address (${index})`
                    }}
                  </h5>
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
                  <h5 v-if="index == 0">
                    If you have been at this address for less than 3 years,
                    please add previous addresses below:
                  </h5>
                </div>
              </template>
            </FormulateInput>
          </div>
        </template>
      </FormulateInput>
    </FormulateForm>
  </div>
</template>

<style lang="scss"></style>
