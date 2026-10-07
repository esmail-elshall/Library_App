<template>
  <div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold mb-0">إدارة الكتب</h3>
      <button
        @click="openCreateModal"
        class="btn btn-primary d-flex align-items-center gap-2"
      >
        <span>إضافة كتاب جديد</span>
        <span>+</span>
      </button>
    </div>

    <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th class="ps-4">ID</th>
                <th>الغلاف</th>
                <th>العنوان</th>
                <th>المؤلف</th>
                <th>السنة</th>
                <th>السعر</th>
                <th>التقييم</th>
                <th class="text-end pe-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(book, index) in booksStore.books"
                :key="book.id || index"
              >
                <td class="ps-4 text-muted">#{{ index + 1 }}</td>
                <td>
                  <img
                    :src="book.cover"
                    :alt="book.title"
                    class="rounded-2 object-fit-cover"
                    style="width: 40px; height: 55px"
                  />
                </td>
                <td class="fw-bold">{{ book.title }}</td>
                <td>{{ book.authorName || "غير محدد" }}</td>
                <td>{{ book.year }}</td>
                <td class="text-success fw-bold">
                  ${{
                    book.price !== undefined && book.price !== null
                      ? Number(book.price).toFixed(2)
                      : "0.00"
                  }}
                </td>
                <td>⭐ {{ book.rating || "N/A" }}</td>
                <td class="text-end pe-4">
                  <div class="btn-group gap-2">
                    <button
                      @click="openEditModal(book)"
                      class="btn btn-sm btn-outline-primary rounded-2"
                    >
                      تعديل
                    </button>
                    <button
                      @click="deleteBook(book.id)"
                      class="btn btn-sm btn-outline-danger rounded-2"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!booksStore.books || booksStore.books.length === 0">
                <td colspan="8" class="text-center py-4 text-muted">
                  لا توجد كتب متاحة حالياً.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-backdrop fade show"></div>
    <div v-if="showModal" class="modal d-block fade show" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-bold">
              {{ isEditing ? "تعديل بيانات كتاب" : "إضافة كتاب جديد" }}
            </h5>
            <button
              @click="closeModal"
              type="button"
              class="btn-close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveBook">
              <div class="mb-3">
                <label class="form-label">العنوان *</label>
                <input
                  v-model="bookForm.title"
                  type="text"
                  class="form-control"
                  placeholder="أدخل عنوان الكتاب"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">المؤلف *</label>
                <select
                  v-model="bookForm.authorId"
                  @change="onAuthorSelect"
                  class="form-select mb-2"
                >
                  <option value="">-- اختر مؤلف موجود --</option>
                  <option
                    v-for="author in authorsStore.authors"
                    :key="author.id"
                    :value="author.id"
                  >
                    {{ author.name }}
                  </option>
                </select>
                <input
                  v-model="bookForm.authorName"
                  type="text"
                  class="form-control"
                  placeholder="أو اكتب اسم مؤلف جديد..."
                  required
                />
              </div>

              <div class="row g-2 mb-3">
                <div class="col-md-6">
                  <label class="form-label">السنة *</label>
                  <input
                    v-model.number="bookForm.year"
                    type="number"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">التصنيف (Genre) *</label>
                  <input
                    v-model="bookForm.genre"
                    type="text"
                    class="form-control"
                    placeholder="Finance, Sci-Fi..."
                    required
                  />
                </div>
              </div>

              <div class="row g-2 mb-3">
                <div class="col-md-6">
                  <label class="form-label">السعر ($) *</label>
                  <input
                    v-model.number="bookForm.price"
                    type="number"
                    step="0.01"
                    class="form-control"
                    placeholder="14.50"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">التقييم (Rating)</label>
                  <input
                    v-model.number="bookForm.rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    class="form-control"
                    placeholder="4.5"
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">الوصف</label>
                <textarea
                  v-model="bookForm.description"
                  class="form-control"
                  rows="3"
                  placeholder="نبذة عن الكتاب..."
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">رابط صورة الغلاف</label>
                <input
                  v-model="bookForm.cover"
                  type="url"
                  class="form-control"
                  placeholder="https://..."
                />
              </div>

              <div class="d-flex justify-content-end gap-2 mt-4">
                <button @click="closeModal" type="button" class="btn btn-light">
                  إلغاء
                </button>
                <button type="submit" class="btn btn-primary px-4">
                  حفظ الكتاب
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBooksStore } from "@/stores/books";
import { useAuthorsStore } from "@/stores/authors";

const booksStore = useBooksStore();
const authorsStore = useAuthorsStore();

const showModal = ref(false);
const isEditing = ref(false);

const bookForm = ref({
  id: null,
  title: "",
  authorId: "",
  authorName: "",
  year: new Date().getFullYear(),
  genre: "",
  price: null,
  rating: 4.5,
  description: "",
  cover: "",
});

onMounted(async () => {
  if (booksStore.fetchBooks) await booksStore.fetchBooks();
  if (authorsStore.fetchAuthors) await authorsStore.fetchAuthors();
});

const onAuthorSelect = () => {
  if (bookForm.value.authorId) {
    const selected = authorsStore.authors.find(
      (a) => String(a.id) === String(bookForm.value.authorId),
    );
    if (selected) {
      bookForm.value.authorName = selected.name;
    }
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  bookForm.value = {
    id: null,
    title: "",
    authorId: "",
    authorName: "",
    year: new Date().getFullYear(),
    genre: "",
    price: null,
    rating: 4.5,
    description: "",
    cover: "",
  };
  showModal.value = true;
};

const openEditModal = (book) => {
  isEditing.value = true;
  bookForm.value = { ...book };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveBook = async () => {
  let finalAuthorId = bookForm.value.authorId;

  if (bookForm.value.authorName && !finalAuthorId) {
    const existingAuthor = authorsStore.authors.find(
      (a) =>
        a.name.trim().toLowerCase() ===
        bookForm.value.authorName.trim().toLowerCase(),
    );

    if (existingAuthor) {
      finalAuthorId = existingAuthor.id;
    } else {
      let nextAuthorId = 1;
      if (authorsStore.authors && authorsStore.authors.length > 0) {
        const numericAuthorIds = authorsStore.authors
          .map((a) => Number(a.id))
          .filter((id) => !isNaN(id));
        if (numericAuthorIds.length > 0) {
          nextAuthorId = Math.max(...numericAuthorIds) + 1;
        } else {
          nextAuthorId = authorsStore.authors.length + 1;
        }
      }

      try {
        const newAuthorPayload = {
          id: String(nextAuthorId),
          name: bookForm.value.authorName.trim(),
          bio: "Writer & Author",
          nationality: "غير محدد",
          photo: bookForm.value.cover || "https://via.placeholder.com/150",
        };

        const res = await fetch("http://localhost:3000/authors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAuthorPayload),
        });

        if (res.ok) {
          finalAuthorId = String(nextAuthorId);
          if (authorsStore.fetchAuthors) await authorsStore.fetchAuthors();
        }
      } catch (err) {
        console.error("Error creating new author:", err);
      }
    }
  }

  let nextId = 1;
  if (!isEditing.value) {
    if (booksStore.books && booksStore.books.length > 0) {
      const numericIds = booksStore.books
        .map((b) => Number(b.id))
        .filter((id) => !isNaN(id));

      if (numericIds.length > 0) {
        nextId = Math.max(...numericIds) + 1;
      } else {
        nextId = booksStore.books.length + 1;
      }
    }
  }

  const payload = {
    ...bookForm.value,
    id: isEditing.value ? String(bookForm.value.id) : String(nextId),
    price: Number(bookForm.value.price) || 0,
    rating: Number(bookForm.value.rating) || 4.5,
    authorId: finalAuthorId ? String(finalAuthorId) : "1",
  };

  if (isEditing.value) {
    if (booksStore.updateBook) await booksStore.updateBook(payload);
  } else {
    if (booksStore.addBook) await booksStore.addBook(payload);
  }

  if (booksStore.fetchBooks) await booksStore.fetchBooks();
  if (authorsStore.fetchAuthors) await authorsStore.fetchAuthors();

  closeModal();
};

const deleteBook = async (id) => {
  if (confirm("هل أنت متأكد من رغبتك في حذف هذا الكتاب؟")) {
    if (booksStore.deleteBook) await booksStore.deleteBook(id);
    if (booksStore.fetchBooks) await booksStore.fetchBooks();
  }
};
</script>

<style scoped>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
