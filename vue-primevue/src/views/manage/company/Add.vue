<script setup>
import Dialog from "primevue/dialog";
import { computed } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { useForm } from "vee-validate";
import InputText from "primevue/inputtext";
import InputError from "@/components/InputError.vue";
import Button from "primevue/button";

const props = defineProps({
  visible: Object,
});
defineEmits(["onCloseForm"]);

const isShow = computed(() => {
  return props.visible.value === true ? true : false;
});

const schema = toTypedSchema(
  zod.object({
    name: zod.string().min(3),
    alias: zod.string().min(3),
    // is_active: zod.boolean().default(true),
  })
);
const { defineField, handleSubmit, errors, setFieldError } = useForm({
  validationSchema: schema,
});
const [name] = defineField("name");
const [alias] = defineField("alias");
const [is_active] = defineField("is_active");

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <!-- <form @submit.prevent="onSubmit"> -->
  <Dialog
    :visible="isShow"
    @update:visible="$emit('onCloseForm')"
    :style="{ width: '450px' }"
    header="Add new company"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label>Name</label>
      <InputText
        v-model.trim="name"
        required="true"
        autofocus
        :invalid="!!errors.name"
      />
      <InputError :msg="errors.name" />
    </div>

    <div class="field">
      <label>Alias</label>
      <InputText
        v-model.trim="alias"
        required="true"
        :invalid="!!errors.alias"
      />
      <InputError :msg="errors.alias" />
    </div>
    <template #footer
      ><Button
        @click="$emit('onCloseForm')"
        label="Cancel"
        icon="pi pi-times"
        severity="secondary"
      />
      <Button
        type="submit"
        severity="success"
        label="Save"
        icon="pi pi-check"
      />
      <Button
        severity="success"
        label="Test"
        icon="pi pi-check"
        @click="onSubmit"
      />
    </template>
  </Dialog>
  <!-- </form> -->
</template>
