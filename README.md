# lowBit
**Small pieces. Deterministic systems.**

lowBit is a specification-first benchmark suite: a growing set of small,
self-contained benchmarks for systems, machine learning, and computer
architecture research. Every benchmark is deterministic, portable across
its target architectures, and validated against golden reference output.

**This repository contains no benchmark source code.** It explains what
lowBit is, defines the specification and methodology every benchmark
follows, and links to every benchmark. Think of it as the website — and
it is one, at [index.html](index.html).

---

## What is lowBit?

lowBit is not a single project. It's an index over independently
maintained repositories, each implementing one benchmark against a shared
spec:

- `LB-ML-*` — machine learning kernels (attention, GEMM, conv, norms)
- `LB-MEM-*` — memory subsystem microbenchmarks
- `LB-CPU-*` — general compute kernels
- `LB-CRYPTO-*` — cryptographic primitives
- `LB-GRAPH-*` — graph algorithms
- `LB-IO-*` — storage / I/O bound workloads

The first implemented benchmark is `LB-ML-001` — a deterministic,
portable transformer-attention microbenchmark, FP32 and INT8, validated
on x86-64 and RISC-V. See [BENCHMARKS.md](BENCHMARKS.md) for the full,
current list, implemented and planned.

---

## Philosophy

- Build small, composable pieces
- Prefer clarity over completeness
- Learn by implementation
- Allow unfinished and experimental work
- Optimize for understanding, not speed

Progress is incremental and non-linear by design. Some registry entries
are reserved IDs with no package yet — that's shown, not hidden.

---

## Specification & methodology

Every benchmark in the registry follows the same package shape and is
graded against the same seven principles — determinism, portability,
diversity/representativeness, validation, longevity, analysis, and user
ownership.

- [SPECIFICATION.md](SPECIFICATION.md) — the required package layout and
  schema every benchmark must satisfy to be admitted

---

## Registry

- [BENCHMARKS.md](BENCHMARKS.md) — every benchmark ID, its status, and a
  link to its package
- [ROADMAP.md](ROADMAP.md) — what's built, what's next, and why

---

## License

This repository (the specification, the site, and this README) is MIT
licensed — see [LICENSE](LICENSE). The methodology specifically is
covered by a separate, attribution-required license — see
[LICENSE-METHODOLOGY](LICENSE-METHODOLOGY) — since it's meant to be
reusable by other suites. **Individual benchmark packages carry their own
license**, which may be far more restrictive than either of the above;
check each package before reuse.

---

## Citation

If you use the specification, methodology, or any benchmark package, see
[CITATION.cff](CITATION.cff).

---

## Author

Created and maintained by **Om Pranab Mohanty**.

GitHub: https://github.com/04pranab
