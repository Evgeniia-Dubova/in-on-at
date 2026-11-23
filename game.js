// Міні-гра «Розсели героїв»: фраза падає згори — відправ її до IN, ON або AT.
(() => {
  // [прийменник, фраза, правило, переклад правила, виняток?]
  const R = {
    rooms: ["Spaces / rooms", "Простори / кімнати"],
    cities: ["Cities / countries", "Міста / країни"],
    water: ["Water", "Вода"],
    areas: ["Directions / areas", "Напрямки / райони"],
    small: ["Small vehicles", "Малий транспорт"],
    surf: ["Surfaces", "Поверхні"],
    big: ["Transport", "Великий транспорт, де можна ходити"],
    tech: ["Technology / media", "Техніка / медіа"],
    ride: ["1-person rides", "Поїздки на одного"],
    street: ["Directions", "Вулиці / поверхи"],
    exact: ["Exact locations", "Точне місце"],
    events: ["Events", "Події"],
    addr: ["Addresses", "Адреса з номером"],
    top: ["Top / bottom of something", "Верх / низ чогось"],
    serv: ["Services / professionals", "Послуги / фахівці"],
    house: ["Someone’s house / place", "Чийсь дім / місце"],
    exc: ["Exception", "Виняток — просто запам'ятай"],
  };
  const CARDS = [
    ["in", "the room", "rooms"], ["in", "the kitchen", "rooms"], ["in", "the bathroom", "rooms"], ["in", "the office", "rooms"],
    ["in", "Paris", "cities"], ["in", "Italy", "cities"], ["in", "Ukraine", "cities"], ["in", "London", "cities"],
    ["in", "the pool", "water"], ["in", "the sea", "water"], ["in", "the river", "water"],
    ["in", "the north", "areas"], ["in", "the city center", "areas"], ["in", "the countryside", "areas"],
    ["in", "a taxi", "small"], ["in", "a car", "small"], ["in", "a helicopter", "small"],
    ["on", "the table", "surf"], ["on", "the floor", "surf"], ["on", "the wall", "surf"],
    ["on", "a bus", "big"], ["on", "a plane", "big"], ["on", "a train", "big"], ["on", "a ship", "big"],
    ["on", "TV", "tech"], ["on", "the internet", "tech"], ["on", "the phone", "tech"],
    ["on", "a bike", "ride"], ["on", "a horse", "ride"], ["on", "a scooter", "ride"],
    ["on", "Green Street", "street"], ["on", "the first floor", "street"],
    ["at", "the door", "exact"], ["at", "the bus stop", "exact"], ["at", "the station", "exact"],
    ["at", "a party", "events"], ["at", "a concert", "events"], ["at", "school", "events"],
    ["at", "25 Green Street", "addr"], ["at", "10 Oxford Road", "addr"],
    ["at", "the top of the page", "top"], ["at", "the bottom of the screen", "top"],
    ["at", "the doctor’s", "serv"], ["at", "the dentist’s", "serv"],
    ["at", "John’s", "house"], ["at", "my friend’s", "house"],
    ["in", "the sky", "exc", 1], ["in", "the world", "exc", 1], ["in", "the picture", "exc", 1],
    ["on", "foot", "exc", 1], ["on", "the radio", "exc", 1], ["on", "holiday", "exc", 1],
    ["at", "home", "exc", 1], ["at", "work", "exc", 1], ["at", "the supermarket", "exc", 1],
  ].map(([a, p, r, gold]) => ({ a, p, rule: R[r], gold: !!gold }));

  const $ = (id) => document.getElementById(id);
  const arena = $("arena"), lane = $("lane"), fb = $("fb"), ov = $("ov");
  const hudScore = $("hudScore"), hudStreak = $("hudStreak"), hudLives = $("hudLives");
  const homes = {};
  const PREPS = ["in", "on", "at"];
  const KEYS = { ArrowLeft: "in", ArrowDown: "on", ArrowRight: "at", "1": "in", "2": "on", "3": "at" };

  // Герої-кошики внизу
  $("homes").innerHTML = PREPS.map((a, i) => `
    <button type="button" class="home ${a}" data-a="${a}" aria-label="${a.toUpperCase()}">
      <svg class="ill" viewBox="-36 -72 72 76" aria-hidden="true" stroke="${L}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" fill="none">${B(0, 0, a, { arms: "up" })}</svg>
      <span class="key">${["←", "↓", "→"][i]} · ${i + 1}</span>
    </button>`).join("");
  arena.querySelectorAll(".home").forEach((b) => {
    homes[b.dataset.a] = b;
    b.addEventListener("click", () => answer(b.dataset.a));
  });

  const store = {
    get() { try { return +localStorage.getItem("ioa-best") || 0; } catch { return 0; } },
    set(v) { try { localStorage.setItem("ioa-best", v); } catch {} },
  };

  let st = null, raf = 0;

  const shuffle = (arr) => { for (let i = arr.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; };

  function hud() {
    hudScore.textContent = st.score;
    hudStreak.textContent = st.streak >= 2 ? `серія ×${st.streak}` : "";
    hudLives.innerHTML = [0, 1, 2].map((i) => `<i class="${i < st.lives ? "on" : ""}">♥</i>`).join("");
  }

  function start() {
    cancelAnimationFrame(raf);
    st = { score: 0, streak: 0, lives: 3, right: 0, dur: 7.5, deck: shuffle(CARDS.slice()), mistakes: [], card: null, locked: false, last: 0 };
    ov.hidden = true; fb.hidden = true;
    lane.innerHTML = "";
    arena.classList.add("playing");
    hud();
    spawn();
    raf = requestAnimationFrame(tick);
    arena.focus({ preventScroll: true });
  }

  function spawn() {
    if (!st.deck.length) st.deck = shuffle(CARDS.slice());
    const c = st.deck.pop();
    const el = document.createElement("div");
    el.className = "fcard" + (c.gold ? " gold" : "");
    el.innerHTML = `${c.gold ? `<span class="star">★ виняток</span>` : ""}<span class="gap">___</span> ${c.p}`;
    lane.appendChild(el);
    st.card = { ...c, el, y: -el.offsetHeight - 6 };
    st.locked = false;
    st.last = 0;
  }

  function tick(t) {
    if (!st) return;
    if (!st.locked && st.card) {
      const dt = st.last ? Math.min((t - st.last) / 1000, .05) : 0;
      st.last = t;
      const max = lane.clientHeight - st.card.el.offsetHeight;
      st.card.y += (lane.clientHeight / st.dur) * dt;
      st.card.el.style.transform = `translate(-50%, ${st.card.y}px)`;
      if (st.card.y >= max) wrong(null);
    } else st.last = 0;
    raf = requestAnimationFrame(tick);
  }

  function answer(a) {
    if (!st || st.locked || !st.card || !arena.classList.contains("playing")) return;
    a === st.card.a ? right() : wrong(a);
  }

  function bounce(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

  function right() {
    const c = st.card; st.locked = true;
    st.streak++; st.right++;
    st.score += (c.gold ? 25 : 10) + Math.floor(st.streak / 5) * 5;
    if (st.right % 5 === 0) st.dur = Math.max(3, st.dur - .6);
    hud();
    const home = homes[c.a], hr = home.getBoundingClientRect(), lr = lane.getBoundingClientRect();
    const dx = hr.left + hr.width / 2 - (lr.left + lr.width / 2);
    const dy = hr.top + 20 - lr.top;
    c.el.classList.add("caught");
    c.el.style.transform = `translate(calc(-50% + ${dx}px), ${dy}px) scale(.35)`;
    bounce(home, "catch");
    flash(`<b class="w ${c.a}">${c.a}</b> ${c.p} · ${c.rule[1]}`, "good");
    setTimeout(() => { c.el.remove(); if (st && st.lives > 0) spawn(); }, 420);
  }

  function wrong(a) {
    const c = st.card; st.locked = true;
    st.lives--; st.streak = 0;
    if (!st.mistakes.some((m) => m.p === c.p)) st.mistakes.push(c);
    hud();
    c.el.classList.add("miss");
    if (a) bounce(homes[a], "nope");
    bounce(homes[c.a], "hint");
    // показати, куди насправді належить фраза
    setTimeout(() => {
      const hr = homes[c.a].getBoundingClientRect(), lr = lane.getBoundingClientRect();
      c.el.classList.add("caught");
      c.el.style.transform = `translate(calc(-50% + ${hr.left + hr.width / 2 - (lr.left + lr.width / 2)}px), ${hr.top + 20 - lr.top}px) scale(.35)`;
    }, 650);
    flash(`${a ? "Ні, тут" : "Не встиг! Тут"} <b class="w ${c.a}">${c.a}</b> ${c.p}<small>${c.rule[0]} · ${c.rule[1]}</small>`, "bad");
    setTimeout(() => {
      c.el.remove();
      if (st.lives <= 0) over(); else spawn();
    }, 1900);
  }

  let fbTimer = 0;
  function flash(html, kind) {
    fb.className = "feedback " + kind;
    fb.innerHTML = html;
    fb.hidden = false;
    clearTimeout(fbTimer);
    fbTimer = setTimeout(() => { fb.hidden = true; }, kind === "good" ? 1100 : 1850);
  }

  function over() {
    arena.classList.remove("playing");
    cancelAnimationFrame(raf);
    const old = store.get();
    const best = Math.max(old, st.score);
    const isRecord = st.score > old && st.score > 0;
    store.set(best);
    fb.hidden = true;
    ov.innerHTML = `
      <h3>${isRecord ? "Новий рекорд!" : "Гру завершено"}</h3>
      <p class="big-score">${st.score}<span> балів</span></p>
      <p class="sub">Правильних відповідей: ${st.right} · Рекорд: ${best}</p>
      ${st.mistakes.length ? `<div class="mist"><p>Повтори ці правила:</p><ul>${st.mistakes.map((m) =>
        `<li><b class="w ${m.a}">${m.a}</b> ${m.p}<span>${m.rule[0]} · ${m.rule[1]}</span></li>`).join("")}</ul></div>` : ""}
      <button type="button" class="go" id="again">Грати ще раз</button>`;
    ov.hidden = false;
    $("again").addEventListener("click", start);
  }

  function intro() {
    const best = store.get();
    ov.innerHTML = `
      <h3>Розсели героїв</h3>
      <p class="sub">Згори падають фрази. Відправ кожну до свого героя, поки вона не впала.</p>
      <ul class="how">
        <li><b>Натисни</b> на героя внизу</li>
        <li><b>Змахни</b> пальцем: ← IN, ↓ ON, → AT</li>
        <li><b>Клавіші</b> ← ↓ → або 1 2 3</li>
        <li><b class="gold-t">★ Золоті картки</b> — винятки, дають більше балів</li>
      </ul>
      <p class="sub">3 життя · з кожними 5 правильними фрази падають швидше${best ? ` · Рекорд: ${best}` : ""}</p>
      <button type="button" class="go" id="go">Почати гру</button>`;
    ov.hidden = false;
    $("go").addEventListener("click", start);
  }

  // Клавіатура
  document.addEventListener("keydown", (e) => {
    if (!arena.classList.contains("playing")) return;
    const a = KEYS[e.key];
    if (a) { e.preventDefault(); answer(a); }
  });

  // Змахи по ігровому полю
  let p0 = null;
  lane.addEventListener("pointerdown", (e) => { p0 = { x: e.clientX, y: e.clientY }; });
  lane.addEventListener("pointerup", (e) => {
    if (!p0) return;
    const dx = e.clientX - p0.x, dy = e.clientY - p0.y; p0 = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 36) return;
    if (Math.abs(dx) > Math.abs(dy)) answer(dx < 0 ? "in" : "at");
    else if (dy > 0) answer("on");
  });

  intro();
})();
