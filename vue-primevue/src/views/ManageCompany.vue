<script setup>
import { ref, onMounted } from "vue";
import { getList } from "@/api-services/company";

const companyList = ref([]);

onMounted(async () => {
  const res = await getList();
  console.log(res.data);
});
</script>
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Manage Company</h5>
      </div>
    </div>
  </div>
</template>
