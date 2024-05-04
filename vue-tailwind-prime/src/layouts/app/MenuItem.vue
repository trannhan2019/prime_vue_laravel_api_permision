<script setup>
defineProps({
  item: Object,
});
</script>

<template>
  <li class="mb-1 group">
    <router-link
      :to="item.to"
      class="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
    >
      <i class="mr-3 text-lg" :class="item.icon"></i>
      <span class="text-sm">{{ item.label }}</span>
    </router-link>
  </li>
</template>
