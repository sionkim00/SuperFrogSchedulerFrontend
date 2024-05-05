<template>
    <div>
      <h1>Approve or Reject Appearance Requests</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Type of Event</th>
            <th>Event Title</th>
            <th>Event Address</th>
            <th>Appearance Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in appearanceRequests" :key="request.requestId">
            <td>{{ request.requestId }}</td>
            <td>{{ request.firstName }}</td>
            <td>{{ request.lastName }}</td>
            <td>{{ request.email }}</td>
            <td>{{ request.typeOfEvent }}</td>
            <td>{{ request.eventTitle }}</td>
            <td>{{ request.eventAddress }}</td>
            <td>{{ request.appearanceRequestStatus }}</td>
            <td>
              <button @click="approveRequest(request.requestId)">Approve</button>
              <button @click="rejectRequest(request.requestId)">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const appearanceRequests = ref([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/appearance-requests/status/COMPLETED`
      );
      if (response.data && response.data.data) {
        appearanceRequests.value = response.data.data;
      }
    } catch (error) {
      console.error("Failed to fetch appearance requests:", error);
    }
  });
  
  async function approveRequest(requestId) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/appearance-requests/${requestId}/approve`
      );
      if (response.data.flag) {
        alert("Appearance request approved successfully");
        // Optionally update local data or reload the list
      }
    } catch (error) {
      console.error("Failed to approve appearance request:", error);
        alert("Failed to approve appearance request");
    }
  }
  
  async function rejectRequest(requestId) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/appearance-requests/${requestId}/reject`
      );
      if (response.data.flag) {
        alert("Appearance request rejected successfully");
        // Optionally update local data or reload the list
      }
    } catch (error) {
      console.error("Failed to reject appearance request:", error);
      alert("Failed to reject appearance request");
    }
  }
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
  button {
    margin-right: 5px;
  }
  </style>