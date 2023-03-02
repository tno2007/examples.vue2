<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  reactive,
  ref,
} from "vue";
import { IModel } from "../../../common/typings/explore";
import collections from "../../../data/explore/collections";

export default defineComponent({
  name: "Page8Objectives",
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

    onMounted(async () => {
      await nextTick();
      data.model = props.modelProp;
    });

    return { formRef, collections, data, handleSubmit };
  },
});
</script>

<template>
  <div>
    <FormulateForm v-model="data.model" @submit="handleSubmit" ref="formRef">
      <br />
      <p><b>1. Internationalise your wealth</b></p>
      <p>
        It&#39;s not necessary to leave South Africa to secure your family&#39;s
        financial future. Offset political and currency risk by taking advantage
        of the diversification benefits of global markets by investing offshore.
      </p>
      <p>
        You, as a South African resident, can externalise your wealth by
        transferring Rands into a foreign currency of choice post various tax
        and forex compliance processes. In turn, you may open a foreign bank
        account, investment account and/or foreign investment structure,
        depending on your specific needs.
      </p>
      <p>
        Careful consideration needs to be given to each individual or
        family&#39;s circumstances as there is complexity in putting together a
        well thought out international financial plan. An experienced
        multi-jurisdiction specialist will be able to advise you accordingly.
        Factors to consider can be found in our recommendation.
      </p>
      <p><b>2. Obtain another citizenship</b></p>
      <p>
        We have over two decades of experience in citizenship and immigration.
        Our team will look at your family tree to determine whether you have any
        claims to a second citizenship through ancestry and investigate whether
        your goals align with any citizenship and residency-by-investment
        offerings available worldwide.
      </p>
      <p>
        Exploring your options will empower you to make an informed decision,
        whether you choose to remain in South Africa with a plan B in your
        pocket, consider a move abroad, and/or to add further credibility to
        your offshore financial plan.
      </p>
      <p><b>3. Immigrate</b></p>
      <p>
        Our team of experienced professionals will confirm which jurisdiction
        you may be eligible to immigrate to and which jurisdiction will be
        suitable for you and your family, relative to your circumstances. We
        will assist, guide, and facilitate the process with you, making the
        transition less onerous.
      </p>
      <p><b>4. Study Abroad</b></p>
      <p>
        Our Study Abroad advisors are experts in international education. The
        team will help you understand the practical implications of your
        child&#39;s preferred field of study, the institutions available and the
        cost to educate your child. Your Explore report will outline in-demand
        skills in target jurisdictions of choice and the lifestyle that they may
        support.
      </p>

      <FormulateInput type="group" name="Explore">
        <FormulateInput
          type="textarea"
          name="PrimaryObjective"
          label="Is there any additional information you believe we need to be aware of?"
          rows="5"
        />
      </FormulateInput>
    </FormulateForm>
  </div>
</template>
