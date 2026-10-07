import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "http://localhost:3000/authors";

export const useAuthorsStore = defineStore("authors", {
  state: () => ({
    authors: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAuthors() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(API_URL);
        this.authors = response.data;
      } catch (err) {
        this.error = "Failed to fetch authors";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async fetchAuthorById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
      } catch (err) {
        this.error = "Failed to fetch author detail";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async addAuthor(authorData) {
      this.loading = true;
      try {
        const response = await axios.post(API_URL, authorData);
        this.authors.push(response.data);
      } catch (err) {
        console.error("Error adding author:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async updateAuthor(id, authorData) {
      this.loading = true;
      try {
        const response = await axios.put(`${API_URL}/${id}`, authorData);
        const index = this.authors.findIndex((a) => a.id == id);
        if (index !== -1) {
          this.authors[index] = response.data;
        }
      } catch (err) {
        console.error("Error updating author:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async deleteAuthor(id) {
      this.loading = true;
      try {
        await axios.delete(`${API_URL}/${id}`);
        this.authors = this.authors.filter((a) => a.id != id);
      } catch (err) {
        console.error("Error deleting author:", err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
