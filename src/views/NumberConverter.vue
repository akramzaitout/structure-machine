<template>
  <v-container fluid class="nc-root pa-6">

    <!-- Header -->
    <div class="nc-header mb-6 d-flex align-center">
      <div class="nc-icon-wrap mr-4">
        <v-icon size="26" color="white">mdi-numeric</v-icon>
      </div>
      <div>
        <div class="nc-title">Number Systems</div>
        <div class="nc-subtitle">Base conversion &amp; bitwise analysis</div>
      </div>
    </div>

    <v-row>
      <!-- ── Left: Base Conversion ── -->
      <v-col cols="12" md="5">
        <v-card class="nc-card" elevation="0">
          <div class="nc-section-label px-5 pt-5 pb-3">
            <v-icon small class="mr-2" color="cyan lighten-1">mdi-swap-horizontal</v-icon>
            Base Conversion
          </div>
          <v-divider class="nc-divider"></v-divider>

          <div class="px-5 py-4">
            <div v-for="field in baseFields" :key="field.key" class="base-row mb-3">
              <div class="base-badge" :style="{ background: field.color }">{{ field.label }}</div>
              <div class="base-input-wrap" :class="{ 'focused': focused === field.key }">
                <input
                  class="base-input"
                  :value="numbers[field.key]"
                  @input="numbers[field.key] = $event.target.value"
                  @focus="focused = field.key"
                  @blur="focused = null"
                  :placeholder="field.placeholder"
                  spellcheck="false"
                />
                <span class="base-subscript">{{ field.sub }}</span>
              </div>
            </div>
          </div>

          <div class="px-5 pb-5">
            <button class="clear-btn" @click="clearFunction">
              <v-icon small class="mr-1">mdi-refresh</v-icon>
              Reset
            </button>
          </div>
        </v-card>
      </v-col>

      <!-- ── Right: Bitwise Analysis ── -->
      <v-col cols="12" md="7">
        <v-card class="nc-card" elevation="0">
          <div class="nc-section-label px-5 pt-5 pb-3">
            <v-icon small class="mr-2" color="orange lighten-1">mdi-sine-wave</v-icon>
            Bitwise Analysis
          </div>
          <v-divider class="nc-divider"></v-divider>

          <div class="px-5 pt-4 pb-3">
            <v-row dense>
              <v-col cols="12" sm="3">
                <div class="field-label mb-1">Bits</div>
                <input class="ctrl-input" type="number" min="1" max="64" v-model.number="convert.avaibleBits" />
              </v-col>
              <v-col cols="12" sm="5">
                <div class="field-label mb-1">Method</div>
                <div class="select-wrap">
                  <select class="ctrl-select" v-model="convert.method">
                    <option v-for="m in methods" :key="m" :value="m">{{ m }}</option>
                  </select>
                  <v-icon small class="select-caret">mdi-chevron-down</v-icon>
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <div class="field-label mb-1">Source Base</div>
                <div class="select-wrap">
                  <select class="ctrl-select" v-model.number="convert.number.base">
                    <option v-for="b in bases" :key="b" :value="b">Base {{ b }}</option>
                  </select>
                  <v-icon small class="select-caret">mdi-chevron-down</v-icon>
                </div>
              </v-col>
            </v-row>

            <div class="mt-4 mb-1 field-label">Input Number</div>
            <input
              class="main-input"
              v-model="convert.number.value"
              placeholder="Enter value…"
              spellcheck="false"
            />
          </div>

          <!-- Bit strip -->
          <div class="bit-section px-4 py-4">
            <transition name="fade">
              <div v-if="!convert.isOverflow" class="bit-row">
                <div
                  v-for="(bit, index) in convertValue"
                  :key="index"
                  class="bit-box"
                  :class="{
                    'bit-box--one':  bit === '1',
                    'bit-box--sign': index === 0
                  }"
                >
                  <div class="bit-pos">{{ convert.avaibleBits - 1 - index }}</div>
                  <div class="bit-val">{{ bit }}</div>
                </div>
              </div>
            </transition>

            <div v-if="convert.isOverflow" class="overflow-alert">
              <v-icon small color="#ef9a9a" class="mr-2">mdi-alert-outline</v-icon>
              Overflow — requires more than <strong>{{ convert.avaibleBits }}</strong> bits
            </div>
          </div>

          <v-divider class="nc-divider"></v-divider>

          <!-- Result equation -->
          <div v-if="!convert.isOverflow" class="result-area px-5 py-5 text-center">
            <div class="result-equation">
              <span class="result-value">{{ convert.number.value || '0' }}</span>
              <sub class="result-sub">{{ convert.number.base }}</sub>
              <v-icon class="mx-3" color="#2a2a44" size="20">mdi-arrow-right</v-icon>
              <span class="result-value result-value--out">{{ convertNumber }}</span>
              <sub class="result-sub">10</sub>
            </div>
            <div class="result-method mt-2">{{ convert.method }} representation</div>
          </div>

        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import Base from "@/utils/base";

export default {
  name: 'NumberConverter',
  data: () => ({
    focused: null,
    numbers: { binary: '1111', octal: '17', decimal: '15', hexadecimal: 'F' },
    convert: {
      avaibleBits: 8,
      method: "SVA",
      number: { base: 16, value: "FA12" },
      isOverflow: true
    },
    bases: [16, 10, 8, 2],
    methods: ['SVA', 'Ca1', 'Ca2'],
    baseFields: [
      { key: 'binary',      label: 'BIN', sub: '2',  color: '#0b2e3a', placeholder: '1010…'  },
      { key: 'octal',       label: 'OCT', sub: '8',  color: '#252510', placeholder: '0–7…'   },
      { key: 'decimal',     label: 'DEC', sub: '10', color: '#152515', placeholder: '0–9…'   },
      { key: 'hexadecimal', label: 'HEX', sub: '16', color: '#251525', placeholder: '0–F…'   },
    ]
  }),
  methods: {
    clearFunction() {
      setTimeout(() => {
        this.numbers = { binary: '0', octal: '0', decimal: '0', hexadecimal: '0' };
      }, 100);
    }
  },
  watch: {
    'numbers.binary'(v)      { this.numbers.decimal      = Base.convertFromBTo10(v !== ' ' ? v : '0', 2);  },
    'numbers.octal'(v)       { this.numbers.decimal      = Base.convertFromBTo10(v !== ' ' ? v : '0', 8);  },
    'numbers.decimal'(v)     {
      this.numbers.binary      = Base.convertFrom10ToB(v !== ' ' ? v : 0, 2);
      this.numbers.octal       = Base.convertFrom10ToB(v !== ' ' ? v : 0, 8);
      this.numbers.hexadecimal = Base.convertFrom10ToB(v !== ' ' ? v : 0, 16);
    },
    'numbers.hexadecimal'(v) { this.numbers.decimal      = Base.convertFromBTo10(v !== ' ' ? v : '0', 16); },
    convertValue(value)      { this.convert.isOverflow   = value === false; }
  },
  computed: {
    convertValue() {
      const N = Base.convertBase(this.convert.number.value, this.convert.number.base, 2);
      if (N.length === this.convert.avaibleBits) return N;
      if (N.length <  this.convert.avaibleBits)  return N.padStart(this.convert.avaibleBits, '0');
      return false;
    },
    convertNumber() {
      if (!this.convertValue) return 0;
      let sign = 1, em = 0, result = this.convertValue;
      if (result[0] === '1') {
        sign = -1;
        if (this.convert.method === 'SVA') {
          em = -128;
        } else {
          result = result.slice(1).split('').map(b => b === '0' ? '1' : '0').join('');
          if (this.convert.method === 'Ca2') em = 1;
        }
      }
      return (Base.convertFromBTo10(result, 2) + em) * sign;
    }
  }
}
</script>

<style scoped>
/* ── Root ── */
.nc-root {
  background: #0d0d0f;
  min-height: 100vh;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

/* ── Header ── */
.nc-icon-wrap {
  width: 46px; height: 46px;
  background: linear-gradient(135deg, #1565c0, #0d47a1);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(21, 101, 192, 0.35);
}
.nc-title    { font-size: 1.2rem; font-weight: 700; color: #e8e8f0; letter-spacing: .02em; }
.nc-subtitle { font-size: .68rem; color: #3a3a5a; text-transform: uppercase; letter-spacing: .1em; margin-top: 2px; }

/* ── Cards ── */
.nc-card {
  background: #13131a !important;
  border: 1px solid #1e1e2e !important;
  border-radius: 14px !important;
  overflow: hidden;
}
.nc-section-label {
  font-size: .68rem; text-transform: uppercase; letter-spacing: .1em;
  color: #4a4a6a; font-weight: 700; display: flex; align-items: center;
}
.nc-divider { border-color: #1a1a28 !important; }

/* ── Base rows ── */
.base-row { display: flex; align-items: center; gap: 10px; }
.base-badge {
  width: 46px; height: 36px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  font-size: .65rem; font-weight: 800; letter-spacing: .08em;
  color: rgba(255,255,255,.55); flex-shrink: 0;
}
.base-input-wrap {
  flex: 1; display: flex; align-items: center;
  background: #0f0f18; border: 1px solid #1e1e30;
  border-radius: 8px; padding: 0 12px; height: 38px;
  transition: border-color .15s;
}
.base-input-wrap.focused { border-color: #2a4a8a; }
.base-input {
  flex: 1; background: transparent; border: none; outline: none;
  color: #c8c8e8; font-family: inherit; font-size: .9rem;
  font-weight: 600; letter-spacing: .05em;
}
.base-input::placeholder { color: #252540; }
.base-subscript { font-size: .62rem; color: #3a3a58; margin-left: 6px; flex-shrink: 0; }

.clear-btn {
  display: flex; align-items: center; justify-content: center;
  width: 100%; background: #1a1a28; border: 1px solid #222236;
  border-radius: 8px; color: #4a4a7a; font-family: inherit;
  font-size: .72rem; font-weight: 700; letter-spacing: .06em;
  text-transform: uppercase; padding: 9px 16px; cursor: pointer;
  transition: color .15s, background .15s;
}
.clear-btn:hover { background: #20202e; color: #7070b0; }

/* ── Controls ── */
.field-label { font-size: .64rem; text-transform: uppercase; letter-spacing: .1em; color: #3a3a58; font-weight: 700; }

.ctrl-input {
  width: 100%; background: #0f0f18; border: 1px solid #1e1e30;
  border-radius: 8px; color: #c8c8e8; font-family: inherit;
  font-size: .88rem; font-weight: 600; padding: 8px 12px; outline: none;
  transition: border-color .15s; -moz-appearance: textfield;
}
.ctrl-input::-webkit-inner-spin-button { display: none; }
.ctrl-input:focus { border-color: #2a4a8a; }

.select-wrap { position: relative; display: flex; align-items: center; }
.ctrl-select {
  width: 100%; background: #0f0f18; border: 1px solid #1e1e30;
  border-radius: 8px; color: #c8c8e8; font-family: inherit;
  font-size: .82rem; font-weight: 600; padding: 8px 32px 8px 12px;
  outline: none; appearance: none; -webkit-appearance: none;
  cursor: pointer; transition: border-color .15s;
}
.ctrl-select:focus { border-color: #2a4a8a; }
.select-caret { position: absolute; right: 8px; pointer-events: none; color: #3a3a5a !important; font-size: 14px !important; }

.main-input {
  width: 100%; background: #0a0a12; border: 1px solid #222236;
  border-radius: 10px; color: #e0e0ff; font-family: inherit;
  font-size: 1.1rem; font-weight: 700; padding: 12px 16px; outline: none;
  letter-spacing: .1em; transition: border-color .15s, box-shadow .15s;
}
.main-input:focus { border-color: #2a4a8a; box-shadow: 0 0 0 3px rgba(42,74,138,.15); }
.main-input::placeholder { color: #1e1e30; }

/* ── Bit strip ── */
.bit-section {
  background: #0f0f16;
  border-top: 1px solid #1a1a28;
  border-bottom: 1px solid #1a1a28;
  min-height: 76px;
  display: flex; align-items: center; justify-content: center;
}
.bit-row { display: flex; flex-wrap: wrap; gap: 3px; justify-content: center; }
.bit-box {
  width: 34px; height: 52px; border-radius: 7px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: #13131e; border: 1px solid #1e1e30;
  transition: background .12s, border-color .12s;
}
.bit-box--one  { background: rgba(21,101,192,.18); border-color: rgba(21,101,192,.35); }
.bit-box--sign { border-color: rgba(229,57,53,.4); }
.bit-box--sign .bit-val { color: #ef9a9a !important; }
.bit-pos { font-size: 9px; color: #2e2e48; font-weight: 600; margin-bottom: 3px; }
.bit-val { font-size: 1rem; font-weight: 800; color: #3a3a5a; line-height: 1; }
.bit-box--one .bit-val { color: #64b5f6; }

.overflow-alert {
  display: flex; align-items: center; justify-content: center;
  background: rgba(183,28,28,.1); border: 1px solid rgba(183,28,28,.22);
  border-radius: 8px; color: #ef9a9a; font-size: .8rem; padding: 10px 16px;
}
.overflow-alert strong { color: #fff; margin: 0 4px; }

/* ── Result ── */
.result-area { background: #0f0f16; }
.result-equation { display: flex; align-items: baseline; justify-content: center; flex-wrap: wrap; gap: 2px; }
.result-value     { font-size: 1.6rem; font-weight: 800; color: #9090d0; letter-spacing: .04em; }
.result-value--out{ color: #64b5f6; }
.result-sub       { font-size: .7rem; color: #3a3a58; margin-left: 2px; font-weight: 600; }
.result-method    { font-size: .65rem; text-transform: uppercase; letter-spacing: .12em; color: #2e2e48; }

/* ── Transition ── */
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter, .fade-leave-to { opacity: 0; }
</style>