<template>
  <div class="report-form">
    <h1>SuperFrog Students Performance Report</h1>
    <form @submit.prevent="submitReport">
      <div>
        <label for="studentId">SuperFrog Student ID:</label>
        <input
          id="studentId"
          v-model="reportData.studentId"
          type="number"
          required />
      </div>
      <div>
        <label for="startDate">Start Date:</label>
        <input
          id="startDate"
          v-model="reportData.startDate"
          type="datetime-local"
          required />
      </div>
      <div>
        <label for="endDate">End Date:</label>
        <input
          id="endDate"
          v-model="reportData.endDate"
          type="datetime-local"
          required />
      </div>
      <button type="submit">Generate Report</button>
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

const reportData = ref({
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

async function submitReport() {
  pdfGenerated.value = false; // Reset the PDF generated state
  const formattedStartDate = formatDate(reportData.value.startDate);
  const formattedEndDate = formatDate(reportData.value.endDate);

  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_API_URL
      }/spirit-directors/create-performance-report/${
        reportData.value.studentId
      }`,
      {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }
    );

    if (response.data.flag && response.data.code === 200) {
      generatePDF(response.data.data);
    } else {
      alert("Failed to generate report: " + response.data.message);
    }
  } catch (error) {
    console.error("Failed to submit report request:", error);
    alert("Error submitting report request");
  }
}

function generatePDF(data) {
  const doc = new jsPDF();
  doc.text("SuperFrog Students Performance Report", 20, 20);
  doc.text(`SuperFrog Student ID: ${data.superFrogStudentId}`, 20, 30);
  doc.text(
    `Student Name: ${data.superFrogStudentFirstName} ${data.superFrogStudentLastName}`,
    20,
    40
  );
  doc.text(
    `Time Period: From ${reportData.value.startDate} to ${reportData.value.endDate}`,
    20,
    50
  );
  doc.text(`Completed Appearances: ${data.completedAppearances}`, 20, 60);
  doc.text(`Cancelled Appearances: ${data.cancelledAppearances}`, 20, 70);

  pdfData.value = doc.output("bloburl");
  pdfGenerated.value = true;
}

function downloadPDF() {
  if (pdfData.value) {
    const link = document.createElement("a");
    link.href = pdfData.value;
    link.download = "SuperFrog_Performance_Report.pdf";
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
