# Structure Machine

> Built for a university course. Kept around because it's actually useful.

![Vue](https://img.shields.io/badge/Vue.js-2.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Vuetify](https://img.shields.io/badge/Vuetify-2.x-1867C0?style=flat-square&logo=vuetify&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## What is this?

In my first year at the University of Biskra, I took a course called *Structure Machine* — number systems, binary arithmetic, Boolean logic, logic gates. The theory is well-documented. Working through it on paper at 2am is not fun.

So I built a tool that does the tedious parts automatically. Structure Machine converts numbers across bases in real time, visualizes every bit in a register, and simplifies Boolean expressions down to their minimal form.

It's not a polished commercial product. It's a CS student solving his own problems and deciding to share the result.

---

## Features

### 🔢 Number Systems & Bitwise Analysis

| Feature | Description |
|---|---|
| **Base Conversion** | Type in any base — DEC, BIN, OCT, or HEX — and the other three update instantly |
| **Signed Numbers** | See the same value encoded three ways: SVA, 1's complement (Ca1), 2's complement (Ca2) |
| **Bit Visualizer** | Every bit rendered individually, sign bit highlighted, overflow flagged when the number doesn't fit |

### ⚡ Boolean Algebra & Truth Tables

| Feature | Description |
|---|---|
| **Truth Table Generator** | Enter any Boolean expression using AND / OR / NOT — get the full truth table with all intermediate columns |
| **Logic Simplification** | Groups minterms by Gray Code ordering and extracts prime implicants — same as a Karnaugh map, but instant |

---

## Tech Stack

- [Vue.js 2](https://v2.vuejs.org/)
- [Vuetify 2](https://v2.vuetifyjs.com/)
- [Vue Router](https://v3.router.vuejs.org/)

---

## Getting Started

```bash
git clone https://github.com/your-username/structure-machine.git
cd structure-machine

npm install
npm run serve
```

Open `http://localhost:8080`.

**Requirements:** Node.js ≥ 14, npm or yarn.

---

## Project Structure

```
src/
├── assets/
│   ├── images/
│   │   ├── computer-chip.png
│   │   ├── computer-chip2size.png
│   │   └── logo.png
│   └── main.css
│
├── components/
│   ├── ItemComponent.vue
│   └── NavbarComponent.vue
│
├── plugins/
│   └── vuetify.js
│
├── router/
│   └── index.js
│
├── utils/
│   ├── base.js                    # Number base conversion utilities
│   ├── truthTable.js              # Expression parser + truth table engine
│   └── simplificationFunction.js  # Karnaugh-style logic simplification
│
├── views/
│   ├── about.vue
│   ├── home.vue
│   ├── numberConverter.vue
│   ├── truthTable.vue
│   ├── functionSimplification.vue
│   └── functionLogigramme.vue
│
├── App.vue
└── main.js
```

---

## How the algorithms work

### Expression Parsing (Infix → Postfix)
User input like `A AND (B OR NOT C)` is tokenized and converted to postfix notation using the [Shunting Yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm). The postfix form is then evaluated row by row to fill the truth table.

### Logic Simplification
The engine reads the truth table output, identifies which rows produce a `1` (minterms), groups them using Gray Code ordering to find adjacencies, and extracts the minimal set of prime implicants — the same reduction you'd do by hand on a Karnaugh map.

---

## Author

**Akram Zaitout** — CS student, University of Biskra, Algeria.

---

## License

MIT. Use it, fork it, improve it.