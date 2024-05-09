<script setup>
import { computed, watch } from "vue";
import Dialog from "primevue/dialog";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { useForm } from "vee-validate";
import InputText from "primevue/inputtext";
import InputError from "@/components/InputError.vue";
import Button from "primevue/button";
import InputSwitch from "primevue/inputswitch";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/vue-query";
import { show, update } from "@/api-services/company";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  visible: Object,
  companyId: Object,
});

const emit = defineEmits(["onCloseForm"]);

const isShow = computed(() => {
  return props.visible.value === true ? true : false;
});

const toast = useToast();

const queryClient = useQueryClient();

const { data: company } = useQuery({
  queryKey: ["company", props.companyId],
  queryFn: () => show(props.companyId.value),
  placeholderData: keepPreviousData,
  enabled: !!props.companyId,
  retry: 0,
});

const { mutate } = useMutation({
  mutationFn: (values) => update(props.companyId.value, values),
});

const schema = toTypedSchema(
  zod.object({
    name: zod.string().min(3),
    alias: zod.string().min(3),
    is_active: zod.boolean().default(true),
  })
);

const { defineField, handleSubmit, errors, resetForm, setErrors, setValues } =
  useForm({
    validationSchema: schema,
  });

const [name] = defineField("name");
const [alias] = defineField("alias");
const [is_active] = defineField("is_active");

const onSubmit = handleSubmit((values) => {
  mutate(values, {
    onSuccess: () => {
      emit("onCloseForm");
      queryClient.invalidateQueries(["company-list"]);
      resetForm();
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Edit successfully",
        life: 3000,
      });
    },
    onError: (error) => {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Failed to add",
        life: 3000,
      });
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    },
  });
});

watch(company, () => {
  // setFieldValue("name", company.name);
  setValues(company?.value.data);
  // console.log(props.companyId.value);
  // console.log(company);
});

// onMounted(() => {
//   if (company?.value) {
//     setValues(company?.value?.data);
//   }
// });
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
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label>Name</label>
        <InputText v-model="name" autofocus :invalid="!!errors.name" />
        <InputError :msg="errors.name" />
      </div>

      <div class="field">
        <label>Alias</label>
        <InputText v-model="alias" :invalid="!!errors.alias" />
        <InputError :msg="errors.alias" />
      </div>

      <div class="flex align-items-center gap-3">
        <label>Status</label>
        <InputSwitch v-model="is_active" />
      </div>

      <div class="flex justify-content-end gap-2 mt-4">
        <Button
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
      </div>
    </form>
  </Dialog>
</template>
