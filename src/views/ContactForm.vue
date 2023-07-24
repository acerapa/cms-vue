<template>
  <div>
    <h1>Contact Form</h1>
    <!-- create a form with fields of name, email, address and contact_number -->
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="contact.name" />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="contact.email" />
      </div>
      <div>
        <label for="address">Address</label>
        <input type="text" id="address" v-model="contact.address" />
      </div>
      <div>
        <label for="contact_number">Contact Number</label>
        <input type="text" id="contact_number" v-model="contact.contact_number" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
// import and use the contact store
// import route from vue router
import { useRoute, useRouter } from 'vue-router'
import { useContactsStore } from '@/stores/contacts'
import { ref, onMounted } from 'vue';


// get the route params from the route
const route = useRoute();
const router = useRouter();

// get the route params from the route
const { id } = route.params;

// create a contact store
const contactStore = useContactsStore()


// create a contact model with the fields of name, email, address and contact_number
const contact = ref({});

// use onmounted method
onMounted(async () => {
  if (id) {
    await contactStore.fetchContact(id);
    contact.value = contactStore.contact;
    console.log(contact.value);
  }
});

// create a submitForm method to submit the form
const submitForm = async () => {
  // update the contact if id is present
  if (id) {
    await contactStore.updateContact(contact.value);
  } else {
    await contactStore.createContact(contact.value);
  }


  // reset the contact model and redirect to Homeview
  contact.value = {};
  router.push('/');
}
</script>

<style>
</style>
