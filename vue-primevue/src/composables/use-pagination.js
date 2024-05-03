import { reactive, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export function usePagination() {
  const route = useRoute();
  const router = useRouter();
  const paginateState = reactive({
    page: route.query.page ? parseInt(route.query.page) : 1,
    rows: route.query.rows ? parseInt(route.query.rows) : 10,
    // totalRecords: 0,
  });

  watch(route, () => {
    paginateState.page = route.query.page ? parseInt(route.query.page) : 1;
    paginateState.rows = route.query.rows ? parseInt(route.query.rows) : 10;
  });
  const onPageChange = (event) => {
    // paginateState.page = event.page + 1;
    // paginateState.rows = event.rows;
    const query = {
      ...route.query,
      page: event.page + 1,
      rows: event.rows,
    };

    router.push({
      name: route.name,
      query,
    });
  };
  return {
    paginateState: toRefs(paginateState),
    onPageChange,
  };
}
