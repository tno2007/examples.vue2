<script setup lang="ts">
import { computed, reactive, ref } from "@vue/composition-api";
import FormSchema from "@formschema/native";
import schema from "../schema/newsletter.json";
import Ajv from "ajv";

const refFormSchema = ref(null);

const data = reactive({
  schema: {
    type: "object",
    properties: {
      username: {
        title: "First name",
        type: "string",
        minLength: 5,
      },
      password: {
        title: "Password",
        type: "string",
        minLength: 6,
      },
    },
    required: ["username", "password"],
  },
  model: {
    name: "Lyall",
    prop1: "Lorem",
    prop2: "Ipsum",
  },
  ajv: new Ajv({ allErrors: true }),
});

const validate = computed(() => {
  return data.ajv.compile(data.schema);
});

function submit(submission: any) {
  console.log(submission);
}

const validator = (field: any) => {
  console.log("data.ajv", data.ajv);
  console.log("field", field);
  console.log("refFormSchema", refFormSchema);

  // Clear all messages
  field.clearMessages(true);

  if (!validate.value(field.value)) {
    if (!validate || !validate.value || !validate.value.errors) return;

    validate.value.errors.forEach((e) => {
      e.schemaPath;
      console.log("e.schemaPath", e.schemaPath);
    });

    validate.value.errors.forEach(({ schemaPath, message }) => {
      const errorField = field.hasChildren
        ? field.getField(schemaPath) || field
        : field;

      /**
       * Add a message to `errorField`.
       * The first argument is the message string
       * and the second one the message type:
       *    0 - Message Info
       *    1 - Message Success
       *    2 - Message Warning
       *    3 - Message Error
       */
      errorField.addMessage(message, 3);
    });

    // Return `false` to cancel the `input` event
    return Promise.resolve(false);
  }

  // Return `true` to trigger the `input` event
  return Promise.resolve(true);
};
</script>

<template>
  <div class="container py-4">
    <FormSchema
      ref="refFormSchema"
      :schema="schema"
      v-model="data.model"
      :validator="validator"
      @submit.prevent="submit"
    >
      <button type="submit">Subscribe</button>
    </FormSchema>
    <pre>{{ data.model }}</pre>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >Email address</label
      >
      <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="name@example.com"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >Email address</label
      >
      <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="name@example.com"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";

label {
  @extend .form-label !optional;
}

input[type="text"] {
  @extend .form-control !optional;
}
</style>
