<script setup>
import AdminMenu from "./AdminMenu.vue";

defineProps({
  isOpenSidenav: Boolean,
});
defineEmits(["closeSidenav"]);
</script>

<template>
  <!--sidenav -->
  <div
    class="fixed left-0 top-0 w-64 h-full bg-white p-4 z-50 sidebar-menu transition-transform"
    :class="{ '-translate-x-full': isOpenSidenav }"
  >
    <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">
      <h2 class="font-bold text-2xl">
        LOREM
        <span class="bg-[#f84525] text-white px-2 rounded-md">IPSUM</span>
      </h2>
    </a>
    <AdminMenu />
  </div>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"
    :class="{ hidden: isOpenSidenav }"
    @click="$emit('closeSidenav')"
  ></div>
  <!-- end sidenav -->
</template>
