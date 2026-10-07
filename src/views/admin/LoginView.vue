<template>
  <div class="container py-5">
    <div class="row justify-content-center py-5">
      <div class="col-md-5">
        <div class="card border-0 shadow-lg rounded-4 p-4">
          <h3 class="fw-bold text-center mb-4 text-dark">تسجيل دخول المسؤول</h3>
          <div v-if="errorMsg" class="alert alert-danger py-2 small rounded-3">
            {{ errorMsg }}
          </div>
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label fw-semibold">اسم المستخدم</label>
              <input
                v-model="username"
                type="text"
                class="form-control rounded-3"
                placeholder="admin"
                required
              />
            </div>
            <div class="mb-4">
              <label class="form-label fw-semibold">كلمة المرور</label>
              <input
                v-model="password"
                type="password"
                class="form-control rounded-3"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary w-100 fw-bold py-2 rounded-3"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");
const errorMsg = ref("");

const handleLogin = () => {
  if (authStore.login(username.value, password.value)) {
    router.push("/admin");
  } else {
    errorMsg.value = "بيانات الدخول غير صحيحة! (admin / admin123)";
  }
};
</script>
