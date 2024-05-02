<script setup>
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
</script>
<template>
  <Toolbar class="mb-4">
    <template v-slot:start>
      <div class="my-2">
        <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" />
        <Button label="Delete" icon="pi pi-trash" severity="danger" />
      </div>
    </template>
  </Toolbar>
</template>
