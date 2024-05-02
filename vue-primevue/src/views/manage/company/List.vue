<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Tag from "primevue/tag";
import Paginator from "primevue/paginator";
import Button from "primevue/button";

defineProps({
  companies: Object,
  isLoading: Boolean,
});

defineEmits(["onPageChange"]);

const getBadgeSeverity = (companyStatus) => {
  switch (companyStatus) {
    case true:
      return "success";
    case false:
      return "danger";
    default:
      return "info";
  }
};
</script>

<template>
  <DataTable
    dataKey="id"
    :value="companies?.data || []"
    :loading="isLoading"
    scrollable
    scroll-height="500px"
  >
    <template #header>
      <div
        class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
      >
        <h5 class="m-0">Manage Comanies</h5>
        <IconField iconPosition="left" class="block mt-2 md:mt-0">
          <InputIcon class="pi pi-search" />
          <InputText class="w-full sm:w-auto" placeholder="Search..." />
        </IconField>
      </div>
    </template>
    <template #empty> No companies found. </template>
    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
    <Column field="id" header="#ID" headerStyle="width:14%; min-width:10rem;">
    </Column>
    <Column
      field="name"
      header="Name"
      headerStyle="width:14%; min-width:10rem;"
    >
    </Column>

    <Column
      field="is_active"
      header="Status"
      headerStyle="width:14%; min-width:10rem;"
    >
      <template #body="slotProps">
        <span class="p-column-title">Status</span>
        <Tag :severity="getBadgeSeverity(slotProps.data.is_active)">{{
          slotProps.data.is_active ? "Active" : "Inactive"
        }}</Tag>
      </template>
    </Column>
    <Column headerStyle="min-width:10rem;">
      <template #body="slotProps">
        <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded />
        <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded />
      </template>
    </Column>
  </DataTable>

  <Paginator
    v-if="companies?.meta"
    :first="companies?.meta.from - 1"
    :rows="companies?.meta.per_page || 10"
    :totalRecords="companies?.meta.total || 0"
    :rowsPerPageOptions="[10, 20, 30]"
    @page="$emit('onPageChange', $event)"
    class="mt-3"
  />
</template>
