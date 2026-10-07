import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(
    localStorage.getItem("isAdminLoggedIn") === "true",
  );

  const login = (username, password) => {
    if (username === "admin" && password === "admin123") {
      isAuthenticated.value = true;
      localStorage.setItem("isAdminLoggedIn", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    isAuthenticated.value = false;
    localStorage.removeItem("isAdminLoggedIn");
  };

  return { isAuthenticated, login, logout };
});
