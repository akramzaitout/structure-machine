<template>
  <v-container fluid class="tt-root pa-6">

    <!-- Header -->
    <div class="tt-header mb-6 d-flex align-center">
      <div class="tt-icon-wrap mr-4">
        <v-icon size="26" color="white">mdi-table-check</v-icon>
      </div>
      <div>
        <div class="tt-title">Truth Table</div>
        <div class="tt-subtitle">Boolean expression evaluator</div>
      </div>
      <v-spacer></v-spacer>
      <div v-if="table && table.length > 0" class="tt-stat">
        <span class="stat-num">{{ table[0].result.length }}</span>
        <span class="stat-label">rows</span>
        <span class="stat-sep mx-2">·</span>
        <span class="stat-num">{{ table.length }}</span>
        <span class="stat-label">columns</span>
      </div>
    </div>

    <!-- Input -->
    <v-card class="tt-card mb-5" elevation="0">
      <div class="px-5 pt-5 pb-4">
        <div class="field-label mb-2">
          <v-icon small class="mr-1" color="cyan lighten-1">mdi-function-variant</v-icon>
          Logic Expression
        </div>
        <div class="expr-input-wrap" :class="{ 'expr-input-wrap--focused': exprFocused, 'expr-input-wrap--error': hasError }">
          <input
            class="expr-input"
            v-model="functionExp"
            placeholder="e.g.  (A AND B) OR NOT C  ·  A . B + C  ·  A ⊕ B"
            spellcheck="false"
            @focus="exprFocused = true"
            @blur="exprFocused = false"
            @keyup.enter="generateTable"
            @input="hasError = false"
          />
          <button v-if="functionExp" class="expr-clear" @click="clearEvent" tabindex="-1">
            <v-icon small>mdi-close</v-icon>
          </button>
          <button class="expr-run" @click="generateTable">
            <v-icon small class="mr-1">mdi-play</v-icon>
            Run
          </button>
        </div>
        <div v-if="hasError" class="expr-error mt-2">
          <v-icon x-small color="#ef9a9a" class="mr-1">mdi-alert-circle-outline</v-icon>
          Invalid expression — check syntax and try again
        </div>
        <div v-else class="expr-hint mt-2">Press Enter or Run to evaluate</div>
      </div>
    </v-card>

    <!-- Table -->
    <v-card v-if="table && table.length > 0" class="tt-card" elevation="0">
      <div class="tt-table-wrap">
        <table class="tt-table">
          <thead>
            <tr>
              <th class="th-idx">#</th>
              <th
                v-for="(column, index) in table"
                :key="'head-' + index"
                class="tt-th"
                :class="isLeafColumn(index) ? 'tt-th--leaf' : 'tt-th--inter'"
              >
                <span class="th-exp">{{ column.exp }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(_, rowIndex) in table[0].result"
              :key="'row-' + rowIndex"
              class="tt-row"
              :class="{ 'tt-row--alt': rowIndex % 2 === 1 }"
            >
              <td class="td-idx">{{ rowIndex }}</td>
              <td
                v-for="(column, colIndex) in table"
                :key="'cell-' + colIndex"
                class="tt-td"
                :class="{
                  'tt-td--one':  column.result[rowIndex] === 1,
                  'tt-td--zero': column.result[rowIndex] === 0,
                  'tt-td--last': colIndex === table.length - 1
                }"
              >
                <span class="td-val">{{ column.result[rowIndex] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-card>

    <!-- Empty state -->
    <v-card v-else class="tt-card tt-empty pa-12 text-center" elevation="0">
      <div class="empty-grid mb-6">
        <div v-for="i in 16" :key="i" class="empty-cell" :class="Math.random() > 0.5 ? 'empty-cell--lit' : ''"></div>
      </div>
      <div class="empty-title">Enter an expression to generate the table</div>
      <div class="empty-examples mt-3">
        <span class="example-chip" @click="useExample('A AND B OR NOT C')">A AND B OR NOT C</span>
        <span class="example-chip" @click="useExample('A . B + C')">A . B + C</span>
        <span class="example-chip" @click="useExample('(A OR B) AND C')">( A OR B ) AND C</span>
      </div>
    </v-card>

  </v-container>
</template>

<script>
import TruthTable from "../utils/truthTable";

export default {
  name: 'TruthTableComponent',
  data: () => ({
    functionExp: '',
    table: [],
    exprFocused: false,
    hasError: false,
  }),
  methods: {
    isLeafColumn(index) {
      // Heuristic: single-char expressions are raw variables
      return this.table[index].exp.trim().length === 1;
    },
    generateTable() {
      if (!this.functionExp.trim()) return;
      try {
        this.table = new TruthTable(this.functionExp).result().result;
        this.hasError = false;
      } catch (error) {
        console.error("Invalid Function Expression", error);
        this.hasError = true;
      }
    },
    clearEvent() {
      this.table = [];
      this.functionExp = '';
      this.hasError = false;
    },
    useExample(expr) {
      this.functionExp = expr;
      this.generateTable();
    }
  }
}
</script>

<style scoped>
/* ── Root ── */
.tt-root {
  background: #0d0d0f;
  min-height: 100vh;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

/* ── Header ── */
.tt-icon-wrap {
  width: 46px; height: 46px;
  background: linear-gradient(135deg, #2e7d32, #1b5e20);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(46, 125, 50, 0.35);
}
.tt-title    { font-size: 1.2rem; font-weight: 700; color: #e8e8f0; letter-spacing: .02em; }
.tt-subtitle { font-size: .68rem; color: #3a3a5a; text-transform: uppercase; letter-spacing: .1em; margin-top: 2px; }
.tt-stat     { display: flex; align-items: baseline; gap: 4px; }
.stat-num    { font-size: .95rem; font-weight: 800; color: #5a5a9a; }
.stat-label  { font-size: .62rem; color: #3a3a58; text-transform: uppercase; letter-spacing: .08em; }
.stat-sep    { color: #252535; }

/* ── Cards ── */
.tt-card {
  background: #13131a !important;
  border: 1px solid #1e1e2e !important;
  border-radius: 14px !important;
  overflow: hidden;
}

/* ── Input ── */
.field-label {
  font-size: .68rem; text-transform: uppercase; letter-spacing: .1em;
  color: #4a4a6a; font-weight: 700; display: flex; align-items: center;
}
.expr-input-wrap {
  display: flex; align-items: center;
  background: #0a0a12; border: 1px solid #222236;
  border-radius: 10px; padding: 0 8px 0 16px;
  height: 50px; transition: border-color .15s, box-shadow .15s;
  gap: 8px;
}
.expr-input-wrap--focused { border-color: #2a5a2e; box-shadow: 0 0 0 3px rgba(46,125,50,.12); }
.expr-input-wrap--error   { border-color: rgba(183,28,28,.5); }
.expr-input {
  flex: 1; background: transparent; border: none; outline: none;
  color: #d0d0f0; font-family: inherit; font-size: .95rem;
  font-weight: 600; letter-spacing: .04em;
}
.expr-input::placeholder { color: #1e1e32; font-weight: 400; }
.expr-clear {
  background: transparent; border: none; cursor: pointer;
  color: #3a3a58; padding: 4px; border-radius: 4px;
  display: flex; align-items: center; transition: color .15s;
  flex-shrink: 0;
}
.expr-clear:hover { color: #8080b0; }
.expr-run {
  background: #1a3a1e; border: 1px solid #2a5a2e; border-radius: 7px;
  color: #81c784; font-family: inherit; font-size: .72rem; font-weight: 700;
  letter-spacing: .08em; text-transform: uppercase;
  padding: 6px 14px; cursor: pointer; display: flex; align-items: center;
  flex-shrink: 0; transition: background .15s, color .15s;
}
.expr-run:hover { background: #22482a; color: #a5d6a7; }
.expr-hint  { font-size: .65rem; color: #2a2a44; letter-spacing: .06em; }
.expr-error { font-size: .7rem; color: #ef9a9a; display: flex; align-items: center; }

/* ── Table ── */
.tt-table-wrap { overflow: auto; max-height: 520px; }
.tt-table { width: 100%; border-collapse: collapse; }
.tt-table thead { position: sticky; top: 0; z-index: 2; }

.th-idx {
  background: #0d0d14; color: #252540;
  font-size: .62rem; text-transform: uppercase; letter-spacing: .1em;
  padding: 10px 14px; text-align: center; width: 40px;
  border-bottom: 1px solid #1a1a28;
}
.tt-th {
  padding: 10px 18px; text-align: center;
  border-bottom: 1px solid #1a1a28; white-space: nowrap;
}
.tt-th--leaf {
  background: #0f0f18;
  border-right: 1px solid #1a1a28;
}
.tt-th--inter { background: #0d1a10; }
.th-exp {
  font-size: .8rem; font-weight: 800; letter-spacing: .05em;
}
.tt-th--leaf .th-exp   { color: #4dd0e1; }
.tt-th--inter .th-exp  { color: #a5d6a7; }

.tt-row { transition: background .1s; }
.tt-row:hover .tt-td, .tt-row:hover .td-idx { filter: brightness(1.3); }
.tt-row--alt .tt-td   { background: #0f0f18; }
.tt-row--alt .td-idx  { background: #0c0c15; }

.td-idx {
  background: #0d0d14; color: #252544;
  font-size: .68rem; padding: 9px 14px; text-align: center;
  border-right: 1px solid #1a1a28;
}
.tt-td {
  padding: 8px 18px; text-align: center;
  transition: background .1s;
}
.tt-td--last { border-left: 1px solid #1e2e1e; }

.tt-td--one  { background: rgba(46,125,50,.12); }
.tt-td--zero { }

.td-val {
  display: inline-block; width: 20px;
  font-size: .88rem; font-weight: 800; line-height: 1;
}
.tt-td--one  .td-val { color: #66bb6a; }
.tt-td--zero .td-val { color: #2e2e50; }

/* ── Empty state ── */
.tt-empty { }
.empty-grid {
  display: grid; grid-template-columns: repeat(8, 1fr);
  gap: 4px; max-width: 200px; margin: 0 auto;
}
.empty-cell {
  height: 20px; border-radius: 4px;
  background: #1a1a28;
}
.empty-cell--lit { background: rgba(46,125,50,.25); }
.empty-title {
  font-size: .95rem; font-weight: 700; color: #3a3a55;
}
.empty-examples { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.example-chip {
  background: #1a1a28; border: 1px solid #252538;
  border-radius: 6px; color: #4a4a7a;
  font-size: .72rem; padding: 5px 12px; cursor: pointer;
  transition: all .15s; letter-spacing: .04em;
}
.example-chip:hover { background: #20202e; color: #8080b0; border-color: #303050; }
</style>