<script setup lang="ts">
import { reactive } from "@vue/composition-api";
import FormSchema from "@formschema/native";
import schema from "../schema/newsletter.json";
import Ajv from "ajv";

const data = reactive({
  schema: {
    type: "object",
    properties: {
      username: {
        title: "First name",
        type: "string",
        minLength: 5,
        attrs: {
          class: "form-control",
          a: "b",
        },
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

function submit(submission: any) {
  console.log(submission);
}

const validator = (field: any) => {
  console.log("field", field);

  // Clear all messages
  field.clearMessages(true);

  if (!this.validate(field.value)) {
    this.validate.errors.forEach(({ dataPath, message }) => {
      const errorField = field.hasChildren
        ? field.getField(dataPath) || field
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
      :schema="schema"
      v-model="data.model"
      :validator="validator"
      @submit.prevent="submit"
    >
      <button type="submit">Subscribe</button>
    </FormSchema>
    <pre>{{ data.model }}</pre>
  </div>
</template>

<style lang="scss"></style>
