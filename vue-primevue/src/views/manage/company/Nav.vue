<script setup>
import { ref } from "vue";

import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Toolbar from "primevue/toolbar";

const search = ref("");
defineEmits(["onSearch", "onOpenForm"]);
</script>
<template>
  <Toolbar class="mb-3 mt-2">
    <template #start>
      <div class="my-2">
        <Button label="New" icon="pi pi-plus" class="mr-2" severity="success" @click="$emit('onOpenForm','newForm')" />
        <Button label="Delete" icon="pi pi-trash" severity="danger" />
      </div>
    </template>
    <template #end>
      <form @submit.prevent="$emit('onSearch', search)">
        <IconField iconPosition="left" class="block mt-2 md:mt-0">
          <InputIcon class="pi pi-search" />
          <InputText
            class="w-full sm:w-auto"
            placeholder="Search..."
            v-model="search"
          />
        </IconField>
      </form>
    </template>
  </Toolbar>
</template>
