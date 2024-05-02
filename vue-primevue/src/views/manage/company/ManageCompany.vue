<script setup>
import { ref, onMounted } from "vue";
import { getList } from "@/api-services/company";
import { useQuery } from "@tanstack/vue-query";
import Nav from "./Nav.vue";
import List from "./List.vue";
import { usePagination } from "@/composables/use-pagination";

const { paginateState, onPageChange } = usePagination();

const { data: companies, isLoading } = useQuery({
  queryKey: ["company-list", paginateState],
  queryFn: () =>
    getList({
      page: paginateState.page.value,
      item_per_page: paginateState.rows.value,
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
        />
      </div>
    </div>
  </div>
</template>
