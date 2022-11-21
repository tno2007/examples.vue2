<script setup lang="ts">
import Vue from "vue";
</script>

<template>
  <div id="app">
    <!--
<Form />
    -->
    <button @click="Vue.$toast.error('My toast content')">Click me</button>

    <p>&nbsp;</p>

    <button @click="Vue.$toast.clear()">Clear</button>
  </div>
</template>

<style lang="scss">
@import "@/../scss/app.scss";
</style>
