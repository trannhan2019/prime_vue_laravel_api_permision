<script setup>
import { useAuth } from "@/stores/auth";

const store = useAuth();
</script>
<template>
  <div>
    <h1>Dashboard</h1>
    <button @click="getUser">Get User</button>
    <h3>{{ store.authData }}</h3>
  </div>
</template>
