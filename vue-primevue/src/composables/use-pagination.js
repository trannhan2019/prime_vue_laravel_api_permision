import { reactive, toRefs } from "vue";

export function usePagination() {
  const paginateState = reactive({
    page: 1,
    rows: 10,
    totalRecords: 0,
  });

  const onPageChange = (event) => {
    paginateState.page = event.page + 1;
    paginateState.rows = event.rows;
  };
  return {
    paginateState: toRefs(paginateState),
    onPageChange,
  };
}
