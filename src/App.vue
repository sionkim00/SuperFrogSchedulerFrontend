<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/view-students">View All Students</RouterLink>
      <RouterLink to="/find-students">Find Students</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
