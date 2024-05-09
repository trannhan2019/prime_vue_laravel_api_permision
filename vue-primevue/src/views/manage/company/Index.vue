<script setup>
import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import { getList } from "@/api-services/company";
import { usePagination } from "@/composables/use-pagination";
import { useSearch } from "@/composables/use-search";
import { useShowHideForm } from "@/composables/use-show-hide-form";
import Fieldset from "primevue/fieldset";
import Nav from "./Nav.vue";
import List from "./List.vue";
import Add from "./Add.vue";
import Edit from "./Edit.vue";
import Delete from "./Delete.vue";

const { paginateState, onPageChange } = usePagination();

const { searchState, onSearch } = useSearch();

const { showForm, onOpenForm, onCloseForm, onOpenFormWithID } =
  useShowHideForm();

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
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <Fieldset legend="MANAGE COMPANY">
        <Nav @onSearch="onSearch" @onOpenForm="onOpenForm('newForm')" />

        <List
          :companies="companies?.data || []"
          @onPageChange="onPageChange"
          @onOpenFormWithID="onOpenFormWithID"
        />
      </Fieldset>
    </div>
  </div>
  <!-- Add new form -->
  <Add :visible="showForm.newForm" @onCloseForm="onCloseForm('newForm')" />
  <!-- Edit form -->
  <Edit
    :visible="showForm.editForm"
    @onCloseForm="onCloseForm('editForm')"
    :companyId="showForm.id"
  />
  <!-- Delete form -->
  <Delete
    :visible="showForm.deleteForm"
    @onCloseForm="onCloseForm('deleteForm')"
    :companyId="showForm.id"
  />
</template>
