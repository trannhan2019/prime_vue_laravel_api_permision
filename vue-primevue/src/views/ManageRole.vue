<script setup>
import { useQuery } from "@tanstack/vue-query";
import { getInfo } from "@/api-services/auth";
import { useShowHideForm } from "@/composables/use-show-hide-form";

const { data } = useQuery({
  queryKey: ["auth"],
  queryFn: () => {
    return getInfo();
  },
});

const { showForm, onOpenForm, onCloseForm } = useShowHideForm();
</script>
<template>
  <div>
    <h1>Manage Role</h1>
    {{ data?.data }}
  </div>
  <div>
    <p>{{ showForm.newForm }}</p>
    <p>{{ showForm.editForm }}</p>
    <button @click="onOpenForm('editForm')">Add</button>
    <button @click="onCloseForm('editForm')">Close</button>
  </div>
</template>
