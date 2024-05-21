<script setup>
import { ref } from "vue";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";

import { getList } from "@/api-services/company";
import { usePagination } from "@/composables/use-pagination";
import { useSearch } from "@/composables/use-search";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Paginator from "primevue/paginator";
import Button from "primevue/button";
import Card from "primevue/card";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Toolbar from "primevue/toolbar";

// defineProps({
//   companies: Object,
// });

defineEmits(["onOpenFormWithData"]);

const { paginateState, onPageChange } = usePagination();
const { searchState, onSearch } = useSearch();

const { data: companies } = useQuery({
  queryKey: ["company-list", paginateState, searchState],
  queryFn: () =>
    getList({
      page: paginateState.page.value,
      rows: paginateState.rows.value,
      search: searchState.search.value,
    }),
  placeholderData: keepPreviousData,
});

const search = ref("");
const selectedCompanyList = defineModel("selectedList");

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
  <Toolbar class="mb-3 mt-2">
    <template #start>
      <div
        class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
      >
        <form @submit.prevent="onSearch(search)">
          <IconField iconPosition="left" class="block mt-2 md:mt-0">
            <InputIcon class="pi pi-search" />
            <InputText
              class="w-full sm:w-auto"
              placeholder="Search..."
              v-model="search"
            />
          </IconField>
        </form>
      </div>
    </template>
  </Toolbar>
  <Card>
    <template #content>
      <DataTable
        dataKey="id"
        :value="companies?.data.data || []"
        v-model:selection="selectedCompanyList"
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
              @click="$emit('onOpenFormWithData', 'editForm', slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="mt-2"
              severity="warning"
              rounded
              @click="$emit('onOpenFormWithData', 'deleteForm', slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>

      <Paginator
        v-if="companies?.data.meta.total > 0"
        :first="companies?.data.meta.from - 1 || 0"
        :rows="companies?.data.meta.per_page || 10"
        :totalRecords="companies?.data.meta.total || 0"
        :rowsPerPageOptions="[10, 20, 30]"
        @page="onPageChange($event)"
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
