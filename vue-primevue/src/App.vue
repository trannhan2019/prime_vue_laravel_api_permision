<script setup>
import { RouterView } from "vue-router";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import Toast from "primevue/toast";
</script>

<template>
  <Toast />
  <RouterView />
  <VueQueryDevtools />
</template>
