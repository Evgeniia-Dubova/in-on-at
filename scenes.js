// Ілюстрації-сценки (inline SVG) в єдиному пастельному стилі.
// Візуальна мова: IN — підсвічений простір (.as/.al), ON — підсвічена поверхня (.sf), AT — пін-мітка (Pin).
const L = "#4a3d63";
const C = {
  sky: "#e3eeff", blue: "#a8cdff", blueD: "#58A6FF", pink: "#ffbcbc", pinkD: "#FF6B6B",
  pap: "#FFEDD5", peach: "#ffcfae", lav: "#ddd0f7", lavD: "#b79be6", skin: "#ffdcc6",
  hair: "#5a4a78", hair2: "#c9774f", wood: "#ecc39b", woodD: "#c99268", white: "#fffaf6",
  green: "#c4e8cd", greenD: "#8fcfa0", grey: "#e4dfee", greyD: "#b9b1cc", yellow: "#ffe08a",
};

const svg = (body, vb = "0 0 240 130") =>
  `<svg class="ill" viewBox="${vb}" preserveAspectRatio="xMidYMid meet" stroke="${L}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" fill="none" aria-hidden="true">${body}</svg>`;

// Голова з обличчям
function Head(x, y, o = {}) {
  const hair = o.hair || C.hair;
  return `<g transform="translate(${x} ${y})">
    <circle r="9.5" fill="${C.skin}"/>
    <path d="M-9.5 -1 a9.5 9.5 0 0 1 19 0 q-4 -5 -9.5 -4.5 q-5.5 .5 -9.5 4.5z" fill="${hair}"/>
    ${o.hat === "chef" ? `<path d="M-8 -6 q-7 -9 1 -12 q4 -7 11 -1 q8 0 3 13z" fill="#fff"/>` : ""}
    ${o.hat === "party" ? `<path d="M-5 -8 L1 -24 L6 -8z" fill="${C.yellow}"/><circle cx="1" cy="-25" r="2" fill="${C.pinkD}" stroke="none"/>` : ""}
    ${o.cap ? `<path d="M-9.5 -2 a9.5 9.5 0 0 1 19 0z" fill="${o.cap}"/><path d="M9 -2 h6"/>` : ""}
    <circle cx="-3.2" cy="1" r="1.1" fill="${L}" stroke="none"/><circle cx="3.2" cy="1" r="1.1" fill="${L}" stroke="none"/>
    <path d="M-2.6 4.4 q2.6 2.2 5.2 0" stroke-width="1.2"/>
    <circle cx="-5.5" cy="4" r="1.6" fill="${C.pink}" stroke="none" opacity=".8"/><circle cx="5.5" cy="4" r="1.6" fill="${C.pink}" stroke="none" opacity=".8"/>
  </g>`;
}

// Людина: ноги стоять на y
function P(x, y, shirt, o = {}) {
  const arm = {
    down: "M-8 -33 q-5 7 -5 14 M8 -33 q5 7 5 14",
    wave: "M-8 -33 q-5 7 -5 14 M8 -33 q7 -6 8 -16",
    up: "M-8 -33 q-7 -6 -9 -16 M8 -33 q7 -6 9 -16",
    hold: "M-8 -33 q-5 7 -5 14 M8 -33 q8 2 11 -4",
    phone: "M-8 -33 q-5 7 -5 14 M8 -33 q6 -2 4 -13",
  }[o.arms || "down"];
  return `<g transform="translate(${x} ${y}) scale(${o.s || 1})">
    ${o.noLegs ? "" : `<path d="M-4 -17 L-5 0 M4 -17 L5 0" stroke-width="3.6"/>`}
    <path d="${arm}" stroke-width="3.2"/>
    <rect x="-9" y="-38" width="18" height="24" rx="8" fill="${shirt}"/>
    ${o.stripes ? `<path d="M-9 -30 h18 M-9 -24 h18 M-9 -18 h18" stroke-width="1.2"/>` : ""}
    ${o.coat ? `<path d="M0 -38 v24"/><path d="M-5 -36 q0 9 5 10 q5 -1 5 -10" stroke="${C.blueD}" stroke-width="1.4"/>` : ""}
    ${o.extra || ""}
    ${Head(0, -48, o)}
  </g>`;
}

// Пін-мітка «у точці» (AT)
const Pin = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" stroke="none">
  <ellipse rx="11" ry="3.4" class="as"/>
  <path d="M0 -3 C-6 -12 -10 -17 -10 -23 a10 10 0 0 1 20 0 c0 6 -4 11 -10 20z" class="a"/>
  <circle cy="-23" r="3.8" fill="#fff"/></g>`;

const ground = (y = 116, fill = C.pap) => `<path d="M0 ${y} H240 V130 H0z" fill="${fill}" stroke="none" opacity=".7"/><path d="M0 ${y} H240" opacity=".35"/>`;
const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 v-14" stroke-width="2.4"/><circle cy="-22" r="11" fill="${C.green}"/></g>`;
const cloud = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 0 h30 a7 7 0 0 0 -4 -13 a10 10 0 0 0 -18 -2 a7 7 0 0 0 -8 15z" fill="#fff" stroke-opacity=".35"/>`;
const sun = (x, y) => `<circle cx="${x}" cy="${y}" r="10" fill="${C.yellow}" stroke-opacity=".4"/>`;
const txt = (x, y, t, size = 10, fill = L, anchor = "middle") =>
  `<text x="${x}" y="${y}" font-family="Nunito, system-ui, sans-serif" font-weight="900" font-size="${size}" fill="${fill}" stroke="none" text-anchor="${anchor}">${t}</text>`;
const wheel = (x, y, r = 8) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${L}"/><circle cx="${x}" cy="${y}" r="${r * .4}" fill="${C.grey}" stroke="none"/>`;


// ===== Герой-слово: сам прийменник з очима, руками й ногами =====
// x, y — точка, де стоять ноги (або низ тіла, якщо legs:false)
function B(x, y, w, o = {}) {
  const s = o.s || 1;
  const arms = {
    down: "M-18 -26 q-6 6 -6 14 M18 -26 q6 6 6 14",
    wave: "M-18 -26 q-6 6 -6 14 M18 -28 q9 -6 9 -18",
    up: "M-18 -28 q-9 -6 -9 -18 M18 -28 q9 -6 9 -18",
    hold: "M-18 -26 q-6 6 -6 14 M18 -26 q10 0 15 -8",
    knock: "M-18 -26 q-6 6 -6 14 M18 -28 q10 -2 16 -8",
    phone: "M-18 -26 q-6 6 -6 14 M18 -26 q8 -2 8 -14",
    ride: "M-18 -26 q-6 6 -6 14 M18 -26 q12 4 22 12",
    none: "",
  }[o.arms || "down"];
  let body, eyes = [-7, -34], mouth = "M-3 -28.5 q3 2.4 6 0", ty = -15.5, extraTop = "";
  if (o.shape === "apple") {
    body = `<path d="M0 -38 c-9 -6 -22 -2 -21 12 c1 12 10 18 15 16 c3 -1 4 -1.5 6 -1.5 c2 0 3 .5 6 1.5 c5 2 14 -4 15 -16 c1 -14 -12 -18 -21 -12z" class="wd apple"/>`;
    extraTop = `<path d="M0 -38 q0 -7 4 -10" stroke-width="2"/><path d="M3 -45 q9 -6 14 1 q-9 5 -14 -1z" fill="${C.greenD}"/>`;
    eyes = [-7, -29]; mouth = "M-3 -23.5 q3 2.4 6 0"; ty = -12.5;
  } else if (o.shape === "fish") {
    body = `<path d="M-26 -22 q22 -24 46 0 q-24 24 -46 0z" class="wd"/><path d="M18 -22 l12 -10 v20z" class="wd"/>`;
    eyes = [-17, -27]; mouth = ""; ty = -17.5;
  } else {
    body = `<rect x="-19" y="-44" width="38" height="32" rx="14" class="wd"/>`;
  }
  const hat = {
    chef: `<path d="M-12 -42 q-9 -11 1 -15 q5 -10 14 -2 q11 -1 4 17z" fill="#fff"/>`,
    party: `<path d="M-6 -43 L2 -64 L9 -43z" fill="${C.yellow}"/><circle cx="2" cy="-65" r="2.6" fill="${C.pinkD}" stroke="none"/>`,
    cap: `<path d="M-16 -41 q0 -11 16 -11 q16 0 16 11z" fill="${o.capColor || C.blueD}"/><path d="M14 -41 h9"/>`,
    beanie: `<path d="M-16 -41 q0 -15 16 -15 q16 0 16 15z" fill="${C.peach}"/><circle cy="-57" r="3.4" fill="${C.pink}"/>`,
    hairband: `<path d="M-15 -40 q15 -10 30 0" stroke="${C.yellow}" stroke-width="3"/>`,
  }[o.hat] || "";
  const eye = (cx) => o.closed
    ? `<path d="M${cx - 2.6} ${eyes[1]} q2.6 2 5.2 0" stroke="#fff" stroke-width="1.6"/>`
    : `<circle cx="${cx}" cy="${eyes[1]}" r="3.4" fill="#fff" stroke="none"/><circle cx="${cx + .6}" cy="${eyes[1] + .4}" r="1.7" fill="${L}" stroke="none"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})"><g class="bd">
    ${o.legs === false ? "" : `<path d="M-7 -12 v11 M7 -12 v11" stroke-width="3.4"/><path d="M-11 -.5 h5 M6 -.5 h5" stroke-width="3.4"/>`}
    ${arms ? `<path d="${arms}" stroke-width="3.2"/>` : ""}
    ${body}${extraTop}
    ${o.stripes ? `<path d="M-19 -36 h38 M-19 -28 h38 M-19 -20 h38" stroke="#fff" stroke-width="2.4" opacity=".7"/>` : ""}
    ${o.scarf ? `<path d="M-17 -15 h34" stroke="${C.yellow}" stroke-width="4"/><path d="M8 -15 l4 10" stroke="${C.yellow}" stroke-width="4"/>` : ""}
    ${o.shape === "fish" ? eye(eyes[0]) : eye(eyes[0]) + eye(-eyes[0])}
    ${mouth && !o.oh ? `<path d="${mouth}" stroke="#fff" stroke-width="1.6"/>` : ""}
    ${o.oh ? `<ellipse cx="0" cy="-27" rx="2.6" ry="3" fill="${L}" stroke="#fff" stroke-width="1"/>` : ""}
    <text class="wd-t" x="${o.shape === "fish" ? 2 : 0}" y="${ty}" font-family="Nunito, system-ui, sans-serif" font-weight="900" font-size="12.5" fill="#fff" stroke="none" text-anchor="middle">${w}</text>
    <text class="wd-q" x="${o.shape === "fish" ? 2 : 0}" y="${ty}" font-family="Nunito, system-ui, sans-serif" font-weight="900" font-size="12.5" stroke="none" text-anchor="middle">?</text>
    ${hat}${o.extra || ""}
  </g></g>`;
}
// пляма-точка під ногами (AT)
const Spot = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="22" ry="5" class="as al" stroke-width="1.6"/>`;

const S = {
  /* ========== IN ========== */
  kitchen: () => svg(`
    <rect x="34" y="12" width="172" height="106" rx="14" class="as al" stroke-width="2.6"/>
    <rect x="50" y="26" width="36" height="28" rx="4" fill="${C.sky}"/><path d="M68 26 v28 M50 40 h36" opacity=".5"/>
    <rect x="128" y="76" width="64" height="42" rx="4" fill="${C.white}"/><path d="M160 80 v34 M150 96 h4 M166 96 h4" opacity=".5"/>
    <rect x="124" y="70" width="72" height="8" rx="3" fill="${C.grey}"/>
    <path d="M140 70 v-13 h30 v13z" fill="${C.peach}"/><path d="M136 57 h38 M152 57 v-4 h6 v4"/>
    <path d="M148 48 q-4 -6 0 -12 M162 48 q-4 -6 0 -12" opacity=".45"/>
    ${B(96, 117, "in", { arms: "hold", hat: "chef", s: 1.05 })}
    <path d="M132 84 l18 -30" stroke="${C.woodD}" stroke-width="3"/>`),

  room: () => svg(`
    <rect x="34" y="12" width="172" height="106" rx="14" class="as al" stroke-width="2.6"/>
    <rect x="58" y="24" width="30" height="22" rx="3" fill="${C.sky}"/><path d="M60 44 l9 -10 l7 6 l5 -5 l5 9" opacity=".6"/>
    <path d="M58 98 v-26 q0 -7 7 -7 h56 q7 0 7 7 v26z" fill="${C.lav}"/>
    <rect x="50" y="88" width="86" height="16" rx="8" fill="${C.lavD}"/><path d="M58 104 v8 M128 104 v8" stroke-width="2.4"/>
    ${B(93, 92, "in", { legs: false, arms: "wave", s: .95 })}
    <path d="M190 116 v-50 M182 66 h16 l-4 -14 h-8z" fill="${C.yellow}"/>
    <g transform="translate(160 116)"><path d="M-12 0 q-4 -16 8 -18 q14 -1 14 12 q0 6 -4 6z" fill="${C.peach}"/>
      <path d="M-2 -18 l-2 -8 l6 5 l5 -5 l0 8" fill="${C.peach}"/><circle cx="1" cy="-12" r=".9" fill="${L}" stroke="none"/><circle cx="6" cy="-12" r=".9" fill="${L}" stroke="none"/>
      <path d="M10 -3 q12 0 10 -14"/></g>`),

  paris: () => svg(`
    <path d="M30 66 C26 30 80 10 124 14 C176 18 214 40 208 76 C202 108 154 122 114 118 C66 114 34 98 30 66z" class="as ad" stroke-width="2.4"/>
    ${cloud(64, 40, .7)}
    <path d="M96 24 L82 106 M96 24 L110 106 M87 68 h18 M84 86 h24 M96 24 v-8" stroke-width="2.2"/>
    <path d="M82 106 q14 -20 28 0" stroke-width="2.2"/><path d="M90 46 h12" opacity=".6"/>
    ${B(156, 106, "in", { arms: "hold", hat: "beanie", extra: `<rect x="28" y="-40" width="14" height="10" rx="2" fill="${L}"/><circle cx="35" cy="-35" r="3" fill="${C.sky}" stroke="none"/>` })}
    ${txt(156, 34, "Paris", 13, L)}`),

  italy: () => svg(`
    <path d="M30 70 C26 34 76 14 122 16 C170 18 212 38 206 74 C200 106 152 120 112 118 C68 116 34 100 30 70z" class="as ad" stroke-width="2.4"/>
    <path d="M56 100 V62 q34 -16 68 0 V100z" fill="${C.peach}"/>
    <path d="M64 100 v-10 a5 5 0 0 1 10 0 v10 M80 100 v-10 a5 5 0 0 1 10 0 v10 M96 100 v-10 a5 5 0 0 1 10 0 v10 M112 100 v-10 a5 5 0 0 1 10 0 v10" opacity=".7"/>
    <path d="M64 78 v-6 a5 5 0 0 1 10 0 v6 M80 76 v-6 a5 5 0 0 1 10 0 v6 M96 76 v-6 a5 5 0 0 1 10 0 v6 M112 78 v-6 a5 5 0 0 1 10 0 v6" opacity=".55"/>
    <path d="M46 100 V34"/><rect x="46" y="34" width="8" height="14" fill="${C.greenD}" stroke="none"/><rect x="54" y="34" width="8" height="14" fill="#fff" stroke="none"/><rect x="62" y="34" width="8" height="14" fill="${C.pinkD}" stroke="none"/><rect x="46" y="34" width="24" height="14"/>
    ${B(162, 106, "in", { arms: "hold", extra: `<path d="M30 -34 l14 -10 l2 16z" fill="${C.yellow}"/><circle cx="38" cy="-34" r="1.8" fill="${C.pinkD}" stroke="none"/>` })}
    ${txt(162, 40, "Italy", 13, L)}`),

  sea: () => svg(`
    ${sun(36, 24)}${cloud(160, 22, .9)}
    <path d="M0 66 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 V130 H0z" fill="${C.blue}" stroke="none"/>
    ${B(118, 88, "in", { legs: false, arms: "up" })}
    <path d="M0 80 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 V130 H0z" fill="${C.blue}" stroke="none" opacity=".92"/>
    <path d="M0 80 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" class="al" stroke-width="2.6"/>
    <path d="M30 104 q10 -5 20 0 M180 108 q10 -5 20 0" stroke="#fff" opacity=".8"/>
    <circle cx="92" cy="60" r="2.4" fill="#fff"/><circle cx="146" cy="56" r="2" fill="#fff"/><circle cx="152" cy="64" r="1.6" fill="#fff"/>`),

  river: () => svg(`
    ${ground(0, C.green)}
    <path d="M0 34 C60 24 90 64 150 58 C190 54 210 38 240 40 V100 C200 98 190 116 150 116 C90 116 60 86 0 94z" fill="${C.blue}"/>
    <path d="M0 34 C60 24 90 64 150 58 C190 54 210 38 240 40 M240 100 C200 98 190 116 150 116 C90 116 60 86 0 94" class="al" stroke-width="2.6"/>
    ${B(108, 104, "in", { shape: "fish", legs: false, arms: "none", s: 1.15 })}
    <g transform="translate(186 92) scale(.6)"><path d="M-18 0 q14 -14 30 0 q-16 14 -30 0z" fill="${C.peach}"/><path d="M12 0 l10 -8 v16z" fill="${C.peach}"/></g>
    <circle cx="70" cy="66" r="2.4" fill="#fff"/><circle cx="76" cy="58" r="1.6" fill="#fff"/>
    <path d="M40 24 v-14 M46 26 v-18 M200 128 v-14 M206 128 v-18" stroke="${C.greenD}" stroke-width="2.4"/>`),

  north: () => svg(`
    <rect x="40" y="6" width="160" height="118" rx="12" fill="${C.white}"/>
    <path d="M40 18 a12 12 0 0 1 12 -12 h136 a12 12 0 0 1 12 12 v38 h-160z" class="as" stroke="none"/>
    <path d="M40 56 h160" class="al" stroke-width="2.4"/>
    <path d="M52 56 l16 -24 l16 24z M76 56 l20 -30 l20 30z" fill="${C.lav}"/><path d="M63 40 l5 -8 l5 8 M90 35 l6 -9 l6 9" fill="#fff"/>
    ${B(158, 56, "in", { hat: "beanie", arms: "wave", s: .8 })}
    <circle cx="128" cy="18" r="1.8" fill="${C.blueD}" stroke="none"/><circle cx="186" cy="26" r="1.8" fill="${C.blueD}" stroke="none"/><circle cx="134" cy="36" r="1.8" fill="${C.blueD}" stroke="none"/><circle cx="190" cy="44" r="1.6" fill="${C.blueD}" stroke="none"/>
    ${tree(70, 104, .8)}${tree(96, 114, .7)}${tree(160, 108, .8)}
    <path d="M214 40 l8 -22 l8 22 l-8 -6z" fill="${C.pinkD}" stroke="none"/>${txt(222, 54, "N", 11)}`),

  center: () => svg(`
    <ellipse cx="120" cy="68" rx="100" ry="54" fill="${C.green}"/>
    <ellipse cx="120" cy="68" rx="54" ry="34" class="as al" stroke-width="2.4"/>
    <path d="M80 84 v-28 h12 v28 M94 84 v-38 h12 v38 M108 84 v-20 h10 v20" fill="${C.lav}"/>
    <path d="M84 62 h4 M84 70 h4 M98 54 h4 M98 64 h4 M98 74 h4" opacity=".5"/>
    ${B(146, 90, "in", { arms: "wave", s: .72 })}
    <g fill="${C.peach}"><path d="M34 72 v-8 l6 -5 l6 5 v8z"/><path d="M194 66 v-8 l6 -5 l6 5 v8z"/><path d="M54 104 v-8 l6 -5 l6 5 v8z"/><path d="M176 102 v-8 l6 -5 l6 5 v8z"/></g>`),

  taxi: () => svg(`
    ${ground(114)}
    <path d="M36 102 v-22 q0 -8 8 -10 l20 -4 l20 -28 q4 -5 11 -5 h52 q7 0 11 5 l20 28 l18 4 q8 2 8 10 v22z" fill="${C.yellow}"/>
    <path d="M90 64 l16 -22 h22 v22z M134 64 v-22 h14 q5 0 8 4 l13 18z" class="as al" stroke-width="2"/>
    ${B(114, 64, "in", { legs: false, arms: "none", s: .68 })}${Head(150, 54)}
    <rect x="108" y="20" width="26" height="9" rx="3" fill="#fff"/>${txt(121, 27.5, "TAXI", 7)}
    <path d="M42 82 h10 M190 82 h8" stroke-width="2.4"/>
    ${wheel(72, 102, 12)}${wheel(172, 102, 12)}`),

  heli: () => svg(`
    ${cloud(24, 44, .8)}${cloud(196, 104, .7)}
    <path d="M64 20 h130 M128 20 v12" stroke-width="3"/>
    <path d="M86 66 q0 -34 42 -34 q36 0 40 34 q0 20 -40 20 q-42 0 -42 -20z" fill="${C.blue}"/>
    <path d="M94 66 q2 -24 32 -26 v30 q-32 4 -32 -4z" class="as al" stroke-width="2"/>
    ${B(112, 71, "in", { legs: false, arms: "none", s: .72 })}
    <path d="M168 62 h44 l8 -12" stroke-width="3"/><path d="M214 44 v14" stroke-width="3"/>
    <path d="M100 100 h64 M112 86 v14 M152 86 v14" stroke-width="2.4"/>`),

  /* ========== ON ========== */
  table: () => svg(`
    ${ground(118)}
    <path d="M56 118 l6 -44 M184 118 l-6 -44 M80 118 l3 -44 M160 118 l-3 -44" stroke="${C.woodD}" stroke-width="5"/>
    <rect x="42" y="68" width="156" height="10" rx="5" fill="${C.wood}"/>
    <path d="M44 68 h152" class="sfl" stroke-width="3.2"/>
    ${B(110, 68, "on", { shape: "apple", legs: false, arms: "none", s: 1.25 })}
    <rect x="148" y="58" width="32" height="10" rx="2" fill="${C.lav}"/><rect x="150" y="49" width="28" height="9" rx="2" fill="${C.blue}"/>
    <path d="M66 68 v-8 q0 -6 6 -6 h6 q6 0 6 6 v8" fill="#fff"/><path d="M84 58 q6 0 6 4 q0 4 -6 4"/>`),

  wall: () => svg(`
    <rect x="20" y="8" width="200" height="104" rx="10" class="sf"/>
    <path d="M60 8 v104 M100 8 v104 M140 8 v104 M180 8 v104" stroke-opacity=".12"/>
    <rect x="20" y="8" width="200" height="104" rx="10" class="sfl" stroke-width="2.4"/>
    ${ground(112)}
    <path d="M120 18 l-24 16 M120 18 l24 16" opacity=".6"/><circle cx="120" cy="18" r="2" fill="${L}"/>
    <rect x="88" y="34" width="64" height="56" rx="3" fill="${C.wood}"/><rect x="95" y="41" width="50" height="42" fill="${C.sky}"/>
    ${B(120, 85, "on", { legs: false, arms: "wave", s: .82 })}
    <path d="M190 112 v-18 h16 v18z" fill="${C.peach}"/><path d="M198 94 q-10 -10 -4 -20 M198 94 q8 -14 14 -12" stroke="${C.greenD}" stroke-width="2.6"/>
    <path d="M40 40 h28 v30 h-28z" fill="${C.white}"/><path d="M46 50 h16 M46 58 h12" opacity=".5"/>`),

  bus: () => svg(`
    ${ground(116)}
    <rect x="18" y="26" width="204" height="78" rx="14" fill="${C.blue}"/>
    <rect x="30" y="38" width="38" height="30" rx="4" fill="${C.sky}"/><rect x="182" y="38" width="28" height="52" rx="4" fill="${C.sky}"/>
    <rect x="76" y="34" width="98" height="62" rx="5" fill="${C.white}"/>
    <path d="M80 42 h90" stroke-width="2"/><path d="M100 42 v6 M128 42 v6 M156 42 v6" stroke-width="1.4"/>
    ${B(112, 94, "on", { arms: "up", s: .95 })}${P(154, 94, C.lav, { arms: "wave", s: .78 })}
    <path d="M78 94 h94" class="sfl" stroke-width="3.6"/>
    ${wheel(52, 106, 11)}${wheel(188, 106, 11)}`),

  plane: () => svg(`
    ${cloud(16, 30, .8)}${cloud(200, 22, .7)}
    <path d="M14 70 q0 -28 42 -28 h146 l24 -22 h8 l-6 30 q-4 24 -30 24 h-142 q-42 0 -42 -4z" fill="#fff"/>
    <path d="M108 94 l30 30 h14 l-14 -30z" fill="${C.blue}"/>
    <rect x="52" y="46" width="108" height="44" rx="8" fill="${C.sky}"/>
    ${B(92, 88, "on", { arms: "wave", s: .8 })}${P(138, 88, C.yellow, { s: .66 })}
    <path d="M54 88 h104" class="sfl" stroke-width="3.2"/>
    <circle cx="174" cy="58" r="3.5" fill="${C.sky}"/><circle cx="188" cy="58" r="3.5" fill="${C.sky}"/><circle cx="34" cy="62" r="3" fill="${C.sky}"/>`),

  tv: () => svg(`
    ${ground(120)}
    <path d="M104 14 l16 12 l16 -12" stroke-width="2"/>
    <rect x="50" y="26" width="140" height="84" rx="12" fill="${C.lavD}"/>
    <rect x="60" y="34" width="120" height="68" rx="6" fill="${C.greenD}"/>
    <rect x="60" y="34" width="120" height="68" rx="6" class="sfl" stroke-width="2.6"/>
    <path d="M120 34 v68" stroke="#fff" opacity=".7"/><circle cx="120" cy="68" r="12" stroke="#fff" opacity=".7"/>
    ${B(104, 98, "on", { arms: "up", s: .82 })}
    <circle cx="150" cy="86" r="7" fill="#fff"/><path d="M146 83 l4 3 l4 -3 M150 86 v5" stroke-width="1"/>
    <path d="M96 110 l-8 10 M144 110 l8 10" stroke-width="2.6"/>`),

  phone: () => svg(`
    ${ground(118)}
    ${B(80, 118, "on", { arms: "phone", s: 1.4, extra: `<rect x="21" y="-50" width="9" height="15" rx="2" fill="${L}"/><rect x="22.5" y="-48" width="6" height="10" rx="1" class="sf" stroke="none"/>` })}
    <path d="M128 18 h82 q8 0 8 8 v26 q0 8 -8 8 h-62 l-14 10 l2 -10 h-8 q-8 0 -8 -8 v-26 q0 -8 8 -8z" fill="#fff"/>
    ${txt(170, 45, "Hello! 👋", 13)}
    <path d="M112 50 q6 -6 0 -12 M118 54 q10 -10 0 -20" class="sfl" stroke-width="2"/>`),

  bike: () => svg(`
    ${ground(116)}
    <circle cx="80" cy="96" r="18" fill="${C.white}" stroke-width="2.4"/><circle cx="160" cy="96" r="18" fill="${C.white}" stroke-width="2.4"/>
    <path d="M80 96 l24 -30 h40 l16 30 M104 66 l18 30 l22 -30 M144 66 l-4 -12 h10" stroke-width="2.4"/>
    <path d="M94 64 h20" class="sfl" stroke-width="4.4"/>
    <path d="M98 62 l10 22 l-4 12 M110 62 l10 20 l2 14" stroke-width="3.4"/>
    ${B(104, 63, "on", { legs: false, arms: "ride", s: .95 })}
    <path d="M40 80 h16 M34 90 h18 M42 100 h12" opacity=".35" stroke-width="2"/>`),

  street: () => svg(`
    <rect x="24" y="30" width="56" height="62" rx="4" fill="${C.peach}"/><path d="M24 44 h56" /><path d="M24 30 h56 l-6 14 h-44z" fill="${C.pink}"/>
    <rect x="40" y="62" width="22" height="30" fill="${C.sky}"/>
    <rect x="96" y="40" width="52" height="52" rx="4" fill="${C.lav}"/><rect x="106" y="50" width="12" height="12" fill="${C.sky}"/><rect x="126" y="50" width="12" height="12" fill="${C.sky}"/><rect x="114" y="70" width="16" height="22" fill="${C.wood}"/>
    <rect x="160" y="26" width="58" height="66" rx="4" fill="${C.blue}"/><path d="M170 38 h12 M196 38 h12 M170 54 h12 M196 54 h12 M170 70 h12 M196 70 h12" stroke-width="5" stroke="${C.sky}"/>
    <path d="M0 92 H240 V126 H0z" class="sf" stroke="none"/><path d="M0 92 H240 M0 126 H240" class="sfl" stroke-width="2.4"/>
    <path d="M10 110 h18 M44 110 h18 M78 110 h18 M112 110 h18 M146 110 h18 M180 110 h18 M214 110 h18" stroke="#fff" stroke-width="2.6"/>
    ${B(150, 118, "on", { arms: "wave", s: .78 })}
    <path d="M90 92 v-58" stroke-width="2.2"/><rect x="66" y="16" width="52" height="16" rx="3" fill="#3d8b5a" stroke="#fff" stroke-width="1.6"/>${txt(92, 28, "Green St.", 9.5, "#fff")}`),

  floors: () => svg(`
    ${ground(122)}
    <path d="M50 20 l70 -16 l70 16z" fill="${C.pink}"/>
    <rect x="56" y="20" width="128" height="102" fill="${C.white}"/>
    <path d="M56 40 h128 M56 60 h128 M56 100 h128" opacity=".4"/>
    <rect x="56" y="60" width="128" height="40" class="sf" stroke="none"/><path d="M56 100 h128" class="sfl" stroke-width="3"/>
    ${txt(46, 34, "3", 10)}${txt(46, 54, "2", 10)}${txt(46, 84, "1", 12, L)}${txt(46, 115, "G", 10)}
    <rect x="70" y="25" width="14" height="10" fill="${C.sky}"/><rect x="156" y="25" width="14" height="10" fill="${C.sky}"/><rect x="70" y="45" width="14" height="10" fill="${C.sky}"/><rect x="156" y="45" width="14" height="10" fill="${C.sky}"/>
    <rect x="70" y="68" width="16" height="16" fill="${C.sky}"/><rect x="154" y="68" width="16" height="16" fill="${C.sky}"/>
    <rect x="112" y="104" width="16" height="18" fill="${C.wood}"/>
    ${B(120, 100, "on", { arms: "wave", s: .82 })}`),

  /* ========== AT ========== */
  door: () => svg(`
    ${ground(116)}
    <rect x="120" y="8" width="112" height="108" fill="${C.peach}"/>
    <rect x="150" y="36" width="40" height="80" rx="20" fill="${C.wood}"/><circle cx="182" cy="80" r="2.4" fill="${L}"/>
    <rect x="144" y="112" width="52" height="6" rx="2" fill="${C.grey}"/><rect x="206" y="40" width="20" height="24" fill="${C.sky}"/>
    ${Spot(112, 116)}
    ${B(112, 116, "at", { arms: "knock" })}
    <path d="M152 72 l6 -3 M152 82 l7 0" stroke-width="1.6" opacity=".7"/>
    ${Pin(80, 70, .7)}`),

  busstop: () => svg(`
    ${ground(116)}
    <g transform="translate(-8 0)"><rect x="-40" y="56" width="66" height="50" rx="10" fill="${C.blue}"/><rect x="6" y="64" width="14" height="22" rx="3" fill="${C.sky}"/>${wheel(8, 106, 8)}
    <path d="M30 70 h10 M30 80 h14 M30 90 h8" opacity=".4" stroke-width="2"/></g>
    <path d="M150 116 V24" stroke-width="2.6"/><circle cx="150" cy="24" r="14" class="a" stroke="#fff" stroke-width="2"/>${txt(150, 28, "BUS", 9, "#fff")}
    <path d="M168 116 v-56 h62 v56" stroke-opacity=".5"/><path d="M162 60 h74" stroke-width="3"/>
    <rect x="174" y="94" width="50" height="6" rx="2" fill="${C.wood}"/><path d="M180 100 v14 M218 100 v14"/>
    ${Spot(118, 116)}
    ${B(118, 116, "at", { arms: "wave", extra: `<circle cx="-26" cy="-14" r="3.4" fill="#fff"/>` })}
    ${Pin(118, 58, .62)}`),

  party: () => svg(`
    <path d="M10 14 q110 30 220 0" stroke-opacity=".5"/>
    <path d="M30 20 l6 14 l6 -12z" fill="${C.pink}"/><path d="M62 26 l6 14 l6 -12z" fill="${C.yellow}"/><path d="M96 30 l6 14 l6 -12z" fill="${C.blue}"/><path d="M134 30 l6 14 l6 -12z" fill="${C.lav}"/><path d="M168 26 l6 14 l6 -12z" fill="${C.pink}"/><path d="M200 20 l6 14 l6 -12z" fill="${C.yellow}"/>
    <ellipse cx="22" cy="62" rx="10" ry="12" fill="${C.pinkD}"/><path d="M22 74 q4 18 -2 42"/><ellipse cx="220" cy="56" rx="10" ry="12" fill="${C.blueD}"/><path d="M220 68 q-4 20 2 48"/>
    ${ground(116)}
    <rect x="130" y="96" width="44" height="20" fill="${C.white}"/><rect x="136" y="76" width="32" height="20" rx="3" fill="${C.pink}"/><path d="M136 84 q8 5 16 0 q8 5 16 0" stroke="#fff" stroke-width="2"/><path d="M152 76 v-8" stroke-width="2"/><path d="M152 68 q-3 -4 0 -7 q3 3 0 7z" fill="${C.yellow}"/>
    ${B(90, 116, "at", { arms: "up", hat: "party" })}
    ${P(196, 116, C.yellow, { arms: "wave", hat: "party", hair: C.hair2, s: .9 })}
    <path d="M60 50 l3 6 M120 46 l-2 7 M70 30 l4 4 M112 62 l5 -3" stroke="${C.pinkD}" stroke-width="2.2"/><circle cx="56" cy="70" r="2" fill="${C.yellow}" stroke="none"/><circle cx="124" cy="40" r="2" fill="${C.blueD}" stroke="none"/>`),

  concert: () => svg(`
    <path d="M40 0 L80 80 H0z" class="as" stroke="none" opacity=".8"/><path d="M200 0 L240 80 H160z" class="as" stroke="none" opacity=".8"/>
    <rect x="30" y="76" width="180" height="10" fill="${C.lavD}"/>
    ${P(120, 76, C.pinkD, { arms: "hold", s: .9 })}
    <path d="M127 55 l24 -7 M134 57 q-8 -4 -4 -10 q8 -2 10 6z" fill="${C.wood}" stroke-width="2"/>
    <path d="M70 40 v36 M64 40 h12" stroke-width="2"/><circle cx="70" cy="36" r="4" fill="${L}"/>
    <path d="M168 32 q4 -6 8 0 M176 24 l0 -10 l8 -2 l0 10" stroke-width="1.6"/>
    ${Head(42, 122, { hair: C.hair2 })}${Head(80, 126)}${Head(166, 126, { hair: C.hair2 })}${Head(204, 122)}
    <path d="M54 118 l8 -16 M192 118 l-8 -16" stroke-width="3"/>
    ${B(122, 134, "at", { arms: "up", s: .92 })}`),

  address: () => svg(`
    <path d="M0 102 H240 V124 H0z" fill="${C.grey}" stroke="none"/><path d="M0 102 H240 M0 124 H240" opacity=".4"/>
    <path d="M10 113 h16 M46 113 h16 M82 113 h16 M118 113 h16 M154 113 h16 M190 113 h16 M226 113 h16" stroke="#fff" stroke-width="2.4"/>
    <path d="M76 52 l34 -28 l34 28 v50 h-68z" fill="${C.peach}"/><path d="M70 54 l40 -34 l40 34" stroke-width="2.4"/>
    <rect x="102" y="72" width="18" height="30" fill="${C.wood}"/><rect x="84" y="60" width="14" height="12" fill="${C.sky}"/>
    <rect x="124" y="58" width="22" height="16" rx="4" class="a" stroke="#fff" stroke-width="1.6"/>${txt(135, 70, "25", 11, "#fff")}
    ${Spot(176, 102)}
    ${B(176, 102, "at", { arms: "hold", extra: `<rect x="28" y="-42" width="16" height="11" rx="1.5" fill="#fff"/><path d="M28 -42 l8 6 l8 -6" stroke-width="1.2"/>` })}
    ${Pin(176, 44, .6)}
    <path d="M30 102 v-58" stroke-width="2.2"/><rect x="6" y="28" width="52" height="16" rx="3" fill="#3d8b5a" stroke="#fff" stroke-width="1.6"/>${txt(32, 40, "Green St.", 9.5, "#fff")}`),

  page: () => svg(`
    <rect x="66" y="6" width="108" height="124" rx="6" fill="#fff"/>
    <rect x="74" y="14" width="92" height="30" rx="5" class="as" stroke="none"/>
    ${B(98, 42, "at", { arms: "hold", s: .62 })}
    <path d="M118 36 q4 -10 8 0 q3 -6 6 0 q4 -8 7 0 q3 -5 6 0" class="al" stroke-width="2"/>
    <path d="M78 56 h84 M78 68 h84 M78 80 h84 M78 92 h64 M78 104 h84 M78 116 h52" stroke="${C.grey}" stroke-width="4"/>
    ${Pin(48, 34, .8)}${txt(48, 54, "top", 10)}
    <path d="M58 28 l12 0" stroke-dasharray="3 3" opacity=".5"/>`),

  doctor: () => svg(`
    ${ground(116)}
    <rect x="136" y="14" width="88" height="102" rx="6" fill="${C.white}"/>
    <rect x="168" y="22" width="24" height="24" rx="5" fill="${C.pink}"/><path d="M180 27 v14 M173 34 h14" stroke="#fff" stroke-width="4"/>
    <rect x="164" y="64" width="32" height="52" rx="3" fill="${C.sky}"/>
    ${P(62, 116, "#fff", { coat: true, arms: "wave" })}
    ${Spot(108, 116)}
    ${B(108, 116, "at", { arms: "down", oh: true, extra: `<path d="M-16 -46 q16 -12 32 0" stroke="${C.pinkD}" stroke-width="2"/>` })}
    ${Pin(108, 58, .6)}`),

  dentist: () => svg(`
    ${ground(116)}
    <path d="M50 116 v-20 h56 l20 -44 l9 4 l-17 42 v18z" fill="${C.lav}"/><path d="M114 116 v-16"/>
    ${B(80, 98, "at", { legs: false, arms: "none", oh: true, s: .95 })}
    <path d="M100 66 l18 -12 M118 54 l4 -2" stroke-width="2.4"/>
    <g transform="translate(184 62)"><path d="M-22 -18 q-6 -16 10 -18 q8 0 12 4 q4 -4 12 -4 q16 2 10 18 q-4 14 -6 30 q-2 10 -8 0 q-4 -12 -8 -12 q-4 0 -8 12 q-6 10 -8 0 q-2 -16 -6 -30z" fill="#fff" stroke-width="2"/>
    <circle cx="-6" cy="-16" r="1.6" fill="${L}" stroke="none"/><circle cx="6" cy="-16" r="1.6" fill="${L}" stroke="none"/><path d="M-5 -10 q5 4 10 0"/></g>
    ${Pin(150, 116, .72)}`),

  johns: () => svg(`
    ${ground(116)}
    <path d="M40 58 l50 -40 l50 40 v58 h-100z" fill="${C.blue}"/><path d="M32 60 l58 -46 l58 46" stroke-width="2.4"/>
    <rect x="60" y="36" width="60" height="16" rx="4" fill="#fff"/>${txt(90, 48, "John’s", 10)}
    <rect x="52" y="66" width="28" height="22" fill="${C.sky}"/>${Head(66, 78, { hair: C.hair2 })}
    <rect x="100" y="66" width="28" height="22" fill="${C.sky}"/>${Head(114, 78)}
    <rect x="80" y="90" width="20" height="26" fill="${C.wood}"/>
    ${Spot(168, 116)}
    ${B(168, 116, "at", { arms: "hold", extra: `<path d="M24 -40 h22 v6 h-22z" fill="${C.peach}"/><path d="M24 -40 l11 -6 l11 6" fill="${C.yellow}"/>` })}
    ${Pin(168, 58, .6)}`),

  /* ========== AT vs IN ========== */
  prisonIn: () => svg(`
    ${ground(116)}
    <rect x="70" y="14" width="100" height="102" rx="6" class="as al" stroke-width="2.6"/>
    ${B(120, 116, "in", { arms: "down", s: 1.1 })}
    <path d="M86 14 v102 M102 14 v102 M138 14 v102 M154 14 v102" stroke-width="3.4" stroke="${C.greyD}"/>`),

  prisonAt: () => svg(`
    ${ground(116)}
    <rect x="114" y="20" width="110" height="96" fill="${C.grey}"/><path d="M114 20 h110" stroke-width="2"/>
    <rect x="130" y="36" width="24" height="24" fill="${C.sky}"/><path d="M136 36 v24 M142 36 v24 M148 36 v24" stroke-width="2"/>
    <rect x="184" y="36" width="24" height="24" fill="${C.sky}"/><path d="M190 36 v24 M196 36 v24 M202 36 v24" stroke-width="2"/>
    <rect x="156" y="76" width="26" height="40" fill="${C.woodD}"/>
    ${Spot(74, 116)}
    ${B(74, 116, "at", { arms: "hold", hat: "cap" })}<path d="M106 82 l-6 34 M92 116 h16" stroke-width="2.6" stroke="${C.woodD}"/>
    ${Pin(40, 60, .6)}`),

  hospIn: () => svg(`
    <rect x="24" y="10" width="192" height="108" rx="10" class="as al" stroke-width="2.6"/>
    <path d="M46 110 v-36 M192 110 v-26" stroke-width="3"/><rect x="46" y="80" width="146" height="14" rx="4" fill="#fff"/>
    <rect x="54" y="66" width="34" height="16" rx="8" fill="${C.white}"/>
    ${B(74, 86, "in", { legs: false, arms: "none", closed: true, s: .82 })}
    <path d="M92 82 q40 -16 100 0 v4 h-100z" fill="${C.blue}"/>
    <path d="M206 22 v80 M198 30 h16" stroke-width="2"/><rect x="200" y="30" width="12" height="18" rx="3" fill="${C.sky}"/>
    ${txt(130, 40, "z z", 12, C.blueD)}`),

  hospAt: () => svg(`
    ${ground(116)}
    <rect x="114" y="16" width="112" height="100" fill="${C.white}"/>
    <rect x="158" y="24" width="24" height="24" rx="5" fill="${C.pink}"/><path d="M170 29 v14 M163 36 h14" stroke="#fff" stroke-width="4"/>
    <rect x="156" y="80" width="28" height="36" fill="${C.sky}"/><rect x="126" y="58" width="18" height="14" fill="${C.sky}"/><rect x="196" y="58" width="18" height="14" fill="${C.sky}"/>
    ${Spot(72, 116)}
    ${B(72, 116, "at", { arms: "hold", extra: `<path d="M32 -32 l4 -16 M32 -32 l10 -12 M32 -32 l-1 -18" stroke="${C.greenD}" stroke-width="1.6"/><circle cx="36" cy="-50" r="4" fill="${C.pinkD}"/><circle cx="43" cy="-45" r="4" fill="${C.yellow}"/><circle cx="31" cy="-52" r="4" fill="${C.pink}"/>` })}
    ${Pin(40, 60, .6)}`),

  marketIn: () => svg(`
    <rect x="12" y="8" width="216" height="110" rx="10" class="as al" stroke-width="2.6"/>
    <rect x="24" y="22" width="60" height="70" fill="#fff"/><path d="M24 44 h60 M24 66 h60" />
    <g stroke="none"><rect x="28" y="32" width="10" height="12" fill="${C.pinkD}"/><rect x="42" y="34" width="10" height="10" fill="${C.yellow}"/><rect x="56" y="30" width="10" height="14" fill="${C.blue}"/><rect x="70" y="34" width="10" height="10" fill="${C.greenD}"/>
    <rect x="30" y="54" width="12" height="12" fill="${C.peach}"/><rect x="46" y="56" width="10" height="10" fill="${C.lavD}"/><rect x="60" y="52" width="14" height="14" fill="${C.pink}"/></g>
    ${B(112, 116, "in", { arms: "hold", s: .9 })}
    <path d="M138 90 h26 l-4 16 h-18z" fill="#fff"/><path d="M134 86 l4 4"/><circle cx="144" cy="112" r="3" fill="${L}"/><circle cx="158" cy="112" r="3" fill="${L}"/>
    ${P(186, 116, C.yellow, { s: .78, arms: "wave", hair: C.hair2 })}${P(210, 116, C.blue, { s: .74 })}`),

  marketAt: () => svg(`
    ${ground(116)}
    <rect x="100" y="34" width="124" height="82" fill="${C.white}"/>
    <path d="M96 34 h132 l-6 16 h-120z" fill="${C.pink}"/><path d="M118 34 l-2 16 M140 34 v16 M162 34 v16 M184 34 v16 M206 34 l2 16" stroke="#fff" stroke-width="3"/>
    <rect x="124" y="14" width="76" height="16" rx="4" fill="#fff"/>${txt(162, 26, "MARKET", 9.5)}
    <rect x="112" y="62" width="40" height="54" fill="${C.sky}"/><rect x="164" y="62" width="48" height="30" fill="${C.sky}"/>
    ${Spot(62, 116)}
    ${B(62, 116, "at", { arms: "wave" })}${P(188, 116, C.blue, { arms: "wave", s: .8, hair: C.hair2 })}
    ${Pin(30, 58, .6)}`),
};
