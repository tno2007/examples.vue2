<script lang="ts">
import {
  reactive,
  onMounted,
  defineComponent,
  computed,
  watch,
  ref,
} from "@vue/composition-api";
import Page1 from "../components/Page1.vue";
import Page2 from "../components/Page2.vue";
import Page3 from "../components/Page3.vue";
import PageX from "../components/PageX.vue";

interface INavTab {
  label: string;
  isActive: boolean;
  completed: boolean;
  component: string;
}

export default defineComponent({
  name: "",
  components: {
    Page1,
    Page2,
    Page3,
    PageX,
  },
  props: {},
  setup(props, context) {
    const data = reactive({
      navTabs: [
        {
          label: "Home X",
          isActive: false,
          completed: false,
          component: "Page1",
        },
        {
          label: "Profile X",
          isActive: false,
          completed: false,
          component: "Page2",
        },
        {
          label: "Contact X",
          isActive: false,
          completed: false,
          component: "Page3",
        },
      ] as INavTab[],
    });

    const tabClick = (newIndex: number) => {
      const oldIndex = data.navTabs.findIndex((el) => el.isActive);
      if (oldIndex == newIndex) return;
      console.log("old", oldIndex, "new", newIndex);
      data.navTabs.forEach((el) => (el.isActive = false));
      data.navTabs[newIndex].isActive = true;
    };

    //const childRefs: any = ref([]);
    const refPage1: any = ref({});
    const refPage2: any = ref({});
    const refPage3: any = ref({});

    onMounted(() => {
      data.navTabs[1].isActive = true;
      //console.log("...", childRefs.value[0]);
    });

    // <!-- watchers for complete -->
    watch(
      () => refPage1.value?.completed,
      (newValue, oldValue) => {
        data.navTabs[0].completed = newValue;
      }
    );
    watch(
      () => refPage2.value?.completed,
      (newValue, oldValue) => {
        data.navTabs[1].completed = newValue;
      }
    );
    watch(
      () => refPage3.value?.completed,
      (newValue, oldValue) => {
        data.navTabs[2].completed = newValue;
      }
    );

    // this works, but i will do it over the weekend. just get done for now
    // using a non array components.
    // we must get done, this is a draft!
    /*
    watch(
      () => childRefs,
      (newValue, oldValue) => {
        console.log("www", newValue.value[0]);
        //data.navTabs[0].completed = newValue;
      },
      {
        deep: true,
      }
    );
    */

    const activeComponent = computed(() => {
      const activeTab = data.navTabs.find((el) => el.isActive);
      return activeTab?.component;
    });

    const percentage = computed(() => {
      const completedOnes = data.navTabs.filter((el) => el.completed == true);
      return Math.trunc((completedOnes.length / 3) * 100);
    });

    const onCompletedChanged = (index: number, isComplete: number) => {
      console.log("onCompletedChanged...", index, isComplete);
    };

    return {
      data,
      tabClick,
      activeComponent,
      onCompletedChanged,
      percentage,
      refPage1,
      refPage2,
      refPage3,
    };
  },
});
</script>

<template>
  <!-- TODO -->
  <!--
  # TODO
  - add aria-controls
  - add aria-selected

-->

  <div class="container p-4">
    <div class="progress mb-4">
      <div
        class="progress-bar"
        role="progressbar"
        :style="`width: ${percentage}%`"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {{ percentage }}%
      </div>
    </div>

    <!-- other -->
    <ul class="nav nav-tabs mb-4" role="tablist">
      <li
        class="nav-item"
        role="presentation"
        v-for="(t, index) in data.navTabs"
      >
        <button
          class="nav-link position-relative"
          :class="{ active: t.isActive }"
          type="button"
          role="tab"
          aria-selected="true"
          @click="tabClick(index)"
        >
          {{ t.label }}
          <span
            class="position-absolute top-0 start-50 translate-middle badge x-rounded-pill x-bg-danger text-success"
            v-show="t.completed"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/240px-Eo_circle_green_checkmark.svg.png"
              alt="Completed"
              style="width: 20px"
            />
            <span class="visually-hidden">unread messages</span>
          </span>
        </button>
      </li>
    </ul>

    <!-- tabs -->
    <ul class="nav nav-tabs" id="myTab" role="tablist" v-show="false">
      <li
        class="nav-item"
        role="presentation"
        v-for="(t, index) in data.navTabs"
      >
        <button
          class="nav-link"
          :class="{ active: t.isActive }"
          type="button"
          role="tab"
          aria-selected="true"
          @click="tabClick(index)"
        >
          {{ t.label }}
        </button>
      </li>
    </ul>

    <!-- component(s) - nice to have 
    <transition name="component-fade" mode="out-in">
      <keep-alive>
        <component :is="activeComponent" ref="childRef"></component>
      </keep-alive>
    </transition>-->

    <!-- component(s) - rought draft -->

    <Page1 ref="refPage1" v-show="data.navTabs[0].isActive"></Page1>

    <Page2 ref="refPage2" v-show="data.navTabs[1].isActive"></Page2>

    <Page3 ref="refPage3" v-show="data.navTabs[2].isActive"></Page3>

    <!--  array  -->
    <keep-alive>
      <component
        v-for="t in data.navTabs"
        v-if="t.isActive"
        :is="t.component"
        ref="childRefs"
        @completed-change="onCompletedChanged"
      ></component>
    </keep-alive>

    <!-- hidden 


    <p>&nbsp;</p>

    <span>{{ activeComponent }}</span>

    <p>&nbsp;</p>    
    -->
  </div>
</template>

<style lang="scss">
.completed {
  border-color: #e9ecef #e9ecef #ebecec !important;
  isolation: isolate;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
