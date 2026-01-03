import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// GET all contacts
export const getContacts = async () => {
  const response = await axios.get(`${API_URL}/api/contacts`);
  return response.data;
};

// CREATE a new contact
export const createContact = async (contactData) => {
  const response = await axios.post(`${API_URL}/api/contacts`, contactData);
  return response.data;
};

// UPDATE a contact
export const updateContact = async (id, contactData) => {
  const response = await axios.put(`${API_URL}/api/contacts/${id}`, contactData);
  return response.data;
};

// DELETE a contact
export const deleteContact = async (id) => {
  const response = await axios.delete(`${API_URL}/api/contacts/${id}`);
  return response.data;
};
