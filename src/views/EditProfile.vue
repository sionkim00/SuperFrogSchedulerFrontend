<template>
  <div>
    <h1>Edit SuperFrog Student Profile</h1>
    <input
      v-model="studentId"
      placeholder="Enter SuperFrog Student ID"
      @change="fetchStudentDetails" />
    <button @click="fetchStudentDetails">Load Details</button>

    <div v-if="studentDetails">
      <h2>Student Details</h2>
      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input v-model="studentDetails.firstName" /></td>
            <td><input v-model="studentDetails.lastName" /></td>
            <td><input v-model="studentDetails.email" /></td>
            <td><input v-model="studentDetails.phone" /></td>
            <td><input v-model="studentDetails.address" /></td>
          </tr>
        </tbody>
      </table>
      <button @click="updateStudentDetails">Update Details</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const studentId = ref("");
const studentDetails = ref(null);

const fetchStudentDetails = async () => {
  if (!studentId.value) return;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/spirit-directors/superfrog-students/${
        studentId.value
      }/details`
    );
    if (response.data.flag && response.data.data) {
      studentDetails.value = response.data.data;
    } else {
      alert("Failed to load details.");
    }
  } catch (error) {
    console.error("Error fetching student details:", error);
    alert("Error fetching details. Check console for more information.");
  }
};

const updateStudentDetails = async () => {
  if (!studentDetails.value) return;
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/superfrog-students/${studentId.value}`,
      {
        firstName: studentDetails.value.firstName,
        lastName: studentDetails.value.lastName,
        email: studentDetails.value.email,
        phone: studentDetails.value.phone,
        address: studentDetails.value.address,
      }
    );
    if (response.data.flag) {
      alert("Details updated successfully!");
    } else {
      alert("Failed to update details.");
    }
  } catch (error) {
    console.error("Error updating student details:", error);
    alert("Error updating details. Check console for more information.");
  }
};
</script>

<style>
/* Styles for your tables and inputs */
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
input {
  width: 100%;
  padding: 6px 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
