import { defineStore } from "pinia";
import { ref } from "vue";

export const useBooksStore = defineStore("books", () => {
  const books = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchBooks = async () => {
    loading.value = true;
    try {
      const response = await fetch("http://localhost:3000/books");
      if (!response.ok) throw new Error("فشل في جلب الكتب");
      const data = await response.json();
      books.value = data;
    } catch (err) {
      error.value = err.message;
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addBook = async (bookData) => {
    try {
      let nextId = 1;
      if (books.value && books.value.length > 0) {
        const numericIds = books.value
          .map((b) => Number(b.id))
          .filter((id) => !isNaN(id));

        if (numericIds.length > 0) {
          nextId = Math.max(...numericIds) + 1;
        } else {
          nextId = books.value.length + 1;
        }
      }

      const payload = {
        ...bookData,
        id: String(nextId),
      };

      const response = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("فشل في إضافة الكتاب");

      await fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const updateBook = async (bookData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/books/${bookData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        },
      );
      if (!response.ok) throw new Error("فشل في تحديث الكتاب");
      await fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("فشل في حذف الكتاب");
      books.value = books.value.filter((b) => b.id !== id);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
  };
});
