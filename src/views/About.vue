<template>
  <v-container class="about-root py-10">
    <v-row justify="center">
      <v-col cols="12" md="9" lg="7">

        <!-- Profile card -->
        <div class="about-card mb-6">
          <div class="about-top">
            <div class="about-avatar">
              <span class="avatar-initials">AZ</span>
            </div>
            <div class="about-identity">
              <div class="about-name">Akram Zaitout</div>
              <div class="about-role">Software Developer · 1st-Year CS Student · Biskra University</div>
            </div>
          </div>
          <div class="about-divider"></div>
          <div class="about-skills mt-4">
            <span v-for="(skill, i) in skills" :key="i" class="skill-chip">{{ skill }}</span>
          </div>
        </div>

        <!-- Story -->
        <div class="story-card mb-5">
          <div class="story-eyebrow">
            <v-icon small class="mr-2" color="#c62828">mdi-book-open-outline</v-icon>
            The Story
          </div>
          <div class="about-divider mt-3 mb-5"></div>

          <p class="story-body">
            In my first year at the University of Biskra, I took a course called
            <span class="hl">Structure Machine</span> — the kind of course that covers the
            fundamentals most people only half-understand: number systems, binary arithmetic,
            Boolean logic, logic gates. The theory is solid, but working through it on paper
            gets tedious fast.
          </p>

          <blockquote class="story-quote">
            What if I just built a tool that does all of this automatically?
          </blockquote>

          <p class="story-body">
            So I did. Structure Machine started as a personal experiment and turned into a
            full interactive platform — something I genuinely wished existed when I was
            staring at Karnaugh maps at 2am. It converts numbers across bases in real time,
            visualizes every bit in a register, and simplifies Boolean expressions down to
            their minimal form.
          </p>

          <p class="story-body mb-0">
            It's not a commercial product. It's a CS student solving his own problems and
            deciding to make it available for everyone else dealing with the same material.
          </p>
        </div>

        <!-- Features heading -->
        <div class="features-label mb-3">
          <v-icon small class="mr-2" color="#2e2e48">mdi-cog-outline</v-icon>
          What it does
        </div>

        <!-- Module 1 -->
        <div class="module-card mb-4">
          <div class="module-header">
            <div class="module-num">01</div>
            <div>
              <div class="module-title">Number Systems & Bitwise Analysis</div>
              <div class="module-subtitle">Base conversion, signed numbers, bit visualization</div>
            </div>
          </div>
          <div class="about-divider my-3"></div>
          <div class="feature-list">
            <div class="feature-item">
              <span class="fdot fdot--cyan"></span>
              <div>
                <div class="feature-name">Base Conversion</div>
                <div class="feature-desc">
                  Type a number in any base and all four update instantly —
                  <span class="tag-inline">DEC</span>
                  <span class="tag-inline">BIN</span>
                  <span class="tag-inline">OCT</span>
                  <span class="tag-inline">HEX</span>
                </div>
              </div>
            </div>
            <div class="feature-item">
              <span class="fdot fdot--cyan"></span>
              <div>
                <div class="feature-name">Signed Number Representations</div>
                <div class="feature-desc">See how the same number looks under three different encoding schemes.</div>
                <div class="feature-tags mt-2">
                  <span class="tag">SVA</span>
                  <span class="tag">Ca1 — 1's complement</span>
                  <span class="tag">Ca2 — 2's complement</span>
                </div>
              </div>
            </div>
            <div class="feature-item">
              <span class="fdot fdot--cyan"></span>
              <div>
                <div class="feature-name">Bit Strip Visualizer</div>
                <div class="feature-desc">
                  Every bit rendered individually — sign bit highlighted separately,
                  overflow flagged clearly when the number doesn't fit in the chosen width.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Module 2 -->
        <div class="module-card">
          <div class="module-header">
            <div class="module-num module-num--green">02</div>
            <div>
              <div class="module-title">Boolean Algebra & Truth Tables</div>
              <div class="module-subtitle">Expression parsing, table generation, logic simplification</div>
            </div>
          </div>
          <div class="about-divider my-3"></div>
          <div class="feature-list">
            <div class="feature-item">
              <span class="fdot fdot--green"></span>
              <div>
                <div class="feature-name">Truth Table Generator</div>
                <div class="feature-desc">
                  Enter any Boolean expression using AND, OR, NOT — the app parses it
                  via an Infix → Postfix conversion and generates the complete truth table
                  with all intermediate columns shown.
                </div>
              </div>
            </div>
            <div class="feature-item">
              <span class="fdot fdot--green"></span>
              <div>
                <div class="feature-name">Logic Simplification</div>
                <div class="feature-desc">
                  Groups minterms using <span class="hl">Gray Code ordering</span> and extracts
                  prime implicants automatically — the same process you'd do by hand with a
                  Karnaugh map, but in milliseconds.
                </div>
              </div>
            </div>
          </div>
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'About',
  data: () => ({
    skills: ['Vue.js', 'Vuetify', 'JavaScript', 'HTML / CSS'],
  })
}
</script>

<style scoped>
.about-root { font-family: 'JetBrains Mono', 'Fira Code', monospace; }

/* ── shared card shell ── */
.about-card, .story-card, .module-card {
  background: #13131a;
  border: 1px solid #1e1e2e;
  border-radius: 14px;
  padding: 24px 28px;
}
.about-divider { height: 1px; background: #1a1a28; }

/* ── profile ── */
.about-top    { display: flex; align-items: center; gap: 18px; margin-bottom: 20px; }
.about-avatar {
  width: 56px; height: 56px; border-radius: 14px;
  background: linear-gradient(135deg, #c62828, #e53935);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; box-shadow: 0 4px 18px rgba(229,57,53,.28);
}
.avatar-initials { font-size: 1.1rem; font-weight: 900; color: white; letter-spacing: .06em; }
.about-name  { font-size: 1rem; font-weight: 800; color: #e0e0f0; letter-spacing: .02em; }
.about-role  { font-size: .62rem; color: #3a3a58; text-transform: uppercase; letter-spacing: .1em; margin-top: 4px; }
.about-skills{ display: flex; flex-wrap: wrap; gap: 6px; }
.skill-chip  {
  background: #0f0f18; border: 1px solid #1e1e30; border-radius: 6px;
  color: #4a4a7a; font-size: .68rem; font-weight: 700;
  letter-spacing: .08em; text-transform: uppercase; padding: 4px 11px;
  transition: color .15s, border-color .15s, background .15s; cursor: default;
}
.skill-chip:hover { background: rgba(229,57,53,.07); border-color: rgba(229,57,53,.25); color: #ef9a9a; }

/* ── story ── */
.story-eyebrow {
  font-size: .68rem; text-transform: uppercase; letter-spacing: .1em;
  color: #4a4a6a; font-weight: 700; display: flex; align-items: center;
}
.story-body {
  font-size: .84rem; line-height: 1.9; color: #5a5a7a;
  margin: 0 0 16px; font-family: inherit;
}
.story-body.mb-0 { margin-bottom: 0; }
.story-quote {
  font-size: .9rem; font-style: italic; line-height: 1.75;
  color: #8080b0; border-left: 3px solid #c62828;
  padding: 10px 0 10px 18px; margin: 20px 0 22px;
}
.hl { color: #ef9a9a; font-weight: 700; }

/* ── features ── */
.features-label {
  font-size: .64rem; text-transform: uppercase; letter-spacing: .12em;
  color: #2e2e48; font-weight: 700; display: flex; align-items: center;
}
.module-header  { display: flex; align-items: flex-start; gap: 16px; }
.module-num     { font-size: 1.4rem; font-weight: 900; color: rgba(77,208,225,.2); line-height: 1; flex-shrink: 0; }
.module-num--green { color: rgba(102,187,106,.2); }
.module-title   { font-size: .8rem; font-weight: 800; color: #c0c0e0; letter-spacing: .04em; }
.module-subtitle{ font-size: .68rem; color: #3a3a58; margin-top: 4px; letter-spacing: .02em; }
.feature-list   { display: flex; flex-direction: column; gap: 16px; }
.feature-item   { display: flex; align-items: flex-start; gap: 12px; }
.fdot           { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
.fdot--cyan     { background: #4dd0e1; box-shadow: 0 0 6px rgba(77,208,225,.4); }
.fdot--green    { background: #66bb6a; box-shadow: 0 0 6px rgba(102,187,106,.4); }
.feature-name   { font-size: .74rem; font-weight: 800; color: #8080b0; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 4px; }
.feature-desc   { font-size: .78rem; color: #4a4a6a; line-height: 1.75; }
.feature-tags   { display: flex; flex-wrap: wrap; gap: 5px; }
.tag {
  background: #0f0f18; border: 1px solid #1e1e30; border-radius: 4px;
  color: #5a5a8a; font-size: .65rem; font-weight: 700;
  padding: 3px 9px; letter-spacing: .06em;
}
.tag-inline {
  display: inline-block;
  background: #0f0f18; border: 1px solid #1e1e30; border-radius: 4px;
  color: #4dd0e1; font-size: .65rem; font-weight: 700;
  padding: 1px 6px; letter-spacing: .06em; margin: 0 2px;
  vertical-align: middle;
}
</style>