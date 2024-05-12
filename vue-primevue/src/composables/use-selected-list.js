import { toRefs, reactive, computed } from "vue";

export function useSelectedList() {
  const selectState = reactive({
    selectedList: [],
  });

  const selectedListIds = computed(() => {
    if (selectState.selectedList.length > 0) {
      return selectState.selectedList.map((item) => item.id);
    }
    return [];
  });

  const isSelected = computed(() => {
    if (selectState.selectedList.length > 0) {
      return true;
    }
    return false;
  });

  const onResetSelectedList = () => {
    selectState.selectedList = [];
  };

  return {
    selectState: toRefs(selectState),
    selectedListIds,
    isSelected,
    onResetSelectedList,
  };
}
