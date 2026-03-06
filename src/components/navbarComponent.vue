<template>
  <nav class="navbar px-6">
    <!-- Brand -->
    <div class="navbar-brand">
      <div class="brand-icon-wrap">
        <v-img
          src="@/assets/computer-chip2size.png"
          alt="Structure Machine Logo"
          max-width="32"
          contain
        />
      </div>
      <div class="brand-text">
        <span class="brand-name">Structure</span>
        <span class="brand-name">Machine</span>
      </div>
    </div>

    <!-- Nav links -->
    <div class="navbar-links">
      <router-link to="/" class="nav-link" exact>
        <v-icon small class="nav-link-icon">mdi-home-outline</v-icon>
        <span>Home</span>
      </router-link>
      <router-link to="/about" class="nav-link">
        <v-icon small class="nav-link-icon">mdi-information-outline</v-icon>
        <span>About</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background: #0d0d0f;
  border-bottom: 1px solid #1a1a28;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  position: sticky;
  top: 0;
  z-index: 100;
}

/* ── Brand ── */
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.brand-icon-wrap {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, #e53935, #b71c1c);
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 3px 14px rgba(229, 57, 53, 0.3);
}
.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}
.brand-name {
  font-size: .72rem;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #e0e0f0;
}

/* ── Links ── */
.navbar-links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #4a4a6a;
  text-decoration: none;
  border: 1px solid transparent;
  transition: color .15s, background .15s, border-color .15s;
}
.nav-link:hover {
  color: #c0c0e0;
  background: #1a1a28;
  border-color: #222236;
}
.nav-link.router-link-active {
  color: #ef9a9a;
  background: rgba(229, 57, 53, 0.08);
  border-color: rgba(229, 57, 53, 0.2);
}
.nav-link-icon {
  color: inherit !important;
  font-size: 14px !important;
}
</style>