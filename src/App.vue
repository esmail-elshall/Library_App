<template>
  <div class="d-flex flex-column min-vh-100">
    <Navbar />
    <main class="flex-grow-1">
      <RouterView />
    </main>
    <AiChatbot />
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import AiChatbot from "@/components/AiChatbot.vue";
</script>
