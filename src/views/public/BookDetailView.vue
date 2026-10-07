<template>
  <div class="book-details-page min-vh-100 py-5">
    <div class="container py-3">
      <div class="mb-4 text-start" dir="rtl">
        <router-link
          to="/books"
          class="btn btn-primary rounded-pill px-4 shadow-sm d-inline-flex align-items-center gap-2 custom-back-btn"
        >
          <span>→</span>
          <span class="fw-semibold">العودة لقائمة الكتب</span>
        </router-link>
      </div>

      <div v-if="loading" class="text-center py-5 my-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="text-muted mt-2">جاري تحميل تفاصيل الكتاب...</p>
      </div>

      <div
        v-else-if="!book"
        class="text-center py-5 bg-white rounded-5 shadow-sm border my-4"
      >
        <div class="display-4 mb-3">⚠️</div>
        <h4 class="fw-bold text-dark mb-2">الكتاب غير موجود</h4>
        <p class="text-muted mb-4">لم نتمكن من العثور على بيانات هذا الكتاب</p>
        <router-link to="/books" class="btn btn-primary rounded-pill px-4">
          عرض كل الكتب
        </router-link>
      </div>

      <div v-else class="row g-4 justify-content-center">
        <div class="col-lg-10">
          <div
            class="card border-0 rounded-4 bg-white shadow-sm overflow-hidden p-4 p-md-5"
          >
            <div class="row g-4 align-items-center">
              <div class="col-md-5 text-center">
                <div
                  class="cover-wrapper rounded-4 overflow-hidden shadow-lg position-relative mx-auto mb-3"
                  style="max-width: 300px; height: 380px"
                >
                  <img
                    :src="book.cover || defaultCover"
                    :alt="book.title"
                    class="w-100 h-100 object-fit-cover"
                    @error="(e) => (e.target.src = defaultCover)"
                  />
                  <span
                    class="badge bg-primary bg-gradient position-absolute top-0 end-0 m-3 rounded-pill px-3 py-2 shadow-sm fw-semibold"
                  >
                    {{ book.genre || book.category || "General" }}
                  </span>
                </div>
              </div>

              <div class="col-md-7 text-start" dir="ltr">
                <div class="d-flex align-items-center gap-2 mb-2 flex-wrap">
                  <span
                    class="badge bg-success bg-opacity-10 text-success fw-semibold px-3 py-1.5 rounded-pill"
                  >
                    In Stock
                  </span>
                  <span
                    class="badge bg-secondary bg-opacity-10 text-secondary fw-semibold px-3 py-1.5 rounded-pill"
                  >
                    Published: {{ book.publishedYear || "2021" }}
                  </span>
                </div>

                <h1 class="fw-bold text-dark display-6 mb-2">
                  {{ book.title }}
                </h1>
                <p class="text-muted fs-6 mb-3">
                  By
                  <span class="fw-bold text-primary">{{
                    book.authorName || book.author || "Unknown Author"
                  }}</span>
                </p>

                <div
                  class="d-flex align-items-center gap-4 py-3 my-3 border-top border-bottom border-light"
                >
                  <div>
                    <span class="text-muted small d-block mb-1">Price</span>
                    <span class="display-6 fw-bold text-primary"
                      >${{ getBookPrice(book) }}</span
                    >
                  </div>
                  <div class="vr"></div>
                  <div>
                    <span class="text-muted small d-block mb-1">Rating</span>
                    <div
                      class="d-flex align-items-center gap-1 text-warning fw-bold fs-5"
                    >
                      <span>★</span>
                      <span>{{ getBookRating(book) }}</span>
                      <span class="text-muted small fw-normal ms-1"
                        >(150+ reviews)</span
                      >
                    </div>
                  </div>
                </div>

                <div class="mb-4">
                  <h6 class="fw-bold text-dark mb-2 text-start" dir="rtl">
                    نبذة عن الكتاب:
                  </h6>
                  <p class="text-secondary leading-relaxed mb-0">
                    {{
                      book.description ||
                      book.bio ||
                      "Rules for focused success in a distracted world, helping you master complex information quickly and achieve deep work efficiency."
                    }}
                  </p>
                </div>

                <div class="d-flex flex-wrap gap-3 pt-2">
                  <button
                    class="btn btn-primary rounded-pill px-5 py-2.5 fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
                  >
                    <span>🛒</span>
                    <span>إضافة إلى السلة</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
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
    publishedYear: "2018",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    description:
      "An extremely practical guide to breaking bad behaviors and adopting good ones in four step-by-step frameworks.",
  },
  {
    id: "2",
    title: "Psychology of Money",
    authorName: "Morgan Housel",
    genre: "Finance",
    price: "14.50",
    rating: "4.7",
    publishedYear: "2020",
    cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400",
    description: "Timeless lessons on wealth, greed, and happiness.",
  },
  {
    id: "3",
    title: "Deep Work",
    authorName: "Cal Newport",
    genre: "Productivity",
    price: "16.25",
    rating: "4.8",
    publishedYear: "2016",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    description:
      "Rules for focused success in a distracted world, helping you master complex information quickly.",
  },
  {
    id: "4",
    title: "Project Hail Mary",
    authorName: "Andy Weir",
    genre: "Sci-Fi",
    price: "21.00",
    rating: "4.6",
    publishedYear: "2021",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
    description:
      "A lone astronaut must save the earth from disaster in this science fiction adventure.",
  },
];

const route = useRoute();
const booksStore = useBooksStore();
const book = ref(null);
const loading = ref(true);
const defaultCover =
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400";

const getBookPrice = (b) => {
  if (b.price) return b.price;
  if (priceMap[b.id]) return priceMap[b.id].price;
  return (12 + (Number(b.id) || 1) * 2.5).toFixed(2);
};

const getBookRating = (b) => {
  if (b.rating) return b.rating;
  if (priceMap[b.id]) return priceMap[b.id].rating;
  return (4.2 + ((Number(b.id) || 1) % 8) * 0.1).toFixed(1);
};

onMounted(async () => {
  const bookId = route.params.id;

  try {
    if (booksStore.fetchBooks) {
      await booksStore.fetchBooks();
    }

    if (booksStore.books && booksStore.books.length > 0) {
      book.value = booksStore.books.find(
        (b) => String(b.id) === String(bookId),
      );
    }

    if (!book.value) {
      const res = await fetch(`http://localhost:3000/books/${bookId}`);
      if (res.ok) {
        book.value = await res.json();
      }
    }

    if (!book.value) {
      book.value = defaultBooks.find((b) => String(b.id) === String(bookId));
    }
  } catch (err) {
    book.value = defaultBooks.find((b) => String(b.id) === String(bookId));
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.book-details-page {
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
}

.leading-relaxed {
  line-height: 1.7;
}

.object-fit-cover {
  object-fit: cover;
}
</style>
