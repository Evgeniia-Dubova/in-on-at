// Гра «Біжи, герою!»: герой біжить трьома доріжками (IN / ON / AT) і перевтілюється у прийменник своєї доріжки.
(() => {
  const CARDS = window.IOA_CARDS || [];
  const LANES = ["in", "on", "at"];
  const $ = (id) => document.getElementById(id);
  const arena = $("runArena"), track = $("runTrack"), phrase = $("runPhrase"), heroEl = $("runHero");
  const fb = $("runFb"), ov = $("runOv");
  const hudScore = $("runScore"), hudLives = $("runLives"), hudStreak = $("runStreak");
  const KEYS = { ArrowUp: -1, ArrowDown: 1, w: -1, s: 1 };
  const DIRECT = { "1": 0, "2": 1, "3": 2 };

  const store = {
    get() { try { return +localStorage.getItem("ioa-run-best") || 0; } catch { return 0; } },
    set(v) { try { localStorage.setItem("ioa-run-best", v); } catch {} },
  };

  // Доріжки з підписами
  track.insertAdjacentHTML("afterbegin", LANES.map((a, i) =>
    `<div class="rlane ${a}" data-i="${i}"><span class="rlabel">${a.toUpperCase()}</span></div>`).join(""));
  const lanes = [...track.querySelectorAll(".rlane")];

  const heroSvg = (a) => `<svg class="ill" viewBox="-40 -74 80 78" aria-hidden="true" stroke="${L}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" fill="none">${B(0, 0, a, { arms: "wave" })}</svg>`;

  let st = null, raf = 0, bg = 0;
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function laneY(i) { const h = track.clientHeight / 3; return h * i + h / 2; }
  function heroX() { return Math.round(Math.max(110, track.clientWidth * .2)); }

  function setLane(i) {
    if (!st) return;
    i = Math.max(0, Math.min(2, i));
    if (i === st.lane && heroEl.dataset.a) return;
    st.lane = i;
    const a = LANES[i];
    heroEl.className = "rhero " + a;
    heroEl.dataset.a = a;
    heroEl.innerHTML = heroSvg(a);
    heroEl.style.transform = `translate(${heroX() - 41}px, ${laneY(i) - 74}px)`;
    lanes.forEach((l, k) => l.classList.toggle("cur", k === i));
  }

  function hud() {
    hudScore.textContent = st.score;
    hudStreak.textContent = st.streak >= 2 ? `серія ×${st.streak}` : "";
    hudLives.innerHTML = [0, 1, 2].map((i) => `<i class="${i < st.lives ? "on" : ""}">♥</i>`).join("");
  }

  function start() {
    cancelAnimationFrame(raf);
    track.querySelectorAll(".gate,.coin").forEach((e) => e.remove());
    st = { score: 0, lives: 3, streak: 0, right: 0, dur: 4.6, lane: 1, deck: shuffle(CARDS.slice()), gate: null, mistakes: [], last: 0, wait: .4 };
    heroEl.dataset.a = "";
    ov.hidden = true; fb.hidden = true;
    arena.classList.add("playing");
    setLane(1);
    hud();
    phrase.innerHTML = `<span class="ready">Приготуйся…</span>`;
    raf = requestAnimationFrame(tick);
    arena.focus({ preventScroll: true });
  }

  function spawn() {
    if (!st.deck.length) st.deck = shuffle(CARDS.slice());
    const c = st.deck.pop();
    const el = document.createElement("div");
    el.className = "gate" + (c.gold ? " gold" : "");
    el.innerHTML = LANES.map((a) => `<div class="door ${a}" style="top:${laneY(LANES.indexOf(a)) - 30}px"><b>${a}</b></div>`).join("");
    track.appendChild(el);
    st.gate = { ...c, el, x: track.clientWidth + 10, judged: false };
    phrase.innerHTML = `${c.gold ? `<span class="star">★ виняток</span>` : ""}<span class="gap">___</span> ${c.p}`;
    phrase.classList.toggle("gold", c.gold);
  }

  function tick(t) {
    if (!st) return;
    const dt = st.last ? Math.min((t - st.last) / 1000, .05) : 0;
    st.last = t;
    const W = track.clientWidth;
    const v = W / st.dur; // px/s
    bg += v * dt;
    track.style.setProperty("--bg", `${-bg}px`);
    track.style.setProperty("--bg2", `${-bg * .4}px`);

    if (!st.gate) {
      st.wait -= dt;
      if (st.wait <= 0) spawn();
    } else {
      const g = st.gate;
      g.x -= v * dt;
      g.el.style.transform = `translateX(${g.x}px)`;
      if (!g.judged && g.x <= heroX() + 10) judge(g);
      if (g.x < -80) { g.el.remove(); st.gate = null; st.wait = .25; }
    }
    if (arena.classList.contains("playing")) raf = requestAnimationFrame(tick);
  }

  function pop(text, cls) {
    const e = document.createElement("div");
    e.className = "coin " + cls;
    e.textContent = text;
    e.style.left = heroX() + "px";
    e.style.top = laneY(st.lane) - 70 + "px";
    track.appendChild(e);
    setTimeout(() => e.remove(), 900);
  }

  let fbT = 0;
  function flash(html, kind) {
    fb.className = "feedback " + kind;
    fb.innerHTML = html; fb.hidden = false;
    clearTimeout(fbT);
    fbT = setTimeout(() => { fb.hidden = true; }, kind === "good" ? 1000 : 1900);
  }

  function judge(g) {
    g.judged = true;
    const doors = g.el.querySelectorAll(".door");
    const ok = LANES[st.lane] === g.a;
    doors[LANES.indexOf(g.a)].classList.add("right");
    if (ok) {
      st.streak++; st.right++;
      const pts = (g.gold ? 25 : 10) + Math.floor(st.streak / 5) * 5;
      st.score += pts;
      if (st.right % 5 === 0) st.dur = Math.max(2, st.dur - .35);
      pop("+" + pts, "good");
      heroEl.classList.remove("jump"); void heroEl.offsetWidth; heroEl.classList.add("jump");
      flash(`<b class="w ${g.a}">${g.a}</b> ${g.p} · ${g.rule[1]}`, "good");
    } else {
      st.lives--; st.streak = 0;
      if (!st.mistakes.some((m) => m.p === g.p)) st.mistakes.push(g);
      doors[st.lane].classList.add("wrong");
      pop("ой!", "bad");
      heroEl.classList.remove("trip"); void heroEl.offsetWidth; heroEl.classList.add("trip");
      flash(`Тут <b class="w ${g.a}">${g.a}</b> ${g.p}<small>${g.rule[0]} · ${g.rule[1]}</small>`, "bad");
    }
    hud();
    if (st.lives <= 0) setTimeout(over, 700);
  }

  function over() {
    arena.classList.remove("playing");
    cancelAnimationFrame(raf);
    const old = store.get(), best = Math.max(old, st.score);
    store.set(best);
    fb.hidden = true;
    ov.innerHTML = `
      <h3>${st.score > old && st.score > 0 ? "Новий рекорд!" : "Забіг завершено"}</h3>
      <p class="big-score">${st.score}<span> балів</span></p>
      <p class="sub">Пройдено воріт: ${st.right} · Рекорд: ${best}</p>
      ${st.mistakes.length ? `<div class="mist"><p>Повтори ці правила:</p><ul>${st.mistakes.map((m) =>
        `<li><b class="w ${m.a}">${m.a}</b> ${m.p}<span>${m.rule[0]} · ${m.rule[1]}</span></li>`).join("")}</ul></div>` : ""}
      <button type="button" class="go" id="runAgain">Бігти ще раз</button>`;
    ov.hidden = false;
    $("runAgain").addEventListener("click", start);
  }

  function intro() {
    const best = store.get();
    ov.innerHTML = `
      <h3>Біжи, герою!</h3>
      <p class="sub">Герой біжить сам. Читай фразу вгорі й перебігай на доріжку з правильним прийменником, поки не добіг до воріт.</p>
      <ul class="how">
        <li><b>Стрілки ↑ ↓</b> або <b>1 2 3</b> — змінити доріжку</li>
        <li><b>На телефоні</b> — торкнись доріжки або змахни вгору / вниз</li>
        <li>На кожній доріжці герой <b>перевтілюється</b>: стає <b class="w in">in</b>, <b class="w on">on</b> або <b class="w at">at</b></li>
        <li><b class="gold-t">★ Золоті ворота</b> — винятки, більше балів</li>
      </ul>
      <p class="sub">3 життя · біг поступово прискорюється${best ? ` · Рекорд: ${best}` : ""}</p>
      <button type="button" class="go" id="runGo">Бігти!</button>`;
    ov.hidden = false;
    $("runGo").addEventListener("click", start);
  }

  // Керування
  document.addEventListener("keydown", (e) => {
    if (!arena.classList.contains("playing")) return;
    if (e.key in KEYS) { e.preventDefault(); setLane(st.lane + KEYS[e.key]); }
    else if (e.key in DIRECT) { e.preventDefault(); setLane(DIRECT[e.key]); }
  });
  let p0 = null;
  track.addEventListener("pointerdown", (e) => { p0 = { y: e.clientY, x: e.clientX }; });
  track.addEventListener("pointerup", (e) => {
    if (!p0 || !arena.classList.contains("playing")) { p0 = null; return; }
    const dy = e.clientY - p0.y, dx = e.clientX - p0.x; p0 = null;
    if (Math.abs(dy) > 30 && Math.abs(dy) > Math.abs(dx)) { setLane(st.lane + (dy > 0 ? 1 : -1)); return; }
    const r = track.getBoundingClientRect();
    setLane(Math.floor((e.clientY - r.top) / (r.height / 3)));
  });
  window.addEventListener("resize", () => { if (st) { heroEl.dataset.a = ""; setLane(st.lane); } });

  // герой видно й під заставкою
  heroEl.className = "rhero on";
  heroEl.innerHTML = heroSvg("on");
  requestAnimationFrame(() => { heroEl.style.transform = `translate(${heroX() - 41}px, ${laneY(1) - 74}px)`; });
  intro();
})();
