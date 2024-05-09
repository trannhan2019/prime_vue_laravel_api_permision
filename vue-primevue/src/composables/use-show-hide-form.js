import { reactive, toRefs } from "vue";

export function useShowHideForm() {
  const showForm = reactive({
    id: 1,
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

  const onOpenFormWithID = (form, id) => {
    showForm[form] = true;
    showForm.id = id;
  };

  return {
    showForm: toRefs(showForm),
    onOpenForm,
    onCloseForm,
    onOpenFormWithID,
  };
}
