/* Octoploit — light/dark switch, background fx, terminal typewriter */
(() => {
  const MODE_KEY = "octoploit-mode-v2";
  const LANG_KEY = "octoploit-lang-v2";
  const root = document.documentElement;
  const lightBtns = [...document.querySelectorAll(".mode-btn[data-light]")];
  const langBtns = [...document.querySelectorAll(".mode-btn[data-lang]")];
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const metaDesc = document.querySelector('meta[name="description"]');
  const fav = document.querySelector('link[rel="icon"]');
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* private browsing can refuse storage: a failed write must never cost the
     visitor their light/dark switch */
  const store = (key, value) => {
    try { localStorage.setItem(key, value); } catch (_) {}
  };

  /* the pressed look shared by the two segmented controls */
  const press = (btns, isOn) => btns.forEach((b) => {
    const on = isOn(b);
    b.classList.toggle("is-on", on);
    b.setAttribute("aria-pressed", String(on));
  });

  /* ---------- palette ---------- */
  const palette = {
    /* the site theme is pinned to green: the offsec screen borrows red
       while it owns the middle of the screen, nothing is persisted */
    theme: "green",
    light: (root.dataset.mode || "dark") !== "dark",
  };

  function apply(next) {
    const s = Object.assign({ theme: palette.theme, light: palette.light, persist: true }, next);
    root.dataset.theme = s.theme;
    root.dataset.mode = s.light ? "light" : "dark";
    if (s.persist && next.light !== undefined) store(MODE_KEY, s.light ? "light" : "dark");
    if (fav) fav.href = `assets/favicon_${s.theme}.svg`;
    if (metaTheme) metaTheme.content = s.light ? "#fafaf8" : "#0b0d0a";
    press(lightBtns, (b) => (b.dataset.light === "light") === s.light);
    palette.theme = s.theme;
    palette.light = s.light;
  }
  lightBtns.forEach((b) => b.addEventListener("click", () => apply({ light: b.dataset.light === "light" })));

  /* ---------- i18n ---------- */
  const I18N = {
    en: {
      title: "Octoploit — Build. Break. Harden.",
      desc: "Octoploit — software development, penetration testing & red team. We build it, we break it, it ships harder.",
      aria_term: "terminal prompt: ./octoploit --build --harden",
      nav_services: "Services", nav_about: "Profile", nav_contact: "Contact",
      drop_dev: "Development", drop_offsec: "Penetration testing & red team",
      eyebrow: "// SOFTWARE & SECURITY STUDIO",
      h1a: "WE BUILD IT.", h1b: "WE MAKE IT UNBREAKABLE.",
      lede: "Octoploit runs two tracks: building software and hardening it — before anyone else gets the chance to find a breach.",
      cta_tracks: "SEE THE TRACKS", cta_contact: "GET IN TOUCH",
      trk01: "TRACK 01", trk02: "TRACK 02",
      sec_dev: "DEVELOPMENT",
      dev_desc: "From whiteboard to production — built with robustness in mind.",
      dev_c1t: "Web & app development",
      dev_c1d: "Frontends, backends and full products. Typed, tested.",
      dev_c2t: "APIs & integrations",
      dev_c2d: "REST/GraphQL APIs, webhooks, third-party glue — documented and hardened at the edges.",
      dev_c3t: "Automation & tooling",
      dev_c3d: "CI/CD, internal tools, cloud deployments, automation.",
      sec_off: "PENETRATION TESTING & RED TEAM",
      off_desc: "Know your real exposure before an incident does.",
      off_c1t: "Penetration testing",
      off_c1d: "Web apps, APIs, networks. Proof over theory: working exploits, prioritized fixes, and a retest to confirm they hold.",
      off_c2t: "Red team & attack simulation",
      off_c2d: "A sanctioned simulation of a real intruder, run transparently with your team: same playbook, no real damage.",
      off_c3t: "Secure code review",
      off_c3d: "Line-by-line review by people who also write production code. Fixes included, not demanded.",
      sec_about: "WHO I AM",
      about_punch: "Ten years actively on the keyboard.",
      cred_certs: "CERTIFICATIONS",
      certs_sub: "Offensive track: pentest, red team, exploit development",
      cred_edu: "EDUCATION",
      edu_val: "Double engineering degree — ENAC & ENSEEIHT, cybersecurity & computer systems",
      cred_exp: "EXPERIENCE",
      exp_val: "10 years across development and cybersecurity",
      cred_link: "LINKEDIN",
      sec_contact: "CONTACT",
      contact_line: "A tool to build — or a system to harden?",
      f_build: "build", f_harden: "harden", f_sep1: " · ",
      top_aria: "Back to top",
    },
    fr: {
      title: "Octoploit — Construire. Casser. Renforcer.",
      desc: "Octoploit — développement logiciel, tests d'intrusion et red team. Nous construisons, nous cassons, il sort renforcé.",
      aria_term: "prompt de terminal : ./octoploit --build --harden",
      nav_services: "Services", nav_about: "Profil", nav_contact: "Contact",
      drop_dev: "Développement", drop_offsec: "Tests d'intrusion & red team",
      eyebrow: "// DÉVELOPPEMENT & CYBERSÉCURITÉ",
      h1a: "NOUS CONSTRUISONS.", h1b: "NOUS RENDONS ROBUSTE.",
      lede: "Octoploit est une ESN (Entreprise de Services du Numérique) à double vocation : livrer du logiciel et / ou le renforcer — avant que quelqu'un d'autre n'ait l'occasion d'y trouver une faille.",
      cta_tracks: "NOS AXES", cta_contact: "NOUS CONTACTER",
      trk01: "AXE 01", trk02: "AXE 02",
      sec_dev: "DÉVELOPPEMENT",
      dev_desc: "Du tableau blanc à la production — conçu avec le souci de la robustesse.",
      dev_c1t: "Développement web & apps",
      dev_c1d: "Frontends, backends et produits complets.",
      dev_c2t: "APIs & intégrations",
      dev_c2d: "APIs REST/GraphQL, webhooks, intégrations tierces — documentées et renforcées aux points d'entrée.",
      dev_c3t: "Automatisation & outillage",
      dev_c3d: "CI/CD, outils internes, déploiement cloud, automatisation",
      sec_off: "TESTS D'INTRUSION & RED TEAM",
      off_desc: "Connaissez votre exposition réelle avant qu'un incident ne vous l'apprenne.",
      off_c1t: "Tests d'intrusion",
      off_c1d: "Apps web, APIs et réseaux. Des preuves, pas de la théorie : exploits fonctionnels, correctifs priorisés et re-test pour confirmer qu'ils tiennent.",
      off_c2t: "Red team & simulation d'attaque",
      off_c2d: "Une simulation autorisée d'un intrus réel, menée en transparence avec vos équipes : mêmes méthodes, aucun dommage réel.",
      off_c3t: "Revue de code sécurisée",
      off_c3d: "Revue ligne à ligne par des gens qui écrivent aussi du code de production. On livre les correctifs, pas seulement la liste des problèmes.",
      sec_about: "QUI SUIS-JE",
      about_punch: "Dix ans au clavier, tous les jours.",
      cred_certs: "CERTIFICATIONS",
      certs_sub: "Volet offensif : pentest, red team, développement d'exploits",
      cred_edu: "FORMATION",
      edu_val: "Double diplôme d'ingénieur — ENAC & ENSEEIHT, cybersécurité et systèmes informatiques",
      cred_exp: "EXPÉRIENCE",
      exp_val: "10 ans de développement et de cybersécurité",
      cred_link: "LINKEDIN",
      sec_contact: "CONTACT",
      contact_line: "Un outil à développer — ou un système à renforcer ?",
      f_build: "construire", f_harden: "renforcer", f_sep1: " · ",
      top_aria: "Retour en haut de page",
    },
  };
  let lang = "en";

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
    press(langBtns, (b) => b.dataset.lang === lang);
  }
  langBtns.forEach((b) =>
    b.addEventListener("click", () => {
      applyLang(b.dataset.lang);
      store(LANG_KEY, b.dataset.lang);
    })
  );

  /* ---------- magnetic sections: screens sized against header + footer ---- */
  const BARS = [["header.top", "--header-h"], ["footer", "--footer-h"]];

  function trackBars() {
    const bars = BARS
      .map(([sel, prop]) => [document.querySelector(sel), prop])
      .filter(([el]) => el);
    const set = () => {
      for (const [el, prop] of bars)
        root.style.setProperty(prop, `${Math.round(el.getBoundingClientRect().height)}px`);
    };
    set();
    const ro = new ResizeObserver(set);
    bars.forEach(([el]) => ro.observe(el));
  }

  /* ---------- scroll-driven chrome: back-to-top + the offsec palette -------- */
  function wireScrollChrome() {
    const btn = document.querySelector(".to-top");
    const offsec = document.querySelector("#offsec");
    let queued = 0;
    let inOffsec = false;
    const sync = () => {
      queued = 0;
      /* hidden only while you are still on the first screen */
      if (btn) btn.classList.toggle("is-on", scrollY > innerHeight * 0.5);
      if (!offsec) return;
      /* whoever owns the middle of the screen owns the palette: the offsec
         screen pulls the site red, leaving it restores the pinned green */
      const r = offsec.getBoundingClientRect();
      const inside = r.top <= innerHeight * 0.5 && r.bottom > innerHeight * 0.5;
      if (inside === inOffsec) return;
      inOffsec = inside;
      apply(inside ? { theme: "red", persist: false } : { theme: "green", persist: false });
    };
    const onScroll = () => { if (!queued) queued = requestAnimationFrame(sync); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    sync();
  }

  /* ---------- services dropdown ---------- */
  function wireNavDrop() {
    const item = document.querySelector(".nav-item");
    const btn = document.getElementById("nav-services");
    if (!item || !btn) return;
    let hover = false, focus = false, pinned = false, suppressed = false;
    const render = () => {
      const on = !suppressed && (pinned || hover || focus);
      item.classList.toggle("is-open", on);
      btn.setAttribute("aria-expanded", String(on));
    };
    const close = () => { pinned = hover = false; render(); };
    /* you cannot click the trigger without hovering it first, so hover is only
       a preview: the click pins it open, and a second click closes it even
       while the pointer is still sitting there */
    btn.addEventListener("click", () => {
      suppressed = false;
      if (pinned) { pinned = false; hover = false; } else { pinned = true; }
      render();
    });
    item.addEventListener("pointerenter", () => { hover = true; suppressed = false; render(); });
    item.addEventListener("pointerleave", () => { hover = false; render(); });
    item.addEventListener("focusin", () => { focus = true; render(); });
    item.addEventListener("focusout", (e) => {
      focus = item.contains(e.relatedTarget);
      if (!focus) suppressed = false;
      render();
    });
    /* picking a link lands on its section and closes the panel */
    item.addEventListener("click", (e) => {
      if (!e.target.closest("a")) return;
      pinned = hover = focus = false;
      render();
    });
    addEventListener("pointerdown", (e) => {
      if (item.contains(e.target)) return;
      close();
    });
    addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || !item.classList.contains("is-open")) return;
      suppressed = true;      /* the refocus below must not reopen it */
      btn.focus();
      close();
    });
  }

  /* ---------- canvas fx ---------- */
  const cv = document.getElementById("fx");

  /* every paint the two screens need, keyed by mode then track */
  const TRAIL = { green: "rgba(0,0,0,0.07)", red: "rgba(0,0,0,0.30)" };
  const RAIN = {
    light: ["rgba(0,150,40,0.5)", "rgba(0,115,30,0.18)"],
    dark: ["rgba(0,255,65,0.26)", "rgba(0,210,60,0.09)"],
  };
  const EMBER = {
    light: { hot: "rgba(255,40,20,0.24)", dim: "rgba(150,10,10,0.13)", tail: "rgba(150,10,10,0.07)" },
    dark: { hot: "rgba(255,120,50,0.24)", dim: "rgba(255,60,30,0.12)", tail: "rgba(255,60,30,0.07)" },
  };

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
      const mode = palette.light ? "light" : "dark";
      /* fade existing pixels (trail effect, canvas stays transparent) */
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = TRAIL[palette.theme];
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      if (palette.theme === "green") {
        const [bright, dim] = RAIN[mode];
        tick += 1;
        if (tick % 3 === 0) {
          ctx.font = `${Math.round(cell * 0.75)}px monospace`;
          for (let i = 0; i < cols; i++) {
            const y = drops[i];
            ctx.fillStyle = Math.random() < 0.12 ? bright : dim;
            ctx.fillText(byteGlyph(), i * cell, y);
            drops[i] = y > H + cell * 8 && Math.random() > 0.975
              ? Math.random() * -cell * 4
              : y + cell;
          }
        }
      } else {
        const paint = EMBER[mode];
        for (const e of embers) {
          e.y -= e.v;
          e.wob += 0.05;
          const x = e.x + Math.sin(e.wob) * 6 * dpr;
          ctx.fillStyle = e.hot ? paint.hot : paint.dim;
          ctx.fillRect(x, e.y, e.s, e.s);
          ctx.fillStyle = paint.tail;
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
    const cmd = "./octoploit --build --harden";
    if (reduce) { el.textContent = cmd; return; }
    let i = 0;
    (function tick() {
      el.textContent = cmd.slice(0, i++);
      if (i <= cmd.length) setTimeout(tick, 45 + Math.random() * 60);
    })();
  }

  trackBars();
  wireScrollChrome();
  wireNavDrop();
  applyLang(root.lang);
  apply({});
  startFx();
  typeCmd();
})();
