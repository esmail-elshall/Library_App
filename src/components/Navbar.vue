<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top shadow-sm py-3"
  >
    <div class="container">
      <router-link
        to="/"
        class="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2"
      >
        <span>📚</span>
        <span class="brand-text">Library App</span>
      </router-link>

      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center gap-1">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link px-3 rounded-pill fw-medium"
              active-class="active-link"
            >
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/books"
              class="nav-link px-3 rounded-pill fw-medium"
              active-class="active-link"
            >
              Books
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/authors"
              class="nav-link px-3 rounded-pill fw-medium"
              active-class="active-link"
            >
              Authors
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/about"
              class="nav-link px-3 rounded-pill fw-medium"
              active-class="active-link"
            >
              About
            </router-link>
          </li>
        </ul>

        <div class="d-flex ms-lg-3 mt-3 mt-lg-0">
          <router-link
            to="/admin"
            class="btn btn-outline-light btn-sm rounded-pill px-3 fw-semibold d-flex align-items-center gap-2"
          >
            <span>⚙️</span> Admin Dashboard
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.custom-navbar {
  background-color: #1e293b !important;
  backdrop-filter: blur(10px);
}

.brand-text {
  background: linear-gradient(135deg, #38bdf8, #818cf8);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-link {
  color: #94a3b8 !important;
  transition: all 0.25s ease;
}

.nav-link:hover {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.08);
}

.active-link {
  color: #ffffff !important;
  background-color: #0d6efd !important;
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.35);
}
</style>
