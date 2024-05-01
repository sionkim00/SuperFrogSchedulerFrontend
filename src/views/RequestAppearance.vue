<template>
  <div>
    <h1>Request SuperFrog Appearance</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="firstName">First Name</label>
        <input id="firstName" v-model="form.firstName" required />
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input id="lastName" v-model="form.lastname" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>
      <div>
        <label for="phone">Phone</label>
        <input id="phone" v-model="form.phone" required />
      </div>
      <div>
        <label for="typeOfEvent">Type of Event</label>
        <input id="typeOfEvent" v-model="form.typeOfEvent" required />
      </div>
      <div>
        <label for="eventTitle">Event Title</label>
        <input id="eventTitle" v-model="form.eventTitle" required />
      </div>
      <div>
        <label for="eventAddress">Event Address</label>
        <input id="eventAddress" v-model="form.eventAddress" required />
      </div>
      <div>
        <label for="isOnCampus">Is On Campus?</label>
        <input id="isOnCampus" v-model="form.isOnCampus" required />
      </div>
      <div>
        <label for="specialInstructions">Special Instructions</label>
        <input id="specialInstructions" v-model="form.specialInstructions" />
      </div>
      <div>
        <label for="expensesOrBenefits">Expenses or Benefits</label>
        <input id="expensesOrBenefits" v-model="form.expensesOrBenefits" />
      </div>
      <div>
        <label for="otherOrganizationsInvolved"
          >Other Organizations Involved</label
        >
        <input
          id="otherOrganizationsInvolved"
          v-model="form.otherOrganizationsInvolved" />
      </div>
      <div>
        <label for="detailedEventDescription">Detailed Event Description</label>
        <textarea
          id="detailedEventDescription"
          v-model="form.detailedEventDescription"
          required></textarea>
      </div>
      <button type="submit">Submit Request</button>
    </form>
    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <span class="close" @click="closePopup">&times;</span>
        <p>{{ popupMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        firstName: "",
        lastname: "",
        email: "",
        phone: "",
        typeOfEvent: "",
        eventTitle: "",
        eventAddress: "",
        isOnCampus: "",
        specialInstructions: "",
        expensesOrBenefits: "",
        otherOrganizationsInvolved: "",
        detailedEventDescription: "",
      },
      showPopup: false,
      popupMessage: "",
      requestId: null, // Store generated ID
    };
  },
  methods: {
    generateRandomId() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let randomId = "";
      for (let i = 0; i < 8; i++) {
        randomId += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return randomId;
    },
    submitForm() {
      // Generate a random ID for the request
      const requestId = this.generateRandomId();

      // Assign the generated ID to the form data
      this.form.requestId = requestId;

      // Store the generated ID
      this.requestId = requestId;

      // Submit the form data
      axios
        .post(
          "http://localhost:8080/api/v1/customer/request-superfrog-appearance",
          this.form
        )
        .then((response) => {
          if (response.data.flag && response.data.code === 200) {
            this.showPopupMessage(
              "SuperFrog appearance request created successfully. Your request ID is: " + requestId
            );
          } else {
            this.showPopupMessage(
              "Error creating SuperFrog appearance request."
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.showPopupMessage("Error occurred. Please try again later.");
        });
    },
    showPopupMessage(message) {
      this.popupMessage = message;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
  },
};
</script>

<style>
.popup {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.popup-content {
  background-color: #fefefe;
  color: black;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>