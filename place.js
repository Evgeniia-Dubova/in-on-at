// Гра «Постав героя»: прийменник відомий — треба показати місце в сцені.
(() => {
  const $ = (id) => document.getElementById(id);
  const arena = $("plArena"), sceneBox = $("plScene"), dock = $("plDock"), taskText = $("plText");
  const fb = $("plFb"), ov = $("plOv"), prog = $("plProg"), scoreEl = $("plScore"), sceneName = $("plSceneName");
  const HINT = { in: "всередину чогось", on: "зверху, на поверхню", at: "поруч, у точку біля предмета" };

  // ---------- сцени ----------
  const SCENES = [
    {
      name: "Кімната",
      bg: () => `
        <rect x="0" y="0" width="480" height="215" fill="#fbf6ff" stroke="none"/>
        <path d="M0 215 H480 V270 H0z" fill="${C.pap}" stroke="none"/><path d="M0 215 H480" opacity=".4"/>
        <rect x="20" y="70" width="90" height="7" rx="2" fill="${C.wood}"/><path d="M30 77 v9 M100 77 v9" stroke-width="2"/>
        <rect x="86" y="50" width="8" height="20" fill="${C.blue}"/><rect x="95" y="46" width="8" height="24" fill="${C.pink}"/>
        <rect x="125" y="38" width="70" height="77" rx="4" fill="${C.sky}"/><path d="M160 38 v77 M125 76 h70" opacity=".6"/>
        <rect x="119" y="114" width="82" height="6" rx="2" fill="#fff"/>
        <path d="M212 214 V148" stroke="${C.woodD}" stroke-width="3.4"/><path d="M234 214 v-28" stroke="${C.woodD}" stroke-width="3.4"/>
        <rect x="207" y="181" width="31" height="6" rx="2" fill="${C.wood}"/>
        <rect x="242" y="165" width="84" height="7" rx="3" fill="${C.wood}"/><path d="M251 172 V214 M317 172 V214" stroke="${C.woodD}" stroke-width="4"/>
        <path d="M304 165 v-10 h11 v10" fill="#fff"/><path d="M315 158 q5 0 5 3 q0 3 -5 3" stroke-width="1.4"/>
        <rect x="330" y="95" width="56" height="119" rx="3" fill="${C.lav}"/>
        <rect x="336" y="101" width="44" height="107" fill="#f1ebfc"/><path d="M336 150 h44" opacity=".35"/>
        <path d="M386 98 l12 7 v102 l-12 5z" fill="${C.lavD}"/>
        <rect x="438" y="80" width="38" height="134" rx="3" fill="${C.wood}"/><circle cx="445" cy="150" r="2.2" fill="${L}"/>
        <path d="M30 170 h50 l8 10 h-66z" fill="#b9845a"/><rect x="22" y="180" width="66" height="35" fill="#c99268"/>
        <path d="M30 170 l-14 -16 l-2 22 M80 170 l14 -16 l2 22" fill="${C.wood}"/>`,
      fg: () => `<rect x="22" y="205" width="66" height="10" fill="${C.wood}"/><path d="M22 205 l-12 -12 l0 14z M88 205 l12 -12 l0 14z" fill="${C.wood}"/>`,
      zones: [
        { p: "in", n: "the box", ua: "у коробці", r: [16, 150, 80, 66], s: [55, 214, .72] },
        { p: "on", n: "the shelf", ua: "на полиці", r: [18, 18, 94, 54], s: [55, 70, .66] },
        { p: "at", n: "the window", ua: "біля вікна", r: [118, 122, 84, 93], s: [160, 214, .8] },
        { p: "at", n: "the table", ua: "за столом", r: [204, 128, 36, 87], s: [222, 214, .8] },
        { p: "on", n: "the table", ua: "на столі", r: [242, 108, 84, 60], s: [278, 165, .7] },
        { p: "on", n: "the cupboard", ua: "на шафі", r: [330, 40, 56, 57], s: [358, 95, .66] },
        { p: "in", n: "the cupboard", ua: "у шафі", r: [334, 99, 50, 112], s: [358, 207, .7] },
        { p: "at", n: "the door", ua: "біля дверей", r: [398, 118, 39, 97], s: [418, 214, .8] },
      ],
    },
    {
      name: "Вулиця",
      bg: () => `
        <rect x="0" y="0" width="480" height="205" fill="#eaf3ff" stroke="none"/>
        ${cloud(160, 40, .9)}${cloud(380, 60, .7)}${sun(250, 34)}
        <rect x="0" y="205" width="480" height="10" fill="${C.grey}" stroke="none"/><rect x="0" y="215" width="480" height="55" fill="#d6d9e6" stroke="none"/>
        <path d="M0 205 H480" opacity=".4"/><path d="M10 242 h26 M60 242 h26 M110 242 h26 M160 242 h26 M210 242 h26 M260 242 h26 M310 242 h26 M360 242 h26 M410 242 h26 M460 242 h26" stroke="#fff" stroke-width="3"/>
        <rect x="100" y="66" width="14" height="26" fill="${C.woodD}"/>
        <rect x="15" y="95" width="110" height="110" fill="${C.peach}"/><rect x="10" y="89" width="120" height="8" rx="2" fill="${C.pink}"/>
        <rect x="30" y="114" width="40" height="38" fill="${C.sky}"/><path d="M50 114 v38" opacity=".3"/>
        <rect x="85" y="150" width="28" height="55" fill="${C.wood}"/><circle cx="107" cy="178" r="1.8" fill="${L}"/>
        <path d="M150 205 V118" stroke-width="2.6"/><circle cx="150" cy="114" r="13" fill="${C.lavD}" stroke="#fff" stroke-width="2"/>${txt(150, 118, "BUS", 8.5, "#fff")}
        <rect x="210" y="112" width="150" height="86" rx="14" fill="${C.blue}"/><rect x="222" y="122" width="126" height="50" rx="5" fill="#fff"/>
        <path d="M226 130 h118" stroke-width="1.6"/>${wheel(242, 199, 10)}${wheel(330, 199, 10)}
        <path d="M372 199 v-22 q0 -8 8 -10 l14 -3 l12 -20 q3 -4 8 -4 h30 q5 0 8 4 l12 20 l8 3 q8 2 8 10 v22z" fill="${C.yellow}"/>
        <path d="M400 163 l11 -17 h31 l11 17z" fill="${C.sky}"/>
        <rect x="414" y="128" width="24" height="9" rx="3" fill="#fff"/>${txt(426, 135.5, "TAXI", 7)}
        ${wheel(395, 201, 9)}${wheel(452, 201, 9)}`,
      fg: () => `<path d="M400 163 h53" stroke-width="1.6"/>`,
      zones: [
        { p: "on", n: "the roof", ua: "на даху", r: [10, 34, 88, 58], s: [52, 90, .7] },
        { p: "in", n: "the house", ua: "у будинку", r: [15, 99, 110, 106], s: [50, 152, .55, false] },
        { p: "at", n: "the bus stop", ua: "на зупинці", r: [134, 98, 68, 107], s: [178, 205, .8] },
        { p: "on", n: "the bus", ua: "в автобусі", r: [210, 108, 150, 92], s: [284, 172, .6] },
        { p: "in", n: "the taxi", ua: "у таксі", r: [370, 124, 104, 80], s: [426, 163, .48, false] },
      ],
    },
  ];

  const heroSvg = (a, s = "") => `<svg class="ill ${s}" viewBox="-36 -72 72 76" aria-hidden="true" stroke="${L}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" fill="none">${B(0, 0, a, { arms: "wave" })}</svg>`;
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const store = {
    get() { try { return +localStorage.getItem("ioa-place-best") || 0; } catch { return 0; } },
    set(v) { try { localStorage.setItem("ioa-place-best", v); } catch {} },
  };

  let st = null, svg = null, curScene = -1;

  function renderScene(si) {
    curScene = si;
    const sc = SCENES[si];
    sceneBox.innerHTML = `<svg class="ill pl-svg" viewBox="0 0 480 270" preserveAspectRatio="xMidYMid meet" stroke="${L}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" fill="none">
      ${sc.bg()}<g class="pl-placed"></g>${sc.fg()}
      ${sc.zones.map((z, k) => `<rect class="zhl" data-k="${k}" x="${z.r[0]}" y="${z.r[1]}" width="${z.r[2]}" height="${z.r[3]}" rx="10"/>`).join("")}
    </svg>`;
    svg = sceneBox.querySelector("svg");
    sceneName.textContent = `${si + 1}/${SCENES.length} · ${sc.name}`;
  }

  function progress() {
    prog.innerHTML = st.tasks.map((t, k) => `<i class="${k < st.i ? (t.miss ? "meh" : "ok") : k === st.i ? "cur" : ""}"></i>`).join("");
    scoreEl.textContent = st.score;
  }

  function showTask() {
    const t = st.tasks[st.i];
    if (t.si !== curScene) {
      renderScene(t.si);
      if (st.i > 0) flash(`Рівень ${t.si + 1}: ${SCENES[t.si].name}`, "good");
    }
    dock.className = "pl-dock " + t.z.p;
    dock.innerHTML = heroSvg(t.z.p);
    taskText.innerHTML = `<b class="w ${t.z.p}">${t.z.p}</b> ${t.z.n}<small>${t.z.ua}</small>`;
    st.tries = 0;
    st.busy = false;
    progress();
  }

  function start() {
    st = { i: 0, score: 0, tasks: [], mistakes: [], busy: false };
    SCENES.forEach((sc, si) => shuffle(sc.zones.slice()).forEach((z) => st.tasks.push({ si, z, miss: false })));
    curScene = -1;
    ov.hidden = true; fb.hidden = true;
    arena.classList.add("playing");
    showTask();
  }

  // ---------- координати / зони ----------
  function toSvg(cx, cy) {
    const pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }
  function zoneAt(cx, cy) {
    const r = svg.getBoundingClientRect();
    if (cx < r.left || cx > r.right || cy < r.top || cy > r.bottom) return { outside: true };
    const p = toSvg(cx, cy);
    const zones = SCENES[curScene].zones;
    let best = null, bestA = 1e9;
    zones.forEach((z, k) => {
      const [x, y, w, h] = z.r;
      if (p.x >= x && p.x <= x + w && p.y >= y && p.y <= y + h && w * h < bestA) { best = k; bestA = w * h; }
    });
    return { k: best };
  }
  function mark(k, cls) {
    svg.querySelectorAll(".zhl." + cls).forEach((e) => e.classList.remove(cls));
    if (k !== null && k !== undefined) svg.querySelector(`.zhl[data-k="${k}"]`)?.classList.add(cls);
  }

  // ---------- рішення ----------
  function drop(cx, cy) {
    if (!st || st.busy) return;
    const hit = zoneAt(cx, cy);
    mark(null, "hov");
    if (hit.outside) return;
    const t = st.tasks[st.i];
    if (hit.k === null) { flash("Тут нічого немає. Перетягни героя на предмет у сцені.", "bad"); return; }
    const z = SCENES[curScene].zones[hit.k];
    if (z === t.z) right(hit.k, t); else wrong(hit.k, z, t);
  }

  function right(k, t) {
    st.busy = true;
    st.score += st.tries ? 4 : 10;
    mark(k, "good");
    const [sx, sy, s, legs] = t.z.s;
    svg.querySelector(".pl-placed").insertAdjacentHTML("beforeend",
      `<g class="${t.z.p} placed">${B(sx, sy, t.z.p, { s, legs: legs !== false, arms: "wave" })}</g>`);
    dock.innerHTML = "";
    flash(`Так! <b class="w ${t.z.p}">${t.z.p}</b> ${t.z.n} — ${HINT[t.z.p]}`, "good");
    setTimeout(() => {
      mark(null, "good");
      st.i++;
      if (st.i >= st.tasks.length) over(); else showTask();
    }, 1200);
  }

  function wrong(k, z, t) {
    st.tries++;
    if (!t.miss) { t.miss = true; st.mistakes.push(t.z); }
    mark(k, "bad");
    setTimeout(() => mark(null, "bad"), 900);
    dock.classList.remove("nope"); void dock.offsetWidth; dock.classList.add("nope");
    const same = z.n === t.z.n;
    flash(same
      ? `Майже! Предмет той, але це <b class="w ${z.p}">${z.p}</b> ${z.n} (${z.ua}).<small>Тобі треба <b class="w ${t.z.p}">${t.z.p}</b> — ${HINT[t.z.p]}</small>`
      : `Це <b class="w ${z.p}">${z.p}</b> ${z.n} (${z.ua}).<small>Тобі треба <b class="w ${t.z.p}">${t.z.p}</b> ${t.z.n} — ${HINT[t.z.p]}</small>`, "bad");
    progress();
  }

  let fbT = 0;
  function flash(html, kind) {
    fb.className = "feedback " + kind;
    fb.innerHTML = html; fb.hidden = false;
    clearTimeout(fbT);
    fbT = setTimeout(() => { fb.hidden = true; }, kind === "good" ? 1300 : 2600);
  }

  function over() {
    arena.classList.remove("playing");
    const perfect = st.tasks.filter((t) => !t.miss).length;
    const old = store.get(), best = Math.max(old, st.score);
    store.set(best);
    ov.innerHTML = `
      <h3>${perfect === st.tasks.length ? "Ідеально!" : "Усіх героїв розставлено"}</h3>
      <p class="big-score">${st.score}<span> балів</span></p>
      <p class="sub">З першої спроби: ${perfect} з ${st.tasks.length} · Рекорд: ${best}</p>
      ${st.mistakes.length ? `<div class="mist"><p>Повтори:</p><ul>${st.mistakes.map((z) =>
        `<li><b class="w ${z.p}">${z.p}</b> ${z.n}<span>${z.ua} — ${HINT[z.p]}</span></li>`).join("")}</ul></div>` : ""}
      <button type="button" class="go" id="plAgain">Грати ще раз</button>`;
    ov.hidden = false;
    $("plAgain").addEventListener("click", start);
  }

  function intro() {
    const best = store.get();
    ov.innerHTML = `
      <h3>Постав героя</h3>
      <p class="sub">Тепер навпаки: прийменник уже відомий. Перетягни героя туди, де він має бути.</p>
      <ul class="how">
        <li><b class="w in">in</b> — ${HINT.in}</li>
        <li><b class="w on">on</b> — ${HINT.on}</li>
        <li><b class="w at">at</b> — ${HINT.at}</li>
        <li><b>Перетягни</b> героя пальцем або мишкою, чи просто <b>торкнись</b> місця в сцені</li>
      </ul>
      <p class="sub">2 рівні: кімната і вулиця${best ? ` · Рекорд: ${best}` : ""}</p>
      <button type="button" class="go" id="plGo">Почати</button>`;
    ov.hidden = false;
    $("plGo").addEventListener("click", start);
  }

  // ---------- перетягування ----------
  let drag = null;
  dock.addEventListener("pointerdown", (e) => {
    if (!st || st.busy || !dock.innerHTML) return;
    e.preventDefault();
    dock.setPointerCapture(e.pointerId);
    const g = document.createElement("div");
    g.className = "pl-ghost " + st.tasks[st.i].z.p;
    g.innerHTML = heroSvg(st.tasks[st.i].z.p);
    document.body.appendChild(g);
    drag = { g, moved: false, x0: e.clientX, y0: e.clientY };
    moveGhost(e.clientX, e.clientY);
    dock.classList.add("lifted");
  });
  function moveGhost(x, y) { drag.g.style.transform = `translate(${x - 36}px, ${y - 70}px)`; }
  dock.addEventListener("pointermove", (e) => {
    if (!drag) return;
    if (Math.abs(e.clientX - drag.x0) + Math.abs(e.clientY - drag.y0) > 6) drag.moved = true;
    moveGhost(e.clientX, e.clientY);
    const h = zoneAt(e.clientX, e.clientY);
    mark(h.outside ? null : h.k, "hov");
  });
  function endDrag(e, cancel) {
    if (!drag) return;
    const d = drag; drag = null;
    d.g.remove();
    dock.classList.remove("lifted");
    mark(null, "hov");
    if (!cancel && d.moved) drop(e.clientX, e.clientY);
  }
  dock.addEventListener("pointerup", (e) => endDrag(e, false));
  dock.addEventListener("pointercancel", (e) => endDrag(e, true));
  // дотик до місця без перетягування
  sceneBox.addEventListener("click", (e) => { if (arena.classList.contains("playing")) drop(e.clientX, e.clientY); });

  renderScene(0);
  intro();
})();
