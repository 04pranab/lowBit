// lowBit — registry data, filters, and light navigation UX.

document.addEventListener("DOMContentLoaded", function () {
  /* ------------------------------------------------------------
     Registry data
     Add a new benchmark by adding one object here — nothing else
     on the page needs to change.
     ------------------------------------------------------------ */
  const BENCHMARKS = [
    {
      id: "LB-ML-001",
      name: "Transformer Attention",
      domain: "ML",
      status: "implemented",
      desc: "Multi-head scaled dot-product attention, FP32 + INT8, x86-64 & RISC-V.",
      repo: "https://github.com/04pranab/ml-transformer-attn_r",
    },
    { id: "LB-ML-002", name: "GEMM", domain: "ML", status: "implemented", desc: "Dense matrix multiply, reference kernel for the attention/GEMM family.", repo: "https://github.com/04pranab/ml-gemm_r", },
    { id: "LB-ML-003", name: "Conv2D", domain: "ML", status: "planned", desc: "Direct 2D convolution across representative CNN-style shapes." },
    { id: "LB-ML-004", name: "Softmax (standalone)", domain: "ML", status: "planned", desc: "Isolated normalization kernel — memory-bound, branchy reduction profile." },
    { id: "LB-ML-005", name: "LayerNorm", domain: "ML", status: "planned", desc: "Normalization layer, forward pass, fixed statistics computation order." },
    { id: "LB-CRYPTO-001", name: "SHA-256", domain: "CRYPTO", status: "planned", desc: "Fixed-block cryptographic hash, deterministic by construction." },
    { id: "LB-GRAPH-001", name: "BFS", domain: "GRAPH", status: "planned", desc: "Breadth-first traversal over a fixed, seeded graph generator." },
  ];

  const DOMAIN_LABELS = {
    ML: "Machine learning",
    MEM: "Memory subsystem",
    CPU: "General compute",
    CRYPTO: "Cryptographic primitives",
    GRAPH: "Graph algorithms",
    IO: "Storage / I/O",
  };

  const grid = document.getElementById("registry-grid");
  const empty = document.getElementById("registry-empty");
  const domainFilterRow = document.getElementById("domain-filters");

  const state = { status: "all", domain: "all" };

  // Build domain chips from whatever domains actually appear in BENCHMARKS.
  const domainsPresent = [...new Set(BENCHMARKS.map((b) => b.domain))];
  domainsPresent.forEach((domain) => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.dataset.filterType = "domain";
    btn.dataset.filterValue = domain;
    btn.textContent = domain;
    domainFilterRow.appendChild(btn);
  });

  function renderRegistry() {
    const filtered = BENCHMARKS.filter((b) => {
      const statusOk = state.status === "all" || b.status === state.status;
      const domainOk = state.domain === "all" || b.domain === state.domain;
      return statusOk && domainOk;
    });

    grid.innerHTML = "";
    empty.hidden = filtered.length !== 0;

    filtered.forEach((b) => {
      const card = document.createElement("div");
      card.className =
        "registry-card spec-card reveal is-visible" + (b.status === "planned" ? " is-planned" : "");

      const pillClass = b.status === "implemented" ? "pill-verified" : "pill-planned";
      const pillLabel = b.status === "implemented" ? "Implemented" : "Planned";

      const linkHtml =
        b.status === "implemented" && b.repo
          ? `<a class="registry-card-link" href="${b.repo}">View repository →</a>`
          : `<div class="registry-card-soon">Reserved — not yet published</div>`;

      card.innerHTML = `
        <div class="spec-card-bar">
          <span class="spec-card-id">${b.id}</span>
          <span class="pill ${pillClass}">${pillLabel}</span>
        </div>
        <div class="registry-card-body">
          <div class="registry-card-name">${b.name}</div>
          <div class="registry-card-desc">${b.desc}</div>
          <div class="registry-card-tags">
            <span class="tag">${b.domain}</span>
            <span class="tag">${DOMAIN_LABELS[b.domain] || b.domain}</span>
          </div>
        </div>
        ${linkHtml}
      `;
      grid.appendChild(card);
    });
  }

  document.querySelectorAll(".registry-filters .chip").forEach((chip) => {
    chip.addEventListener("click", function () {
      const type = this.dataset.filterType;
      const value = this.dataset.filterValue;
      state[type] = value;

      const row = type === "status" ? document.getElementById("status-filters") : domainFilterRow;
      row.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
      this.classList.add("is-active");

      renderRegistry();
    });
  });

  renderRegistry();

  /* ------------------------------------------------------------
     Nav active-link tracking + smooth scroll for in-page links
     ------------------------------------------------------------ */
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section, #top");

  function updateActiveLink() {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop;
      if (window.pageYOffset >= top - 200) current = section.getAttribute("id");
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  /* ------------------------------------------------------------
     Scroll reveal (skips if reduced motion or no IO support)
     ------------------------------------------------------------ */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(".section, .spec-card, .tree-card");

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    revealTargets.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  }
});
