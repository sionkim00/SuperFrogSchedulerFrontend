<template>
  <div>
    <h1>View All Appliance Requests</h1>
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
        <tr v-for="request in applianceRequests" :key="request.requestId">
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

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const applianceRequests = ref([]);

    const fetchApplianceRequests = async () => {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/v1/appliance-requests`
        );
        applianceRequests.value = response.data.data;
      } catch (error) {
        console.error("Failed to fetch appliance requests:", error);
      }
    };

    const approveRequest = async (requestId) => {
      try {
        const response = await axios.put(
          `${process.env.VUE_APP_API_URL}/api/v1/appliance-requests/${requestId}/approve`
        );
        if (response.data.flag) {
          alert("Appliance request approved successfully");
          // Optionally update local data or reload the list
        }
      } catch (error) {
        console.error("Failed to approve appliance request:", error);
        alert("Failed to approve appliance request");
      }
    };

    const rejectRequest = async (requestId) => {
      try {
        const response = await axios.put(
          `${process.env.VUE_APP_API_URL}/api/v1/appliance-requests/${requestId}/reject`
        );
        if (response.data.flag) {
          alert("Appliance request rejected successfully");
          // Optionally update local data or reload the list
        }
      } catch (error) {
        console.error("Failed to reject appliance request:", error);
        alert("Failed to reject appliance request");
      }
    };

    onMounted(fetchApplianceRequests);

    return {
      applianceRequests,
      approveRequest,
      rejectRequest
    };
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
button {
  margin-right: 5px;
}
</style>