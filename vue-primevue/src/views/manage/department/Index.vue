<script setup>
import { useSelectedList } from "@/composables/use-selected-list";
import { useShowHideForm } from "@/composables/use-show-hide-form";

import Fieldset from "primevue/fieldset";

import Nav from "./Nav.vue";
import List from "./List.vue";

const { showForm, onOpenForm, onCloseForm, onOpenFormWithData } =
  useShowHideForm();
const { selectState, isSelected, selectedListIds, onResetSelectedList } =
  useSelectedList();
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <Fieldset legend="MANAGE DEPARTMENT">
        <Nav :isSelected="isSelected" @onOpenForm="onOpenForm" />

        <List
          v-model:selectedList="selectState.selectedList.value"
          @onOpenFormWithData="onOpenFormWithData"
        />
      </Fieldset>
    </div>
  </div>
</template>
