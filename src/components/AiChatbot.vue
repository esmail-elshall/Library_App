<template>
  <div class="position-fixed bottom-0 end-0 m-4" style="z-index: 1050">
    <button
      v-if="!isOpen"
      @click="isOpen = true"
      class="btn btn-primary rounded-circle shadow-lg p-3 d-flex align-items-center justify-content-center"
      style="width: 60px; height: 60px"
    >
      <span class="fs-4">🤖</span>
    </button>

    <div
      v-else
      class="card shadow-lg border-0 rounded-4"
      style="width: 360px; max-height: 520px"
    >
      <div
        class="card-header bg-primary text-white d-flex justify-content-between align-items-center rounded-top-4 py-3"
      >
        <div class="d-flex align-items-center gap-2">
          <span class="fs-5">🤖</span>

          <div>
            <h6 class="mb-0 fw-bold">مساعد المكتبة الذكي</h6>
            <small class="text-white-50" style="font-size: 11px">
              متصل بـ Gemini AI 🚀
            </small>
          </div>
        </div>

        <button
          @click="isOpen = false"
          class="btn-close btn-close-white ms-auto"
        ></button>
      </div>

      <div
        ref="messagesContainer"
        class="card-body overflow-y-auto p-3 bg-light"
        style="height: 330px"
      >
        <div v-for="(msg, index) in messages" :key="index" class="mb-3">
          <div
            :class="[
              'd-flex',
              msg.role === 'user'
                ? 'justify-content-end'
                : 'justify-content-start',
            ]"
          >
            <div
              :class="[
                'p-3 rounded-3 dir-rtl',
                msg.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white shadow-sm text-dark border',
              ]"
              style="font-size: 14px; white-space: pre-line; max-width: 75%"
            >
              {{ msg.text }}
            </div>
          </div>
        </div>

        <div v-if="loading" class="text-start mb-2">
          <div
            class="bg-white p-2 px-3 rounded-3 shadow-sm d-inline-block border"
          >
            <span class="spinner-grow spinner-grow-sm text-primary me-1"></span>
            <small class="text-muted">جاري التفكير...</small>
          </div>
        </div>
      </div>

      <div class="card-footer bg-white border-0 p-2">
        <form @submit.prevent="sendMessage" class="d-flex gap-2">
          <input
            v-model="inputQuery"
            type="text"
            class="form-control form-control-sm dir-rtl"
            placeholder="اسألني عن الكتب أو المؤلفين..."
            :disabled="loading"
          />

          <button
            type="submit"
            class="btn btn-primary btn-sm px-3"
            :disabled="!inputQuery.trim() || loading"
          >
            إرسال
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { useBooksStore } from "@/stores/books";
import { useAuthorsStore } from "@/stores/authors";
import { useRoute } from "vue-router";
import { watch, onMounted } from "vue";

const GEMINI_API_KEY = "AQ.Ab8RN6JmvvDYiH146zimzJRKOFp_k_7wgSo2JAA5HIpn969qMA";

const route = useRoute();
const currentBook = ref(null);

const booksStore = useBooksStore();
const authorsStore = useAuthorsStore();

const isOpen = ref(false);
const inputQuery = ref("");
const loading = ref(false);
const messagesContainer = ref(null);

const messages = ref([
  {
    role: "bot",
    text: "مرحباً بك! 👋 أنا مساعدك الذكي للمكتبة. يمكنك سؤالي عن الكتب والمؤلفين أو أي شيء متعلق بالمكتبة.",
  },
]);

const scrollToBottom = async () => {
  await nextTick();

  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const sendMessage = async () => {
  const query = inputQuery.value.trim();

  if (!query) {
    return;
  }

  messages.value.push({
    role: "user",
    text: query,
  });

  inputQuery.value = "";
  loading.value = true;

  await scrollToBottom();

  try {
    const currentData = {
      books: booksStore.books || [],
      authors: authorsStore.authors || [],
    };

    const systemInstruction = `
أنت مساعد ذكي لموقع مكتبة رقمية.

هذه هي البيانات الحالية الموجودة في المكتبة:

${JSON.stringify(currentData, null, 2)}

قواعد مهمة:

1. استخدم بيانات الكتب والمؤلفين الموجودة في البيانات السابقة للإجابة عن أسئلة المستخدم المتعلقة بالمكتبة.

2. إذا سأل المستخدم عن كتاب موجود في البيانات، استخدم بياناته مثل:
العنوان، المؤلف، السنة، التصنيفات، الوصف وغيرها.

3. إذا سأل المستخدم عن مؤلف موجود في البيانات، استخدم بيانات المؤلف المتاحة.

4. إذا كانت المعلومة غير موجودة في بيانات المكتبة، لا تخترع معلومة وتدعي أنها موجودة في المكتبة.

5. يمكنك الإجابة عن المعلومات العامة المتعلقة بالكتب والقراءة والأدب حتى لو لم تكن موجودة في بيانات المكتبة.

6. إذا كان السؤال متعلقاً بالمكتبة، حاول أن تجعل إجابتك مرتبطة بالبيانات الحالية للمكتبة.

7. أجب باللغة العربية بطريقة واضحة وطبيعية ومختصرة.

8. حافظ على سياق المحادثة السابقة.

9. إذا قال المستخدم مثلاً:
"طب ومؤلفه؟"
أو:
"قولي كتبه"
أو:
"إيه الكتاب التاني؟"
فحاول فهم المقصود من سياق المحادثة السابقة.

10. لا تقل للمستخدم أنك لا تستطيع الإجابة لمجرد أن السؤال يحتاج إلى معلومات عامة. استخدم معرفتك العامة عندما يكون السؤال عاماً، لكن لا تنسب هذه المعلومات إلى بيانات المكتبة إذا لم تكن موجودة فيها.
`;

    const conversationHistory = messages.value.slice(1).map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [
        {
          text: message.text,
        },
      ],
    }));

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",

        headers: {
          "x-goog-api-key": GEMINI_API_KEY,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: systemInstruction,
              },
            ],
          },

          contents: conversationHistory,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);

      throw new Error(data?.error?.message || "Gemini API Error");
    }

    const answer = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join(" ");

    if (!answer) {
      throw new Error("No response from Gemini");
    }

    messages.value.push({
      role: "bot",
      text: answer,
    });
  } catch (error) {
    console.error("Chatbot Error:", error);

    messages.value.push({
      role: "bot",
      text: "عذراً، حدث خطأ أثناء الاتصال بـ Gemini AI. تأكد من الـ API Key وحاول مرة أخرى.",
    });
  } finally {
    loading.value = false;
    await scrollToBottom();
  }
};

const checkCurrentPageContext = () => {
  if (route.name === "book-details" || route.path.startsWith("/books/")) {
    const bookId = route.params.id;
    if (booksStore.books && booksStore.books.length > 0) {
      currentBook.value = booksStore.books.find(
        (b) => String(b.id) === String(bookId),
      );
    }
    if (currentBook.value) {
      messages.value.push({
        role: "assistant",
        text: `أهلاً بك! أرى أنك تتصفح كتاب "${currentBook.value.title}". كيف يمكنني مساعدتك حول هذا الكتاب؟`,
      });
    }
  } else {
    currentBook.value = null;
  }
};

watch(
  () => route.path,
  () => {
    checkCurrentPageContext();
  },
);

onMounted(() => {
  checkCurrentPageContext();
});
</script>

<style scoped>
.dir-rtl {
  direction: rtl;
  text-align: right;
}
</style>
