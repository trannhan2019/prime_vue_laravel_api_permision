<script setup>
import { ref } from "vue";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import { getList, show } from "@/api-services/company";
import { usePagination } from "@/composables/use-pagination";
import { useSearch } from "@/composables/use-search";
import { useShowHideForm } from "@/composables/use-show-hide-form";
import Fieldset from "primevue/fieldset";
import Nav from "./Nav.vue";
import List from "./List.vue";
import Add from "./Add.vue";
import Edit from "./Edit.vue";

const companyID = ref(1);

const { paginateState, onPageChange } = usePagination();

const { searchState, onSearch } = useSearch();

const { showForm, onOpenForm, onCloseForm } = useShowHideForm();
// const openNewForm = computed(() => showForm.newForm.value === true ? true : false);

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

const { data: company } = useQuery({
  queryKey: ["company", companyID],
  queryFn: () => show(companyID.value),
});

const openEditFormWithID = (id) => {
  companyID.value = id;
  onOpenForm("editForm");
};
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <Fieldset legend="MANAGE COMPANY">
        <Nav @onSearch="onSearch" @onOpenForm="onOpenForm('newForm')" />

        <List
          :companies="companies?.data || []"
          @onPageChange="onPageChange"
          @onOpenForm="onOpenForm('editForm')"
          @openEditFormWithID="openEditFormWithID"
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
    :company="company?.data || {}"
  />
</template>
