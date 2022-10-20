<template>
  <div
    class="year-month-day-group"
    :class="context.classes.element"
    :data-type="context.type"
  >
    <div class="year" :class="context.classes.element">
      <div>
        <select
          v-model="data.selectedYear"
          v-bind="context.attributes"
          @change="onSelectChange('year')"
          :class="noErrorCss('year')"
        >
          <option
            v-for="o in data.years"
            :key="o.id"
            :value="o.value"
            v-text="o.label"
          />
        </select>
      </div>
    </div>
    <div class="month" :class="context.classes.element">
      <div>
        <select
          v-model="data.selectedMonth"
          v-bind="context.attributes"
          @change="onSelectChange('month')"
          :class="noErrorCss('month')"
        >
          <option
            v-for="o in data.months"
            :key="o.id"
            :value="o.value"
            v-text="o.label"
          />
        </select>
      </div>
    </div>
    <div class="day" :class="context.classes.element">
      <div>
        <select
          v-model="data.selectedDay"
          v-bind="context.attributes"
          @change="onSelectChange('day')"
          :class="noErrorCss('day')"
        >
          <option
            v-for="o in data.days"
            :key="o.id"
            :value="o.value"
            v-text="o.label"
          />
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface ISelectOption {
  label: string;
  id: string | number;
  value: string | number;
}

enum EnumSelect {
  Year,
  Month,
  Day,
}

import {
  defineComponent,
  reactive,
  computed,
  watch,
  onMounted,
  nextTick,
} from "vue";
import { formatISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const app = defineComponent({
  currencyName: "YearMonthDayFormulateInput",
  components: {},
  props: {
    context: {
      type: Object,
      required: true,
    },
    format: {
      type: String,
      required: false,
      default: "datetime",
    },
  },
  setup(props, ctx) {
    const data = reactive({
      isEventCausedByUiChange: false,
      timeZone: "",
      selectedYear: 0,
      selectedMonth: 0,
      selectedDay: 0,
      years: [] as ISelectOption[],
      months: [] as ISelectOption[],
      days: [] as ISelectOption[],
      updatedContextModel: false,
    });

    const mixinContext: any = ctx;

    const numberOfDays = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getLocale = () => {
      if (navigator.languages.length) {
        return navigator.languages[0];
      } else {
        return "en-US";
      }
    };

    const populateYears = () => {
      const additionalYearToAppend = 0;
      const additionalYearToPrepend = 0;
      const yearSpan = 100;

      const currentYear = Number(new Date().getFullYear());
      var startYear = currentYear - yearSpan - additionalYearToPrepend;
      var endYear = currentYear + additionalYearToAppend;

      var years = Array.from({ length: endYear - startYear + 1 }, (item, i) => {
        const year = startYear + i;
        var option = {
          label: year.toString(),
          id: year,
          value: year,
        } as ISelectOption;
        return option;
      });

      data.years = years.reverse();
    };

    const populateMonths = () => {
      const months = Array.from({ length: 12 }, (item, i) => {
        // i starts at zero, so we add 1 for non-zero numbers
        var monthNumber = i + 1;
        var monthName = new Date(0, i).toLocaleString(getLocale(), {
          month: "long",
        });
        return {
          id: monthNumber,
          label: monthName,
          value: monthNumber,
        } as ISelectOption;
      });
      data.months = months;
    };

    const populateDays = () => {
      const days = Array.from({ length: 31 }, (item, i) => {
        // i starts at zero, so we add 1 for non-zero numbers
        var number = i + 1;
        return {
          label: number.toString(),
          id: number,
          value: number,
        } as ISelectOption;
      });
      data.days = days;
    };

    interface IDate {
      isDate: boolean;
      type: string;
      value: Date | null;
    }

    const isDate = (value: any) => {
      if (!isNaN(new Date(value).getTime())) {
        return true;
      }
      return false;
    };

    const parseDate = (value: any, metaData: string = "") => {
      let isValidDate = false;
      if (!isNaN(new Date(value).getTime())) {
        isValidDate = true;
      }

      var result: IDate = {
        type: typeof value,
        isDate: isValidDate,
        value: isValidDate ? getZonedDate(new Date(value)) : null,
      };

      return result;
    };

    const updateModel = () => {};

    const getZonedDate = (date: Date) => {
      if (!data.timeZone) data.timeZone = "Europe/London";
      return utcToZonedTime(date, data.timeZone);
    };

    const random = (min: number = 1000, max: number = 2000) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const toDateString = (date: Date) => {
      let year = date.getFullYear();
      let yearPadded = year.toString().padStart(4, "0");
      let month = date.getMonth();
      let actualMonth = month + 1;
      let monthPadded = actualMonth.toString().padStart(2, "0");
      let day = date.getDate();
      let dayPadded = day.toString().padStart(2, "0");

      return `${yearPadded}-${monthPadded}-${dayPadded}`;
    };

    const update = (date: Date, area: string = "") => {
      var randomNumber = random();

      data.updatedContextModel = true;
      if (props.format === "date") {
        props.context.model = toDateString(date).substring(0, 10);
      } else {
        props.context.model = date.toISOString();
      }

      let year = date.getFullYear();
      let month = date.getMonth();
      let actualMonth = month + 1;
      let day = date.getDate();

      if (data.selectedYear != year) data.selectedYear = year;
      if (data.selectedMonth != actualMonth) data.selectedMonth = actualMonth;
      if (data.selectedDay != day) data.selectedDay = day;
    };

    const updateModular = (
      year: number,
      month: number,
      day: number,
      area: string = ""
    ) => {
      var randomNumber = random();

      const date = new Date(year, month, day);

      if (props.format === "date") {
        props.context.model = formatISO(date, { representation: "date" });
      } else {
        props.context.model = date.toISOString();
      }

      //let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
      //let month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(date);
      //let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

      if (data.selectedYear != year) data.selectedYear = year;
      if (data.selectedMonth != month + 1) data.selectedMonth = month + 1;
      if (data.selectedDay != day) data.selectedDay = day;
    };

    // *******************************************
    // Change events
    // *******************************************

    const onSelectChange = (dropdown: string) => {
      if (
        Boolean(data.selectedYear) &&
        Boolean(data.selectedMonth) &&
        Boolean(data.selectedDay)
      ) {
        const date = new Date(
          data.selectedYear,
          data.selectedMonth - 1,
          data.selectedDay
        );
        update(date);
      } else {
        console.log("one of the values is 0/null/undefined");
      }

      return;

      switch (dropdown) {
        case "year":
          onYearChange();
          break;
        case "month":
          onMonthChange();
          break;
        case "day":
          onDayChange();
          break;
        default:
          break;
      }

      if (isDate(props.context.model)) {
        //let date = new Date(props.context.model);

        //let m1 = data.selectedMonth - 1;
        //let m2 = date.getMonth();

        /*
        const year =
          changedSelect == EnumSelect.Year
        const month =
          changedSelect == EnumSelect.Month
            ? data.selectedMonth - 1
            : date.getMonth();
        const day =
          changedSelect == EnumSelect.Day ? data.selectedDay : date.getDate();
        */

        updateModular(
          data.selectedYear,
          data.selectedMonth - 1,
          data.selectedDay,
          "onSelectChange"
        );
      } else {
        console.log(
          `onDayChange - value passed in, (${props.context.model}) is not a valid date.`
        );
      }
    };

    const onYearChange = () => {
      //onSelectChange(EnumSelect.Year);
    };

    const onMonthChange = () => {
      //onSelectChange(EnumSelect.Month);
    };

    const onDayChange = () => {
      //onSelectChange(EnumSelect.Day);
    };

    const noErrorCss = (dropdown: string) => {
      switch (dropdown) {
        case "year":
          if (Boolean(data.selectedYear)) return "no-error";
          break;
        case "month":
          if (Boolean(data.selectedMonth)) return "no-error";
          break;
        case "day":
          if (Boolean(data.selectedDay)) return "no-error";
          break;
        default:
          break;
      }
    };

    nextTick(() => {
      var randomNumber = random();
      if (isDate(props.context.model)) {
        let date: Date = new Date(props.context.model);
        update(date, "nextTick");
      } else {
        console.log(
          `nextTick - value passed in, (${props.context.model}) is not a validate date.`
        );
      }
    });

    watch(
      () => props.context.model,
      (newValue, oldValue) => {
        var randomNumber = random();

        if (data.updatedContextModel) {
          data.updatedContextModel = false;
          return;
        }

        if (isDate(newValue)) {
          let date: Date = new Date(newValue);

          // if the iso version (that gets saved in the model) is same as incoming value, no need to process further
          if (date.toISOString() === newValue) return;

          update(date, "watch");
        } else {
          console.log(
            `watch - value passed in, (${newValue}) is not a valid date.`
          );
        }
      }
    );

    const model = computed(() => {
      return props.context.model;
    });

    onMounted(() => {
      populateYears();
      populateMonths();
      populateDays();
    });

    return {
      data,
      updateModel,
      onSelectChange,
      model,
      props,
      noErrorCss,
    };
  },
});

export default app;
</script>

<style lang="scss" scoped>
.year-month-day-group {
  display: flex;
  justify-content: space-between;
  padding: 0;
  width: 100%;

  .year,
  .month,
  .day {
    width: 32.3%;
    margin-bottom: 0;
  }
}

.formulate-input[data-classification="select"]
  .formulate-input-element::before {
  content: "";
  width: 0;
  height: 0;
  border: 0.3em solid transparent;
  border-top-color: #cecece;
  border-bottom-width: 0;
  top: 50%;
  margin-top: -0.1em;
  right: 1em;
  position: absolute;
}

.formulate-input-element--yearmonthday {
  option:disabled {
    color: #a8a8a8;
  }
}

.no-error {
  border-color: #cecece !important;
  background-color: transparent !important;
}
</style>
