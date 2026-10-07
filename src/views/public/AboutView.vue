<template>
  <div class="about-page bg-light min-vh-100 py-5">
    <div class="container">
      <div class="text-center mb-5">
        <span
          class="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold mb-2"
          >عن المنصة</span
        >
        <h2 class="fw-bold text-dark display-6">عن المكتبة الرقمية</h2>
        <p class="text-muted max-w-600 mx-auto fs-5">
          مساحتك المعرفية الأولى لاستكشاف أحدث الكتب، والتعرف على كبار المؤلفين،
          وتجربة قراءة وإدارة سهلة ومتكاملة.
        </p>
      </div>

      <div class="row g-4 justify-content-center">
        <div class="col-lg-10">
          <div class="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
            <h4 class="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <span>📖</span> رؤيتنا وهدفنا
            </h4>
            <p class="text-secondary leading-relaxed fs-6">
              تم إنشاء هذه المنصة لتكون جسراً بين القارئ وعالم المعرفة. نهدف إلى
              تقديم تجربة رقمية سريعة ومنظمة تمكّن المستخدمين من تصفح الكتب،
              والوصول إلى تفاصيل الكُتاب والمؤلفين بكل سهولة، بالإضافة إلى توفير
              أدوات إدارة متقدمة لتحديث المحتوى بشكل دوري.
            </p>
          </div>

          <div class="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
            <h4 class="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
              <span>🌟</span> مميزات المنصة
            </h4>
            <div class="row g-3">
              <div class="col-md-6">
                <div class="p-3 bg-light rounded-3 border h-100">
                  <h6 class="fw-bold text-primary mb-2">
                    📚 دليلك الشامل للكتب
                  </h6>
                  <p class="small text-muted m-0">
                    تصفح الكتب مع تفاصيل دقيقة تشمل أسماء المؤلفين، سنة النشر،
                    والملخصات.
                  </p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="p-3 bg-light rounded-3 border h-100">
                  <h6 class="fw-bold text-success mb-2">✍️ موسوعة المؤلفين</h6>
                  <p class="small text-muted m-0">
                    تعرّف على سير الكُتّاب وجنسياتهم وأبرز مؤلفاتهم في مكان
                    واحد.
                  </p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="p-3 bg-light rounded-3 border h-100">
                  <h6 class="fw-bold text-warning mb-2">🤖 مساعد ذكي مدمج</h6>
                  <p class="small text-muted m-0">
                    دردش مع المساعد الذكي للحصول على ترشيحات سريعة وإجابات عن
                    محتوى المكتبة.
                  </p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="p-3 bg-light rounded-3 border h-100">
                  <h6 class="fw-bold text-info mb-2">⚙️ لوحة تحكم متكاملة</h6>
                  <p class="small text-muted m-0">
                    نظام إدارة مخصص لإضافة وتعديل وحذف الكتب والمؤلفين بسلاسة.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h4 class="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <span>❓</span> الأسئلة الشائعة (FAQ)
            </h4>

            <div class="accordion accordion-flush" id="faqAccordion">
              <div class="accordion-item border rounded-3 mb-2 overflow-hidden">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button fw-semibold collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq1"
                  >
                    كيف يمكنني البحث عن كتاب أو مؤلف معين؟
                  </button>
                </h2>
                <div
                  id="faq1"
                  class="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body text-muted small">
                    يمكنك الانتقال إلى قسم الكتب (Books) أو قسم المؤلفين
                    (Authors) من القائمة العلوية لتصفح جميع العناصر المتاحة وعرض
                    تفاصيلها.
                  </div>
                </div>
              </div>

              <div class="accordion-item border rounded-3 mb-2 overflow-hidden">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button fw-semibold collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq2"
                  >
                    من يمكنه تعديل بيانات المكتبة؟
                  </button>
                </h2>
                <div
                  id="faq2"
                  class="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div class="accordion-body text-muted small">
                    يتم التعديل حصراً عبر مسؤولي النظام من خلال تسجيل الدخول إلى
                    لوحة التحكم (Admin Dashboard).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.leading-relaxed {
  line-height: 1.8;
}
</style>
