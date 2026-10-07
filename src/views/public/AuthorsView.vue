<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h2 class="fw-bold">مؤلفو الكتب</h2>
      <p class="text-muted">
        تعرف على أبرز المؤلفين وأعمالهم المتاحة في المكتبة
      </p>
    </div>

    <div v-if="authorsStore.loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">جاري التحميل...</span>
      </div>
    </div>

    <div v-else class="row g-4">
      <div
        v-for="author in authorsStore.authors"
        :key="author.id"
        class="col-md-4 col-sm-6"
      >
        <div class="card border-0 shadow-sm rounded-4 h-100 p-3">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div
              class="rounded-circle bg-primary bg-opacity-10 text-primary fw-bold d-flex align-items-center justify-content-center flex-shrink-0"
              style="width: 60px; height: 60px; font-size: 1.25rem"
            >
              <img
                v-if="author.photo && author.photo.startsWith('http')"
                :src="author.photo"
                :alt="author.name"
                class="rounded-circle object-fit-cover w-100 h-100"
              />
              <span v-else>
                {{ author.name ? author.name.charAt(0).toUpperCase() : "A" }}
              </span>
            </div>

            <div>
              <h5 class="fw-bold mb-1">{{ author.name }}</h5>
              <span class="badge bg-light text-primary border">{{
                author.nationality || "كاتب"
              }}</span>
            </div>
          </div>
          <p class="text-muted small mb-3 flex-grow-1">
            {{ author.bio || "لا توجد سيرة ذاتية متاحة حالياً." }}
          </p>
          <div class="text-end">
            <router-link
              :to="`/authors/${author.id}`"
              class="btn btn-outline-primary btn-sm rounded-2 px-3"
            >
              الملف الشخصي
            </router-link>
          </div>
        </div>
      </div>

      <div
        v-if="!authorsStore.authors || authorsStore.authors.length === 0"
        class="text-center py-5 text-muted"
      >
        لا يوجد مؤلفون متاحون حالياً.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthorsStore } from "@/stores/authors";

const authorsStore = useAuthorsStore();

onMounted(async () => {
  if (authorsStore.fetchAuthors) {
    await authorsStore.fetchAuthors();
  }
});
</script>

<style scoped>
.card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
}
</style>
