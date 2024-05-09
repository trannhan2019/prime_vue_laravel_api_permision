<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Paginator from "primevue/paginator";
import Button from "primevue/button";
import Card from "primevue/card";

defineProps({
  companies: Object,
});

defineEmits([
  "onPageChange",
  "onSearch",
  "onOpenFormWithID",
  "openEditFormWithID",
  "openDeleteFormWithID",
]);

// const search = ref("");

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
  <Card>
    <template #content>
      <DataTable
        dataKey="id"
        :value="companies?.data || []"
        :striped-rows="true"
      >
        <template #empty> No companies found. </template>
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column
          field="id"
          header="#ID"
          headerStyle="width:14%; min-width:10rem;"
        >
        </Column>
        <Column
          field="name"
          header="Name"
          headerStyle="width:14%; min-width:10rem;"
        >
        </Column>

        <Column
          field="alias"
          header="Alias"
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
            <Button
              icon="pi pi-pencil"
              class="mr-2"
              severity="success"
              rounded
              @click="$emit('onOpenFormWithID', 'editForm', slotProps.data.id)"
            />
            <Button
              icon="pi pi-trash"
              class="mt-2"
              severity="warning"
              rounded
              @click="
                $emit('onOpenFormWithID', 'deleteForm', slotProps.data.id)
              "
            />
          </template>
        </Column>
      </DataTable>

      <Paginator
        v-if="companies?.meta?.total > 0"
        :first="companies?.meta.from - 1 || 0"
        :rows="companies?.meta.per_page || 10"
        :totalRecords="companies?.meta.total || 0"
        :rowsPerPageOptions="[10, 20, 30]"
        @page="$emit('onPageChange', $event)"
        class="mt-3"
      />
    </template>
  </Card>
</template>

<style scoped>
/* .p-component-overlay {
  height: 500px;
} */
</style>
