// Іконка в єдиному лінійному стилі (колір береться з розділу через currentColor)
const ic = (name, size = 48, cls = "") =>
  `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
const lbl = (t) => `<span class="lbl">${t}</span>`;

// Дані: кожне правило → підказка + приклади (сцена + речення). [x] — прийменник.
const RULES = {
  in: {
    title: "IN",
    sub: "всередині чогось: простору, міста, води, території",
    rules: [
      { name: "Простори / кімнати", hint: "Є стіни навколо — ти всередині.", ex: [
        { scene: S.kitchen(),
          s: "Mom is [in] the kitchen.", ua: "Мама на кухні." },
        { scene: S.room(),
          s: "The cat is [in] the room.", ua: "Кіт у кімнаті." } ]},
      { name: "Міста / країни", hint: "Ти всередині кордонів.", ex: [
        { scene: S.paris(),
          s: "I live [in] Paris.", ua: "Я живу в Парижі." },
        { scene: S.italy(),
          s: "We are [in] Italy.", ua: "Ми в Італії." } ]},
      { name: "Вода", hint: "Тіло занурене у воду.", ex: [
        { scene: S.sea(),
          s: "He is swimming [in] the sea.", ua: "Він плаває в морі." },
        { scene: S.river(),
          s: "Fish live [in] the river.", ua: "Риби живуть у річці." } ]},
      { name: "Напрямки / райони", hint: "Частина території — область всередині.", ex: [
        { scene: S.north(),
          s: "It snows [in] the north.", ua: "На півночі йде сніг." },
        { scene: S.center(),
          s: "The hotel is [in] the city center.", ua: "Готель у центрі міста." } ]},
      { name: "Малий транспорт", hint: "Можна лише сидіти — не встанеш і не пройдешся.", ex: [
        { scene: S.taxi(),
          s: "She is [in] a taxi.", ua: "Вона в таксі." },
        { scene: S.heli(),
          s: "They flew [in] a helicopter.", ua: "Вони летіли гелікоптером." } ]},
    ],
    exceptions: [["cloud", "in the sky"], ["globe", "in the world"], ["image", "in the picture"]],
  },
  on: {
    title: "ON",
    sub: "на поверхні або «на борту»",
    rules: [
      { name: "Поверхні", hint: "Предмет торкається поверхні зверху або збоку.", ex: [
        { scene: S.table(),
          s: "The apple is [on] the table.", ua: "Яблуко на столі." },
        { scene: S.wall(),
          s: "The picture is [on] the wall.", ua: "Картина на стіні." } ]},
      { name: "Великий транспорт", hint: "Всередині можна встати й пройтися.", ex: [
        { scene: S.bus(),
          s: "I am [on] the bus.", ua: "Я в автобусі." },
        { scene: S.plane(),
          s: "She is [on] a plane.", ua: "Вона в літаку." } ]},
      { name: "Техніка / медіа", hint: "Те, що на екрані чи в мережі.", ex: [
        { scene: S.tv(),
          s: "The match is [on] TV.", ua: "Матч по телевізору." },
        { scene: S.phone(),
          s: "He is [on] the phone.", ua: "Він говорить по телефону." } ]},
      { name: "Поїздки на одного", hint: "Сидиш «верхи» на чомусь.", ex: [
        { scene: S.bike(),
          s: "She goes to work [on] a bike.", ua: "Вона їздить на роботу велосипедом." } ]},
      { name: "Вулиці / поверхи", hint: "Назва вулиці без номера, номер поверху.", ex: [
        { scene: S.street(),
          s: "The shop is [on] Green Street.", ua: "Магазин на Грін-стріт." },
        { scene: S.floors(),
          s: "My flat is [on] the first floor.", ua: "Моя квартира на першому поверсі." } ]},
    ],
    exceptions: [["footprints", "on foot"], ["radio", "on the radio"], ["tree-palm", "on holiday"]],
  },
  at: {
    title: "AT",
    sub: "точка на карті: поруч, на заході, за адресою",
    rules: [
      { name: "Точне місце", hint: "Ти біля — ні всередині, ні зверху.", ex: [
        { scene: S.door(),
          s: "Someone is [at] the door.", ua: "Хтось біля дверей." },
        { scene: S.busstop(),
          s: "Wait for me [at] the bus stop.", ua: "Чекай мене на зупинці." } ]},
      { name: "Події", hint: "Ти присутній на заході.", ex: [
        { scene: S.party(),
          s: "We met [at] a party.", ua: "Ми познайомились на вечірці." },
        { scene: S.concert(),
          s: "They are [at] a concert.", ua: "Вони на концерті." } ]},
      { name: "Адреса з номером", hint: "Є номер будинку → AT. Без номера → ON.", ex: [
        { scene: S.address(),
          s: "She lives [at] 25 Green Street.", ua: "Вона живе на Грін-стріт, 25." } ]},
      { name: "Верх / низ чогось", hint: "Конкретна точка: at the top / at the bottom.", ex: [
        { scene: S.page(),
          s: "Write your name [at] the top of the page.", ua: "Напиши ім'я вгорі сторінки." } ]},
      { name: "Послуги / фахівці", hint: "У когось на прийомі: at the doctor's.", ex: [
        { scene: S.doctor(),
          s: "I'm [at] the doctor's.", ua: "Я в лікаря." },
        { scene: S.dentist(),
          s: "He is [at] the dentist's.", ua: "Він у стоматолога." } ]},
      { name: "Чийсь дім", hint: "at + ім'я + 's.", ex: [
        { scene: S.johns(),
          s: "We're [at] John's tonight.", ua: "Ми сьогодні в Джона." } ]},
    ],
    exceptions: [["house", "at home"], ["briefcase", "at work"], ["shopping-cart", "at the supermarket"]],
  },
};

const VS = [
  { title: "prison",
    in: { scene: S.prisonIn(), s: "She is [in] prison.", ua: "Вона ув'язнена." },
    at: { scene: S.prisonAt(), s: "She is [at] prison.", ua: "Вона там працює чи відвідує." } },
  { title: "hospital",
    in: { scene: S.hospIn(), s: "He is [in] the hospital.", ua: "Він пацієнт." },
    at: { scene: S.hospAt(), s: "He is [at] hospital.", ua: "Він відвідує чи працює." } },
  { title: "supermarket",
    in: { scene: S.marketIn(), s: "Lots of people [in] the supermarket.", ua: "Саме всередині будівлі." },
    at: { scene: S.marketAt(), s: "I met a friend [at] the supermarket.", ua: "Десь там — неважливо, де саме." } },
];

const sentence = (s) => s.replace(/\[(.+?)\]/g, '<span class="prep" tabindex="0">$1</span>');
const exHTML = (e) => `<div class="ex"><div class="scene">${e.scene}</div>
  <p class="sentence">${sentence(e.s)}</p><p class="ua">${e.ua}</p></div>`;

const rulesEl = document.getElementById("rules");
for (const [key, b] of Object.entries(RULES)) {
  const cards = b.rules.map(r => `
    <article class="card glass ${key}">
      <h3><span class="tag">${b.title}</span>${r.name}</h3>
      <p class="hint">${r.hint}</p>
      <div class="examples">${r.ex.map(exHTML).join("")}</div>
    </article>`).join("");
  const exc = `
    <article class="card glass exceptions ${key}">
      <h3><span class="tag">!</span>Винятки — просто запам'ятай</h3>
      <div class="ex-row">${b.exceptions.map(([i, s]) => `<div class="chip">${ic(i, 36)}<span class="s">${s}</span></div>`).join("")}</div>
    </article>`;
  rulesEl.insertAdjacentHTML("beforeend", `
    <section id="${key}" class="block ${key}">
      <div class="block-head"><span class="badge badge-${key}">${b.title}</span><p>${b.sub}</p></div>
      <div class="grid">${cards}${exc}</div>
    </section>`);
}

document.getElementById("vsGrid").innerHTML = VS.map(v => `
  <article class="vs-card glass">
    <h3>${v.title}</h3>
    <div class="vs-pair">
      <div class="vs-in"><span class="side-tag">IN</span>${exHTML(v.in)}</div>
      <div class="vs-at"><span class="side-tag">AT</span>${exHTML(v.at)}</div>
    </div>
  </article>`).join("");

// Шпаргалка — таблиця правил з конспекту
const CHEAT = [
  { key: "in", exc: ["in the sky", "in the world", "in the picture"], rows: [
    ["Простори / кімнати", "Spaces / rooms", "", "in the room, in the car, in the kitchen"],
    ["Міста / країни", "Cities / countries", "", "in Paris, in Italy"],
    ["Вода", "Water", "", "in the pool, in the sea, in the river"],
    ["Напрямки / райони", "Directions / areas", "", "in the north, in the city center, in the countryside"],
    ["Малий транспорт", "Small vehicles", "", "in a car, in a taxi, in a helicopter"] ]},
  { key: "on", exc: ["on foot", "on the radio", "on holiday"], rows: [
    ["Поверхні", "Surfaces", "", "on the table, on the floor, on the wall"],
    ["Великий транспорт, де можна ходити", "Transport", "big vehicles you can walk on", "on a bus, on a plane, on a train, on a ship"],
    ["Техніка / медіа", "Technology / media", "", "on TV, on the internet, on the phone"],
    ["Поїздки на одного", "1-person rides", "", "horses, scooters, bikes"],
    ["Напрямки: вулиці / поверхи", "Directions", "with streets / floors", "on Green Street, on the first floor"] ]},
  { key: "at", exc: ["at home", "at work", "at the supermarket"], rows: [
    ["Точне місце: поруч, але не IN і не ON", "Exact locations", "you’re near but neither IN nor ON", "at the door, at the bus stop, at the station"],
    ["Події", "Events", "", "at a party, at a concert, at school"],
    ["Адреса з номером будинку", "Addresses", "with number", "at 25 Green Street"],
    ["Верх / низ чогось", "Top / bottom of something", "", "at the top of the page, at the bottom of the screen"],
    ["Послуги / фахівці", "Services / professionals", "", "at the doctor’s, at the dentist’s"],
    ["Чийсь дім / місце", "Someone’s house / home / place", "", "at my friend’s (house), at John’s"] ]},
];
const mark = (key, t) => t.replace(new RegExp(`\\b${key}\\b`, "g"), `<b class="w">${key}</b>`);
document.getElementById("cheatTable").innerHTML = CHEAT.map(c => `
  <div class="cheat-row ${c.key}">
    <div class="cheat-side">
      <a class="badge badge-${c.key}" href="#${c.key}">${c.key.toUpperCase()}</a>
      <div class="cheat-exc"><span>Exceptions · <em class="tr">Винятки</em></span>${c.exc.map(e => `<div>${mark(c.key, e)}</div>`).join("")}</div>
    </div>
    <dl class="cheat-list">${c.rows.map(([tr, name, note, ex]) => `
      <div><dt>${name}${note ? ` <i>(${note})</i>` : ""}<span class="tr">${tr}</span></dt><dd>${mark(c.key, ex)}</dd></div>`).join("")}
    </dl>
  </div>`).join("") + `
  <div class="cheat-row cheat-vs">
    <div class="cheat-side"><a class="badge badge-vs" href="#vs">AT vs IN</a></div>
    <div class="cheat-vs-grid">
      <p>She is <b class="w in">in</b> prison <i>(= she’s a prisoner)</i>.<br>She is <b class="w at">at</b> prison <i>(= inside the building, could be working, visiting, cleaning)</i>.</p>
      <p>He is <b class="w in">in</b> the hospital <i>(= he’s there as a patient)</i>.<br>He is <b class="w at">at</b> hospital <i>(= inside the building, maybe visiting someone or working there)</i>.</p>
      <p>I met my friend <b class="w at">at</b> the supermarket <i>(general location: maybe inside, maybe just outside)</i>.</p>
      <p>There are a lot of people <b class="w in">in</b> the supermarket today <i>(inside the building, not in the parking lot)</i>.</p>
    </div>
  </div>`;

// Режим «Перевір себе»
const toggle = document.getElementById("quizMode");
toggle.addEventListener("change", () => {
  document.body.classList.toggle("quiz", toggle.checked);
  document.querySelectorAll(".prep.shown").forEach(p => p.classList.remove("shown"));
  document.querySelectorAll(".ex.solved").forEach(e => e.classList.remove("solved"));
});
const reveal = (t) => {
  if (!document.body.classList.contains("quiz") || !t.classList.contains("prep")) return;
  t.classList.add("shown");
  t.closest(".ex")?.classList.add("solved");
};
document.addEventListener("click", (e) => reveal(e.target));
document.addEventListener("keydown", (e) => { if (e.key === "Enter") reveal(e.target); });
