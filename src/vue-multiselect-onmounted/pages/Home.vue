<template>
  <div class="main">
    <multiselect
      v-model="data.selectedValue"
      :options="currencies"
      track-by="currencyIsoCode"
      label="name"
      :searchable="false"
      :show-labels="false"
      :allow-empty="false"
    >
      <template #singleLabel="props">
        <div class="currency-flag-row">
          <div
            class="ensign vti__flag"
            :class="props.option.countryTwoLetterIsoCode"
          ></div>
          <span>{{ props.option.currencyIsoCode.toUpperCase() }}</span>
        </div>
      </template>

      <template #option="props">
        <div
          class="ensign vti__flag"
          :class="props.option.countryTwoLetterIsoCode"
        ></div>
        <strong>{{
          `${props.option.currencyIsoCode.toUpperCase()} - ${
            props.option.currencyName
          }`
        }}</strong>
      </template>
    </multiselect>
    <pre>{{ data.selectedValue }}</pre>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  computed,
} from "@vue/composition-api";
import Multiselect from "vue-multiselect";
import currencyData from "../common/data/currencyDataSet";
import { ICurrency } from "../common/typings";

export default defineComponent({
  name: "Home",
  components: { Multiselect },
  props: {
    defaultCurrencyProp: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const data = reactive({
      selectedValue: null as ICurrency | null,
      defaultcurrency: "",
    });

    const currencies = computed(() => {
      return currencyData;
    });

    //const getCurrency = fetch("sample-currencies.json");

    const doThis = (countryCode: string) => {
      const currency = currencies.value.find(
        (c) =>
          c.countryTwoLetterIsoCode.toLowerCase() === countryCode.toLowerCase()
      );

      if (currency) {
        data.selectedValue = currency;
      } else {
        data.selectedValue = currencies.value[0];
      }
    };
    const doThat = () => console.log("doThat");

    onMounted(() => {
      data.defaultcurrency = props.defaultCurrencyProp;

      data.defaultcurrency ? doThis(data.defaultcurrency) : doThat();
    });

    return {
      data,
      currencies,
    };
  },
});
</script>

<style lang="scss">
@import "vue-multiselect/dist/vue-multiselect.min.css";
</style>
