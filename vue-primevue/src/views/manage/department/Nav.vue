<script setup>
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";

defineProps(["isSelected"]);
defineEmits(["onOpenForm"]);
</script>
<template>
  <Toolbar class="mb-2 mt-2 px-3 py-1">
    <template #start>
      <div class="my-2">
        <Button
          label="New"
          icon="pi pi-plus"
          class="mr-2"
          severity="success"
          @click="$emit('onOpenForm', 'newForm')"
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          :disabled="!isSelected"
          @click="$emit('onOpenForm', 'deleteSelectedForm')"
        />
      </div>
    </template>
  </Toolbar>
</template>
