<script setup>
defineProps({
  msg: {
    type: String,
  },
});
</script>

<template>
  <div v-show="msg">
    <p class="p-error font-italic">
      {{ msg }}
    </p>
  </div>
</template>
