# LowBIt Roadmap

## v1.0 — Foundations

Establish the specification and methodology, and prove them against one
real, fully-validated kernel before expanding domain coverage.

- [x] Suite specification (`SPECIFICATION.md`)
- [x] Suite methodology, seven principles (`methodology/`)
- [x] Registry + site (this repository)
- [x] `LB-ML-001` — Transformer Attention — first implemented package,
      FP32 + INT8, x86-64 + RISC-V
- [ ] `LB-ML-002` — GEMM — isolate the dense-matmul cost center that
      attention currently bundles together with softmax
- [ ] `LB-ML-003` — Conv2D — first non-GEMM-dominant ML kernel
- [ ] `LB-ML-004` — Softmax (standalone) — isolate the memory-bound,
      reduction-heavy phase that `LB-ML-001` currently only measures
      bundled with the surrounding GEMMs
- [ ] `LB-ML-005` — LayerNorm — second normalization-family kernel
- [ ] `LB-CRYPTO-001` — SHA-256 — first cryptographic-primitive kernel,
      opens the `CRYPTO` domain
- [ ] `LB-GRAPH-001` — BFS — first graph-algorithm kernel, opens the
      `GRAPH` domain

## v1.1 — Depth over breadth

Once each ML kernel exists standalone, revisit `LB-ML-001` itself:

- [ ] Multi-threaded GEMM path (hook exists in `LB-ML-001`, unused)
- [ ] Hand-written RVV intrinsic path, alongside the current
      auto-vectorization-friendly loop shape
- [ ] Per-channel INT8 quantization as an option alongside the current
      per-tensor scheme
- [ ] Training (backward-pass) variant of at least one ML kernel —
      currently every ML entry is inference-only, tracked as a known gap
      in each package's `metadata.yaml`

## v2.0 — Domain breadth

- [ ] `MEM` domain opened (memory subsystem microbenchmarks)
- [ ] `CPU` domain opened (general compute kernels)
- [ ] `IO` domain opened (storage / I/O bound workloads)
- [ ] Real-hardware TMA numbers for at least one RISC-V board — every
      current analysis result is QEMU-functional-only, explicitly labeled
      as non-representative for timing

## Not planned

- A shared runtime, framework, or common library across packages. Each
  benchmark stays a standalone, independently buildable repository — see
  [Philosophy](index.html#philosophy).
- Automated leaderboard or public results submission. LowBIt publishes
  methodology and reference outputs; it doesn't currently host third-party
  result submissions.

See [BENCHMARKS.md](BENCHMARKS.md) for the live status of every ID above.
