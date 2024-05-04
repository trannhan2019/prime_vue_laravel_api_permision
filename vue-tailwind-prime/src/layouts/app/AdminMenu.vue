<script setup>
import { ref } from "vue";
import MenuItemVue from "./MenuItem.vue";

const manageData = ref({
  label: "MANAGE",
  items: [
    {
      label: "Manage Company",
      icon: "pi pi-fw pi-home",
      to: "/manage-company",
    },
    { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/dashboard" },
  ],
});
</script>

<template>
  <ul class="mt-4">
    <div>
      <span class="text-gray-400 font-bold">{{ manageData.label }}</span>
      <template v-for="item in manageData.items" :key="item.label">
        <MenuItemVue :item="item" />
      </template>
    </div>
  </ul>
</template>
