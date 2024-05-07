<script setup>
import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import { getList } from "@/api-services/company";
import { usePagination } from "@/composables/use-pagination";
import { useSearch } from "@/composables/use-search";
import Fieldset from "primevue/fieldset";
import Nav from "./Nav.vue";
import List from "./List.vue";

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
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <Fieldset legend="MANAGE COMPANY">
        <Nav @onSearch="onSearch" />
        <List :companies="companies?.data || []" @onPageChange="onPageChange" />
      </Fieldset>
    </div>
  </div>
</template>
