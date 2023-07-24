// import api handler from api
import apiHandler from '../api'

//  create a new store for contacts using pinia
import { defineStore } from 'pinia'

export const useContactsStore = defineStore('contacts', {
    state: () => ({
        contacts: [],
        contact: {}
    }),
    actions: {
      // create an async function that will create a new contact 
      // and add it to the contacts array
      async createContact(contact) {
        // use the apiHandler function to make the request
        const res = await apiHandler({
          url: '/contacts',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: contact
        })

        // add the new contact to the contacts array
        this.contacts.push(res)
      },

      // create an async function that will fetch all contacts
      async fetchContacts() {
        // use the apiHandler function to make the request
        const res = await apiHandler({
          url: '/contacts',
          method: 'GET'
        })

        // set the contacts array to the response
        this.contacts = res
      },

      // create an async function that will fetch a single contact
      async fetchContact(id) {
        // use the apiHandler function to make the request
        const res = await apiHandler({
          url: `/contacts/${id}`,
          method: 'GET'
        })

        // set the contact object to the response
        this.contact = res;
      },

      // create an async function that will update a single contact
      async updateContact(contact) {
        // use the apiHandler function to make the request
        const res = await apiHandler({
          url: `/contacts/${contact.id}`,
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          data: contact
        })

        // set the contact object to the response
        this.contact = res;
      },

      // create an async function that will delete a single contact
      async deleteContact(id) {
        // use the apiHandler function to make the request
        await apiHandler({
          url: `/contacts/${id}`,
          method: 'DELETE'
        })

        // set the contacts array to the response
        this.contacts = this.contacts.filter(contact => contact.id !== id)
      }
    },
    getters: {
      // create a getter that will filter the contacts array by name
      filteredContacts: (state) => (name) => {
        return state.contacts.filter((contact) => contact.name.toLowerCase().includes(name.toLowerCase()));
      }
    }
});

