<template>
    <div>
      <h1>Find Appearance Requests</h1>
      <form @submit.prevent="fetchAppearanceRequests">
        <input v-model="searchCriteria.firstName" placeholder="First Name" />
        <input v-model="searchCriteria.lastName" placeholder="Last Name" />
        <input v-model="searchCriteria.phone" placeholder="Phone Number" />
        <input v-model="searchCriteria.email" placeholder="Email" />
        <input v-model="searchCriteria.eventTitle" placeholder="Event Title" />
        <input v-model="searchCriteria.eventAddress" placeholder="Event Address" />
        <button type="submit">Search</button>
      </form>
      <div v-if="appearanceRequests.length > 0">
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
              <th>Event Title</th>
              <th>Event Address</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="request in appearanceRequests" :key="request.requestId">
              <td>{{ request.firstName }}</td>
              <td>{{ request.lastName }}</td>
              <td>{{ request.phone }}</td>
              <td>{{ request.email }}</td>
              <td>{{ request.eventTitle }}</td>
              <td>{{ request.eventAddress }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No matching appearance requests found. Please modify your search criteria.</p>
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
    eventTitle: "",
    eventAddress: "",
  });
  const appearanceRequests = ref([]);
  const sortKey = ref("lastName");
  
  async function fetchAppearanceRequests() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/appearance-requests/status/COMPLETED`,
        {
          params: {
            ...searchCriteria.value,
          },
        }
      );
      console.log(response);
      appearanceRequests.value = response.data.data || [];
      sortResults();
    } catch (error) {
      console.error("Failed to search appearance requests:", error);
    }
  }
  
  function sortResults() {
    appearanceRequests.value.sort((a, b) =>
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
  