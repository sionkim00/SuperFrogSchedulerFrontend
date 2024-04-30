<template>
  <div>
    <h1>Find SuperFrog Students</h1>
    <form @submit.prevent="fetchStudents">
      <input v-model="searchCriteria.firstName" placeholder="First Name" />
      <input v-model="searchCriteria.lastName" placeholder="Last Name" />
      <input v-model="searchCriteria.phone" placeholder="Phone Number" />
      <input v-model="searchCriteria.email" placeholder="Email" />
      <button type="submit">Search</button>
    </form>
    <div v-if="students.length > 0">
      <label for="sort">Sort by:</label>
      <select id="sort" v-model="sortKey" @change="sortResults">
        <option value="lastName">Last Name</option>
        <option value="firstName">First Name</option>
        <option value="email">Email</option>
      </select>
      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.firstName }}</td>
            <td>{{ student.lastName }}</td>
            <td>{{ student.phone }}</td>
            <td>{{ student.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>
        No matching SuperFrog Students found. Please modify your search
        criteria.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const searchCriteria = ref({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
});
const students = ref([]);
const sortKey = ref("lastName");

async function fetchStudents() {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/spirit-directors/superfrog-students/search`,
      {
        params: {
          ...searchCriteria.value,
        },
      }
    );
    console.log(response);
    students.value = response.data.data || [];
    sortResults();
  } catch (error) {
    console.error("Failed to search students:", error);
  }
}

function sortResults() {
  students.value.sort((a, b) =>
    a[sortKey.value].localeCompare(b[sortKey.value])
  );
}
</script>

<style>
/* Add your styles here */
input,
select,
button {
  margin: 5px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>
