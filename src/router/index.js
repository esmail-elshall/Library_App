import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import HomeView from "@/views/public/HomeView.vue";
import BooksView from "@/views/public/BooksView.vue";
import BookDetailView from "@/views/public/BookDetailView.vue";
import AuthorsView from "@/views/public/AuthorsView.vue";
import AuthorDetailView from "@/views/public/AuthorDetailView.vue";
import AboutView from "@/views/public/AboutView.vue";

import LoginView from "@/views/admin/LoginView.vue";
import DashboardView from "@/views/admin/DashboardView.vue";
import AdminOverviewView from "@/views/admin/AdminOverviewView.vue";
import AdminBooksView from "@/views/admin/AdminBooksView.vue";
import AdminAuthorsView from "@/views/admin/AdminAuthorsView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/books", name: "Books", component: BooksView },
  { path: "/books/:id", name: "BookDetail", component: BookDetailView },
  { path: "/authors", name: "Authors", component: AuthorsView },
  { path: "/authors/:id", name: "AuthorDetail", component: AuthorDetailView },
  { path: "/about", name: "About", component: AboutView },

  { path: "/admin/login", name: "AdminLogin", component: LoginView },

  {
    path: "/admin",
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      { path: "", name: "AdminOverview", component: AdminOverviewView },
      { path: "books", name: "AdminBooks", component: AdminBooksView },
      { path: "authors", name: "AdminAuthors", component: AdminAuthorsView },
    ],
  },

  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/admin/login");
  } else if (to.path === "/admin/login" && authStore.isAuthenticated) {
    next("/admin");
  } else {
    next();
  }
});

export default router;
