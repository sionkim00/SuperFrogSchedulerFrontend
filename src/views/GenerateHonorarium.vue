<template>
  <div class="honorarium-form">
    <h1>Generate Honorarium</h1>
    <form @submit.prevent="submitHonorarium">
      <div>
        <label for="studentId">Student ID:</label>
        <input
          id="studentId"
          v-model="honorariumData.studentId"
          type="number"
          required />
      </div>
      <div>
        <label for="startDate">Start Date:</label>
        <input
          id="startDate"
          v-model="honorariumData.startDate"
          type="datetime-local"
          required />
      </div>
      <div>
        <label for="endDate">End Date:</label>
        <input
          id="endDate"
          v-model="honorariumData.endDate"
          type="datetime-local"
          required />
      </div>
      <button type="submit">Generate</button>
    </form>
    <div v-if="pdfGenerated">
      <button @click="downloadPDF">Download PDF</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { jsPDF } from "jspdf";

const honorariumData = ref({
  studentId: null,
  startDate: "",
  endDate: "",
});
const pdfGenerated = ref(false);
const pdfData = ref(null);

function formatDate(dateStr) {
  if (!dateStr) return null;
  return dateStr.replace("T", " ").concat(":00");
}

async function submitHonorarium() {
  pdfGenerated.value = false; // Reset the PDF generated state
  try {
    const formattedStartDate = formatDate(honorariumData.value.startDate);
    const formattedEndDate = formatDate(honorariumData.value.endDate);

    const response = await axios.post(
      `http://localhost:8080/api/v1/spirit-directors/create-honorarium/${honorariumData.value.studentId}`,
      {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }
    );

    if (response.data.flag && response.data.code === 200) {
      generatePDF(response.data.data);
    } else {
      alert("Failed to generate honorarium: " + response.data.message);
    }
  } catch (error) {
    console.error("Failed to submit honorarium request:", error);
    alert("Error submitting honorarium request");
  }
}

function generatePDF(data) {
  const doc = new jsPDF();
  doc.text("Honorarium Details", 20, 20);
  doc.text(`Student ID: ${data.superFrogStudentId}`, 20, 30);
  doc.text(`Payment Preference: ${data.paymentPreference}`, 20, 40);
  doc.text(`International: ${data.international ? "Yes" : "No"}`, 20, 50);
  doc.text(`Address: ${data.address}`, 20, 60);
  doc.text(`Amount: $${data.amount}`, 20, 70);

  pdfData.value = doc.output("bloburl");
  pdfGenerated.value = true;
}

function downloadPDF() {
  if (pdfData.value) {
    const link = document.createElement("a");
    link.href = pdfData.value;
    link.download = "Honorarium_Report.pdf";
    link.click();
  }
}
</script>

<style scoped>
form div {
  margin-bottom: 10px;
}
label {
  margin-right: 5px;
}
input,
button {
  min-height: 20px;
}
</style>
