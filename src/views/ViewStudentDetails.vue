<template>
  <div>
    <h1>Student Details</h1>
    <table border="1">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ studentDetails.firstName }}</td>
          <td>{{ studentDetails.lastName }}</td>
          <td>{{ studentDetails.phone }}</td>
          <td>{{ studentDetails.address }}</td>
          <td>{{ studentDetails.email }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Signed-Up Appearances</h2>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type of Event</th>
          <th>Event Address</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="appearance in studentDetails.signedUpAppearances"
          :key="appearance.id">
          <td>{{ appearance.id }}</td>
          <td>{{ appearance.typeOfEvent }}</td>
          <td>{{ appearance.eventAddress }}</td>
          <td>{{ appearance.date }}</td>
          <td>{{ appearance.appearanceRequestStatus }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Completed Appearances</h2>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type of Event</th>
          <th>Event Address</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="appearance in studentDetails.completedAppearances"
          :key="appearance.id">
          <td>{{ appearance.id }}</td>
          <td>{{ appearance.typeOfEvent }}</td>
          <td>{{ appearance.eventAddress }}</td>
          <td>{{ appearance.date }}</td>
          <td>{{ appearance.appearanceRequestStatus }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const studentDetails = ref({
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  email: "",
  signedUpAppearances: [],
  completedAppearances: [],
});

const fetchStudentDetails = async (id) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/spirit-directors/superfrog-students/${id}/details`
    );
    if (response.data && response.data.data) {
      studentDetails.value = {
        ...response.data.data,
        address: response.data.data.address || "N/A",
      };
    }
  } catch (error) {
    console.error("Failed to fetch student details:", error);
  }
};

onMounted(() => {
  fetchStudentDetails(route.params.id);
});

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      fetchStudentDetails(newId);
    }
  }
);
</script>

<style>
/* Add styles for your tables and page layout here */
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
