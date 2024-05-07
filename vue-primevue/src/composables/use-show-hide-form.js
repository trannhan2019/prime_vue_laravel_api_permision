import { reactive, toRefs } from "vue";

export function useShowHideForm() {
  const showForm = reactive({
    newForm: false,
    editForm: false,
    deleteForm: false,
  });

  const onOpenForm = (form) => {
    showForm[form] = true;
  };

  const onCloseForm = (form) => {
    showForm[form] = false;
  };

  return {
    showForm: toRefs(showForm),
    onOpenForm,
    onCloseForm,
  };
}
