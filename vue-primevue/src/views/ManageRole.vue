<script setup>
import { useQuery } from "@tanstack/vue-query";
import { getInfo } from "@/api-services/auth";

const { data } = useQuery({
  queryKey: ["auth"],
  queryFn: () => {
    return getInfo();
  },
});
</script>
<template>
  <div>
    <h1>Manage Role</h1>
    {{ data?.data }}
  </div>
</template>
