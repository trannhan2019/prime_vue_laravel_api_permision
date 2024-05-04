<script setup>
import { ref } from "vue";
import Sidenav from "./Sidenav.vue";
import Navbar from "./Navbar.vue";

const isOpenSidenav = ref(false);

function toggleSidenav() {
  isOpenSidenav.value = !isOpenSidenav.value;
}
function closeSidenav() {
  isOpenSidenav.value = true;
}
</script>

<template>
  <div class="text-gray-800">
    <Sidenav :isOpenSidenav="isOpenSidenav" @closeSidenav="closeSidenav" />
    <main
      class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main"
      :class="{ 'md:w-full md:ml-0': isOpenSidenav }"
    >
      <Navbar @toggleSidenav="toggleSidenav" :isOpenSidenav="isOpenSidenav" />
      <div class="p-6">Content</div>
    </main>
  </div>
</template>
