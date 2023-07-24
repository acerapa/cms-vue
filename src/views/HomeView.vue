<template>
  <main>
    <!-- create a table for contacts with the additional field of actions -->
    <h1>Contacts</h1>
    <RouterLink to="/contact">
      <button>Add Contact</button>
    </RouterLink>

    <!-- create a search field -->
    <input type="text" v-on:input="searchContact" placeholder="Search" v-model="search" />
    
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Contact Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- loop through the contacts and display the fields of name, email, address and contact_number -->
        <tr v-for="contact in contacts" :key="contact.name">
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.address }}</td>
          <td>{{ contact.contact_number }}</td>
          <td>
            <!-- create a button to edit the contact -->
            <RouterLink :to="`/contact/${contact.id}`">
              <button>Edit</button>
            </RouterLink>
            <!-- create a button to delete the contact -->
            <button v-on:click="deleteContact(contact.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script setup>
import { ref } from "vue";

// import routerlink from vue router
import { RouterLink } from "vue-router";

// import and use the contact store
import { useContactsStore } from "@/stores/contacts";

// create a contact store
const contactStore = useContactsStore();

// create a contact list model with the fields of name, email, address and contact_number and save it in a contacts varaible
const contacts = ref([]);


// create variable for search model
const search = ref("");

// create a fetchContacts method to fetch the contacts
const fetchContacts = async () => {
  // call the fetchContacts function located in the contact store
  await contactStore.fetchContacts();
  // use the contacts  in state to initialized the contacts variable
  contacts.value = contactStore.contacts;
  console.log(contacts.value); 
};

// call the fetchContacts method
fetchContacts();


// create a deleteContact method to delete the contact
const deleteContact = async (id) => {
  // call the deleteContact function located in the contact store
  await contactStore.deleteContact(id);
  // call the fetchContacts method
  fetchContacts();
};


// create a function that will search the contacts by name
const searchContact = () => {
  // call the searchContact function located in the contact store
  contacts.value = contactStore.filteredContacts(search.value);
};

</script>
