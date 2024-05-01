<script setup>
import { usePermission } from "@/composables/permission";
import AppAdminMenu from "./AppAdminMenu.vue";
import AppManageMenu from "./AppManageMenu.vue";
import AppUserMenu from "./AppUserMenu.vue";

const { hasRole } = usePermission();
</script>

<template>
  <AppAdminMenu v-if="hasRole('admin')" />
  <AppManageMenu v-else-if="hasRole('manager')" />
  <AppUserMenu v-else />
</template>

<style lang="scss" scoped></style>
