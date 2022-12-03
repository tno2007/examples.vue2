<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  reactive,
  ref,
} from "@vue/composition-api";
import { IModel } from "../../../common/typings/explore";
import { getObjectValue } from "../../../common/composables/useFormHelper";
import collections from "../../../data/explore/collections";

export default defineComponent({
  name: "Page7LifeStyle",
  components: {},
  props: {
    modelProp: {
      type: Object as PropType<IModel>,
      required: true,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const formRef: any = ref(null);

    const data = reactive({
      model: {} as any,
    });

    const handleSubmit = async (data: any) => {
      context.emit("handleSubmit", data);
    };

    const specificBudgetOrTotalExpenses = (
      prefix: string,
      values: string[]
    ) => {
      const lookupValue = getObjectValue(
        data.model,
        `${prefix}[0].Budget[0].BudgetOrTotalExpenses`
      );

      return values.includes(lookupValue);
    };

    onMounted(async () => {
      await nextTick();
      data.model = props.modelProp;
    });

    return {
      formRef,
      collections,
      data,
      handleSubmit,
      specificBudgetOrTotalExpenses,
    };
  },
});
</script>

<template>
  <div>
    <FormulateForm v-model="data.model" @submit="handleSubmit" ref="formRef">
      <h5 class="pt-3">Primary applicant</h5>
      <FormulateInput type="group" name="PrimaryApplicant">
        <FormulateInput type="group" name="Budget">
          <FormulateInput
            type="select"
            name="BudgetOrTotalExpenses"
            label="Would you like to complete the full budget or would you prefer to give us the full amount?"
            :options="collections.PrimaryApplicant.Budget.BudgetOrTotalExpenses"
            placeholder="-- Select --"
          />
          <FormulateInput
            type="number"
            name="TotalExpenses"
            label="Total monthly expenses:"
            v-if="
              specificBudgetOrTotalExpenses('PrimaryApplicant', ['100000001'])
            "
          />
          <div
            v-if="
              specificBudgetOrTotalExpenses('PrimaryApplicant', ['100000000'])
            "
          >
            <!-- Home -->
            <h5>Home</h5>
            <FormulateInput
              type="text"
              name="MortgageRent"
              label="Mortgage/Rent:"
            />
            <FormulateInput
              type="text"
              name="HomeInsurance"
              label="Home/rental insurance:"
            />
            <FormulateInput
              type="text"
              name="MortgageOverPayments"
              label="Mortgage overpayments"
            />
            <FormulateInput type="text" name="Tax" label="Tax" />
            <FormulateInput type="text" name="Loans" label="Loans:" />
            <FormulateInput type="text" name="Debits" label="Debits:" />
            <FormulateInput
              type="text"
              name="CreditCards"
              label="Credit cards:"
            />
            <FormulateInput
              type="text"
              name="Electricity"
              label="Electricity:"
            />
            <FormulateInput type="text" name="Gas" label="Gas:" />
            <FormulateInput type="text" name="Water" label="Water:" />
            <FormulateInput type="text" name="Phone" label="Phone:" />
            <FormulateInput
              type="text"
              name="CableSatelliteTv"
              label="Cable/Satellite/TV License:"
            />
            <FormulateInput type="text" name="Internet" label="Internet:" />
            <FormulateInput
              type="text"
              name="FurnishingAppliances"
              label="Furnishing/Appliances:"
            />
            <FormulateInput type="text" name="Gardening" label="Garden:" />
            <FormulateInput type="text" name="OtherExpenses" label="Other:" />

            <!-- Transportation -->
            <h4>Transportation</h4>
            <FormulateInput
              type="text"
              name="CarPayments"
              label="Car payments:"
            />
            <FormulateInput
              type="text"
              name="AutoInsurance"
              label="Auto insurance:"
            />
            <FormulateInput type="text" name="Fuel" label="Fuel:" />
            <FormulateInput
              type="text"
              name="PublicTransport"
              label="Public transportation:"
            />
            <FormulateInput
              type="text"
              name="RegistrationAndLicense"
              label="Registration/license:"
            />

            <!-- Daily living -->
            <h4>Daily living</h4>
            <FormulateInput type="text" name="Groceries" label="Groceries:" />
            <FormulateInput
              type="text"
              name="AlcoholAndCigarettes"
              label="Alcohol & cigarettes:"
            />
            <FormulateInput type="text" name="DiningOut" label="Dining out:" />
            <FormulateInput type="text" name="Clothing" label="Clothing:" />
            <FormulateInput type="text" name="Cleaning" label="Cleaning:" />
            <FormulateInput
              type="text"
              name="SalonAndBarber"
              label="Salon/Barber:"
            />
            <FormulateInput
              type="text"
              name="PetAndVet"
              label="Supplies/Vet Fees:"
            />

            <!-- Children -->
            <h4>Children</h4>
            <FormulateInput
              type="text"
              name="ChildcareAndNanny"
              label="Childcare/Nanny:"
            />
            <FormulateInput type="text" name="Education" label="Education:" />
            <FormulateInput type="text" name="Gifts" label="Gifts:" />
            <FormulateInput
              type="text"
              name="ExtraMural"
              label="Extra mural activities:"
            />
            <FormulateInput
              type="text"
              name="OtherChildExpenses"
              label="Other:"
            />

            <!-- Entertainment -->
            <h4>Entertainment</h4>
            <FormulateInput
              type="text"
              name="StreamingSatelliteTv"
              label="Streaming/Satellite/Subscriptions:"
            />
            <FormulateInput
              type="text"
              name="ConcertsAndPlays"
              label="Concerts/Plays:"
            />
            <FormulateInput type="text" name="Sports" label="Sport:" />
            <FormulateInput
              type="text"
              name="OutdoorAndRecreation"
              label="Outdoor recreation:"
            />

            <!-- Health -->
            <h4>Health</h4>
            <FormulateInput
              type="text"
              name="HealthInsurance"
              label="Health insurance:"
            />
            <FormulateInput
              type="text"
              name="GymMembership"
              label="Gym membership:"
            />
            <FormulateInput
              type="text"
              name="DoctorAndDentistVisits"
              label="Doctors/Dentist visits:"
            />
            <FormulateInput
              type="text"
              name="MedicinePrescriptions"
              label="Medicine/Prescriptions:"
            />
            <FormulateInput
              type="text"
              name="LifeInsurance"
              label="Life Insurance:"
            />

            <!-- Vacation/Holiday -->
            <h4>Vacation/Holiday</h4>
            <FormulateInput type="text" name="Travel" label="Travel:" />
          </div>
        </FormulateInput>
      </FormulateInput>
    </FormulateForm>
  </div>
</template>
