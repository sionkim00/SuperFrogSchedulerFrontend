<template>
  <div>
    <h1>This is a view student page</h1>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Account Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.firstName }}</td>
          <td>{{ student.lastName }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.isActive ? "Active" : "Inactive" }}</td>
          <td>
            <!-- View button -->
            <router-link :to="`/view-students/${student.id}/view`">
              <button>👁️ View</button>
            </router-link>
            <!-- Modify button -->
            <router-link :to="`/view-students/${student.id}/modify`">
              <button>✏️ Modify</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const students = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/spirit-directors/superfrog-students"
    );
    if (response.data && response.data.data) {
      students.value = response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch students:", error);
  }
});
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 100px;
}
th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>
