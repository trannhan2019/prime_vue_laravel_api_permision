import { reactive, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useSearch() {
  const route = useRoute();
  const router = useRouter();
  const searchState = reactive({
    search: route.query.search ? route.query.search : "",
  });
  watch(route, () => {
    searchState.search = route.query.search ? route.query.search : "";
  });
  const onSearch = (value) => {
    const query = {
      ...route.query,
      page: 1,
      search: value,
    };
    router.push({
      name: route.name,
      query,
    });
  };
  return {
    searchState: toRefs(searchState),
    onSearch,
  };
}
