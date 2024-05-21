<script setup>
import { ref } from "vue";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import { usePagination } from "@/composables/use-pagination";
import { useSearch } from "@/composables/use-search";
import { getList } from "@/api-services/department";

defineEmits(["onOpenFormWithData"]);

const { paginateState, onPageChange } = usePagination();
const { searchState, onSearch } = useSearch();

const { data: departments } = useQuery({
  queryKey: ["department-list", paginateState, searchState],
  queryFn: () =>
    getList({
      page: paginateState.page.value,
      rows: paginateState.rows.value,
      search: searchState.search.value,
    }),
  placeholderData: keepPreviousData,
});

const search = ref("");
const selectedDepartmentList = defineModel("selectedList");
</script>

<template></template>
