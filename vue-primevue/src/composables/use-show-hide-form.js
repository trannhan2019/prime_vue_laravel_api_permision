import { reactive, toRefs } from "vue";

export function useShowHideForm() {
  const showForm = reactive({
    data: null,
    newForm: false,
    editForm: false,
    deleteForm: false,
    deleteSeletedForm: false,
  });

  const onOpenForm = (form) => {
    showForm[form] = true;
  };

  const onCloseForm = (form) => {
    showForm[form] = false;
  };

  const onOpenFormWithData = (form, value) => {
    showForm[form] = true;
    showForm.data = value;
  };

  return {
    showForm: toRefs(showForm),
    onOpenForm,
    onCloseForm,
    onOpenFormWithData,
  };
}
