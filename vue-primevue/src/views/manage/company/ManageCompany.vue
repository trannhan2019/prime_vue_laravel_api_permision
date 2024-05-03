<script setup>
import { getList } from "@/api-services/company";
import { useQuery } from "@tanstack/vue-query";
import Nav from "./Nav.vue";
import List from "./List.vue";
import { usePagination } from "@/composables/use-pagination";
import { useSearch } from "@/composables/use-search";

const { paginateState, onPageChange } = usePagination();

const { searchState, onSearch } = useSearch();

const { data: companies, isLoading } = useQuery({
  queryKey: ["company-list", paginateState, searchState],
  queryFn: () =>
    getList({
      page: paginateState.page.value,
      rows: paginateState.rows.value,
      search: searchState.search.value,
    }),
});
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Nav />

        <List
          :companies="companies?.data || []"
          :isLoading="isLoading"
          @onPageChange="onPageChange"
          @onSearch="onSearch"
        />
      </div>
    </div>
  </div>
</template>
