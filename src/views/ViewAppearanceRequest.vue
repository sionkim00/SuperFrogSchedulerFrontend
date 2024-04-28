<template>
    <div>
      <h1>This is a view appearance request page</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
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
          <tr v-for="request in requests" :key="request.id">
            <td>{{ request.id }}</td>
            <td>{{ request.firstName }}</td>
            <td>{{ request.lastName }}</td>
            <td>{{ request.phoneNumer }}</td>
            <td>{{ request.email }}</td>
            <td>{{ request.typeOfEvent }}</td>
            <td>{{ request.eventTitle }}</td>
            <td>{{ request.nameOfOrganization }}</td>
            <td>{{ request.eventAddress }}</td>
            <td>{{ request.wheatherOnTcuCampusOrNot }}</td>
            <td>{{ request.expensesOrBenefits }}</td>
            <td>{{ request.otherOrgainizationsInvolved }}</td>
            <td>{{ request.detailedDescription }}</td>
        
          </tr>
        </tbody>
      </table>
  
      <router-view />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const requests = ref([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/customers/appearance-requests"
      );
      if (response.data && response.data.data) {
        requests.value = response.data.data;
      }
    } catch (error) {
      console.error("Failed to fetch request:", error);
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
  