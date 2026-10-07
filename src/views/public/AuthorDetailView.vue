<template>
  <div class="author-details-page min-vh-100 py-5">
    <div class="container py-3">
      <div class="mb-4 text-start" dir="rtl">
        <router-link
          to="/authors"
          class="btn btn-primary rounded-pill px-4 shadow-sm d-inline-flex align-items-center gap-2 custom-back-btn"
        >
          <span>→</span>
          <span class="fw-semibold">العودة لقائمة المؤلفين</span>
        </router-link>
      </div>

      <div v-if="loading" class="text-center py-5 my-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="text-muted mt-2">جاري تحميل بروفايل المؤلف والكتب...</p>
      </div>

      <div
        v-else-if="!author"
        class="text-center py-5 bg-white rounded-5 shadow-sm border my-4"
      >
        <div class="display-4 mb-3">⚠️</div>
        <h4 class="fw-bold text-dark mb-2">المؤلف غير موجود</h4>
        <p class="text-muted mb-4">لم نتمكن من العثور على بيانات هذا المؤلف</p>
        <router-link to="/authors" class="btn btn-primary rounded-pill px-4">
          عرض كل المؤلفين
        </router-link>
      </div>

      <div v-else class="row g-4 justify-content-center">
        <div class="col-lg-11">
          <div
            class="card border-0 rounded-4 bg-white shadow-sm overflow-hidden mb-5"
          >
            <div class="card-accent-bar"></div>
            <div class="card-body p-4 p-md-5">
              <div
                class="d-md-flex align-items-center gap-4 text-start"
                dir="ltr"
              >
                <div
                  class="avatar-box rounded-4 d-flex align-items-center justify-content-center fw-bold text-white display-3 shadow-sm mb-3 mb-md-0"
                >
                  {{ author.name ? author.name.charAt(0) : "A" }}
                </div>
                <div class="flex-grow-1">
                  <div class="d-flex align-items-center gap-2 mb-2">
                    <span
                      class="badge bg-primary bg-opacity-10 text-primary fw-semibold px-3 py-1.5 rounded-pill"
                    >
                      Verified Author
                    </span>
                    <span
                      class="badge bg-success bg-opacity-10 text-success fw-semibold px-3 py-1.5 rounded-pill"
                    >
                      {{ authorBooks.length }}
                      {{
                        authorBooks.length === 1
                          ? "Book Available"
                          : "Books Available"
                      }}
                    </span>
                  </div>
                  <h1 class="fw-bold text-dark mb-2 display-6">
                    {{ author.name }}
                  </h1>
                  <p class="text-secondary fs-6 leading-relaxed mb-0">
                    {{
                      author.bio ||
                      "Author and industry expert with multiple publications available in our digital library."
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="text-start mb-4" dir="rtl">
            <h3 class="fw-bold text-dark mb-1">الكتب المتوفرة في المكتبة</h3>
            <p class="text-muted small">
              تصفح وقُم بقراءة مؤلفات {{ author.name }} المتاحة حالياً
            </p>
          </div>

          <div
            v-if="authorBooks.length === 0"
            class="card border-0 rounded-4 bg-white shadow-sm p-5 text-center"
          >
            <div class="display-5 mb-2">📚</div>
            <h5 class="fw-bold text-dark mb-1">
              لا توجد كتب مسجلة لهذا المؤلف حالياً
            </h5>
            <p class="text-muted small mb-0">
              تابعنا قريباً لإضافة المزيد من إصدارات هذا الكاتب.
            </p>
          </div>

          <div v-else class="row g-4" dir="ltr">
            <div
              v-for="book in authorBooks"
              :key="book.id"
              class="col-12 col-md-6 col-lg-4"
            >
              <div
                class="card h-100 border-0 shadow-sm rounded-4 bg-white book-card overflow-hidden d-flex flex-column justify-content-between"
              >
                <div>
                  <div
                    class="book-cover-wrapper bg-light d-flex align-items-center justify-content-center p-4 position-relative"
                  >
                    <span
                      class="badge bg-dark text-white position-absolute top-0 end-0 m-3 rounded-pill px-2.5 py-1 small"
                    >
                      {{ book.category || book.genre || "Literature" }}
                    </span>
                    <div
                      class="book-mock-cover shadow rounded-3 d-flex align-items-center justify-content-center text-center p-3"
                    >
                      <div>
                        <div class="fs-1 mb-1">📖</div>
                        <div class="fw-bold text-white small text-truncate-2">
                          {{ book.title }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="p-4 text-start">
                    <h5
                      class="fw-bold text-dark mb-1 text-truncate"
                      :title="book.title"
                    >
                      {{ book.title }}
                    </h5>
                    <p class="text-muted small mb-3">By {{ author.name }}</p>

                    <div
                      class="d-flex align-items-center justify-content-between mb-3"
                    >
                      <div class="text-warning small fw-bold">
                        ★ {{ getBookRating(book) }}
                        <span class="text-muted fw-normal">(120+ reviews)</span>
                      </div>
                      <div class="fw-bold text-primary fs-5">
                        ${{ getBookPrice(book) }}
                      </div>
                    </div>

                    <p class="text-secondary small text-truncate-2 mb-0">
                      {{
                        book.description ||
                        "An exceptionally engaging book from this author available in our collection."
                      }}
                    </p>
                  </div>
                </div>

                <div class="p-4 pt-0 border-top border-light mt-3 text-start">
                  <router-link
                    :to="'/books/' + book.id"
                    class="btn btn-primary w-100 rounded-pill py-2 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2 mt-3"
                  >
                    <span>View Book Details</span>
                    <span>→</span>
                  </router-link>
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
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBooksStore } from "@/stores/books";

const priceMap = {
  1: { price: "18.99", rating: "4.9" },
  2: { price: "14.50", rating: "4.7" },
  3: { price: "16.25", rating: "4.8" },
  4: { price: "21.00", rating: "4.6" },
  5: { price: "17.99", rating: "4.9" },
  6: { price: "15.50", rating: "4.8" },
};

const defaultAuthors = [
  {
    id: "1",
    name: "James Clear",
    bio: "Author and speaker focused on habits, decision making, and continuous improvement.",
  },
  {
    id: "2",
    name: "Morgan Housel",
    bio: "Partner at Collaborative Fund and former columnist at The Wall Street Journal.",
  },
  {
    id: "3",
    name: "Cal Newport",
    bio: "Computer science professor at Georgetown University and author of digital minimalism books.",
  },
  {
    id: "4",
    name: "Andy Weir",
    bio: "Former software engineer who became a bestselling science fiction novelist.",
  },
  {
    id: "5",
    name: "Kazuo Ishiguro",
    bio: "Nobel Prize-winning British novelist, screenwriter, and short-story writer.",
  },
  {
    id: "6",
    name: "Matt Haig",
    bio: "English author and journalist known for non-fiction and speculative fiction.",
  },
];

const route = useRoute();
const booksStore = useBooksStore();
const author = ref(null);
const serverBooks = ref([]);
const loading = ref(true);

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

const authorBooks = computed(() => {
  const currentAuthorId = String(route.params.id).trim();
  let combinedBooks = [];

  if (serverBooks.value && serverBooks.value.length > 0) {
    combinedBooks = serverBooks.value;
  } else if (booksStore.books && booksStore.books.length > 0) {
    combinedBooks = booksStore.books;
  }

  return combinedBooks.filter((b) => {
    const bookAuthId =
      b.authorId !== undefined && b.authorId !== null
        ? String(b.authorId).trim()
        : null;
    const matchId = bookAuthId === currentAuthorId;

    const currentAuthorName = author.value?.name
      ? author.value.name.toLowerCase().trim()
      : "";
    const bookAuthorName = (b.author || b.authorName || b.writer || "")
      .toLowerCase()
      .trim();

    const matchName =
      currentAuthorName &&
      bookAuthorName &&
      (bookAuthorName === currentAuthorName ||
        bookAuthorName.includes(currentAuthorName) ||
        currentAuthorName.includes(bookAuthorName));

    return matchId || matchName;
  });
});

onMounted(async () => {
  const authorId = route.params.id;

  try {
    try {
      const booksRes = await fetch("http://localhost:3000/books");
      if (booksRes.ok) {
        serverBooks.value = await booksRes.json();
      }
    } catch (e) {}

    if (booksStore.fetchBooks) {
      await booksStore.fetchBooks();
    }

    if (booksStore.fetchAuthors) {
      await booksStore.fetchAuthors();
    }

    if (booksStore.authors && booksStore.authors.length > 0) {
      author.value = booksStore.authors.find(
        (a) => String(a.id) === String(authorId),
      );
    }

    if (!author.value) {
      try {
        const res = await fetch(`http://localhost:3000/authors/${authorId}`);
        if (res.ok) {
          author.value = await res.json();
        }
      } catch (e) {}
    }

    if (!author.value) {
      author.value = defaultAuthors.find(
        (a) => String(a.id) === String(authorId),
      );
    }
  } catch (err) {
    author.value = defaultAuthors.find(
      (a) => String(a.id) === String(authorId),
    );
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.author-details-page {
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
}

.custom-back-btn {
  background-color: #0d6efd !important;
  color: #ffffff !important;
  border: none !important;
  transition: all 0.2s ease-in-out;
}

.custom-back-btn:hover {
  background-color: #0b5ed7 !important;
  color: #ffffff !important;
  transform: translateX(-3px);
}

.card-accent-bar {
  height: 5px;
  width: 100%;
  background: linear-gradient(90deg, #0d6efd, #0dcaf0);
}

.avatar-box {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  flex-shrink: 0;
}

.book-card {
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
}

.book-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 30px rgba(15, 23, 42, 0.08) !important;
}

.book-cover-wrapper {
  height: 180px;
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
}

.book-mock-cover {
  width: 110px;
  height: 140px;
  background: linear-gradient(135deg, #1e293b, #334155);
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.leading-relaxed {
  line-height: 1.6;
}
</style>
