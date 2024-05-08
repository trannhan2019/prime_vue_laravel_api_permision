<script setup>
import { computed } from "vue";
import Dialog from "primevue/dialog";

const props = defineProps({
  visible: Object,
  company: Object,
});

const emit = defineEmits(["onCloseForm"]);

const isShow = computed(() => {
  return props.visible.value === true ? true : false;
});
</script>

<template>
  <Dialog
    :visible="isShow"
    @update:visible="$emit('onCloseForm')"
    :style="{ width: '450px' }"
    header="Edit a company"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label>{{ company.name }}</label>
      <!-- <InputText v-model="name" autofocus :invalid="!!errors.name" />
        <InputError :msg="errors.name" /> -->
    </div>
  </Dialog>
</template>
