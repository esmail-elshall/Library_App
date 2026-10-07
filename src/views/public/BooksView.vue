<template>
  <div class="books-page min-vh-100 py-5">
    <div class="container py-3">
      <div class="row align-items-center mb-4 g-3" dir="rtl">
        <div class="col-md-6 text-start">
          <h2 class="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <span>📚</span> الكتب المتاحة
          </h2>
          <p class="text-muted small mb-0">
            استكشف وتصفح أحدث الكتب في المكتبة الرقمية
          </p>
        </div>

        <div class="col-md-6">
          <div class="d-flex gap-2 justify-content-md-end">
            <div
              class="input-group shadow-sm rounded-pill overflow-hidden bg-white"
            >
              <span class="input-group-text bg-white border-0 pe-3 text-muted"
                >🔍</span
              >
              <input
                v-model="searchQuery"
                type="text"
                class="form-control border-0 shadow-none ps-0"
                placeholder="ابحث عن اسم كتاب أو مؤلف..."
              />
            </div>

            <select
              v-model="selectedGenre"
              class="form-select border-0 shadow-sm rounded-pill w-auto px-3"
            >
              <option value="">كل التصنيفات</option>
              <option v-for="genre in genres" :key="genre" :value="genre">
                {{ genre }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="text-muted mt-2">جاري تحميل الكتب...</p>
      </div>

      <div
        v-else-if="filteredBooks.length === 0"
        class="text-center py-5 bg-white rounded-4 shadow-sm my-4"
      >
        <h5 class="text-muted mb-2">لا توجد نتائج تطابق بحثك</h5>
        <button
          @click="resetFilters"
          class="btn btn-outline-primary btn-sm rounded-pill mt-2"
        >
          إعادة ضبط البحث
        </button>
      </div>

      <div v-else class="row g-4">
        <div
          v-for="book in filteredBooks"
          :key="book.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <div
            class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden book-card bg-white d-flex flex-column justify-content-between"
          >
            <div>
              <div
                class="cover-wrapper position-relative overflow-hidden bg-dark bg-opacity-10"
              >
                <img
                  :src="book.cover || defaultCover"
                  :alt="book.title"
                  class="book-cover-img"
                  @error="(e) => (e.target.src = defaultCover)"
                />
                <span
                  class="badge bg-primary bg-gradient position-absolute top-0 end-0 m-3 rounded-pill px-3 py-2 shadow-sm fw-semibold"
                >
                  {{ book.genre || book.category || "General" }}
                </span>
              </div>

              <div class="card-body p-3 p-xl-4 text-start" dir="ltr">
                <h5
                  class="card-title fw-bold text-dark text-truncate mb-1"
                  :title="book.title"
                >
                  {{ book.title }}
                </h5>
                <p class="card-text text-muted small mb-2">
                  By
                  <span class="fw-semibold text-secondary">{{
                    book.authorName || book.author
                  }}</span>
                </p>

                <div
                  class="d-flex align-items-center justify-content-between my-2"
                >
                  <span class="text-warning small fw-bold">
                    ★ {{ getBookRating(book) }}
                  </span>
                  <span class="fw-bold text-primary fs-5">
                    ${{ getBookPrice(book) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="p-3 p-xl-4 pt-0 text-start" dir="ltr">
              <router-link
                :to="'/books/' + book.id"
                class="btn btn-primary bg-gradient w-100 rounded-3 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 shadow-sm border-0 view-btn"
              >
                <span>View Details</span>
                <span>→</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useBooksStore } from "@/stores/books";

const priceMap = {
  1: { price: "18.99", rating: "4.9" },
  2: { price: "14.50", rating: "4.7" },
  3: { price: "16.25", rating: "4.8" },
  4: { price: "21.00", rating: "4.6" },
  5: { price: "12.99", rating: "4.5" },
  6: { price: "19.50", rating: "4.9" },
  7: { price: "15.00", rating: "4.4" },
  8: { price: "17.80", rating: "4.7" },
};

const defaultBooks = [
  {
    id: "1",
    title: "Atomic Habits",
    authorName: "James Clear",
    genre: "Self-Help",
    price: "18.99",
    rating: "4.9",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
  },
  {
    id: "2",
    title: "Psychology of Money",
    authorName: "Morgan Housel",
    genre: "Finance",
    price: "14.50",
    rating: "4.7",
    cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400",
  },
  {
    id: "3",
    title: "Deep Work",
    authorName: "Cal Newport",
    genre: "Productivity",
    price: "16.25",
    rating: "4.8",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
  },
  {
    id: "4",
    title: "Project Hail Mary",
    authorName: "Andy Weir",
    genre: "Sci-Fi",
    price: "21.00",
    rating: "4.6",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
  },
];

const booksStore = useBooksStore();
const books = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const selectedGenre = ref("");
const defaultCover =
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400";

const getBookPrice = (book) => {
  if (book.price) return book.price;
  if (priceMap[book.id]) return priceMap[book.id].price;
  return (12 + (Number(book.id) || 1) * 2.5).toFixed(2);
};

const getBookRating = (book) => {
  if (book.rating) return book.rating;
  if (priceMap[book.id]) return priceMap[book.id].rating;
  return (4.2 + ((Number(book.id) || 1) % 8) * 0.1).toFixed(1);
};

onMounted(async () => {
  try {
    if (booksStore.fetchBooks) {
      await booksStore.fetchBooks();
    }
    if (booksStore.books && booksStore.books.length > 0) {
      books.value = booksStore.books;
    } else {
      books.value = defaultBooks;
    }
  } catch (e) {
    books.value = defaultBooks;
  } finally {
    loading.value = false;
  }
});

const genres = computed(() => {
  const allGenres = books.value
    .map((b) => b.genre || b.category)
    .filter(Boolean);
  return [...new Set(allGenres)];
});

const filteredBooks = computed(() => {
  return books.value.filter((book) => {
    const titleMatch = book.title
      ? book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      : false;
    const authorMatch =
      book.authorName || book.author
        ? (book.authorName || book.author)
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        : false;
    const matchesSearch = titleMatch || authorMatch;
    const matchesGenre = selectedGenre.value
      ? book.genre === selectedGenre.value ||
        book.category === selectedGenre.value
      : true;

    return matchesSearch && matchesGenre;
  });
});

const resetFilters = () => {
  searchQuery.value = "";
  selectedGenre.value = "";
};
</script>

<style scoped>
.books-page {
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
}

.book-card {
  transition:
    transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 0.3s ease;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
}

.book-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1) !important;
}

.cover-wrapper {
  height: 240px;
  width: 100%;
}

.book-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.book-card:hover .book-cover-img {
  transform: scale(1.05);
}

.form-select:focus,
.form-control:focus {
  outline: none;
  box-shadow: none;
}
</style>
