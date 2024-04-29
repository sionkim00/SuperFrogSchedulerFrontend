<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <aside class="sidebar">
      <div class="links">
        <RouterLink to="/" class="home-link">Home</RouterLink>
      </div>

      <div class="tab-group">
        <span class="tab-title">Spirit Director</span>
        <div class="links">
          <RouterLink to="/spirit-director/view-students"
            >View All Students</RouterLink
          >
          <RouterLink to="/spirit-director/find-students"
            >Find Students</RouterLink
          >
          <RouterLink to="/spirit-director/view-spirit-team-calendar"
            >View Spirit Team Calendar</RouterLink
          >
          <RouterLink to="/spirit-director/generate-honorarium"
            >Generate Honorarium</RouterLink
          >
          <RouterLink to="/spirit-director/generate-performance-report"
            >Generate Performance Report</RouterLink
          >
        </div>
      </div>

      <div class="tab-group">
        <span class="tab-title">SuperFrog Student</span>
        <div class="links">
          <RouterLink to="/superfrog-student/edit-superfrog-profile"
            >Edit SuperFrog Profile</RouterLink
          >
        </div>

        <div class="tab-group appearance-request">
        <span class="tab-title">Appearance Request</span>
        <div class="links">
          <RouterLink to="/view-request">Request A SuperFrog Appearance</RouterLink>
          <RouterLink to="/view-request">View All Appearance Requests</RouterLink>
          <RouterLink to="/view-request">Find All Appearance Requests</RouterLink>
          

  
        </div>
      </div>

      </div>

      <div class="tab-group">
        <span class="tab-title">Customer</span>
        <div class="links">
          <RouterLink to="/customer/request-appearance"
            >Request Appearance</RouterLink
          >
        </div>
      </div>
    </aside>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: nowrap; /* Ensures sidebar and main content are on the same row */
}

.sidebar {
  position: fixed; /* Fix sidebar position */
  top: 20px; /* Align to the top */
  left: 20px; /* Align to the left side of the viewport */
  width: 250px;
  background-color: var(--color-background-soft);
  padding: 20px;
  height: 85vh; /* Full height of the viewport */
  box-shadow: 0 0 10px 0 grey;
  border-radius: 10px;
  overflow-y: auto; /* Adds scroll to sidebar if content is too long */
}

main {
  flex-grow: 1;
  padding: 20px;
  margin-left: 270px; /* Add margin to prevent overlap with sidebar */
}

.tab-group {
  margin-bottom: 20px;
}

.tab-title {
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

.links {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.home-link {
  margin-bottom: 20px;
  font-weight: bold;
}
</style>
