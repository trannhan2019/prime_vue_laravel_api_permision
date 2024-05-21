<script setup>
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
  {
    label: "Home",
    items: [
      { label: "Home", icon: "pi pi-fw pi-home", to: "/" },
      { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/dashboard" },
      {
        label: "Manage Company",
        icon: "pi pi-fw pi-home",
        to: "/manage-company",
      },
      {
        label: "Manage Department",
        icon: "pi pi-fw pi-table",
        to: "/manage-department",
      },
      {
        label: "Manage Role",
        icon: "pi pi-fw pi-home",
        to: "/manage-role",
      },
    ],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
