<template>
  <div class="container-fluid py-2">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3 class="fw-bold text-dark m-0">نظرة عامة على لوحة التحكم</h3>
        <p class="text-muted small m-0 mt-1">
          ملخص شامل لإحصائيات المكتبة وأحدث النشاطات
        </p>
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <div
          class="card border-0 shadow-sm rounded-4 bg-primary text-white p-3"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="d-block text-white-50 small mb-1"
                >إجمالي الكتب المتاحة</span
              >
              <h2 class="fw-bold m-0">{{ booksStore.books?.length || 0 }}</h2>
            </div>
            <div
              class="bg-white bg-opacity-25 rounded-circle p-3 fs-3 d-flex align-items-center justify-content-center"
              style="width: 60px; height: 60px"
            >
              📚
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div
          class="card border-0 shadow-sm rounded-4 bg-success text-white p-3"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="d-block text-white-50 small mb-1"
                >إجمالي المؤلفين المسجلين</span
              >
              <h2 class="fw-bold m-0">
                {{ authorsStore.authors?.length || 0 }}
              </h2>
            </div>
            <div
              class="bg-white bg-opacity-25 rounded-circle p-3 fs-3 d-flex align-items-center justify-content-center"
              style="width: 60px; height: 60px"
            >
              ✍️
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
          <div
            class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom"
          >
            <h6 class="fw-bold m-0 text-dark">أحدث الكتب المضافة</h6>
            <router-link
              to="/admin/books"
              class="btn btn-sm btn-light text-primary fw-bold"
              >إدارة الكتب</router-link
            >
          </div>
          <div v-if="latestBooks.length" class="d-flex flex-column gap-2">
            <div
              v-for="book in latestBooks"
              :key="book.id"
              class="d-flex align-items-center justify-content-between p-2 rounded-3 bg-light"
            >
              <div class="d-flex align-items-center gap-3">
                <img
                  :src="
                    book.cover ||
                    book.coverUrl ||
                    book.image ||
                    'https://via.placeholder.com/50?text=Book'
                  "
                  style="width: 40px; height: 55px; object-fit: cover"
                  class="rounded shadow-sm"
                  @error="
                    $event.target.src =
                      'https://via.placeholder.com/50?text=Book'
                  "
                />
                <div>
                  <h6 class="mb-0 fw-bold text-dark">{{ book.title }}</h6>
                  <small class="text-muted">المؤلف: {{ book.author }}</small>
                </div>
              </div>
              <span class="badge bg-secondary rounded-pill"
                >#{{ book.id }}</span
              >
            </div>
          </div>
          <p v-else class="text-muted text-center py-3 m-0">
            لا توجد كتب حالياً
          </p>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card border-0 shadow-sm rounded-4 p-3 bg-white">
          <div
            class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom"
          >
            <h6 class="fw-bold m-0 text-dark">أحدث المؤلفين المضافين</h6>
            <router-link
              to="/admin/authors"
              class="btn btn-sm btn-light text-primary fw-bold"
              >إدارة المؤلفين</router-link
            >
          </div>
          <div v-if="latestAuthors.length" class="d-flex flex-column gap-2">
            <div
              v-for="author in latestAuthors"
              :key="author.id"
              class="d-flex align-items-center justify-content-between p-2 rounded-3 bg-light"
            >
              <div class="d-flex align-items-center gap-3">
                <img
                  :src="
                    author.image ||
                    author.photo ||
                    author.avatar ||
                    author.coverUrl ||
                    author.cover ||
                    'https://via.placeholder.com/50?text=Author'
                  "
                  style="width: 45px; height: 45px; object-fit: cover"
                  class="rounded-circle shadow-sm"
                  @error="
                    $event.target.src =
                      'https://via.placeholder.com/50?text=Author'
                  "
                />
                <div>
                  <h6 class="mb-0 fw-bold text-dark">{{ author.name }}</h6>
                  <small class="text-muted">{{
                    author.nationality || "مؤلف معتمد"
                  }}</small>
                </div>
              </div>
              <span class="badge bg-secondary rounded-pill"
                >#{{ author.id }}</span
              >
            </div>
          </div>
          <p v-else class="text-muted text-center py-3 m-0">
            لا يوجد مؤلفين حالياً
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useBooksStore } from "@/stores/books";
import { useAuthorsStore } from "@/stores/authors";

const booksStore = useBooksStore();
const authorsStore = useAuthorsStore();

onMounted(async () => {
  if (booksStore.fetchBooks) await booksStore.fetchBooks();
  if (authorsStore.fetchAuthors) await authorsStore.fetchAuthors();
});

const latestBooks = computed(() => {
  return [...(booksStore.books || [])].reverse().slice(0, 4);
});

const latestAuthors = computed(() => {
  return [...(authorsStore.authors || [])].reverse().slice(0, 4);
});
</script>
