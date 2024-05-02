<template>
  <div>
    <h1>Manage Appearance Request</h1>
    <form @submit.prevent="fetchAppearanceRequest">
      <input v-model="appearanceRequestId" placeholder="Appearance Request ID" />
      <button type="submit">Fetch Request</button>
    </form>

    <div v-if="appearanceRequest">
      <h2>Appearance Request Details</h2>
      <form @submit.prevent="updateAppearanceRequest">
        <label for="firstName">First Name</label>
        <input v-model="appearanceRequest.firstName" id="firstName" />
        <label for="lastName">Last Name</label>
        <input v-model="appearanceRequest.lastName" id="lastName" />
        <label for="email">Email</label>
        <input v-model="appearanceRequest.email" id="email" />
        <label for="phone">Phone</label>
        <input v-model="appearanceRequest.phone" id="phone" />
        <label for="typeOfEvent">Type of Event</label>
        <input v-model="appearanceRequest.typeOfEvent" id="typeOfEvent" />
        <label for="eventTitle">Event Title</label>
        <input v-model="appearanceRequest.eventTitle" id="eventTitle" />
        <label for="eventAddress">Event Address</label>
        <input v-model="appearanceRequest.eventAddress" id="eventAddress" />
        <label for="isOnCampus">Is on Campus</label>
        <input v-model="appearanceRequest.isOnCampus" id="isOnCampus" />
        <label for="specialInstructions">Special Instructions</label>
        <input v-model="appearanceRequest.specialInstructions" id="specialInstructions" />
        <label for="expensesOrBenefits">Expenses or Benefits</label>
        <input v-model="appearanceRequest.expensesOrBenefits" id="expensesOrBenefits" />
        <label for="otherOrganizationsInvolved">Other Organizations Involved</label>
        <input v-model="appearanceRequest.otherOrganizationsInvolved" id="otherOrganizationsInvolved" />
        <label for="detailedEventDescription">Detailed Event Description</label>
        <input v-model="appearanceRequest.detailedEventDescription" id="detailedEventDescription" />
        <button type="submit">Update Request</button>
        <button @click="cancelRequest">Cancel Request</button>
      </form>
    </div>
    <div v-else>
      <p>No Appearance Request found. Please enter a valid Appearance Request ID.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const appearanceRequestId = ref("");
const appearanceRequest = ref(null);

async function fetchAppearanceRequest() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/appearance-requests/${appearanceRequestId.value}`);
    appearanceRequest.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch appearance request:", error);
    appearanceRequest.value = null;
  }
}

async function updateAppearanceRequest() {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/appearance-requests/${appearanceRequestId.value}`, appearanceRequest.value);
    console.log("Request updated successfully:", response.data);
    // Optionally, you can fetch the updated appearance request again
    // fetchAppearanceRequest();
    window.alert("Appearance request successfully updated.");
  } catch (error) {
    console.error("Failed to update appearance request:", error);
  }
}

async function cancelRequest() {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/appearance-requests/${appearanceRequestId.value}/cancel`);
    console.log("Request canceled successfully:", response.data);
    // Optionally, you can clear appearanceRequest.value or perform other actions upon successful cancellation
    window.alert("Appearance request successfully canceled.");
  } catch (error) {
    console.error("Failed to cancel appearance request:", error);
  }
}

onMounted(() => {
  // If appearanceRequestId is provided (e.g., from a previously generated ID), fetch the appearance request details
  if (appearanceRequestId.value) {
    fetchAppearanceRequest();
  }
});
</script>

<style>
/* Add your styles here */
input,
select,
button {
  margin: 5px;
}
</style>