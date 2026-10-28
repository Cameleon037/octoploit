/* Octoploit — theme/mode switch, background fx, terminal typewriter */
(() => {
  const THEME_KEY = "octoploit-theme-v2";
  const MODE_KEY = "octoploit-mode-v2";
  const LANG_KEY = "octoploit-lang-v2";
  const root = document.documentElement;
  const logo = document.getElementById("brand-logo");
  const themeBtns = [...document.querySelectorAll(".mode-btn[data-mode]")];
  const lightBtns = [...document.querySelectorAll(".mode-btn[data-light]")];
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const fav = document.querySelector('link[rel="icon"]');
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- state ---------- */
  const fx = {
    theme: root.dataset.theme || "green",
    light: (root.dataset.mode || "dark") !== "dark",
  };

  function apply(next) {
    const s = Object.assign({ theme: fx.theme, light: fx.light }, next);
    root.dataset.theme = s.theme;
    root.dataset.mode = s.light ? "light" : "dark";
    try {
      if (next.theme) localStorage.setItem(THEME_KEY, s.theme);
      if (next.light !== undefined) localStorage.setItem(MODE_KEY, s.light ? "light" : "dark");
    } catch (_) {}
    if (logo) logo.src = `assets/logo_${s.theme}${s.light ? "" : "_dark"}.svg`;
    if (fav) fav.href = `assets/favicon_${s.theme}.svg`;
    themeBtns.forEach((b) => {
      const on = b.dataset.mode === s.theme;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", String(on));
    });
    lightBtns.forEach((b) => {
      const on = (b.dataset.light === "light") === s.light;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", String(on));
    });
    if (metaTheme) metaTheme.content = s.light ? "#fafaf8" : "#0b0d0a";
    fx.theme = s.theme;
    fx.light = s.light;
  }
  themeBtns.forEach((b) => b.addEventListener("click", () => apply({ theme: b.dataset.mode })));
  lightBtns.forEach((b) => b.addEventListener("click", () => apply({ light: b.dataset.light === "light" })));

  /* ---------- i18n ---------- */
  const I18N = {
    en: {
      title: "Octoploit — Build. Break. Harden.",
      desc: "Octoploit — software development and offensive security. We build it, we break it, it ships harder.",
      aria_term: "terminal prompt: ./octoploit --build --break --harden",
      nav_services: "Services", nav_approach: "Approach", nav_contact: "Contact",
      eyebrow: "// SOFTWARE & SECURITY STUDIO",
      h1a: "WE BUILD IT.", h1b: "WE BREAK IT.", h1c: "IT SHIPS HARDER.",
      lede: "Octoploit is a two-headed studio: engineers who ship software, attackers who tear it apart. Same team, both sides of the keyboard.",
      cta_services: "SEE SERVICES", cta_contact: "GET IN TOUCH",
      sec_services: "SERVICES", sec_note: "Two tracks. One eight-armed team.",
      trk01: "TRACK 01", trk02: "TRACK 02",
      dev_title: "DEVELOPMENT",
      dev_desc: "From whiteboard to production — built with an attacker's paranoia baked in.",
      dev_c1t: "Web & app development",
      dev_c1d: "Frontends, backends and full products. Typed, tested, boring-in-the-good-way stacks.",
      dev_c2t: "APIs & integrations",
      dev_c2d: "REST/GraphQL APIs, webhooks, third-party glue — documented and hardened at the edges.",
      dev_c3t: "Automation & tooling",
      dev_c3d: "CI/CD, internal tools, scripts that delete themselves. Machines do the boring half.",
      off_title: "OFFENSIVE SECURITY",
      off_desc: "Find the hole before someone else sells it for you.",
      off_c1t: "Penetration testing",
      off_c1d: "Web apps, APIs and networks. Real exploits, reproducible steps, no PDF-only fearware.",
      off_c2t: "Red team & attack simulation",
      off_c2d: "Adversary emulation against your real defenses — from phishing to domain takeover paths.",
      off_c3t: "Secure code review",
      off_c3d: "Line-by-line review by people who also write production code. Fixes included, not demanded.",
      sec_approach: "APPROACH",
      punch: "Builders who think like breakers. Breakers who know how it was assembled.",
      s1t: "SCOPE",
      s1d: "What exists, what matters, what hurts. Written down before a single packet moves.",
      s2t: "BUILD / BREACH",
      s2d: "Ship the feature or attack it. Same standards: reproducible, measured, no theater.",
      s3t: "HARDEN",
      s3d: "Findings become fixes become tests. The next version remembers the last attack.",
      sec_contact: "CONTACT",
      contact_line: "Got a product to build or a system to break?",
      f_build: "build", f_break: "break", f_harden: "harden",
    },
    fr: {
      title: "Octoploit — Construire. Attaquer. Renforcer.",
      desc: "Octoploit — développement logiciel et sécurité offensive. Nous construisons, nous attaquons, il se renforce.",
      aria_term: "prompt de terminal : ./octoploit --build --break --harden",
      nav_services: "Services", nav_approach: "Approche", nav_contact: "Contact",
      eyebrow: "// DÉVELOPPEMENT & SÉCURITÉ OFFENSIVE",
      h1a: "NOUS LE CONSTRUISONS.", h1b: "NOUS L'ATTAQUONS.", h1c: "IL SE RENFORCE.",
      lede: "Octoploit est un studio à deux têtes : des ingénieurs qui livrent du logiciel, des attaquants qui le dissèquent. Même équipe, les deux côtés du clavier.",
      cta_services: "NOS SERVICES", cta_contact: "NOUS CONTACTER",
      sec_services: "SERVICES", sec_note: "Deux axes. Une seule équipe aux huit bras.",
      trk01: "AXE 01", trk02: "AXE 02",
      dev_title: "DÉVELOPPEMENT",
      dev_desc: "Du tableau blanc à la production — conçu avec la paranoïa d'un attaquant.",
      dev_c1t: "Développement web & apps",
      dev_c1d: "Frontends, backends et produits complets. Des choix techniques ennuyeux — tant mieux.",
      dev_c2t: "APIs & intégrations",
      dev_c2d: "APIs REST/GraphQL, webhooks, intégrations tierces — documentées et renforcées aux points d'entrée.",
      dev_c3t: "Automatisation & outillage",
      dev_c3d: "CI/CD, outils internes, scripts qui s'auto-détruisent. Les machines font le travail ennuyeux.",
      off_title: "SÉCURITÉ OFFENSIVE",
      off_desc: "Trouvez la faille avant qu'un autre ne la revende.",
      off_c1t: "Tests d'intrusion",
      off_c1d: "Apps web, APIs et réseaux. Exploits réels, étapes reproductibles — pas juste un rapport PDF.",
      off_c2t: "Red team & simulation d'attaque",
      off_c2d: "Émulation d'adversaire contre vos défenses réelles — du hameçonnage à la prise de domaine.",
      off_c3t: "Revue de code sécurisée",
      off_c3d: "Revue ligne à ligne par des gens qui écrivent aussi du code de production. On livre les correctifs, pas seulement la liste des problèmes.",
      sec_approach: "APPROCHE",
      punch: "Des développeurs qui pensent comme des attaquants. Des attaquants qui savent comment c'est assemblé.",
      s1t: "CADRAGE",
      s1d: "Ce qui existe, ce qui compte, ce qui ferait mal. Écrit noir sur blanc avant qu'un paquet ne parte.",
      s2t: "CONSTRUIRE / ATTAQUER",
      s2d: "Livrer la fonctionnalité ou l'attaquer. Mêmes standards : reproductible, mesuré, sans mise en scène.",
      s3t: "RENFORCER",
      s3d: "Les failles deviennent correctifs, deviennent tests. La version suivante se souvient de la dernière attaque.",
      sec_contact: "CONTACT",
      contact_line: "Un produit à construire ou un système à faire tomber ?",
      f_build: "construire", f_break: "attaquer", f_harden: "renforcer",
    },
  };
  const langBtns = [...document.querySelectorAll(".mode-btn[data-lang]")];
  const metaDesc = document.querySelector('meta[name="description"]');
  let lang = I18N[root.lang] ? root.lang : "en";

  function applyLang(l) {
    if (I18N[l]) lang = l;
    const d = I18N[lang];
    root.lang = lang;
    document.title = d.title;
    if (metaDesc) metaDesc.content = d.desc;
    for (const el of document.querySelectorAll("[data-i18n]")) {
      const v = d[el.dataset.i18n];
      if (v != null) el.textContent = v;
    }
    for (const el of document.querySelectorAll("[data-i18n-aria]")) {
      const v = d[el.dataset.i18nAria];
      if (v != null) el.setAttribute("aria-label", v);
    }
    langBtns.forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", String(on));
    });
  }
  langBtns.forEach((b) =>
    b.addEventListener("click", () => {
      applyLang(b.dataset.lang);
      try { localStorage.setItem(LANG_KEY, b.dataset.lang); } catch (_) {}
    })
  );

  /* ---------- canvas fx ---------- */
  const cv = document.getElementById("fx");

  function startFx() {
    if (!cv || reduce) return;
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, dpr = Math.min(devicePixelRatio || 1, 2);

    function resize() {
      W = cv.width = innerWidth * dpr;
      H = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + "px";
      cv.style.height = innerHeight + "px";
      initRain();
      initEmbers();
    }

    /* matrix rain of hex bytes */
    const HEX = "0123456789ABCDEF";
    const cell = 16 * dpr;
    let cols, drops;
    function initRain() {
      cols = Math.ceil(W / cell);
      drops = Array.from({ length: cols }, () => Math.random() * -H);
    }
    function byteGlyph() {
      return HEX[(Math.random() * 16) | 0] + HEX[(Math.random() * 16) | 0];
    }

    /* fire embers */
    let embers;
    function initEmbers() {
      const n = Math.floor(W / (28 * dpr)) + 8;
      embers = Array.from({ length: n }, () => spawnEmber(true));
    }
    function spawnEmber(anywhere) {
      return {
        x: Math.random() * W,
        y: anywhere ? Math.random() * H : H + Math.random() * 40 * dpr,
        s: (3 + Math.floor(Math.random() * 4)) * dpr,
        v: (0.4 + Math.random() * 1.0) * dpr,
        wob: Math.random() * Math.PI * 2,
        hot: Math.random() < 0.25,
      };
    }

    let tick = 0;

    function frame() {
      /* fade existing pixels (trail effect, canvas stays transparent) */
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = fx.theme === "red" ? "rgba(0,0,0,0.30)" : "rgba(0,0,0,0.07)";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      if (fx.theme === "green") {
        tick += 1;
        if (tick % 3 === 0) {
          ctx.font = `${Math.round(cell * 0.75)}px monospace`;
          for (let i = 0; i < cols; i++) {
            const y = drops[i];
            ctx.fillStyle = fx.light
              ? (Math.random() < 0.12 ? "rgba(0,150,40,0.5)" : "rgba(0,115,30,0.18)")
              : (Math.random() < 0.12 ? "rgba(0,255,65,0.26)" : "rgba(0,210,60,0.09)");
            ctx.fillText(byteGlyph(), i * cell, y);
            drops[i] = y > H + cell * 8 && Math.random() > 0.975
              ? Math.random() * -cell * 4
              : y + cell;
          }
        }
      } else {
        for (const e of embers) {
          e.y -= e.v;
          e.wob += 0.05;
          const x = e.x + Math.sin(e.wob) * 6 * dpr;
          ctx.fillStyle = fx.light
            ? (e.hot ? "rgba(255,40,20,0.24)" : "rgba(150,10,10,0.13)")
            : (e.hot ? "rgba(255,120,50,0.24)" : "rgba(255,60,30,0.12)");
          ctx.fillRect(x, e.y, e.s, e.s);
          ctx.fillStyle = fx.light ? "rgba(150,10,10,0.07)" : "rgba(255,60,30,0.07)";
          ctx.fillRect(x, e.y + e.s, e.s * 0.6, e.s * 0.6);
          if (e.y < -10 * dpr) Object.assign(e, spawnEmber(false));
        }
      }

      if (!document.hidden) requestAnimationFrame(frame);
    }

    addEventListener("resize", resize);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) requestAnimationFrame(frame);
    });
    resize();
    requestAnimationFrame(frame);
  }

  /* ---------- typewriter ---------- */
  function typeCmd() {
    const el = document.getElementById("term-cmd");
    if (!el) return;
    const cmd = "./octoploit --build --break --harden";
    if (reduce) { el.textContent = cmd; return; }
    let i = 0;
    (function tick() {
      el.textContent = cmd.slice(0, i++);
      if (i <= cmd.length) setTimeout(tick, 45 + Math.random() * 60);
    })();
  }

  applyLang(root.lang);
  apply({});
  startFx();
  typeCmd();
})();
