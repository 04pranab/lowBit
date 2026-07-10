# LowBIt Benchmarks

Every benchmark ID ever assigned in the suite. This is the source of truth
the site's [registry](index.html#registry) is generated from — when a new
benchmark is added, its row goes here first.

| ID | Kernel | Domain | Status | Package |
|---|---|---|---|---|
| `LB-ML-001` | Transformer Attention | Machine Learning | ✅ Implemented | [`ml-transformer-attn_r`](https://github.com/04pranab/ml-transformer-attn_r) |
| `LB-ML-002` | GEMM | Machine Learning | ⏳ Planned | — |
| `LB-ML-003` | Conv2D | Machine Learning | ⏳ Planned | — |
| `LB-ML-004` | Softmax (standalone) | Machine Learning | ⏳ Planned | — |
| `LB-ML-005` | LayerNorm | Machine Learning | ⏳ Planned | — |
| `LB-CRYPTO-001` | SHA-256 | Cryptography | ⏳ Planned | — |
| `LB-GRAPH-001` | BFS | Graph Algorithms | ⏳ Planned | — |

## Domain codes

| Code | Domain |
|---|---|
| `ML` | Machine learning kernels |
| `MEM` | Memory subsystem |
| `CPU` | General compute |
| `CRYPTO` | Cryptographic primitives |
| `GRAPH` | Graph algorithms |
| `IO` | Storage / I/O bound workloads |

## Status legend

| Status | Meaning |
|---|---|
| ✅ Implemented | Package exists, meets [SPECIFICATION.md](SPECIFICATION.md), and is linked. |
| ⏳ Planned | ID is reserved. No package yet — nothing to link to. |
| ⏸ Paused | Was implemented, work is currently on hold. Still linked; still real. |

## Adding a benchmark

1. Pick the next free number in your domain and add a row here with status
   `⏳ Planned`.
2. Build the package against [SPECIFICATION.md](SPECIFICATION.md) in its
   own repository.
3. Flip the row to `✅ Implemented` and add the link.
4. Mirror the same entry into the `BENCHMARKS` array in `script.js` so the
   site's registry picks it up.

See [ROADMAP.md](ROADMAP.md) for what's prioritized next and why.
