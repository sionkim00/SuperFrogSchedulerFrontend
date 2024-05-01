<template>
  <div class="event-management">
    <h1>Manage Events</h1>
    <div class="form-container">
      <form @submit.prevent="createEvent" class="event-form">
        <h2>Create Event</h2>
        <div class="form-field">
          <label for="title">Event Title:</label>
          <input
            id="title"
            v-model="newEvent.title"
            placeholder="Enter event title"
            required />
        </div>
        <div class="form-field">
          <label for="start-date">Start Date and Time:</label>
          <input
            id="start-date"
            v-model="newEvent.startDate"
            type="datetime-local"
            required />
        </div>
        <div class="form-field">
          <label for="end-date">End Date and Time:</label>
          <input
            id="end-date"
            v-model="newEvent.endDate"
            type="datetime-local"
            required />
        </div>
        <div class="form-field">
          <label for="recurrence-start">Recurrence Start Date:</label>
          <input
            id="recurrence-start"
            v-model="newEvent.recurrenceStartDate"
            type="datetime-local"
            placeholder="Optional" />
        </div>
        <div class="form-field">
          <label for="recurrence-end">Recurrence End Date:</label>
          <input
            id="recurrence-end"
            v-model="newEvent.recurrenceEndDate"
            type="datetime-local"
            placeholder="Optional" />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>

    <div class="events-list">
      <h2>Event List</h2>
      <ul>
        <li v-for="event in events" :key="event.id">
          <div class="event-info">
            <span><strong>Title:</strong> {{ event.title }}</span>
            <hr />
            <span><strong>Start:</strong> {{ event.startDate }}</span>
            <span><strong>End:</strong> {{ event.endDate }}</span>
          </div>
          <div class="event-actions">
            <button @click="editEvent(event)" class="edit-btn">Edit</button>
            <button @click="deleteEvent(event.id)" class="delete-btn">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const events = ref([]);
const newEvent = ref({
  title: "",
  startDate: "",
  endDate: "",
  recurrenceStartDate: "",
  recurrenceEndDate: "",
});

onMounted(async () => {
  await fetchEvents();
});

async function fetchEvents() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/spirit-directors/events`
    );
    events.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  // Converts ISO 8601 to "YYYY-MM-DD HH:mm:ss"
  return dateStr.replace("T", " ").concat(":00");
}

async function createEvent() {
  try {
    const formattedEvent = {
      title: newEvent.value.title,
      startDate: formatDate(newEvent.value.startDate),
      endDate: formatDate(newEvent.value.endDate),
      recurrenceStartDate: formatDate(newEvent.value.recurrenceStartDate),
      recurrenceEndDate: formatDate(newEvent.value.recurrenceEndDate),
    };
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/spirit-directors/events`,
      formattedEvent
    );
    events.value.push(response.data.data);
    newEvent.value = {
      title: "",
      startDate: "",
      endDate: "",
      recurrenceStartDate: "",
      recurrenceEndDate: "",
    };
  } catch (error) {
    console.error("Failed to create event:", error);
  }
}

async function editEvent(event) {
  const updatedTitle = prompt("Edit Event Title", event.title);
  if (updatedTitle) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/spirit-directors/events/${event.id}`,
        { title: updatedTitle }
      );
      event.title = response.data.data.title;
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  }
}

async function deleteEvent(id) {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/spirit-directors/events/${id}`
    );
    events.value = events.value.filter((event) => event.id !== id);
  } catch (error) {
    console.error("Failed to delete event:", error);
  }
}
</script>

<style>
.event-management {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-container {
  /* background: #f9f9f9; */
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.event-form .form-field {
  margin-bottom: 10px;
}

.event-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.event-form input,
.event-form button {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.events-list ul {
  list-style-type: none;
  padding: 0;
}

.events-list li {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-btn,
.delete-btn {
  padding: 5px 10px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-btn {
  background-color: #f0ad4e;
  color: white;
}

.delete-btn {
  background-color: #d9534f;
  color: white;
}
</style>
