<script setup>
import { useSelectedList } from "@/composables/use-selected-list";
import { useShowHideForm } from "@/composables/use-show-hide-form";
import Fieldset from "primevue/fieldset";
import Nav from "./Nav.vue";
import List from "./List.vue";
import AddModal from "./AddModal.vue";
import EditModal from "./EditModal.vue";
import DeleteModal from "./DeleteModal.vue";
import DeleteListModal from "./DeleteListModal.vue";

const { showForm, onOpenForm, onCloseForm, onOpenFormWithData } =
  useShowHideForm();
const { selectState, isSelected, selectedListIds, onResetSelectedList } =
  useSelectedList();
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <Fieldset legend="MANAGE COMPANY">
        <Nav :isSelected="isSelected" @onOpenForm="onOpenForm" />

        <List
          v-model:selectedList="selectState.selectedList.value"
          @onOpenFormWithData="onOpenFormWithData"
        />
      </Fieldset>
    </div>
  </div>
  <!-- Add new form -->
  <AddModal :visible="showForm.newForm" @onCloseForm="onCloseForm('newForm')" />
  <!-- Edit form -->
  <EditModal
    :visible="showForm.editForm"
    @onCloseForm="onCloseForm('editForm')"
    :company="showForm.data"
  />
  <!-- Delete form -->
  <DeleteModal
    :visible="showForm.deleteForm"
    @onCloseForm="onCloseForm('deleteForm')"
    :company="showForm.data"
  />
  <!-- Delete List Modal -->
  <DeleteListModal
    :visible="showForm.deleteSelectedForm"
    :selectedListIds="selectedListIds"
    @onCloseForm="onCloseForm('deleteSelectedForm')"
    @onResetSelectedList="onResetSelectedList"
  />
</template>
