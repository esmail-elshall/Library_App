<template>
  <div class="container-fluid py-4">
    <div
      class="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded-4 shadow-sm"
    >
      <div>
        <h3 class="fw-bold m-0 text-dark">إدارة المؤلفين</h3>
        <p class="text-muted small m-0">
          إضافة، تعديل، وحذف المؤلفين في النظام
        </p>
      </div>
      <button
        @click="openAddModal"
        class="btn btn-primary fw-bold px-4 rounded-3 shadow-sm"
      >
        + إضافة مؤلف جديد
      </button>
    </div>

    <div
      v-if="authorsStore.loading"
      class="text-center py-5 bg-white rounded-4 shadow-sm"
    >
      <div
        class="spinner-border text-primary"
        style="width: 3rem; height: 3rem"
        role="status"
      ></div>
      <p class="mt-3 text-muted fw-semibold">جاري تحميل البيانات...</p>
    </div>

    <div
      v-else-if="authorsStore.error"
      class="alert alert-danger text-center my-4 p-4 rounded-4 shadow-sm"
    >
      <h5 class="fw-bold">حدث خطأ أثناء جلب البيانات!</h5>
      <p class="small text-muted">{{ authorsStore.error }}</p>
      <button
        @click="authorsStore.fetchAuthors()"
        class="btn btn-outline-danger btn-sm fw-bold px-4 mt-2"
      >
        إعادة المحاولة
      </button>
    </div>

    <div v-else class="card shadow-sm border-0 rounded-4 overflow-hidden">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 text-center">
            <thead class="table-light border-bottom">
              <tr class="text-secondary small text-uppercase">
                <th class="py-3">ID</th>
                <th class="py-3">الصورة</th>
                <th class="py-3">الاسم</th>
                <th class="py-3">الجنسية</th>
                <th class="py-3">السيرة الذاتية</th>
                <th class="py-3">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(author, index) in authorsStore.authors"
                :key="author.id"
                class="align-middle"
              >
                <td class="fw-bold text-muted">#{{ index + 1 }}</td>
                <td>
                  <img
                    :src="getAuthorImage(author)"
                    style="width: 48px; height: 48px; object-fit: cover"
                    class="rounded-circle border shadow-sm"
                    @error="handleImageError"
                  />
                </td>
                <td class="fw-bold text-dark">{{ author.name }}</td>
                <td>
                  <span
                    class="badge bg-secondary bg-opacity-10 text-secondary px-3 py-2 rounded-pill"
                  >
                    {{ author.nationality || "غير محدد" }}
                  </span>
                </td>
                <td
                  class="text-muted small text-truncate"
                  style="max-width: 200px"
                >
                  {{ author.bio || "لا توجد سيرة ذاتية" }}
                </td>
                <td>
                  <div class="d-flex justify-content-center gap-2">
                    <button
                      @click="openEditModal(author)"
                      class="btn btn-sm btn-outline-warning rounded-3 px-3 fw-bold"
                    >
                      تعديل
                    </button>
                    <button
                      @click="handleDelete(author.id)"
                      class="btn btn-sm btn-outline-danger rounded-3 px-3 fw-bold"
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
              <tr
                v-if="
                  !authorsStore.authors || authorsStore.authors.length === 0
                "
              >
                <td colspan="6" class="text-muted py-5">
                  لا يوجد مؤلفون حالياً.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      v-if="isModalOpen"
      class="modal fade show d-block"
      style="background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(3px)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 border-0 shadow-lg">
          <div class="modal-header border-bottom-0 pb-0">
            <h5 class="modal-title fw-bold text-dark">
              {{ isEditing ? "تعديل بيانات مؤلف" : "إضافة مؤلف جديد" }}
            </h5>
            <button @click="closeModal" class="btn-close"></button>
          </div>
          <form @submit.prevent="handleSave">
            <div class="modal-body py-4">
              <div class="mb-3">
                <label class="form-label fw-semibold text-dark"
                  >اسم المؤلف *</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  class="form-control rounded-3"
                  placeholder="أدخل اسم المؤلف"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold text-dark">الجنسية</label>
                <input
                  v-model="form.nationality"
                  type="text"
                  class="form-control rounded-3"
                  placeholder="مثال: مصري، بريطاني..."
                />
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold text-dark"
                  >رابط الصورة الشخصية</label
                >
                <input
                  v-model="form.image"
                  type="url"
                  class="form-control rounded-3"
                  placeholder="https://..."
                />
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold text-dark"
                  >السيرة الذاتية (Bio)</label
                >
                <textarea
                  v-model="form.bio"
                  class="form-control rounded-3"
                  rows="3"
                  placeholder="نبذة قصيرة عن الكاتب..."
                ></textarea>
              </div>
            </div>

            <div class="modal-footer border-top-0 pt-0">
              <button
                type="button"
                @click="closeModal"
                class="btn btn-light rounded-3 px-4"
              >
                إلغاء
              </button>
              <button
                type="submit"
                class="btn btn-primary px-4 fw-bold rounded-3"
              >
                حفظ البيانات
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthorsStore } from "@/stores/authors";

const authorsStore = useAuthorsStore();

const isModalOpen = ref(false);
const isEditing = ref(false);
const currentId = ref(null);

const defaultImage = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const form = ref({
  name: "",
  nationality: "",
  image: "",
  bio: "",
});

onMounted(async () => {
  if (authorsStore.fetchAuthors) await authorsStore.fetchAuthors();
});

const getAuthorImage = (author) => {
  return (
    author.image ||
    author.photo ||
    author.avatar ||
    author.cover ||
    defaultImage
  );
};

const handleImageError = (e) => {
  e.target.src = defaultImage;
};

const openAddModal = () => {
  isEditing.value = false;
  currentId.value = null;
  form.value = { name: "", nationality: "", image: "", bio: "" };
  isModalOpen.value = true;
};

const openEditModal = (author) => {
  isEditing.value = true;
  currentId.value = author.id;
  form.value = {
    name: author.name || "",
    nationality: author.nationality || "",
    image: author.image || author.photo || author.avatar || "",
    bio: author.bio || "",
  };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleSave = async () => {
  if (isEditing.value) {
    if (authorsStore.updateAuthor)
      await authorsStore.updateAuthor(currentId.value, form.value);
  } else {
    if (authorsStore.addAuthor) await authorsStore.addAuthor(form.value);
  }
  closeModal();
};

const handleDelete = async (id) => {
  if (confirm("هل أنت تأكد من حذف هذا المؤلف؟")) {
    if (authorsStore.deleteAuthor) await authorsStore.deleteAuthor(id);
  }
};
</script>
