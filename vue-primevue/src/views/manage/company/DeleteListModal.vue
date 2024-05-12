<script setup>
import { computed } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { destroyList } from "@/api-services/company";
import { useToast } from "primevue/usetoast";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const props = defineProps(["visible", "selectedListIds"]);
const emit = defineEmits(["onCloseForm", "onResetSelectedList"]);

const isShow = computed(() => {
  return props.visible.value === true ? true : false;
});

const toast = useToast();

const queryClient = useQueryClient();

const { mutate } = useMutation({
  mutationFn: () => destroyList(props.selectedListIds),
});

const onSubmit = () => {
  mutate(null, {
    onSuccess: () => {
      emit("onCloseForm");
      queryClient.invalidateQueries(["company-list"]);
      emit("onResetSelectedList");
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Delete successfully",
        life: 3000,
      });
    },
    onError: (error) => {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: error.message,
        life: 3000,
      });
    },
  });
};
</script>

<template>
  <Dialog
    :visible="isShow"
    @update:visible="$emit('onCloseForm')"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
  >
    <div class="flex align-items-center justify-content-center">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span
        >Are you sure you want to delete the selected list company?
        {{ props.selectedListIds }}
      </span>
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        text
        @click="$emit('onCloseForm')"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        text
        @click="onSubmit"
      />
    </template>
  </Dialog>
</template>
