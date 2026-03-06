<template>
  <v-container fluid class="workspace-container pa-6">

    <!-- Header -->
    <div class="ws-header mb-6 d-flex align-center">
      <div class="ws-icon-wrap mr-4">
        <v-icon size="28" color="white">mdi-chip</v-icon>
      </div>
      <div>
        <div class="ws-title">Logic Design Workspace</div>
        <div class="ws-subtitle">Boolean Function Simplification via Karnaugh Map</div>
      </div>
      <v-spacer></v-spacer>
      <v-chip label small class="stat-chip" v-if="varsList.length > 0">
        <v-icon left x-small>mdi-table</v-icon>
        {{ howManyTime }} rows
      </v-chip>
    </div>

    <!-- Config Panel -->
    <v-card class="config-card mb-5" elevation="0">
      <v-row no-gutters>
        <!-- Variables -->
        <v-col cols="12" md="6" class="config-section config-section--left pa-5">
          <div class="config-label mb-3">
            <v-icon small class="mr-1" color="cyan lighten-1">mdi-alpha-x-box-outline</v-icon>
            Input Variables
            <span class="config-count">({{ varsList.length }}/8)</span>
          </div>
          <div class="chip-area">
            <v-chip
              v-for="(item, index) in varsList"
              :key="'var-' + index"
              class="ws-chip ws-chip--var ma-1"
              @click="onEdit(index, 'var')"
              close
              @click:close="onDelete(index, 'var')"
            >
              <span class="chip-text">{{ item }}</span>
            </v-chip>
            <v-btn
              v-show="varsList.length < 8"
              x-small fab depressed
              class="add-btn ml-1"
              @click="onAdd('var')"
            >
              <v-icon small>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- Divider -->
        <v-divider vertical class="config-divider"></v-divider>

        <!-- Functions -->
        <v-col cols="12" md="6" class="config-section pa-5">
          <div class="config-label mb-3">
            <v-icon small class="mr-1" color="orange lighten-1">mdi-function-variant</v-icon>
            Output Functions
            <span class="config-count">({{ resultsList.length }}/8)</span>
          </div>
          <div class="chip-area">
            <v-chip
              v-for="(item, index) in resultsList"
              :key="'res-' + index"
              class="ws-chip ws-chip--fun ma-1"
              @click="onEdit(index, 'fun')"
              close
              @click:close="onDelete(index, 'fun')"
            >
              <span class="chip-text">{{ item }}</span>
            </v-chip>
            <v-btn
              v-show="resultsList.length < 8"
              x-small fab depressed
              class="add-btn ml-1"
              @click="onAdd('fun')"
            >
              <v-icon small>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- Truth Table -->
    <v-card
      v-if="varsList.length > 0 && resultsList.length > 0"
      class="table-card mb-5"
      elevation="0"
    >
      <div class="table-toolbar px-5 py-3 d-flex align-center">
        <v-icon small class="mr-2" color="grey lighten-1">mdi-table-edit</v-icon>
        <span class="table-toolbar-title">Truth Table</span>
        <span class="table-toolbar-hint ml-3">— click output cells to toggle</span>
        <v-spacer></v-spacer>
        <div class="legend d-flex align-center">
          <span class="legend-dot legend-dot--one mr-1"></span><span class="legend-label mr-3">1</span>
          <span class="legend-dot legend-dot--zero mr-1"></span><span class="legend-label">0</span>
        </div>
      </div>

      <v-divider class="table-divider"></v-divider>

      <div class="table-scroll-wrap">
        <table class="ws-table">
          <thead>
            <tr>
              <th class="th-index">#</th>
              <th v-for="v in varsList" :key="'h-var-'+v" class="th-var">{{ v }}</th>
              <th class="th-sep"></th>
              <th v-for="f in resultsList" :key="'h-res-'+f" class="th-fun">{{ f }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="rowIdx in howManyTime"
              :key="'row-'+rowIdx"
              class="ws-row"
              :class="{ 'ws-row--alt': (rowIdx - 1) % 2 === 1 }"
            >
              <td class="td-index">{{ rowIdx - 1 }}</td>
              <td v-for="v in varsList" :key="'cell-'+v+'-'+rowIdx" class="td-var">
                {{ resultVars[v][rowIdx - 1] }}
              </td>
              <td class="td-sep"></td>
              <td
                v-for="f in resultsList"
                :key="'cell-'+f+'-'+rowIdx"
                @click="toggleItem(f, rowIdx - 1)"
                class="td-fun"
                :class="table.results[f][rowIdx-1] === 1 ? 'td-fun--one' : 'td-fun--zero'"
              >
                <span class="fun-val">{{ table.results[f][rowIdx - 1] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Generate Button -->
      <div class="px-5 py-4">
        <v-btn
          block
          large
          depressed
          class="generate-btn"
          @click="generateFunction"
        >
          <v-icon left>mdi-auto-fix</v-icon>
          {{ generated ? 'Recalculate Simplification' : 'Generate Simplest Functions' }}
        </v-btn>
      </div>
    </v-card>

    <!-- Results -->
    <v-card v-if="generated" class="result-card pa-6" elevation="0">
      <div class="result-header mb-5 d-flex align-center">
        <v-icon class="mr-2" color="yellow accent-3">mdi-lightning-bolt</v-icon>
        <span class="result-title">Simplified Boolean Expressions</span>
      </div>
      <div v-for="(exp, name) in result" :key="'final-'+name" class="result-row mb-4">
        <div class="result-name">{{ name }}</div>
        <div class="result-equals">=</div>
        <div class="result-expr">
          <code>{{ exp || '0' }}</code>
        </div>
      </div>
    </v-card>

    <!-- Empty State -->
    <v-card
      v-if="varsList.length === 0 || resultsList.length === 0"
      class="empty-card pa-12 text-center"
      elevation="0"
    >
      <v-icon size="56" color="grey darken-1">mdi-table-off</v-icon>
      <div class="empty-title mt-4">Nothing configured yet</div>
      <div class="empty-subtitle mt-2">Add at least one variable and one output function to get started.</div>
    </v-card>

    <!-- Delete Dialog -->
    <v-dialog v-model="deleteDialog" max-width="380px" overlay-color="black" overlay-opacity="0.7">
      <v-card class="dialog-card">
        <v-card-title class="dialog-title pt-5 px-6">
          <v-icon left color="error">mdi-alert-circle-outline</v-icon>
          Confirm Delete
        </v-card-title>
        <v-card-text class="dialog-body px-6 pb-4">
          Delete this <strong>{{ dialogType === 'var' ? 'variable' : 'function' }}</strong>?
          Your current truth table values will be reset.
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn text class="dialog-cancel-btn" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn depressed class="dialog-confirm-btn ml-2" @click="deleteVar">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit / Add Dialog -->
    <v-dialog v-model="editDialog" max-width="420px" overlay-color="black" overlay-opacity="0.7">
      <v-card class="dialog-card">
        <v-card-title class="dialog-title pt-5 px-6">
          {{ selectedEdit === null ? 'Add' : 'Rename' }}
          {{ dialogType === 'var' ? 'Variable' : 'Function' }}
        </v-card-title>
        <v-card-text class="px-6 pb-2 pt-4">
          <v-text-field
            v-model="editModel"
            :label="dialogType === 'var' ? 'e.g. A, B, X1' : 'e.g. F, G, OUT'"
            outlined
            dense
            autofocus
            hide-details
            class="dialog-input"
            @keyup.enter="editVar"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pa-4 pt-3">
          <v-spacer></v-spacer>
          <v-btn text class="dialog-cancel-btn" @click="editDialog = false">Cancel</v-btn>
          <v-btn depressed class="dialog-save-btn ml-2" @click="editVar">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import TruthTable from "@/utils/truthTable";
import Simplification from "@/utils/simplificationFunction";
let tableGenerate = new TruthTable();

export default {
  name: 'FunctionSimplification',
  data: () => ({
    varsList: ["a", "b"],
    resultsList: ["F"],
    table: { results: {} },
    result: {},
    generated: false,
    deleteDialog: false,
    editDialog: false,
    dialogType: "",
    editModel: "",
    selectedDelete: null,
    selectedEdit: null
  }),
  computed: {
    howManyTime() {
      return Math.pow(2, this.varsList.length);
    },
    resultVars() {
      return tableGenerate.prob(this.varsList);
    }
  },
  watch: {
    howManyTime() { this.fillResults(); },
    resultsList() { this.resetGeneration(); this.fillResults(); }
  },
  methods: {
    resetGeneration() { this.result = {}; this.generated = false; },
    toggleItem(exp, index) {
      const currentVal = this.table.results[exp][index];
      this.$set(this.table.results[exp], index, currentVal === 0 ? 1 : 0);
      this.resetGeneration();
    },
    fillResults() {
      const newResults = {};
      this.resultsList.forEach(item => {
        newResults[item] = new Array(this.howManyTime).fill(0);
      });
      this.table.results = newResults;
    },
    generateFunction() {
      this.result = {};
      let proVars = Object.keys(this.resultVars);
      let varsResult = [];
      for (let i = 0; i < this.howManyTime; i++) {
        let text = "";
        proVars.forEach(v => { text += this.resultVars[v][i]; });
        varsResult.push(text);
      }
      this.resultsList.forEach(item => {
        this.result[item] = Simplification(
          { final: { exp: item, result: this.table.results[item] }, varsOrder: varsResult },
          [...this.varsList]
        );
      });
      this.generated = true;
    },
    onDelete(index, type) { this.selectedDelete = index; this.dialogType = type; this.deleteDialog = true; },
    onEdit(index, type) {
      this.selectedEdit = index;
      this.editModel = type === "var" ? this.varsList[index] : this.resultsList[index];
      this.dialogType = type;
      this.editDialog = true;
    },
    onAdd(type) { this.selectedEdit = null; this.editModel = ""; this.dialogType = type; this.editDialog = true; },
    deleteVar() {
      if (this.dialogType === "var") this.varsList.splice(this.selectedDelete, 1);
      else this.resultsList.splice(this.selectedDelete, 1);
      this.deleteDialog = false;
      this.resetGeneration();
    },
    editVar() {
      if (!this.editModel.trim()) return;
      if (this.selectedEdit !== null) {
        if (this.dialogType === "var") this.$set(this.varsList, this.selectedEdit, this.editModel.trim());
        else this.$set(this.resultsList, this.selectedEdit, this.editModel.trim());
      } else {
        if (this.dialogType === "var") this.varsList.push(this.editModel.trim());
        else this.resultsList.push(this.editModel.trim());
      }
      this.editDialog = false;
      this.resetGeneration();
    }
  },
  created() { this.fillResults(); }
}
</script>

<style scoped>
/* ── Root ── */
.workspace-container {
  background: #0d0d0f;
  min-height: 100vh;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

/* ── Header ── */
.ws-header { }
.ws-icon-wrap {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #e53935, #b71c1c);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(229, 57, 53, 0.35);
}
.ws-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f0f0f0;
  letter-spacing: 0.02em;
}
.ws-subtitle {
  font-size: 0.72rem;
  color: #5a5a6a;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 2px;
}
.stat-chip {
  background: #1e1e28 !important;
  color: #7070a0 !important;
  font-size: 0.7rem !important;
  border: 1px solid #2a2a38 !important;
  font-family: inherit !important;
}

/* ── Config Card ── */
.config-card {
  background: #13131a !important;
  border: 1px solid #1f1f2e !important;
  border-radius: 14px !important;
  overflow: hidden;
}
.config-section { }
.config-section--left {
  border-right: 1px solid #1f1f2e;
}
.config-divider { border-color: #1f1f2e !important; }
.config-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #4a4a6a;
  display: flex;
  align-items: center;
  font-weight: 600;
}
.config-count {
  color: #3a3a5a;
  margin-left: 6px;
}
.chip-area {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 42px;
}

/* ── Chips ── */
.ws-chip {
  border-radius: 6px !important;
  font-family: 'JetBrains Mono', monospace !important;
  font-size: 0.8rem !important;
  height: 30px !important;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.15s ease;
}
.ws-chip--var {
  background: rgba(0, 188, 212, 0.12) !important;
  border: 1px solid rgba(0, 188, 212, 0.25) !important;
  color: #4dd0e1 !important;
}
.ws-chip--var:hover {
  background: rgba(0, 188, 212, 0.2) !important;
  border-color: rgba(0, 188, 212, 0.45) !important;
}
.ws-chip--fun {
  background: rgba(255, 152, 0, 0.1) !important;
  border: 1px solid rgba(255, 152, 0, 0.25) !important;
  color: #ffb74d !important;
}
.ws-chip--fun:hover {
  background: rgba(255, 152, 0, 0.18) !important;
  border-color: rgba(255, 152, 0, 0.4) !important;
}
.chip-text { font-weight: 700; }
.add-btn {
  background: #1e1e2e !important;
  border: 1px solid #2a2a42 !important;
  color: #6060a0 !important;
  width: 26px !important;
  height: 26px !important;
  transition: all 0.15s;
}
.add-btn:hover {
  background: #252535 !important;
  color: #9090d0 !important;
}

/* ── Table Card ── */
.table-card {
  background: #13131a !important;
  border: 1px solid #1f1f2e !important;
  border-radius: 14px !important;
  overflow: hidden;
}
.table-toolbar {
  background: #0f0f16;
}
.table-toolbar-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: #9090b0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.table-toolbar-hint {
  font-size: 0.72rem;
  color: #3a3a55;
}
.table-divider { border-color: #1a1a28 !important; }
.legend { }
.legend-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.legend-dot--one { background: #388e3c; }
.legend-dot--zero { background: #2a2a40; border: 1px solid #3a3a55; }
.legend-label { font-size: 0.68rem; color: #4a4a66; }

/* ── Table ── */
.table-scroll-wrap {
  overflow: auto;
  max-height: 420px;
}
.ws-table {
  width: 100%;
  border-collapse: collapse;
}
.ws-table thead {
  position: sticky;
  top: 0;
  z-index: 2;
}
.th-index {
  background: #0d0d14;
  color: #2a2a44;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 10px 14px;
  text-align: center;
  width: 40px;
  border-bottom: 1px solid #1a1a28;
}
.th-var {
  background: #0f0f18;
  color: #4dd0e1;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 10px 20px;
  text-align: center;
  border-bottom: 1px solid #1a1a28;
  letter-spacing: 0.05em;
}
.th-fun {
  background: #0f0f18;
  color: #ffb74d;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 10px 20px;
  text-align: center;
  border-bottom: 1px solid #1a1a28;
  letter-spacing: 0.05em;
}
.th-sep {
  background: #0d0d14;
  width: 3px;
  padding: 0;
  border-bottom: 1px solid #1a1a28;
  border-left: 1px solid #1e1e30;
  border-right: 1px solid #1e1e30;
}
.ws-row { transition: background 0.1s; }
.ws-row:hover .td-var,
.ws-row:hover .td-index {
  background: #161620 !important;
}
.ws-row--alt .td-var,
.ws-row--alt .td-index {
  background: #111119;
}
.td-index {
  background: #0d0d14;
  color: #2a2a44;
  font-size: 0.68rem;
  padding: 9px 14px;
  text-align: center;
}
.td-var {
  background: #0f0f18;
  color: #546e7a;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 9px 20px;
  text-align: center;
  transition: background 0.1s;
}
.td-sep {
  width: 3px;
  padding: 0;
  background: #0d0d14;
  border-left: 1px solid #1e1e30;
  border-right: 1px solid #1e1e30;
}
.td-fun {
  padding: 7px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.12s ease;
  user-select: none;
}
.td-fun--one {
  background: rgba(46, 125, 50, 0.18);
}
.td-fun--one:hover {
  background: rgba(46, 125, 50, 0.28) !important;
}
.td-fun--zero {
  background: transparent;
}
.td-fun--zero:hover {
  background: rgba(255, 255, 255, 0.04) !important;
}
.fun-val {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 4px;
  font-size: 0.82rem;
  font-weight: 700;
}
.td-fun--one .fun-val { color: #66bb6a; }
.td-fun--zero .fun-val { color: #3a3a55; }

/* ── Generate Button ── */
.generate-btn {
  background: linear-gradient(135deg, #c62828, #e53935) !important;
  color: white !important;
  border-radius: 10px !important;
  font-family: inherit !important;
  font-weight: 700 !important;
  font-size: 0.85rem !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  height: 48px !important;
  box-shadow: 0 4px 20px rgba(229, 57, 53, 0.25) !important;
  transition: all 0.2s !important;
}
.generate-btn:hover {
  box-shadow: 0 6px 28px rgba(229, 57, 53, 0.4) !important;
  transform: translateY(-1px);
}

/* ── Result Card ── */
.result-card {
  background: #13131a !important;
  border: 1px solid #1f1f2e !important;
  border-radius: 14px !important;
}
.result-header { }
.result-title {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6060a0;
  font-weight: 700;
}
.result-row {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #0f0f18;
  border: 1px solid #1e1e2e;
  border-radius: 10px;
  padding: 14px 20px;
}
.result-name {
  font-size: 1.05rem;
  font-weight: 800;
  color: #ffb74d;
  min-width: 32px;
  letter-spacing: 0.04em;
}
.result-equals {
  color: #3a3a5a;
  font-size: 1.1rem;
  font-weight: 400;
}
.result-expr {
  flex: 1;
  border-left: 3px solid #c62828;
  padding-left: 16px;
}
.result-expr code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
  font-size: 1rem !important;
  color: #fff176 !important;
  background: transparent !important;
  box-shadow: none !important;
  font-weight: 600;
  letter-spacing: 0.04em;
}

/* ── Empty State ── */
.empty-card {
  background: #13131a !important;
  border: 1px dashed #1f1f2e !important;
  border-radius: 14px !important;
}
.empty-title {
  font-size: 1rem;
  font-weight: 700;
  color: #3a3a55;
}
.empty-subtitle {
  font-size: 0.8rem;
  color: #2a2a40;
}

/* ── Dialogs ── */
.dialog-card {
  background: #16161f !important;
  border: 1px solid #252535 !important;
  border-radius: 14px !important;
}
.dialog-title {
  font-family: inherit !important;
  font-size: 1rem !important;
  font-weight: 700 !important;
  color: #c0c0e0 !important;
  letter-spacing: 0.02em;
}
.dialog-body {
  color: #5a5a80 !important;
  font-size: 0.88rem !important;
  line-height: 1.6 !important;
}
.dialog-body strong { color: #9090c0; }
.dialog-input >>> .v-input__slot {
  background: #0f0f18 !important;
  border-color: #2a2a40 !important;
}
.dialog-input >>> .v-label { color: #4a4a6a !important; font-family: inherit; }
.dialog-input >>> input { color: #e0e0f0 !important; font-family: inherit; }
.dialog-cancel-btn { color: #4a4a6a !important; font-family: inherit !important; }
.dialog-confirm-btn {
  background: #3b1515 !important;
  color: #ef9a9a !important;
  border-radius: 8px !important;
  font-family: inherit !important;
  font-size: 0.8rem !important;
}
.dialog-save-btn {
  background: #1a2a1a !important;
  color: #81c784 !important;
  border-radius: 8px !important;
  font-family: inherit !important;
  font-size: 0.8rem !important;
}
</style>