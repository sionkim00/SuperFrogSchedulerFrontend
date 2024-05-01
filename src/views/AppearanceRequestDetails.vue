@ -0,0 +1,136 @@
<template>
    <div>
      <h1>Appearance Request Details</h1>
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
          <tr>
            <td>{{ request.id }}</td>
            <td>{{ request.firstName }}</td>
            <td>{{ request.lastName }}</td>
            <td>{{ request.eventTitle }}</td>
            <td>{{ request.email }}</td>
            <td>{{ request.typeOfEvent }}</td>
            <td>{{ request.phone }}</td>
            <td>{{ request.eventAddress }}</td>
            <td>{{ request.isOnCampus }}</td>
            <td>{{ request.specialInstructions }}</td>
            <td>{{ request.expensesOrBenefits }}</td>
            <td>{{ request.otherOrgainizationsInvolved }}</td>
            <td>{{ request.detailedEventDescription }}</td>
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
        
      </table>
  
      <h2>Completed Appearances</h2>
      <table border="1">
        <thead>
        
          
        </thead>
        <tbody>
          
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
    eventTitle: "",
    typeOfEvent: "",
    phone: "",
    eventAddress: "",
    isOnCampus: "",
    specialInstructions: "",
    expensesOrBenefits: "",
    otherOrgainizationsInvolved: "",
    detailedEventDescription: "",

  });
  
  const fetchAppearanceRequestDetails = async (id) => {
    try {
    
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/customers/appearance-requests/${id}/details`
      );
      if (response.data && response.data.data) {
        appearanceRequestDetails.value = {
          ...response.data.data,
          address: response.data.data.address || "N/A",
        };
      }
    } catch (error) {
      console.error("Failed to fetch appearance details:", error);
    }
  };
  
  onMounted(() => {
    fetchAppearanceRequestDetails(route.params.id);
  });
  
  watch(
    () => route.params.id,
    (newId, oldId) => {
      if (newId !== oldId) {
        fetchAppearanceRequestDetails(newId);
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
