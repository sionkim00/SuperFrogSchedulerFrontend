<template>
  <div>
    <h1>Edit Appearance Request</h1>
    <input
      v-model="requestId"
      placeholder="Enter Appearance Request ID"
      @change="fetchAppreanceRequestDetails" />
    <button @click="fetchAppearanceRequestDetails">Load Details</button>

    <div v-if="appearanceRequestDetails">
      <h2>Appearance Request Details</h2>
      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Type of Event</th>
            <th>Event Title</th>
            <th>Name of Orgainization</th>
            <th>Event Address</th>
            <th>Wheather on TCU campus or not</th>
            <th>Speacial Instructions</th>
            <th>Any Expenses of Benefits</th>
            <th>Any Outside Orgainizations Involved</th>
            <th>Detailed Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input v-model="appearanceRequestDetails.firstName" /></td>
            <td><input v-model="appearanceRequestDetails.lastName" /></td>
            <td><input v-model="appearanceRequestDetails.email" /></td>
            <td><input v-model="appearanceRequestDetails.phone" /></td>
            <td><input v-model="appearanceRequestDetails.eventAddress" /></td>
            <td><input v-model="appearanceRequestDetails.typeOfEvent" /></td>
            <td><input v-model="appearanceRequestDetails.eventTitle" /></td>
            <td>
              <input
                v-model="
                  appearanceRequestDetails.otherOrgainizationsInvolved
                " />
            </td>
            <td><input v-model="appearanceRequestDetails.nameOfOrg" /></td>
            <td><input v-model="appearanceRequestDetails.isOnCampus" /></td>
            <td>
              <input v-model="appearanceRequestDetails.specialInstructions" />
            </td>
            <td>
              <input v-model="appearanceRequestDetails.expensesOrBenefits" />
            </td>
            <td>
              <input
                v-model="appearanceRequestDetails.detailedEventDescription" />
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="updateAppearanceRequestDetails">Update Details</button>
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
      `${import.meta.env.VITE_API_URL}/customers/appearance-request/${
        studentId.value
      }/details`
    );
    if (response.data.flag && response.data.data) {
      studentDetails.value = response.data.data;
    } else {
      alert("Failed to load details.");
    }
  } catch (error) {
    console.error("Error fetching appearanceRequest details:", error);
    alert("Error fetching details. Check console for more information.");
  }
};

const updateAppearanceRequestDetails = async () => {
  if (!appearanceRequestDetails.value) return;
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/appearance-requests/${
        appearanceRequestId.value
      }`,
      {
        firstName: appearanceRequestDetails.value.firstName,
        lastName: appearanceRequestDetails.value.lastName,
        email: appearanceRequestDetails.value.email,
        phone: appearanceRequestDetails.value.phone,
        address: appearanceRequestDetails.value.address,
        eventTitle: appearanceRequestDetails.value.eventTitle,
        eventAddress: appearanceRequestDetails.value.eventAddress,
        typeOfEvent: appearanceRequestDetails.valie.typeOfEvent,
        otherOrgainizationsInvolved:
          appearanceRequestDetails.value.otherOrgainizationsInvolved,
        nameOfOrg: appearanceRequestDetails.value.nameOfOrg,
        isOnCampus: appearanceRequestDetails.value.isOnCampus,
        specialInstructions: appearanceRequestDetails.value.specialInstructions,
        expensesOrBenefits: appearanceRequestDetails.value.expensesOrBenefits,
        detailedEventDescription:
          appearanceRequestDetails.value.detailedEventDescription,
      }
    );
    if (response.data.flag) {
      alert("Details updated successfully!");
    } else {
      alert("Failed to update details.");
    }
  } catch (error) {
    console.error("Error updating appearanceReques details:", error);
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
