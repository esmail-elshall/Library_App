<template>
  <div class="d-flex min-vh-100 bg-light">
    <aside
      class="bg-dark text-white p-3 d-flex flex-column shadow"
      style="
        width: 260px;
        min-width: 260px;
        height: 100vh;
        position: sticky;
        top: 0;
        z-index: 1000;
      "
    >
      <div
        class="d-flex align-items-center gap-2 py-3 px-2 mb-3 border-bottom border-secondary"
      >
        <span class="fs-4">📊</span>
        <h5 class="fw-bold m-0 text-white">لوحة التحكم</h5>
      </div>

      <ul class="nav nav-pills flex-column gap-2 mb-auto">
        <li class="nav-item">
          <router-link
            to="/admin"
            class="nav-link text-white-50 d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold transition-all"
            exact-active-class="active text-white bg-primary shadow-sm"
          >
            <span>📌</span>
            <span>Overview</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/admin/books"
            class="nav-link text-white-50 d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold transition-all"
            exact-active-class="active text-white bg-primary shadow-sm"
          >
            <span>📚</span>
            <span>Manage Books</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/admin/authors"
            class="nav-link text-white-50 d-flex align-items-center gap-2 rounded-3 px-3 py-2 fw-semibold transition-all"
            exact-active-class="active text-white bg-primary shadow-sm"
          >
            <span>✍️</span>
            <span>Manage Authors</span>
          </router-link>
        </li>
      </ul>

      <div class="pt-3 border-top border-secondary">
        <button
          @click="handleLogout"
          class="btn btn-outline-danger w-100 fw-bold d-flex align-items-center justify-content-center gap-2 py-2 rounded-3 shadow-sm"
        >
          <span>🚪</span>
          <span>Exit Admin</span>
        </button>
      </div>
    </aside>

    <main class="flex-grow-1 p-4 overflow-auto">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push("/admin/login");
};
</script>

<style scoped>
.nav-link:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.08);
  color: #fff !important;
}

.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>
