<template>
  <div class="home-page bg-light min-vh-100">
    <section class="bg-dark text-white py-5 position-relative overflow-hidden">
      <div class="container py-4 position-relative z-1">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <span class="badge bg-primary px-3 py-2 rounded-pill mb-3 fw-normal"
              >مرحباً بك في المكتبة الرقمية 📖</span
            >
            <h1 class="display-4 fw-bold mb-3">
              اكتشف أحدث الكتب وأشهر المؤلفين
            </h1>
            <p class="lead text-white-50 mb-4">
              منصة متكاملة لتصفح أحدث الكتب القيمة، التعرف على سيرة أشهر
              الكُتاب، وإدارة المحتوى بسهولة وذكاء.
            </p>
            <div class="d-flex gap-3">
              <router-link
                to="/books"
                class="btn btn-primary btn-lg fw-bold rounded-3 px-4 shadow"
              >
                تصفح الكتب
              </router-link>
              <router-link
                to="/authors"
                class="btn btn-outline-light btn-lg fw-bold rounded-3 px-4"
              >
                المؤلفون
              </router-link>
            </div>
          </div>
          <div class="col-lg-5 text-center">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600"
              class="img-fluid rounded-4 shadow-lg border border-secondary"
              alt="Library Hero"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="container py-5">
      <div class="row g-4 text-center">
        <div class="col-md-4">
          <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div class="fs-1 text-primary mb-2">📚</div>
            <h4 class="fw-bold text-dark">مكتبة متجددة</h4>
            <p class="text-muted small m-0">
              تصفح عناوين الكتب والروايات ومختلف المجالات مع تفاصيل شاملة.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div class="fs-1 text-success mb-2">✍️</div>
            <h4 class="fw-bold text-dark">نخبة الكُتّاب</h4>
            <p class="text-muted small m-0">
              تعرف على سير الكُتاب والمؤلفين وأشهر أعمالهم الأدبية.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div class="fs-1 text-warning mb-2">🤖</div>
            <h4 class="fw-bold text-dark">مساعد AI ذكي</h4>
            <p class="text-muted small m-0">
              استعن بالذكاء الاصطناعي لتلخيص الأعمال والإجابة عن أسئلتك.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
