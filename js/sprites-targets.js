/**
 * Levi's Reading Adventure - Target & Character Sprites
 * Window export: window.LeviTargetSprites
 *
 * Storybook SVG illustrations (viewBox="0 0 140 140") with warm outlines,
 * rich colors, and expressive visual state reactions:
 * { open: boolean, lit: boolean, happy: boolean, count: number, heldKeyColor: string, bloomed: boolean }
 */
(function(window) {
  'use strict';

  // Storybook line styling constants
  const S = 'stroke="#2d231e" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"';
  const TS = 'stroke="#2d231e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

  // Helpers
  function wrap(inner) {
    return `<svg viewBox="0 0 140 140" class="target-svg" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  }

  function shadow(cx = 70, cy = 126, rx = 36, ry = 6) {
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#2d231e" opacity="0.14"/>`;
  }

  function sparkle(x, y, s = 6, fill = '#ffd54f') {
    return `<path d="M ${x} ${y - s} Q ${x} ${y} ${x + s} ${y} Q ${x} ${y} ${x} ${y + s} Q ${x} ${y} ${x - s} ${y} Q ${x} ${y} ${x} ${y - s} Z" fill="${fill}" stroke="#2d231e" stroke-width="1.2"/>`;
  }

  function heart(x, y, s = 1, fill = '#ff4081') {
    return `<g transform="translate(${x},${y}) scale(${s})"><path d="M 0 0 C -3 -5 -8 -2 -6 3 C -4 7 0 10 0 10 C 0 10 4 7 6 3 C 8 -2 3 -5 0 0 Z" fill="${fill}" stroke="#2d231e" stroke-width="1.2"/></g>`;
  }

  function keySvg(x, y, color = '#ffd54f', rot = 0, scale = 1) {
    return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${scale})">` +
      `<circle cx="0" cy="-6" r="6" fill="${color}" ${TS}/>` +
      `<circle cx="0" cy="-6" r="2.5" fill="#ffffff" ${TS}/>` +
      `<path d="M 0 0 L 0 14 M 0 6 L 4 6 M 0 10 L 4 10" ${TS}/>` +
      `</g>`;
  }

  function shovelSvg(x, y, rot = 0, scale = 0.9) {
    return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${scale})">` +
      `<rect x="-2" y="-22" width="4" height="26" rx="2" fill="#8d5b2e" ${TS}/>` +
      `<path d="M -6 -28 h 12 v 6 h -12 z" fill="#e53935" ${TS}/>` +
      `<path d="M -6 4 C -6 16 6 16 6 4 Z" fill="#cfd8dc" ${TS}/>` +
      `</g>`;
  }

  const TARGETS = {
    // ==========================================
    // HERO AVATAR
    // ==========================================
    levi(state) {
      const isHappy = !!state.happy;
      const keyColor = state.heldKeyColor || null;
      const mouth = isHappy
        ? `<path d="M 62 65 Q 70 77 78 65 Z" fill="#e53935" ${TS}/><path d="M 64 70 Q 70 74 76 70" fill="#ff8a80"/>`
        : `<path d="M 63 66 Q 70 72 77 66" fill="none" ${TS}/>`;
      const eyes = isHappy
        ? `<path d="M 58 55 Q 63 50 67 55" fill="none" ${TS}/><path d="M 73 55 Q 77 50 82 55" fill="none" ${TS}/>`
        : `<circle cx="63" cy="55" r="3.2" fill="#2d231e"/><circle cx="64" cy="54" r="1.1" fill="#ffffff"/><circle cx="77" cy="55" r="3.2" fill="#2d231e"/><circle cx="78" cy="54" r="1.1" fill="#ffffff"/>`;
      const armRight = keyColor
        ? `<path d="M 85 82 Q 98 76 102 66" fill="none" ${S}/>` +
          `<circle cx="102" cy="66" r="5" fill="#ffd0a0" ${TS}/>` +
          keySvg(102, 60, keyColor, -25, 0.9)
        : `<path d="M 85 82 Q 98 70 100 58" fill="none" ${S}/><circle cx="100" cy="56" r="5" fill="#ffd0a0" ${TS}/>` +
          (isHappy ? sparkle(108, 48, 6, '#ffd54f') : '');
      const celebration = isHappy
        ? sparkle(30, 36, 7, '#ffd54f') + sparkle(110, 34, 6, '#ff4081') + sparkle(40, 80, 5, '#40c4ff')
        : '';

      return wrap(
        shadow(70, 130, 38, 6) +
        celebration +
        // Legs & Yellow sneakers
        `<path d="M 56 98 L 56 116 M 84 98 L 84 116" fill="none" stroke="#1976d2" stroke-width="12" stroke-linecap="round"/>` +
        `<path d="M 44 118 h 18 v 8 c 0 3 -3 5 -8 5 h -10 z" fill="#fbc02d" ${TS}/>` +
        `<path d="M 44 122 h 7 v 9 h -7 z" fill="#ffffff" ${TS}/>` +
        `<path d="M 78 118 h 18 v 8 c 0 3 -3 5 -8 5 h -10 z" fill="#fbc02d" ${TS}/>` +
        `<path d="M 78 122 h 7 v 9 h -7 z" fill="#ffffff" ${TS}/>` +
        // Body & Blue overalls
        `<path d="M 50 78 L 90 78 L 92 102 L 48 102 Z" fill="#29b6f6" ${S}/>` +
        `<path d="M 52 78 L 54 66 L 62 66 L 59 78 Z" fill="#1976d2" ${TS}/>` +
        `<path d="M 88 78 L 86 66 L 78 66 L 81 78 Z" fill="#1976d2" ${TS}/>` +
        `<circle cx="58" cy="74" r="2.5" fill="#fbc02d" ${TS}/>` +
        `<circle cx="82" cy="74" r="2.5" fill="#fbc02d" ${TS}/>` +
        `<rect x="62" y="82" width="16" height="12" rx="3" fill="#0288d1" ${TS}/>` +
        // Left arm
        `<path d="M 55 82 Q 42 86 38 78" fill="none" ${S}/>` +
        `<circle cx="36" cy="77" r="5" fill="#ffd0a0" ${TS}/>` +
        armRight +
        // Head
        `<circle cx="70" cy="56" r="24" fill="#ffd0a0" ${S}/>` +
        `<circle cx="46" cy="56" r="6" fill="#ffd0a0" ${TS}/>` +
        `<circle cx="94" cy="56" r="6" fill="#ffd0a0" ${TS}/>` +
        // Brown hair
        `<path d="M 48 48 Q 44 38 52 35 Q 60 42 66 34 Q 74 40 82 35 Q 92 38 92 48" fill="#6d4c41" ${S}/>` +
        // Red cap
        `<path d="M 48 44 C 48 24 92 24 92 44 Z" fill="#e53935" ${S}/>` +
        `<path d="M 42 45 C 55 42 85 42 98 45 C 96 50 86 52 42 50 Z" fill="#d32f2f" ${S}/>` +
        `<circle cx="70" cy="35" r="4.5" fill="#fdd835" ${TS}/>` +
        `<path d="M 70 32 L 71 35 L 74 35 L 72 37 L 73 40 L 70 38 L 67 40 L 68 37 L 66 35 L 69 35 Z" fill="#ffffff"/>` +
        // Face features
        eyes +
        `<circle cx="56" cy="63" r="3.5" fill="#ff8a80" opacity="0.6"/>` +
        `<circle cx="84" cy="63" r="3.5" fill="#ff8a80" opacity="0.6"/>` +
        `<path d="M 69 58 Q 70 60 71 58" fill="none" ${TS}/>` +
        mouth
      );
    },

    // ==========================================
    // LIVING ROOM & BEDROOM FURNITURE
    // ==========================================
    chair(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 44, 7) +
        // Wooden legs
        `<line x1="38" y1="96" x2="34" y2="124" stroke="#8d5b2e" stroke-width="5" stroke-linecap="round"/>` +
        `<line x1="52" y1="96" x2="50" y2="120" stroke="#6d4c41" stroke-width="4" stroke-linecap="round"/>` +
        `<line x1="88" y1="96" x2="90" y2="120" stroke="#6d4c41" stroke-width="4" stroke-linecap="round"/>` +
        `<line x1="102" y1="96" x2="106" y2="124" stroke="#8d5b2e" stroke-width="5" stroke-linecap="round"/>` +
        // Apron
        `<rect x="34" y="90" width="72" height="10" rx="3" fill="#a1622e" ${S}/>` +
        // High arched backrest
        `<path d="M 40 82 C 40 32 100 32 100 82 Z" fill="#26a69a" ${S}/>` +
        `<circle cx="70" cy="50" r="3" fill="#004d40"/>` +
        `<circle cx="56" cy="60" r="3" fill="#004d40"/>` +
        `<circle cx="84" cy="60" r="3" fill="#004d40"/>` +
        // Plush teal cushion
        `<rect x="30" y="74" width="80" height="22" rx="10" fill="#4db6ac" ${S}/>` +
        `<path d="M 36 78 Q 70 74 104 78" fill="none" stroke="#80cbc4" stroke-width="3" stroke-linecap="round"/>` +
        // Armrests
        `<path d="M 28 84 Q 24 64 38 64 Q 44 76 44 84" fill="#a1622e" ${S}/>` +
        `<path d="M 112 84 Q 116 64 102 64 Q 96 76 96 84" fill="#a1622e" ${S}/>` +
        // Coral pillow
        `<rect x="68" y="70" width="22" height="20" rx="6" fill="#ef5350" transform="rotate(-10 79 80)" ${TS}/>` +
        (isHappy ? heart(70, 24, 1.2, '#ef5350') + sparkle(96, 32, 5) : '')
      );
    },

    lamp(state) {
      const isLit = !!(state.lit || state.happy);
      const glow = isLit
        ? `<circle cx="70" cy="54" r="50" fill="#fff59d" opacity="0.38"/>` +
          `<polygon points="46,74 8,130 132,130 94,74" fill="#fff9c4" opacity="0.28"/>` +
          sparkle(28, 48, 6, '#ffd54f') + sparkle(112, 50, 7, '#ffd54f') + sparkle(70, 18, 5, '#ffee58')
        : '';
      return wrap(
        shadow(70, 128, 28, 6) +
        glow +
        // Brass base
        `<ellipse cx="70" cy="124" rx="24" ry="7" fill="#d4af37" ${S}/>` +
        // Pole with ornamental spheres
        `<line x1="70" y1="124" x2="70" y2="46" stroke="#b78103" stroke-width="6" stroke-linecap="round"/>` +
        `<circle cx="70" cy="84" r="5" fill="#ffd54f" ${TS}/>` +
        `<circle cx="70" cy="46" r="4" fill="#d4af37" ${TS}/>` +
        // Pull chain
        `<path d="M 78 74 L 78 88" stroke="#2d231e" stroke-width="2" stroke-dasharray="2,2"/>` +
        `<circle cx="78" cy="90" r="2.5" fill="#d4af37" ${TS}/>` +
        // Shade
        `<polygon points="50,44 90,44 104,74 36,74" fill="${isLit ? '#ffee58' : '#fff8e1'}" ${S}/>` +
        `<ellipse cx="70" cy="74" rx="34" ry="7" fill="${isLit ? '#fdd835' : '#ffecb3'}" ${TS}/>`
      );
    },

    table(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 128, 48, 7) +
        // Legs
        `<line x1="26" y1="74" x2="22" y2="124" stroke="#8d5b2e" stroke-width="6" stroke-linecap="round"/>` +
        `<line x1="44" y1="74" x2="42" y2="118" stroke="#6d4c41" stroke-width="5" stroke-linecap="round"/>` +
        `<line x1="96" y1="74" x2="98" y2="118" stroke="#6d4c41" stroke-width="5" stroke-linecap="round"/>` +
        `<line x1="114" y1="74" x2="118" y2="124" stroke="#8d5b2e" stroke-width="6" stroke-linecap="round"/>` +
        // Apron
        `<rect x="22" y="66" width="96" height="12" rx="3" fill="#a1622e" ${S}/>` +
        // Table top
        `<polygon points="12,66 128,66 136,52 4,52" fill="#c98544" ${S}/>` +
        `<polygon points="6,52 134,52 130,48 10,48" fill="#d79a5b" ${TS}/>` +
        // Table runner
        `<polygon points="54,50 86,50 84,72 56,72" fill="#fff9c4" ${TS}/>` +
        // Ceramic vase with flower
        `<path d="M 64 50 C 62 42 64 40 70 40 C 76 40 78 42 76 50 Z" fill="#29b6f6" ${TS}/>` +
        `<circle cx="70" cy="32" r="4.5" fill="#fdd835" ${TS}/>` +
        `<path d="M 70 24 C 67 27 67 31 70 31 C 73 31 73 27 70 24" fill="#ffffff" ${TS}/>` +
        `<path d="M 62 32 C 65 29 69 29 69 32 C 69 35 65 35 62 32" fill="#ffffff" ${TS}/>` +
        `<path d="M 78 32 C 75 29 71 29 71 32 C 71 35 75 35 78 32" fill="#ffffff" ${TS}/>` +
        (isHappy ? sparkle(30, 40, 5) + sparkle(108, 42, 6) : '')
      );
    },

    sofa(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 52, 7) +
        // Feet
        `<rect x="24" y="112" width="12" height="10" rx="3" fill="#6d4c41"/>` +
        `<rect x="104" y="112" width="12" height="10" rx="3" fill="#6d4c41"/>` +
        // Body base
        `<rect x="16" y="66" width="108" height="50" rx="14" fill="#e57373" ${S}/>` +
        // Rolled backrest
        `<path d="M 22 68 C 22 38 118 38 118 68 Z" fill="#ef5350" ${S}/>` +
        `<circle cx="48" cy="52" r="3" fill="#c62828"/>` +
        `<circle cx="70" cy="48" r="3" fill="#c62828"/>` +
        `<circle cx="92" cy="52" r="3" fill="#c62828"/>` +
        // Seat cushions
        `<rect x="22" y="84" width="46" height="26" rx="8" fill="#e57373" ${S}/>` +
        `<rect x="72" y="84" width="46" height="26" rx="8" fill="#e57373" ${S}/>` +
        // Arms
        `<rect x="14" y="72" width="16" height="38" rx="8" fill="#ef5350" ${S}/>` +
        `<rect x="110" y="72" width="16" height="38" rx="8" fill="#ef5350" ${S}/>` +
        // Throw pillows
        `<rect x="26" y="74" width="20" height="20" rx="5" fill="#4db6ac" transform="rotate(-12 36 84)" ${TS}/>` +
        `<rect x="94" y="74" width="20" height="20" rx="5" fill="#fdd835" transform="rotate(12 104 84)" ${TS}/>` +
        (isHappy ? heart(70, 26, 1.2) + sparkle(96, 26, 5) : '')
      );
    },

    rug(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 74, 62, 38) +
        // Tassels left
        `<path d="M 12 66 L 3 66 M 10 72 L 2 72 M 10 78 L 2 78 M 12 84 L 3 84" stroke="#ffecb3" stroke-width="3" stroke-linecap="round"/>` +
        // Tassels right
        `<path d="M 128 66 L 137 66 M 130 72 L 138 72 M 130 78 L 138 78 M 128 84 L 137 84" stroke="#ffecb3" stroke-width="3" stroke-linecap="round"/>` +
        // Rug concentric ovals
        `<ellipse cx="70" cy="74" rx="58" ry="34" fill="#26a69a" ${S}/>` +
        `<ellipse cx="70" cy="74" rx="44" ry="24" fill="#fff9c4" ${TS}/>` +
        `<ellipse cx="70" cy="74" rx="28" ry="14" fill="#ef5350" ${TS}/>` +
        // Pattern accents
        `<circle cx="50" cy="74" r="2.5" fill="#26a69a"/>` +
        `<circle cx="90" cy="74" r="2.5" fill="#26a69a"/>` +
        `<circle cx="70" cy="64" r="2.5" fill="#26a69a"/>` +
        `<circle cx="70" cy="84" r="2.5" fill="#26a69a"/>` +
        (isHappy ? sparkle(70, 48, 6, '#ffd54f') + sparkle(40, 56, 5) + sparkle(100, 56, 5) : '')
      );
    },

    toy_box(state) {
      const isOpen = !!state.open;
      const lid = isOpen
        ? `<polygon points="22,66 22,22 118,22 118,66" fill="#00acc1" ${S}/>` +
          `<ellipse cx="70" cy="66" rx="44" ry="14" fill="#fff9c4"/>` +
          // Overflowing toys
          `<path d="M 38 62 C 34 44 54 44 56 62 Z" fill="#81c784" ${TS}/>` +
          `<circle cx="48" cy="50" r="2" fill="#2d231e"/>` +
          `<circle cx="70" cy="48" r="11" fill="#e53935" ${TS}/>` +
          `<path d="M 90 40 L 98 62 L 86 62 Z" fill="#ffd54f" ${TS}/>` +
          sparkle(70, 24, 7, '#ffd54f') + sparkle(36, 32, 6, '#ff4081') + sparkle(104, 34, 6, '#00e5ff')
        : `<polygon points="20,66 120,66 122,50 18,54" fill="#26c6da" ${S}/>` +
          // Peeking toys
          `<path d="M 38 60 C 36 50 48 50 50 60 Z" fill="#81c784" ${TS}/>` +
          `<circle cx="44" cy="54" r="1.5" fill="#2d231e"/>` +
          `<circle cx="68" cy="54" r="8" fill="#e53935" ${TS}/>` +
          `<path d="M 90 48 L 96 60 L 86 60 Z" fill="#ffd54f" ${TS}/>`;

      return wrap(
        shadow(70, 126, 46, 7) +
        // Chest box body
        `<rect x="24" y="66" width="92" height="52" rx="8" fill="#4dd0e1" ${S}/>` +
        `<path d="M 24 82 L 36 82 L 36 66" fill="none" stroke="#d4af37" stroke-width="4"/>` +
        `<path d="M 116 82 L 104 82 L 104 66" fill="none" stroke="#d4af37" stroke-width="4"/>` +
        `<rect x="64" y="74" width="12" height="14" rx="3" fill="#d4af37" ${TS}/>` +
        `<circle cx="70" cy="81" r="2" fill="#2d231e"/>` +
        lid
      );
    },

    bed(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 52, 7) +
        // Headboard
        `<rect x="20" y="38" width="100" height="42" rx="8" fill="#8d5b2e" ${S}/>` +
        `<rect x="16" y="28" width="10" height="92" rx="4" fill="#6d4c41" ${S}/>` +
        `<circle cx="21" cy="24" r="6" fill="#8d5b2e" ${TS}/>` +
        `<rect x="114" y="28" width="10" height="92" rx="4" fill="#6d4c41" ${S}/>` +
        `<circle cx="119" cy="24" r="6" fill="#8d5b2e" ${TS}/>` +
        // Fluffy pillow
        `<rect x="34" y="52" width="72" height="24" rx="10" fill="#ffffff" ${S}/>` +
        `<path d="M 44 64 Q 70 60 96 64" fill="none" stroke="#cfd8dc" stroke-width="2" stroke-linecap="round"/>` +
        // Starry blue blanket
        `<rect x="24" y="72" width="92" height="48" rx="6" fill="#283593" ${S}/>` +
        `<rect x="24" y="68" width="92" height="10" rx="4" fill="#e8eaf6" ${TS}/>` +
        // Gold stars on blanket
        sparkle(42, 88, 3, '#ffd54f') +
        sparkle(70, 98, 4, '#ffd54f') +
        sparkle(94, 86, 3, '#ffd54f') +
        sparkle(50, 110, 3, '#ffd54f') +
        sparkle(86, 110, 3, '#ffd54f') +
        (isHappy ? `<path d="M 70 20 A 10 10 0 1 0 78 36 A 8 8 0 1 1 70 20 Z" fill="#ffd54f" ${TS}/>` + sparkle(92, 22, 5) : '')
      );
    },

    laundry_basket(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 40, 7) +
        // Wicker basket body
        `<path d="M 30 64 L 38 122 L 102 122 L 110 64 Z" fill="#d7a15c" ${S}/>` +
        // Wicker criss-cross lines
        `<path d="M 40 64 L 46 122 M 56 64 L 60 122 M 72 64 L 72 122 M 88 64 L 84 122 M 100 64 L 94 122" stroke="#b58242" stroke-width="2" stroke-linecap="round"/>` +
        `<path d="M 32 78 L 108 78 M 34 94 L 106 94 M 36 108 L 104 108" stroke="#b58242" stroke-width="2"/>` +
        // Handles
        `<path d="M 28 72 C 18 72 18 84 28 84" fill="none" ${S}/>` +
        `<path d="M 112 72 C 122 72 122 84 112 84" fill="none" ${S}/>` +
        // Clothes overflowing
        `<path d="M 34 66 C 30 46 54 44 56 64 Z" fill="#f48fb1" ${S}/>` +
        `<path d="M 50 64 C 54 40 86 40 88 64 Z" fill="#4fc3f7" ${S}/>` +
        `<path d="M 82 66 C 84 48 106 48 104 66 Z" fill="#a5d6a7" ${S}/>` +
        (isHappy ? `<circle cx="68" cy="30" r="5" fill="#e1f5fe" opacity="0.8" ${TS}/>` + sparkle(86, 32, 6) : '')
      );
    },

    bookshelf(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 128, 48, 6) +
        // Frame
        `<rect x="24" y="18" width="92" height="106" rx="4" fill="#8d5b2e" ${S}/>` +
        `<rect x="30" y="24" width="80" height="94" fill="#a1622e"/>` +
        // Shelves
        `<rect x="24" y="56" width="92" height="8" fill="#6d4c41" ${TS}/>` +
        `<rect x="24" y="90" width="92" height="8" fill="#6d4c41" ${TS}/>` +
        // Top shelf items: potted succulent and brass globe
        `<polygon points="42,56 54,56 52,44 44,44" fill="#d84315" ${TS}/>` +
        `<circle cx="48" cy="40" r="6" fill="#81c784" ${TS}/>` +
        `<path d="M 82 56 L 82 48 M 76 56 L 88 56" stroke="#d4af37" stroke-width="2" stroke-linecap="round"/>` +
        `<circle cx="82" cy="42" r="7" fill="#4fc3f7" ${TS}/>` +
        // Middle shelf books
        `<rect x="34" y="64" width="10" height="26" rx="2" fill="#e53935" ${TS}/>` +
        `<rect x="46" y="62" width="12" height="28" rx="2" fill="#1e88e5" ${TS}/>` +
        `<rect x="60" y="66" width="8" height="24" rx="2" fill="#fbc02d" ${TS}/>` +
        `<rect x="70" y="60" width="14" height="30" rx="2" fill="#43a047" ${TS}/>` +
        `<rect x="88" y="66" width="10" height="26" rx="2" fill="#8e24aa" transform="rotate(16 92 78)" ${TS}/>` +
        // Bottom shelf: book stack & open spot
        `<rect x="34" y="94" width="30" height="6" rx="1" fill="#ff7043" ${TS}/>` +
        `<rect x="36" y="91" width="26" height="5" rx="1" fill="#ffca28" ${TS}/>` +
        (isHappy ? sparkle(80, 24, 6) + sparkle(40, 26, 5) : '')
      );
    },

    fishbowl(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 36, 6) +
        // Glass sphere
        `<circle cx="70" cy="74" r="46" fill="#e0f7fa" ${S}/>` +
        `<ellipse cx="70" cy="30" rx="24" ry="6" fill="#b2ebf2" ${S}/>` +
        // Water
        `<path d="M 26 72 C 26 108 44 116 70 116 C 96 116 114 108 114 72 C 98 70 85 74 70 72 C 55 70 42 74 26 72 Z" fill="#80deea" opacity="0.85"/>` +
        // Gravel
        `<ellipse cx="52" cy="112" rx="6" ry="3" fill="#ffd54f"/>` +
        `<ellipse cx="70" cy="114" rx="8" ry="3" fill="#cfd8dc"/>` +
        `<ellipse cx="88" cy="112" rx="7" ry="3" fill="#ffab91"/>` +
        // Seaweed
        `<path d="M 44 114 Q 36 90 46 80 Q 52 70 48 58" fill="none" stroke="#43a047" stroke-width="4" stroke-linecap="round"/>` +
        // Goldfish
        `<path d="M 68 86 C 82 80 88 88 94 82 L 94 94 C 88 88 82 96 68 90 Z" fill="#ff7043" ${TS}/>` +
        `<circle cx="72" cy="85" r="2" fill="#2d231e"/>` +
        `<path d="M 68 88 Q 72 90 74 88" fill="none" ${TS}/>` +
        `<circle cx="64" cy="80" r="2.5" fill="#ffffff" opacity="0.8" ${TS}/>` +
        `<circle cx="62" cy="72" r="3" fill="#ffffff" opacity="0.8" ${TS}/>` +
        // Glass reflection
        `<path d="M 34 52 A 38 38 0 0 1 60 38" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>` +
        (isHappy ? heart(90, 48, 1) + sparkle(70, 20, 5) : '')
      );
    },

    // ==========================================
    // KITCHEN TARGETS
    // ==========================================
    blue_plate(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 74, 52, 28) +
        `<circle cx="70" cy="70" r="54" fill="#1e88e5" ${S}/>` +
        // Decorative beaded rim
        `<circle cx="70" cy="24" r="3" fill="#ffffff"/>` +
        `<circle cx="93" cy="30" r="3" fill="#ffffff"/>` +
        `<circle cx="110" cy="47" r="3" fill="#ffffff"/>` +
        `<circle cx="116" cy="70" r="3" fill="#ffffff"/>` +
        `<circle cx="110" cy="93" r="3" fill="#ffffff"/>` +
        `<circle cx="93" cy="110" r="3" fill="#ffffff"/>` +
        `<circle cx="70" cy="116" r="3" fill="#ffffff"/>` +
        `<circle cx="47" cy="110" r="3" fill="#ffffff"/>` +
        `<circle cx="30" cy="93" r="3" fill="#ffffff"/>` +
        `<circle cx="24" cy="70" r="3" fill="#ffffff"/>` +
        `<circle cx="30" cy="47" r="3" fill="#ffffff"/>` +
        `<circle cx="47" cy="30" r="3" fill="#ffffff"/>` +
        // Basin
        `<circle cx="70" cy="70" r="38" fill="#64b5f6" ${TS}/>` +
        `<path d="M 42 46 A 40 40 0 0 1 84 32" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.8"/>` +
        (isHappy
          ? `<path d="M 64 68 C 60 58 70 54 70 58 C 70 54 80 58 76 68 L 70 78 Z" fill="#e53935" ${TS}/>` + sparkle(94, 60, 5)
          : '')
      );
    },

    green_plate(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 74, 52, 28) +
        `<circle cx="70" cy="70" r="54" fill="#43a047" ${S}/>` +
        // Decorative ring
        `<circle cx="70" cy="24" r="3" fill="#ffffff"/>` +
        `<circle cx="93" cy="30" r="3" fill="#ffffff"/>` +
        `<circle cx="110" cy="47" r="3" fill="#ffffff"/>` +
        `<circle cx="116" cy="70" r="3" fill="#ffffff"/>` +
        `<circle cx="110" cy="93" r="3" fill="#ffffff"/>` +
        `<circle cx="93" cy="110" r="3" fill="#ffffff"/>` +
        `<circle cx="70" cy="116" r="3" fill="#ffffff"/>` +
        `<circle cx="47" cy="110" r="3" fill="#ffffff"/>` +
        `<circle cx="30" cy="93" r="3" fill="#ffffff"/>` +
        `<circle cx="24" cy="70" r="3" fill="#ffffff"/>` +
        `<circle cx="30" cy="47" r="3" fill="#ffffff"/>` +
        `<circle cx="47" cy="30" r="3" fill="#ffffff"/>` +
        // Basin
        `<circle cx="70" cy="70" r="38" fill="#81c784" ${TS}/>` +
        `<path d="M 42 46 A 40 40 0 0 1 84 32" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.8"/>` +
        (isHappy
          ? `<circle cx="70" cy="70" r="10" fill="#fdd835" ${TS}/><circle cx="67" cy="68" r="1.5" fill="#2d231e"/><circle cx="73" cy="68" r="1.5" fill="#2d231e"/><path d="M 68 72 Q 70 74 72 72" fill="none" ${TS}/>`
          : '')
      );
    },

    red_pan(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(58, 120, 38, 6) +
        // Handle
        `<path d="M 88 50 L 124 22 C 128 18 134 24 130 28 L 94 56 Z" fill="#5d4037" ${S}/>` +
        `<circle cx="125" cy="24" r="3" fill="#ffffff" ${TS}/>` +
        // Skillet bowl
        `<circle cx="58" cy="74" r="44" fill="#e53935" ${S}/>` +
        `<circle cx="58" cy="74" r="36" fill="#424242" ${TS}/>` +
        // Fried egg
        `<path d="M 44 74 C 44 64 56 60 64 64 C 74 62 78 70 74 80 C 72 88 60 90 52 86 C 44 84 44 80 44 74 Z" fill="#ffffff" ${TS}/>` +
        `<circle cx="58" cy="74" r="10" fill="#fbc02d" ${TS}/>` +
        `<circle cx="61" cy="71" r="2" fill="#ffffff"/>` +
        // Steam swirls
        `<path d="M 50 44 Q 54 38 52 32 M 62 46 Q 66 40 64 34" fill="none" stroke="#cfd8dc" stroke-width="2.5" stroke-linecap="round"/>` +
        (isHappy ? heart(82, 36, 1) + sparkle(40, 36, 5) : '')
      );
    },

    toaster(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 44, 7) +
        // Feet
        `<rect x="34" y="118" width="12" height="6" fill="#424242"/>` +
        `<rect x="94" y="118" width="12" height="6" fill="#424242"/>` +
        // Toast slices popping up
        `<rect x="40" y="32" width="24" height="26" rx="5" fill="#ffe082" ${S}/>` +
        `<rect x="48" y="40" width="8" height="6" rx="1" fill="#fff59d" ${TS}/>` +
        `<rect x="76" y="26" width="24" height="32" rx="5" fill="#ffd54f" ${S}/>` +
        // Body
        `<rect x="24" y="58" width="92" height="60" rx="14" fill="#cfd8dc" ${S}/>` +
        `<rect x="28" y="62" width="84" height="20" rx="8" fill="#eceff1"/>` +
        // Side lever
        `<path d="M 116 78 L 126 78" stroke="#2d231e" stroke-width="4" stroke-linecap="round"/>` +
        `<circle cx="126" cy="78" r="4" fill="#e53935" ${TS}/>` +
        // Browning dial
        `<circle cx="44" cy="94" r="8" fill="#b0bec5" ${TS}/>` +
        `<line x1="44" y1="94" x2="48" y2="90" stroke="#e53935" stroke-width="2.5" stroke-linecap="round"/>` +
        (isHappy
          ? `<circle cx="68" cy="88" r="2.5" fill="#2d231e"/><circle cx="82" cy="88" r="2.5" fill="#2d231e"/><path d="M 72 94 Q 75 97 78 94" fill="none" ${TS}/>` + sparkle(106, 40, 5)
          : '')
      );
    },

    fridge(state) {
      const isOpen = !!state.open;
      if (isOpen) {
        return wrap(
          shadow(70, 128, 48, 7) +
          // Open cabinet interior
          `<rect x="20" y="22" width="68" height="102" rx="10" fill="#fff9c4" ${S}/>` +
          `<line x1="20" y1="58" x2="88" y2="58" stroke="#cfd8dc" stroke-width="3"/>` +
          `<line x1="20" y1="92" x2="88" y2="92" stroke="#cfd8dc" stroke-width="3"/>` +
          // Shelves items
          // Milk carton
          `<rect x="28" y="38" width="14" height="20" rx="2" fill="#ffffff" ${TS}/>` +
          `<polygon points="28,38 35,32 42,38" fill="#29b6f6" ${TS}/>` +
          // Cheese wedge
          `<polygon points="52,56 72,56 70,44" fill="#ffd54f" ${TS}/>` +
          `<circle cx="60" cy="52" r="1.5" fill="#ffb300"/>` +
          // Red apple
          `<circle cx="42" cy="84" r="7" fill="#e53935" ${TS}/>` +
          `<path d="M 42 77 Q 44 73 47 75" fill="none" stroke="#5d4037" stroke-width="1.5"/>` +
          // Open door swung to the right
          `<polygon points="88,22 124,30 124,116 88,124" fill="#4db6ac" ${S}/>` +
          `<rect x="94" y="44" width="24" height="10" rx="2" fill="#80cbc4" ${TS}/>` +
          `<rect x="94" y="76" width="24" height="10" rx="2" fill="#80cbc4" ${TS}/>` +
          sparkle(54, 30, 6, '#ffd54f') + sparkle(78, 70, 5)
        );
      }
      return wrap(
        shadow(70, 128, 44, 7) +
        // Closed retro mint fridge
        `<rect x="32" y="22" width="76" height="102" rx="14" fill="#4db6ac" ${S}/>` +
        `<line x1="32" y1="56" x2="108" y2="56" stroke="#00796b" stroke-width="3.5"/>` +
        // Handles
        `<rect x="94" y="36" width="6" height="14" rx="3" fill="#cfd8dc" ${TS}/>` +
        `<rect x="94" y="66" width="6" height="18" rx="3" fill="#cfd8dc" ${TS}/>` +
        // Apple magnet & sticky note
        `<circle cx="50" cy="40" r="5" fill="#e53935" ${TS}/>` +
        `<path d="M 50 35 Q 52 32 54 34" fill="none" stroke="#5d4037" stroke-width="1.5"/>` +
        `<rect x="62" y="34" width="14" height="14" rx="2" fill="#fff59d" ${TS}/>`
      );
    },

    // ==========================================
    // ANIMALS
    // ==========================================
    horse(state) {
      const isHappy = !!state.happy;
      const mouth = isHappy
        ? `<path d="M 64 92 Q 70 100 76 92 Z" fill="#d81b60" ${TS}/>`
        : `<path d="M 64 90 Q 70 94 76 90" fill="none" ${TS}/>`;
      return wrap(
        shadow(70, 128, 40, 6) +
        // Ears
        `<path d="M 44 38 L 48 18 L 56 32 Z" fill="#8d5b2e" ${S}/>` +
        `<path d="M 96 38 L 92 18 L 84 32 Z" fill="#8d5b2e" ${S}/>` +
        // Mane
        `<path d="M 56 26 Q 70 18 84 26 Q 78 36 70 30 Q 64 36 56 26 Z" fill="#5d4037" ${S}/>` +
        // Head
        `<path d="M 46 44 C 42 70 48 96 70 98 C 92 96 98 70 94 44 C 84 38 56 38 46 44 Z" fill="#8d5b2e" ${S}/>` +
        // Muzzle
        `<ellipse cx="70" cy="86" rx="20" ry="12" fill="#ffe0b2" ${TS}/>` +
        `<circle cx="63" cy="84" r="2.5" fill="#5d4037"/>` +
        `<circle cx="77" cy="84" r="2.5" fill="#5d4037"/>` +
        mouth +
        // Eyes
        `<circle cx="56" cy="56" r="4.5" fill="#2d231e"/><circle cx="57" cy="55" r="1.5" fill="#ffffff"/>` +
        `<circle cx="84" cy="56" r="4.5" fill="#2d231e"/><circle cx="85" cy="55" r="1.5" fill="#ffffff"/>` +
        // Cheeks
        `<circle cx="50" cy="68" r="4" fill="#ff8a80" opacity="0.6"/>` +
        `<circle cx="90" cy="68" r="4" fill="#ff8a80" opacity="0.6"/>` +
        (isHappy ? heart(70, 16, 1.2) + sparkle(104, 38, 6) : '')
      );
    },

    pig(state) {
      const isHappy = !!state.happy;
      const eyes = isHappy
        ? `<path d="M 50 56 Q 56 50 62 56" fill="none" ${TS}/><path d="M 78 56 Q 84 50 90 56" fill="none" ${TS}/>`
        : `<circle cx="56" cy="56" r="4" fill="#2d231e"/><circle cx="57" cy="55" r="1.5" fill="#ffffff"/><circle cx="84" cy="56" r="4" fill="#2d231e"/><circle cx="85" cy="55" r="1.5" fill="#ffffff"/>`;
      const mouth = isHappy
        ? `<path d="M 62 90 Q 70 102 78 90 Z" fill="#d81b60" ${TS}/>`
        : `<path d="M 64 88 Q 70 92 76 88" fill="none" ${TS}/>`;
      return wrap(
        shadow(70, 126, 42, 6) +
        // Floppy ears
        `<path d="M 38 34 C 24 30 24 54 36 50 Z" fill="#f8bbd0" ${S}/>` +
        `<path d="M 102 34 C 116 30 116 54 104 50 Z" fill="#f8bbd0" ${S}/>` +
        // Head
        `<circle cx="70" cy="68" r="38" fill="#f48fb1" ${S}/>` +
        // Curly tail on side
        `<path d="M 104 78 Q 116 70 114 62 Q 108 58 106 66" fill="none" stroke="#f06292" stroke-width="4" stroke-linecap="round"/>` +
        // Snout
        `<ellipse cx="70" cy="74" rx="16" ry="11" fill="#f06292" ${S}/>` +
        `<ellipse cx="64" cy="74" rx="2.5" ry="4" fill="#880e4f"/>` +
        `<ellipse cx="76" cy="74" rx="2.5" ry="4" fill="#880e4f"/>` +
        eyes +
        mouth +
        `<circle cx="46" cy="72" r="5" fill="#ff4081" opacity="0.6"/>` +
        `<circle cx="94" cy="72" r="5" fill="#ff4081" opacity="0.6"/>` +
        (isHappy ? heart(70, 20, 1.3) + sparkle(106, 26, 5) : '')
      );
    },

    cow(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 128, 44, 6) +
        // Horns
        `<path d="M 46 36 Q 40 22 34 26 Q 42 38 48 40 Z" fill="#fff9c4" ${S}/>` +
        `<path d="M 94 36 Q 100 22 106 26 Q 98 38 92 40 Z" fill="#fff9c4" ${S}/>` +
        // Ears
        `<path d="M 34 46 C 18 46 22 62 36 58 Z" fill="#f5f5f5" ${S}/>` +
        `<path d="M 106 46 C 122 46 118 62 104 58 Z" fill="#f5f5f5" ${S}/>` +
        // Head
        `<circle cx="70" cy="64" r="36" fill="#f5f5f5" ${S}/>` +
        // Black spots
        `<path d="M 44 40 C 38 52 50 62 56 50 Z" fill="#37474f"/>` +
        `<path d="M 88 44 C 98 48 96 66 84 62 Z" fill="#37474f"/>` +
        // Eyes
        `<circle cx="54" cy="56" r="4" fill="#2d231e"/><circle cx="55" cy="55" r="1.5" fill="#ffffff"/>` +
        `<circle cx="86" cy="56" r="4" fill="#2d231e"/><circle cx="87" cy="55" r="1.5" fill="#ffffff"/>` +
        // Pink muzzle
        `<ellipse cx="70" cy="80" rx="22" ry="14" fill="#f8bbd0" ${S}/>` +
        `<circle cx="62" cy="78" r="2.5" fill="#ad1457"/>` +
        `<circle cx="78" cy="78" r="2.5" fill="#ad1457"/>` +
        `<path d="M 64 85 Q 70 90 76 85" fill="none" ${TS}/>` +
        // Collar & Golden bell
        `<path d="M 50 94 Q 70 102 90 94" fill="none" stroke="#e53935" stroke-width="5" stroke-linecap="round"/>` +
        `<polygon points="66,98 74,98 76,108 64,108" fill="#ffd54f" ${TS}/>` +
        `<circle cx="70" cy="110" r="2.5" fill="#f57f17"/>` +
        (isHappy ? heart(70, 16, 1.2) + sparkle(108, 32, 6) : '')
      );
    },

    monkey(state) {
      const isHappy = !!state.happy;
      const mouth = isHappy
        ? `<path d="M 62 76 Q 70 88 78 76 Z" fill="#e53935" ${TS}/><path d="M 64 78 Q 70 84 76 78" fill="#ffffff"/>`
        : `<path d="M 63 76 Q 70 82 77 76" fill="none" ${TS}/>`;
      return wrap(
        shadow(70, 126, 40, 6) +
        // Tail
        `<path d="M 98 94 C 124 94 126 58 108 58 Q 98 58 106 68" fill="none" stroke="#8d6e63" stroke-width="6" stroke-linecap="round"/>` +
        // Ears
        `<circle cx="36" cy="62" r="14" fill="#8d6e63" ${S}/>` +
        `<circle cx="36" cy="62" r="8" fill="#ffe0b2"/>` +
        `<circle cx="104" cy="62" r="14" fill="#8d6e63" ${S}/>` +
        `<circle cx="104" cy="62" r="8" fill="#ffe0b2"/>` +
        // Head
        `<circle cx="70" cy="64" r="32" fill="#8d6e63" ${S}/>` +
        // Face mask
        `<path d="M 70 54 C 64 42 46 44 48 62 C 48 76 60 84 70 84 C 80 84 92 76 92 62 C 94 44 76 42 70 54 Z" fill="#ffe0b2" ${TS}/>` +
        // Eyes
        `<circle cx="60" cy="58" r="3.5" fill="#2d231e"/><circle cx="61" cy="57" r="1.2" fill="#ffffff"/>` +
        `<circle cx="80" cy="58" r="3.5" fill="#2d231e"/><circle cx="81" cy="57" r="1.2" fill="#ffffff"/>` +
        // Nose & Mouth
        `<ellipse cx="70" cy="68" rx="2.5" ry="1.5" fill="#8d6e63"/>` +
        mouth +
        // Banana held
        `<path d="M 38 96 C 46 84 62 84 74 94 C 64 98 48 98 38 96 Z" fill="#fdd835" ${TS}/>` +
        `<path d="M 74 94 L 78 96" stroke="#5d4037" stroke-width="2.5" stroke-linecap="round"/>` +
        (isHappy ? sparkle(30, 36, 6) + sparkle(110, 36, 6) : '')
      );
    },

    hippo(state) {
      const isHappy = !!state.happy;
      const mouth = isHappy
        ? `<path d="M 52 84 Q 70 108 88 84 Z" fill="#ec407a" ${TS}/><rect x="58" y="84" width="6" height="6" rx="1" fill="#ffffff" ${TS}/><rect x="76" y="84" width="6" height="6" rx="1" fill="#ffffff" ${TS}/>`
        : `<path d="M 56 86 Q 70 92 84 86" fill="none" ${TS}/><rect x="60" y="86" width="5" height="5" rx="1" fill="#ffffff" ${TS}/><rect x="75" y="86" width="5" height="5" rx="1" fill="#ffffff" ${TS}/>`;
      return wrap(
        shadow(70, 126, 44, 7) +
        // Ears
        `<circle cx="44" cy="38" r="7" fill="#9fa8da" ${S}/>` +
        `<circle cx="44" cy="38" r="3.5" fill="#f48fb1"/>` +
        `<circle cx="96" cy="38" r="7" fill="#9fa8da" ${S}/>` +
        `<circle cx="96" cy="38" r="3.5" fill="#f48fb1"/>` +
        // Head
        `<circle cx="70" cy="58" r="32" fill="#9fa8da" ${S}/>` +
        // Eyes
        `<circle cx="54" cy="50" r="3.5" fill="#2d231e"/><circle cx="55" cy="49" r="1.2" fill="#ffffff"/>` +
        `<circle cx="86" cy="50" r="3.5" fill="#2d231e"/><circle cx="87" cy="49" r="1.2" fill="#ffffff"/>` +
        // Giant snout
        `<ellipse cx="70" cy="80" rx="30" ry="20" fill="#7986cb" ${S}/>` +
        `<circle cx="60" cy="74" r="3.5" fill="#3949ab"/>` +
        `<circle cx="80" cy="74" r="3.5" fill="#3949ab"/>` +
        mouth +
        (isHappy ? heart(70, 18, 1.3) + sparkle(108, 30, 6) : '')
      );
    },

    parrot(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 36, 6) +
        // Wooden perch
        `<line x1="24" y1="112" x2="116" y2="112" stroke="#8d5b2e" stroke-width="6" stroke-linecap="round"/>` +
        // Tail feathers
        `<path d="M 64 96 L 60 126 L 68 124 Z" fill="#1e88e5" ${TS}/>` +
        `<path d="M 68 96 L 70 130 L 76 124 Z" fill="#ffd54f" ${TS}/>` +
        // Body
        `<ellipse cx="70" cy="74" rx="22" ry="30" fill="#e53935" ${S}/>` +
        // Yellow chest
        `<path d="M 58 66 C 58 84 82 84 82 66 Z" fill="#fdd835"/>` +
        // Blue wing
        `<path d="M 76 64 C 92 70 94 94 82 98 C 76 96 74 80 76 64 Z" fill="#1e88e5" ${S}/>` +
        // Head
        `<circle cx="64" cy="46" r="18" fill="#e53935" ${S}/>` +
        // Crest feathers
        `<path d="M 58 32 Q 54 20 62 22 Q 62 30 64 30" fill="#fdd835" ${TS}/>` +
        // Eye patch
        `<circle cx="58" cy="44" r="6" fill="#ffffff" ${TS}/>` +
        `<circle cx="58" cy="44" r="2.5" fill="#2d231e"/>` +
        // Beak
        `<path d="M 52 42 C 40 44 42 58 48 56 C 48 52 52 50 52 42 Z" fill="#fff9c4" ${S}/>` +
        // Claws
        `<path d="M 62 108 L 62 114 M 66 108 L 66 114 M 74 108 L 74 114 M 78 108 L 78 114" stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>` +
        (isHappy
          ? `<path d="M 38 32 Q 42 28 46 32 M 42 30 L 42 38" stroke="#1e88e5" stroke-width="2" stroke-linecap="round"/>` +
            `<path d="M 28 42 Q 32 38 36 42 M 32 40 L 32 48" stroke="#e53935" stroke-width="2" stroke-linecap="round"/>` +
            sparkle(100, 36, 6)
          : '')
      );
    },

    fox(state) {
      const isHappy = !!state.happy;
      const eyes = isHappy
        ? `<path d="M 50 58 Q 56 52 62 58" fill="none" ${TS}/><path d="M 78 58 Q 84 52 90 58" fill="none" ${TS}/>`
        : `<circle cx="56" cy="58" r="3.5" fill="#2d231e"/><circle cx="57" cy="57" r="1.2" fill="#ffffff"/><circle cx="84" cy="58" r="3.5" fill="#2d231e"/><circle cx="85" cy="57" r="1.2" fill="#ffffff"/>`;
      const mouth = isHappy
        ? `<path d="M 64 78 Q 70 86 76 78 Z" fill="#d81b60" ${TS}/>`
        : `<path d="M 65 76 Q 70 80 75 76" fill="none" ${TS}/>`;
      return wrap(
        shadow(70, 126, 44, 6) +
        // Bushy tail with white tip
        `<path d="M 88 88 C 122 88 128 54 110 50 C 96 52 94 70 88 88 Z" fill="#f4511e" ${S}/>` +
        `<path d="M 116 56 C 124 54 122 68 112 68 Z" fill="#ffffff" ${TS}/>` +
        // Ears
        `<polygon points="40,50 48,22 62,44" fill="#f4511e" ${S}/>` +
        `<polygon points="46,42 49,28 56,38" fill="#ffffff"/>` +
        `<polygon points="100,50 92,22 78,44" fill="#f4511e" ${S}/>` +
        `<polygon points="94,42 91,28 84,38" fill="#ffffff"/>` +
        // Head
        `<polygon points="34,54 70,88 106,54 70,42" fill="#f4511e" ${S}/>` +
        // White cheeks
        `<polygon points="36,56 70,88 56,66" fill="#ffffff"/>` +
        `<polygon points="104,56 70,88 84,66" fill="#ffffff"/>` +
        // Nose & mouth
        `<circle cx="70" cy="74" r="3" fill="#2d231e"/>` +
        mouth +
        eyes +
        (isHappy ? heart(70, 20, 1.2) + sparkle(32, 38, 5) : '')
      );
    },

    bear(state) {
      const isHappy = !!state.happy;
      const mouth = isHappy
        ? `<path d="M 64 80 Q 70 90 76 80 Z" fill="#d81b60" ${TS}/>`
        : `<path d="M 64 78 Q 70 82 76 78" fill="none" ${TS}/>`;
      return wrap(
        shadow(70, 126, 42, 6) +
        // Round ears
        `<circle cx="44" cy="40" r="12" fill="#795548" ${S}/>` +
        `<circle cx="44" cy="40" r="6" fill="#d7ccc8"/>` +
        `<circle cx="96" cy="40" r="12" fill="#795548" ${S}/>` +
        `<circle cx="96" cy="40" r="6" fill="#d7ccc8"/>` +
        // Head
        `<circle cx="70" cy="64" r="34" fill="#795548" ${S}/>` +
        // Snout
        `<ellipse cx="70" cy="74" rx="16" ry="12" fill="#d7ccc8" ${TS}/>` +
        `<ellipse cx="70" cy="69" rx="5" ry="3.5" fill="#2d231e"/>` +
        mouth +
        // Eyes
        `<circle cx="56" cy="56" r="3.5" fill="#2d231e"/><circle cx="57" cy="55" r="1.2" fill="#ffffff"/>` +
        `<circle cx="84" cy="56" r="3.5" fill="#2d231e"/><circle cx="85" cy="55" r="1.2" fill="#ffffff"/>` +
        // Honey pot in paws
        `<path d="M 54 94 L 56 114 L 84 114 L 86 94 Z" fill="#fbc02d" ${TS}/>` +
        `<ellipse cx="70" cy="94" rx="16" ry="4" fill="#ffd54f" ${TS}/>` +
        `<path d="M 64 96 Q 66 104 68 96" fill="#ffd54f"/>` +
        (isHappy ? sparkle(104, 30, 6) + heart(70, 18, 1.2) : '')
      );
    },

    brown_bear(state) {
      return TARGETS.bear(state);
    },

    owl(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 40, 6) +
        // Branch
        `<line x1="22" y1="110" x2="118" y2="110" stroke="#8d5b2e" stroke-width="6" stroke-linecap="round"/>` +
        `<path d="M 32 108 Q 38 100 44 108" fill="#81c784" ${TS}/>` +
        // Body
        `<ellipse cx="70" cy="68" rx="30" ry="36" fill="#8d6e63" ${S}/>` +
        // Cream belly with chevrons
        `<ellipse cx="70" cy="78" rx="18" ry="22" fill="#ffecb3"/>` +
        `<path d="M 64 72 L 70 76 L 76 72 M 64 82 L 70 86 L 76 82" stroke="#8d6e63" stroke-width="2" stroke-linecap="round"/>` +
        // Ear tufts
        `<polygon points="46,38 42,20 54,30" fill="#8d6e63" ${S}/>` +
        `<polygon points="94,38 98,20 86,30" fill="#8d6e63" ${S}/>` +
        // Big round eye rings
        `<circle cx="56" cy="52" r="12" fill="#ffd54f" ${S}/>` +
        `<circle cx="56" cy="52" r="5" fill="#2d231e"/><circle cx="58" cy="50" r="1.5" fill="#ffffff"/>` +
        `<circle cx="84" cy="52" r="12" fill="#ffd54f" ${S}/>` +
        `<circle cx="84" cy="52" r="5" fill="#2d231e"/><circle cx="86" cy="50" r="1.5" fill="#ffffff"/>` +
        // Beak
        `<polygon points="70,54 66,66 74,66" fill="#ff9800" ${TS}/>` +
        // Claws
        `<circle cx="62" cy="110" r="3" fill="#ff9800"/>` +
        `<circle cx="66" cy="110" r="3" fill="#ff9800"/>` +
        `<circle cx="74" cy="110" r="3" fill="#ff9800"/>` +
        `<circle cx="78" cy="110" r="3" fill="#ff9800"/>` +
        (isHappy ? sparkle(106, 32, 6) + sparkle(34, 34, 5) : '')
      );
    },

    spotted_dog(state) {
      const isHappy = !!state.happy;
      const tongue = isHappy
        ? `<path d="M 68 84 Q 70 96 76 94 Q 78 88 74 84 Z" fill="#ff4081" ${TS}/>`
        : `<path d="M 64 82 Q 70 86 76 82" fill="none" ${TS}/>`;
      return wrap(
        shadow(70, 126, 42, 6) +
        // Wagging tail
        `<path d="M 104 84 Q 118 76 116 66" fill="none" stroke="#795548" stroke-width="5" stroke-linecap="round"/>` +
        // Floppy ears
        `<path d="M 40 44 C 26 44 26 76 38 72 Z" fill="#795548" ${S}/>` +
        `<path d="M 100 44 C 114 44 114 76 102 72 Z" fill="#795548" ${S}/>` +
        // Head
        `<circle cx="70" cy="64" r="32" fill="#ffffff" ${S}/>` +
        // Spot over left eye
        `<path d="M 52 46 C 44 54 46 68 58 68 C 64 64 64 50 52 46 Z" fill="#795548"/>` +
        // Eyes
        `<circle cx="56" cy="58" r="3.5" fill="#2d231e"/><circle cx="57" cy="57" r="1.2" fill="#ffffff"/>` +
        `<circle cx="84" cy="58" r="3.5" fill="#2d231e"/><circle cx="85" cy="57" r="1.2" fill="#ffffff"/>` +
        // Nose & mouth
        `<ellipse cx="70" cy="72" rx="5" ry="4" fill="#2d231e"/>` +
        `<path d="M 70 76 L 70 82" stroke="#2d231e" stroke-width="2"/>` +
        tongue +
        // Collar & tag
        `<path d="M 52 94 Q 70 100 88 94" fill="none" stroke="#e53935" stroke-width="5" stroke-linecap="round"/>` +
        `<circle cx="70" cy="100" r="3.5" fill="#ffd54f" ${TS}/>` +
        (isHappy ? heart(70, 20, 1.2) + sparkle(106, 32, 5) : '')
      );
    },

    white_cat(state) {
      const isHappy = !!state.happy;
      const eyes = isHappy
        ? `<path d="M 50 56 Q 56 50 62 56" fill="none" ${TS}/><path d="M 78 56 Q 84 50 90 56" fill="none" ${TS}/>`
        : `<ellipse cx="56" cy="56" rx="3.5" ry="4.5" fill="#26a69a"/><circle cx="56" cy="56" r="2.5" fill="#2d231e"/><circle cx="57" cy="55" r="1" fill="#ffffff"/><ellipse cx="84" cy="56" rx="3.5" ry="4.5" fill="#26a69a"/><circle cx="84" cy="56" r="2.5" fill="#2d231e"/><circle cx="85" cy="55" r="1.5" fill="#ffffff"/>`;
      const mouth = isHappy
        ? `<path d="M 64 74 Q 70 82 76 74 Z" fill="#f48fb1" ${TS}/>`
        : `<path d="M 64 72 Q 70 76 76 72" fill="none" ${TS}/>`;
      return wrap(
        shadow(70, 126, 40, 6) +
        // Curled tail
        `<path d="M 98 94 C 118 94 122 70 112 68 Q 106 68 108 76" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>` +
        // Pointed ears
        `<polygon points="40,50 42,24 60,42" fill="#ffffff" ${S}/>` +
        `<polygon points="45,44 46,30 55,40" fill="#f8bbd0"/>` +
        `<polygon points="100,50 98,24 80,42" fill="#ffffff" ${S}/>` +
        `<polygon points="95,44 94,30 85,40" fill="#f8bbd0"/>` +
        // Head
        `<circle cx="70" cy="62" r="32" fill="#ffffff" ${S}/>` +
        // Whiskers
        `<line x1="38" y1="66" x2="22" y2="64" stroke="#2d231e" stroke-width="1.8"/>` +
        `<line x1="38" y1="72" x2="22" y2="74" stroke="#2d231e" stroke-width="1.8"/>` +
        `<line x1="102" y1="66" x2="118" y2="64" stroke="#2d231e" stroke-width="1.8"/>` +
        `<line x1="102" y1="72" x2="118" y2="74" stroke="#2d231e" stroke-width="1.8"/>` +
        eyes +
        // Pink nose & mouth
        `<polygon points="68,66 72,66 70,69" fill="#f48fb1" ${TS}/>` +
        mouth +
        // Collar & bell
        `<path d="M 52 92 Q 70 98 88 92" fill="none" stroke="#00acc1" stroke-width="4" stroke-linecap="round"/>` +
        `<circle cx="70" cy="98" r="3.5" fill="#ffd54f" ${TS}/>` +
        (isHappy ? heart(70, 18, 1.2, '#f06292') + sparkle(106, 28, 5) : '')
      );
    },

    fluffy_bunny(state) {
      const isHappy = !!state.happy;
      const mouth = isHappy
        ? `<path d="M 64 78 Q 70 86 76 78 Z" fill="#d81b60" ${TS}/><rect x="67" y="78" width="6" height="5" rx="1" fill="#ffffff" ${TS}/>`
        : `<path d="M 65 76 Q 70 80 75 76" fill="none" ${TS}/><rect x="68" y="76" width="4" height="4" rx="1" fill="#ffffff" ${TS}/>`;
      return wrap(
        shadow(70, 126, 38, 6) +
        // Long tall ears
        `<path d="M 52 50 C 44 14 60 10 64 50 Z" fill="#e0e0e0" ${S}/>` +
        `<path d="M 54 44 C 48 20 58 18 62 44 Z" fill="#f8bbd0"/>` +
        `<path d="M 88 50 C 96 14 80 10 76 50 Z" fill="#e0e0e0" ${S}/>` +
        `<path d="M 86 44 C 92 20 82 18 78 44 Z" fill="#f8bbd0"/>` +
        // Head
        `<circle cx="70" cy="68" r="30" fill="#e0e0e0" ${S}/>` +
        // Whiskers
        `<line x1="42" y1="72" x2="28" y2="70" stroke="#2d231e" stroke-width="1.8"/>` +
        `<line x1="42" y1="76" x2="28" y2="78" stroke="#2d231e" stroke-width="1.8"/>` +
        `<line x1="98" y1="72" x2="112" y2="70" stroke="#2d231e" stroke-width="1.8"/>` +
        `<line x1="98" y1="76" x2="112" y2="78" stroke="#2d231e" stroke-width="1.8"/>` +
        // Eyes
        `<circle cx="56" cy="64" r="3.5" fill="#2d231e"/><circle cx="57" cy="63" r="1.2" fill="#ffffff"/>` +
        `<circle cx="84" cy="64" r="3.5" fill="#2d231e"/><circle cx="85" cy="63" r="1.2" fill="#ffffff"/>` +
        // Pink nose & buck teeth
        `<polygon points="68,72 72,72 70,75" fill="#f48fb1" ${TS}/>` +
        mouth +
        // Carrot
        `<path d="M 40 98 L 56 86 L 60 92 Z" fill="#ff9800" ${TS}/>` +
        `<path d="M 38 100 L 32 104" stroke="#43a047" stroke-width="2.5" stroke-linecap="round"/>` +
        (isHappy ? heart(70, 18, 1.2) + sparkle(104, 30, 5) : '')
      );
    },

    // ==========================================
    // MONSTERS
    // ==========================================
    green_monster(state) {
      const isHappy = !!state.happy;
      const mouth = isHappy
        ? `<path d="M 52 82 Q 70 104 88 82 Z" fill="#2e7d32" ${S}/><polygon points="60,82 64,88 68,82" fill="#ffffff"/><polygon points="72,82 76,88 80,82" fill="#ffffff"/>`
        : `<path d="M 56 86 Q 70 94 84 86" fill="none" ${S}/>`;
      return wrap(
        shadow(70, 126, 40, 6) +
        // Tiny horns
        `<path d="M 46 40 Q 40 24 34 30 Q 42 42 48 44 Z" fill="#ff9800" ${S}/>` +
        `<path d="M 94 40 Q 100 24 106 30 Q 98 42 92 44 Z" fill="#ff9800" ${S}/>` +
        // Fuzzy pear body
        `<path d="M 44 48 C 36 78 34 116 70 116 C 106 116 104 78 96 48 C 84 38 56 38 44 48 Z" fill="#7cb342" ${S}/>` +
        // 1 giant centered eye
        `<circle cx="70" cy="58" r="16" fill="#ffffff" ${S}/>` +
        `<circle cx="70" cy="58" r="8" fill="#8e24aa"/>` +
        `<circle cx="70" cy="58" r="4" fill="#2d231e"/>` +
        `<circle cx="72" cy="56" r="2" fill="#ffffff"/>` +
        mouth +
        (isHappy ? sparkle(30, 40, 6) + sparkle(110, 42, 6) : '')
      );
    },

    purple_monster(state) {
      const isHappy = !!state.happy;
      const mouth = isHappy
        ? `<path d="M 54 82 Q 70 102 86 82 Z" fill="#4a148c" ${S}/><path d="M 60 86 Q 70 92 80 86" fill="#ec407a"/>`
        : `<path d="M 58 84 Q 70 90 82 84" fill="none" ${S}/>`;
      return wrap(
        shadow(70, 126, 42, 6) +
        // Eye stalks
        `<path d="M 54 52 L 48 30" stroke="#ab47bc" stroke-width="6" stroke-linecap="round"/>` +
        `<circle cx="48" cy="28" r="10" fill="#ffffff" ${S}/>` +
        `<circle cx="48" cy="28" r="4.5" fill="#0288d1"/><circle cx="50" cy="26" r="1.5" fill="#ffffff"/>` +
        `<path d="M 86 52 L 92 30" stroke="#ab47bc" stroke-width="6" stroke-linecap="round"/>` +
        `<circle cx="92" cy="28" r="10" fill="#ffffff" ${S}/>` +
        `<circle cx="92" cy="28" r="4.5" fill="#0288d1"/><circle cx="94" cy="26" r="1.5" fill="#ffffff"/>` +
        // Round body
        `<circle cx="70" cy="78" r="38" fill="#ab47bc" ${S}/>` +
        // Polka dots
        `<circle cx="50" cy="68" r="5" fill="#ce93d8"/>` +
        `<circle cx="90" cy="72" r="6" fill="#ec407a"/>` +
        `<circle cx="68" cy="104" r="5" fill="#ce93d8"/>` +
        // Stubby arms
        `<path d="M 34 82 Q 22 84 26 92" fill="none" stroke="#ab47bc" stroke-width="6" stroke-linecap="round"/>` +
        `<path d="M 106 82 Q 118 84 114 92" fill="none" stroke="#ab47bc" stroke-width="6" stroke-linecap="round"/>` +
        mouth +
        (isHappy ? heart(70, 20, 1.3) + sparkle(108, 48, 5) : '')
      );
    },

    orange_monster(state) {
      const isHappy = !!state.happy;
      const mouth = isHappy
        ? `<path d="M 52 82 Q 70 106 88 82 Z" fill="#bf360c" ${S}/><path d="M 66 88 Q 70 100 76 96 Q 78 90 74 86" fill="#ff4081" ${TS}/>`
        : `<path d="M 54 82 Q 70 94 86 82" fill="none" ${S}/>`;
      return wrap(
        shadow(70, 126, 42, 6) +
        // Striped horns
        `<path d="M 46 42 Q 36 24 30 30 Q 38 46 46 48 Z" fill="#ffd54f" ${S}/>` +
        `<path d="M 94 42 Q 104 24 110 30 Q 102 46 94 48 Z" fill="#ffd54f" ${S}/>` +
        // Shaggy fuzzy body
        `<path d="M 40 54 Q 30 76 38 98 Q 50 118 70 116 Q 90 118 102 98 Q 110 76 100 54 Q 86 42 70 44 Q 54 42 40 54 Z" fill="#fb8c00" ${S}/>` +
        // Goofy eyes
        `<circle cx="56" cy="62" r="9" fill="#ffffff" ${S}/>` +
        `<circle cx="58" cy="63" r="4" fill="#2d231e"/><circle cx="59" cy="62" r="1.5" fill="#ffffff"/>` +
        `<circle cx="84" cy="60" r="11" fill="#ffffff" ${S}/>` +
        `<circle cx="83" cy="61" r="5" fill="#2d231e"/><circle cx="85" cy="59" r="1.8" fill="#ffffff"/>` +
        mouth +
        (isHappy ? sparkle(30, 36, 6) + sparkle(110, 36, 6) : '')
      );
    },

    // ==========================================
    // CONTAINERS & HIDING SPOTS
    // ==========================================
    jar_blue(state) {
      return TARGETS._jar(state, '#42a5f5', '#90caf9');
    },

    jar_green(state) {
      return TARGETS._jar(state, '#66bb6a', '#a5d6a7');
    },

    jar_yellow(state) {
      return TARGETS._jar(state, '#fdd835', '#fff59d');
    },

    _jar(state, bodyColor, neckColor) {
      const isOpen = !!state.open;
      const lidAndKey = isOpen
        ? // Popped off cork + golden sparkle burst
          `<g transform="translate(106,36) rotate(32)">` +
            `<rect x="-14" y="-8" width="28" height="16" rx="4" fill="#bcaaa4" ${S}/>` +
          `</g>` +
          `<path d="M 88 44 Q 94 38 100 42" stroke="#cfd8dc" stroke-width="2" stroke-linecap="round" stroke-dasharray="2,2"/>` +
          sparkle(70, 30, 8, '#ffd54f') + sparkle(52, 42, 6, '#ffd54f') + sparkle(88, 42, 6, '#ffd54f')
        : // Cork stopper firmly on top + glowing golden key silhouette inside
          `<rect x="54" y="24" width="32" height="14" rx="3" fill="#bcaaa4" ${S}/>` +
          `<circle cx="70" cy="74" r="18" fill="#fff59d" opacity="0.4"/>` +
          keySvg(70, 72, '#ffd54f', -15, 1.1);

      return wrap(
        shadow(70, 126, 38, 6) +
        // Glass jar body
        `<path d="M 48 38 L 92 38 L 96 52 C 108 64 108 104 98 118 L 42 118 C 32 104 32 64 44 52 Z" fill="${bodyColor}" opacity="0.8" ${S}/>` +
        // Neck rim
        `<rect x="46" y="36" width="48" height="8" rx="3" fill="${neckColor}" ${S}/>` +
        // Glass shine streaks
        `<path d="M 46 64 C 42 80 44 102 48 112" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity="0.7"/>` +
        `<path d="M 54 60 C 52 70 52 82 54 90" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.6"/>` +
        lidAndKey
      );
    },

    star_box(state) {
      return TARGETS._magicBox(state, '#1a237e', '#ffd54f', 'star');
    },

    moon_box(state) {
      return TARGETS._magicBox(state, '#4a148c', '#fff176', 'moon');
    },

    sun_box(state) {
      return TARGETS._magicBox(state, '#c62828', '#ffb300', 'sun');
    },

    _magicBox(state, woodColor, emblemColor, type) {
      const isOpen = !!state.open;
      let emblemSvg = '';
      if (type === 'star') {
        emblemSvg = `<path d="M 70 78 L 73 86 L 82 86 L 75 91 L 78 99 L 70 94 L 62 99 L 65 91 L 58 86 L 67 86 Z" fill="${emblemColor}" ${TS}/>`;
      } else if (type === 'moon') {
        emblemSvg = `<path d="M 68 76 A 12 12 0 1 0 78 98 A 9 9 0 1 1 68 76 Z" fill="${emblemColor}" ${TS}/>`;
      } else {
        emblemSvg = `<circle cx="70" cy="88" r="9" fill="${emblemColor}" ${TS}/><path d="M 70 74 L 70 77 M 70 99 L 70 102 M 56 88 L 59 88 M 81 88 L 84 88 M 60 78 L 62 80 M 78 96 L 80 98 M 60 98 L 62 96 M 78 80 L 80 78" stroke="${emblemColor}" stroke-width="2.5" stroke-linecap="round"/>`;
      }

      const lid = isOpen
        ? `<polygon points="22,64 22,20 118,20 118,64" fill="${woodColor}" ${S}/>` +
          `<ellipse cx="70" cy="64" rx="44" ry="12" fill="#fff9c4"/>` +
          sparkle(70, 30, 9, emblemColor) + sparkle(44, 40, 6, emblemColor) + sparkle(96, 40, 6, emblemColor)
        : `<polygon points="20,64 120,64 124,46 16,46" fill="${woodColor}" ${S}/>` +
          `<rect x="64" y="62" width="12" height="12" rx="2" fill="#d4af37" ${TS}/>`;

      return wrap(
        shadow(70, 126, 46, 7) +
        // Box body
        `<rect x="24" y="64" width="92" height="54" rx="6" fill="${woodColor}" ${S}/>` +
        // Brass corner brackets
        `<path d="M 24 78 L 36 78 L 36 64" fill="none" stroke="#d4af37" stroke-width="4"/>` +
        `<path d="M 116 78 L 104 78 L 104 64" fill="none" stroke="#d4af37" stroke-width="4"/>` +
        emblemSvg +
        lid
      );
    },

    palm_tree(state) {
      const isOpen = !!state.open;
      const shovel = isOpen
        ? sparkle(82, 114, 5) + `<circle cx="86" cy="116" r="3" fill="#ffab91"/>`
        : shovelSvg(82, 112, 35, 0.9);
      return wrap(
        shadow(70, 126, 44, 7) +
        // Sand mound
        `<ellipse cx="70" cy="118" rx="42" ry="12" fill="#f6d7b0" ${S}/>` +
        shovel +
        // Curved palm trunk
        `<path d="M 68 116 Q 60 76 74 44" fill="none" stroke="#8d5b2e" stroke-width="12" stroke-linecap="round"/>` +
        `<path d="M 68 116 Q 60 76 74 44" fill="none" stroke="#6d4c41" stroke-width="3" stroke-dasharray="4,8"/>` +
        // Coconuts
        `<circle cx="70" cy="44" r="5" fill="#5d4037"/>` +
        `<circle cx="78" cy="46" r="5" fill="#5d4037"/>` +
        // Palm fronds
        `<path d="M 74 44 Q 50 18 24 34 Q 46 36 74 44 Z" fill="#43a047" ${S}/>` +
        `<path d="M 74 44 Q 70 12 76 8 Q 80 24 74 44 Z" fill="#388e3c" ${S}/>` +
        `<path d="M 74 44 Q 104 16 122 36 Q 98 38 74 44 Z" fill="#43a047" ${S}/>` +
        `<path d="M 74 44 Q 110 52 118 70 Q 94 62 74 44 Z" fill="#2e7d32" ${S}/>` +
        `<path d="M 74 44 Q 38 52 30 70 Q 54 62 74 44 Z" fill="#2e7d32" ${S}/>`
      );
    },

    big_rock(state) {
      const isOpen = !!state.open;
      const shovel = isOpen
        ? sparkle(96, 110, 6)
        : shovelSvg(98, 106, 25, 0.9);
      return wrap(
        shadow(70, 126, 46, 7) +
        shovel +
        // Big granite rock
        `<path d="M 32 116 C 18 90 32 50 56 46 C 76 42 104 46 112 72 C 118 96 110 116 32 116 Z" fill="#90a4ae" ${S}/>` +
        // Highlight & moss patches
        `<path d="M 52 50 C 70 48 94 54 98 70" fill="none" stroke="#cfd8dc" stroke-width="4" stroke-linecap="round"/>` +
        `<ellipse cx="46" cy="80" rx="10" ry="6" fill="#81c784"/>` +
        `<ellipse cx="88" cy="92" rx="12" ry="7" fill="#81c784"/>` +
        // Flowers at base
        `<circle cx="28" cy="116" r="3" fill="#ff4081"/>` +
        `<circle cx="114" cy="116" r="3" fill="#ffd54f"/>`
      );
    },

    red_umbrella(state) {
      const isOpen = !!state.open;
      const shovel = isOpen
        ? `<circle cx="86" cy="116" r="3" fill="#ff7043"/>` + sparkle(86, 112, 5)
        : shovelSvg(86, 110, 30, 0.9);
      return wrap(
        shadow(70, 126, 44, 7) +
        // Sand mound
        `<ellipse cx="70" cy="118" rx="42" ry="12" fill="#f6d7b0" ${S}/>` +
        shovel +
        // Umbrella pole
        `<line x1="70" y1="118" x2="64" y2="44" stroke="#8d5b2e" stroke-width="5" stroke-linecap="round"/>` +
        // Umbrella canopy (red & white wedges)
        `<path d="M 22 54 C 28 22 98 22 106 54 Z" fill="#e53935" ${S}/>` +
        `<path d="M 44 54 C 48 30 80 30 84 54 Z" fill="#ffffff" ${TS}/>` +
        // Finial top
        `<circle cx="64" cy="24" r="3" fill="#ffffff" ${TS}/>`
      );
    },

    royal_pillow(state) {
      const isOpen = !!state.open;
      const key = isOpen
        ? sparkle(96, 78, 6, '#ffd54f')
        : keySvg(98, 76, '#ffd54f', 40, 1.1);
      return wrap(
        shadow(70, 124, 46, 7) +
        key +
        // Purple cushion
        `<rect x="26" y="60" width="88" height="52" rx="16" fill="#7b1fa2" ${S}/>` +
        // Gold corner tassels
        `<circle cx="26" cy="62" r="4" fill="#ffd54f"/>` +
        `<circle cx="114" cy="62" r="4" fill="#ffd54f"/>` +
        `<circle cx="26" cy="110" r="4" fill="#ffd54f"/>` +
        `<circle cx="114" cy="110" r="4" fill="#ffd54f"/>` +
        // Tufting button
        `<circle cx="70" cy="86" r="4.5" fill="#ffd54f" ${TS}/>` +
        `<path d="M 52 86 Q 70 82 88 86 M 70 70 Q 70 86 70 102" fill="none" stroke="#ba68c8" stroke-width="2" stroke-linecap="round"/>`
      );
    },

    gold_crown_stand(state) {
      const isOpen = !!state.open;
      const key = isOpen
        ? sparkle(70, 108, 6)
        : keySvg(70, 108, '#ffd54f', 0, 1.0);
      return wrap(
        shadow(70, 126, 36, 6) +
        // Pedestal
        `<rect x="44" y="78" width="52" height="42" rx="4" fill="#8d5b2e" ${S}/>` +
        `<ellipse cx="70" cy="78" rx="30" ry="10" fill="#c2185b" ${S}/>` +
        key +
        // Gold crown
        `<path d="M 46 64 L 50 42 L 60 52 L 70 38 L 80 52 L 90 42 L 94 64 Z" fill="#ffd54f" ${S}/>` +
        // Gems on crown
        `<circle cx="50" cy="42" r="2.5" fill="#e53935"/>` +
        `<circle cx="70" cy="38" r="3" fill="#1e88e5"/>` +
        `<circle cx="90" cy="42" r="2.5" fill="#43a047"/>` +
        `<circle cx="70" cy="60" r="2.5" fill="#e53935"/>`
      );
    },

    red_shield(state) {
      const isOpen = !!state.open;
      const key = isOpen
        ? sparkle(102, 68, 6)
        : keySvg(104, 68, '#ffd54f', 35, 1.1);
      return wrap(
        shadow(70, 126, 38, 6) +
        key +
        // Heater shield
        `<path d="M 36 34 L 104 34 C 104 76 88 106 70 118 C 52 106 36 76 36 34 Z" fill="#d32f2f" ${S}/>` +
        // Steel border
        `<path d="M 44 42 L 96 42 C 96 74 84 98 70 108 C 56 98 44 74 44 42 Z" fill="#b71c1c"/>` +
        // Golden lion / cross emblem
        `<path d="M 70 48 L 70 88 M 54 62 L 86 62" stroke="#ffd54f" stroke-width="6" stroke-linecap="round"/>` +
        `<circle cx="70" cy="62" r="4" fill="#ffffff"/>`
      );
    },

    // ==========================================
    // DOORS & LOCKS
    // ==========================================
    door_red(state) {
      return TARGETS._door(state, '#e53935');
    },

    door_purple(state) {
      return TARGETS._door(state, '#8e24aa');
    },

    door_orange(state) {
      return TARGETS._door(state, '#fb8c00');
    },

    _door(state, doorColor) {
      const isOpen = !!state.open;
      if (isOpen) {
        return wrap(
          shadow(70, 128, 48, 7) +
          // Arched doorway opening to sunny portal
          `<path d="M 34 124 L 34 54 C 34 30 106 30 106 54 L 106 124 Z" fill="#fff9c4" ${S}/>` +
          // Sunny light rays and confetti
          `<circle cx="70" cy="74" r="32" fill="#ffee58" opacity="0.4"/>` +
          sparkle(70, 46, 7, '#ffd54f') +
          sparkle(52, 68, 5, '#ff4081') +
          sparkle(86, 72, 6, '#00e5ff') +
          `<circle cx="60" cy="94" r="3" fill="#76ff03"/>` +
          `<circle cx="80" cy="98" r="3" fill="#ff4081"/>` +
          // Door swung open to the left
          `<polygon points="34,124 16,114 16,46 34,54" fill="${doorColor}" ${S}/>` +
          // Stone arch frame
          `<path d="M 28 126 L 28 50 C 28 22 112 22 112 50 L 112 126" fill="none" stroke="#5d4037" stroke-width="8" stroke-linecap="round"/>`
        );
      }
      return wrap(
        shadow(70, 128, 46, 7) +
        // Stone arch frame
        `<path d="M 28 126 L 28 50 C 28 22 112 22 112 50 L 112 126" fill="none" stroke="#5d4037" stroke-width="8" stroke-linecap="round"/>` +
        // Closed door
        `<path d="M 34 124 L 34 54 C 34 30 106 30 106 54 L 106 124 Z" fill="${doorColor}" ${S}/>` +
        // Wood planks
        `<line x1="58" y1="36" x2="58" y2="124" stroke="#2d231e" stroke-width="2"/>` +
        `<line x1="82" y1="36" x2="82" y2="124" stroke="#2d231e" stroke-width="2"/>` +
        // Black iron hinges
        `<rect x="34" y="60" width="16" height="6" rx="2" fill="#37474f"/>` +
        `<rect x="34" y="100" width="16" height="6" rx="2" fill="#37474f"/>` +
        // Brass knob & keyhole
        `<circle cx="94" cy="84" r="5" fill="#ffd54f" ${TS}/>` +
        `<path d="M 94 92 C 92 92 92 94 93 95 L 92 98 L 96 98 L 95 95 C 96 94 96 92 94 92 Z" fill="#2d231e"/>`
      );
    },

    treasure_chest(state) {
      const isOpen = !!state.open;
      if (isOpen) {
        return wrap(
          shadow(70, 126, 48, 7) +
          // Lid thrown back
          `<polygon points="22,58 24,18 116,18 118,58" fill="#6d4c41" ${S}/>` +
          // Golden light glow
          `<ellipse cx="70" cy="62" rx="46" ry="16" fill="#fff59d"/>` +
          // Brimming coins and jewels
          `<circle cx="56" cy="62" r="6" fill="#ffd54f" ${TS}/>` +
          `<circle cx="68" cy="58" r="7" fill="#fdd835" ${TS}/>` +
          `<circle cx="82" cy="62" r="6" fill="#ffd54f" ${TS}/>` +
          `<circle cx="62" cy="68" r="5" fill="#fbc02d" ${TS}/>` +
          `<circle cx="76" cy="68" r="5" fill="#ffd54f" ${TS}/>` +
          // Rubies and emeralds
          `<polygon points="50,56 54,50 46,50" fill="#e53935" ${TS}/>` +
          `<polygon points="90,56 94,50 86,50" fill="#00e676" ${TS}/>` +
          // Chest base
          `<rect x="24" y="64" width="92" height="52" rx="6" fill="#8d5b2e" ${S}/>` +
          `<rect x="42" y="64" width="8" height="52" fill="#d4af37" ${TS}/>` +
          `<rect x="90" y="64" width="8" height="52" fill="#d4af37" ${TS}/>` +
          sparkle(70, 32, 9, '#ffd54f') + sparkle(40, 38, 6, '#ffd54f') + sparkle(100, 38, 6, '#ffd54f')
        );
      }
      return wrap(
        shadow(70, 126, 46, 7) +
        // Chest body
        `<rect x="24" y="64" width="92" height="52" rx="6" fill="#8d5b2e" ${S}/>` +
        // Curved lid
        `<path d="M 22 64 C 22 42 118 42 118 64 Z" fill="#6d4c41" ${S}/>` +
        // Brass bands
        `<path d="M 42 46 C 42 46 42 116 42 116" stroke="#d4af37" stroke-width="6"/>` +
        `<path d="M 98 46 C 98 46 98 116 98 116" stroke="#d4af37" stroke-width="6"/>` +
        // Padlock
        `<rect x="64" y="66" width="12" height="12" rx="2" fill="#ffd54f" ${TS}/>` +
        `<path d="M 66 66 L 66 60 C 66 56 74 56 74 60 L 74 66" fill="none" stroke="#2d231e" stroke-width="2.5"/>`
      );
    },

    castle_gate(state) {
      const isOpen = !!state.open;
      const gateLattice = isOpen
        ? // Portcullis raised high
          `<g transform="translate(0,-42)">` +
            `<line x1="44" y1="54" x2="44" y2="120" stroke="#37474f" stroke-width="4"/>` +
            `<line x1="56" y1="54" x2="56" y2="120" stroke="#37474f" stroke-width="4"/>` +
            `<line x1="70" y1="54" x2="70" y2="120" stroke="#37474f" stroke-width="4"/>` +
            `<line x1="84" y1="54" x2="84" y2="120" stroke="#37474f" stroke-width="4"/>` +
            `<line x1="96" y1="54" x2="96" y2="120" stroke="#37474f" stroke-width="4"/>` +
            `<line x1="38" y1="74" x2="102" y2="74" stroke="#37474f" stroke-width="4"/>` +
            `<line x1="38" y1="98" x2="102" y2="98" stroke="#37474f" stroke-width="4"/>` +
          `</g>` +
          // Inner sunny courtyard
          `<ellipse cx="70" cy="116" rx="30" ry="8" fill="#81c784"/>` +
          sparkle(70, 68, 8, '#ffd54f')
        : // Portcullis lowered
          `<line x1="44" y1="54" x2="44" y2="122" stroke="#37474f" stroke-width="4"/>` +
          `<line x1="56" y1="54" x2="56" y2="122" stroke="#37474f" stroke-width="4"/>` +
          `<line x1="70" y1="54" x2="70" y2="122" stroke="#37474f" stroke-width="4"/>` +
          `<line x1="84" y1="54" x2="84" y2="122" stroke="#37474f" stroke-width="4"/>` +
          `<line x1="96" y1="54" x2="96" y2="122" stroke="#37474f" stroke-width="4"/>` +
          `<line x1="38" y1="74" x2="102" y2="74" stroke="#37474f" stroke-width="4"/>` +
          `<line x1="38" y1="98" x2="102" y2="98" stroke="#37474f" stroke-width="4"/>` +
          `<rect x="64" y="80" width="12" height="12" rx="2" fill="#ffd54f" ${TS}/>`;

      return wrap(
        shadow(70, 128, 48, 7) +
        // Stone fortress arch
        `<rect x="22" y="24" width="96" height="102" rx="6" fill="#78909c" ${S}/>` +
        // Crenellations
        `<rect x="22" y="16" width="16" height="12" fill="#78909c" ${TS}/>` +
        `<rect x="48" y="16" width="16" height="12" fill="#78909c" ${TS}/>` +
        `<rect x="76" y="16" width="16" height="12" fill="#78909c" ${TS}/>` +
        `<rect x="102" y="16" width="16" height="12" fill="#78909c" ${TS}/>` +
        // Pennants
        `<polygon points="30,16 30,6 42,11" fill="#e53935"/>` +
        `<polygon points="110,16 110,6 122,11" fill="#e53935"/>` +
        // Portal arch opening
        `<path d="M 36 126 L 36 60 C 36 38 104 38 104 60 L 104 126 Z" fill="#263238" ${S}/>` +
        gateLattice
      );
    },

    magic_book(state) {
      const isOpen = !!state.open;
      if (isOpen) {
        return wrap(
          shadow(70, 126, 44, 7) +
          // Open pages spread
          `<path d="M 70 102 C 60 94 38 94 24 100 L 28 46 C 42 42 60 42 70 48 Z" fill="#fff9c4" ${S}/>` +
          `<path d="M 70 102 C 80 94 102 94 116 100 L 112 46 C 98 42 80 42 70 48 Z" fill="#fff9c4" ${S}/>` +
          // Magic runes & swirls
          `<path d="M 38 58 Q 52 56 60 58 M 38 70 Q 52 68 60 70 M 38 82 Q 52 80 60 82" stroke="#8e24aa" stroke-width="2" stroke-linecap="round"/>` +
          `<path d="M 80 58 Q 94 56 102 58 M 80 70 Q 94 68 102 70 M 80 82 Q 94 80 102 82" stroke="#8e24aa" stroke-width="2" stroke-linecap="round"/>` +
          sparkle(70, 32, 9, '#ffd54f') +
          sparkle(46, 26, 6, '#40c4ff') +
          sparkle(94, 28, 6, '#ff4081') +
          heart(70, 20, 1.2)
        );
      }
      return wrap(
        shadow(70, 126, 40, 6) +
        // Closed leather book
        `<rect x="36" y="32" width="68" height="84" rx="6" fill="#3949ab" ${S}/>` +
        // Spine
        `<path d="M 36 32 C 30 32 30 116 36 116" fill="none" stroke="#1a237e" stroke-width="8"/>` +
        // Brass corner protectors
        `<polygon points="36,46 48,34 36,34" fill="#ffd54f"/>` +
        `<polygon points="104,46 92,34 104,34" fill="#ffd54f"/>` +
        `<polygon points="104,104 92,116 104,116" fill="#ffd54f"/>` +
        // Arcane sigil on cover
        `<circle cx="70" cy="74" r="16" fill="none" stroke="#ffd54f" stroke-width="3"/>` +
        `<polygon points="70,62 80,80 60,80" fill="none" stroke="#ffd54f" stroke-width="2.5"/>` +
        `<polygon points="70,86 80,68 60,68" fill="none" stroke="#ffd54f" stroke-width="2.5"/>` +
        // Clasp
        `<rect x="96" y="70" width="10" height="8" rx="2" fill="#ffd54f" ${TS}/>`
      );
    },

    // ==========================================
    // WIZARD / SNOW / GARAGE / SPACE / GARDEN
    // ==========================================
    sleeping_frog(state) {
      const isAwake = !!state.happy;
      const eyes = isAwake
        ? `<circle cx="54" cy="54" r="8" fill="#ffffff" ${S}/><circle cx="54" cy="54" r="4" fill="#2d231e"/><circle cx="56" cy="52" r="1.5" fill="#ffffff"/>` +
          `<circle cx="86" cy="54" r="8" fill="#ffffff" ${S}/><circle cx="86" cy="54" r="4" fill="#2d231e"/><circle cx="88" cy="52" r="1.5" fill="#ffffff"/>`
        : `<path d="M 46 56 Q 54 52 62 56" fill="none" ${S}/>` +
          `<path d="M 78 56 Q 86 52 94 56" fill="none" ${S}/>` +
          `<text x="96" y="42" font-family="sans-serif" font-weight="bold" font-size="12" fill="#29b6f6">Z</text>` +
          `<text x="106" y="32" font-family="sans-serif" font-weight="bold" font-size="16" fill="#29b6f6">Z</text>`;
      const mouth = isAwake
        ? `<path d="M 54 84 Q 70 102 86 84 Z" fill="#ff5252" ${TS}/>`
        : `<path d="M 58 84 Q 70 90 82 84" fill="none" ${TS}/>`;

      return wrap(
        shadow(70, 126, 48, 7) +
        // Lily pad
        `<path d="M 22 118 C 22 96 118 96 118 118 C 118 126 102 128 70 128 C 38 128 22 126 22 118 Z" fill="#2e7d32" ${S}/>` +
        `<path d="M 28 112 L 36 104 L 42 112" fill="#f48fb1" ${TS}/>` +
        // Frog body
        `<ellipse cx="70" cy="80" rx="32" ry="24" fill="#43a047" ${S}/>` +
        `<ellipse cx="70" cy="86" rx="20" ry="14" fill="#c0ca33"/>` +
        // Frog eye bulbs
        `<circle cx="54" cy="58" r="12" fill="#43a047" ${S}/>` +
        `<circle cx="86" cy="58" r="12" fill="#43a047" ${S}/>` +
        eyes +
        mouth +
        `<circle cx="44" cy="82" r="4" fill="#ff8a80" opacity="0.6"/>` +
        `<circle cx="96" cy="82" r="4" fill="#ff8a80" opacity="0.6"/>` +
        (isAwake ? sparkle(70, 24, 7, '#ffd54f') + sparkle(106, 36, 5) : '')
      );
    },

    stone_owl(state) {
      const isAwake = !!state.happy;
      const bodyColor = isAwake ? '#8d6e63' : '#90a4ae';
      const bellyColor = isAwake ? '#ffecb3' : '#b0bec5';
      const eyeSvg = isAwake
        ? `<circle cx="56" cy="52" r="12" fill="#ffd54f" ${S}/>` +
          `<circle cx="56" cy="52" r="5" fill="#2d231e"/><circle cx="58" cy="50" r="1.5" fill="#ffffff"/>` +
          `<circle cx="84" cy="52" r="12" fill="#ffd54f" ${S}/>` +
          `<circle cx="84" cy="52" r="5" fill="#2d231e"/><circle cx="86" cy="50" r="1.5" fill="#ffffff"/>`
        : `<circle cx="56" cy="52" r="10" fill="#78909c" ${S}/><line x1="48" y1="52" x2="64" y2="52" stroke="#2d231e" stroke-width="3"/>` +
          `<circle cx="84" cy="52" r="10" fill="#78909c" ${S}/><line x1="76" y1="52" x2="92" y2="52" stroke="#2d231e" stroke-width="3"/>`;

      return wrap(
        shadow(70, 126, 40, 6) +
        // Stone plinth
        `<rect x="36" y="106" width="68" height="18" rx="4" fill="#78909c" ${S}/>` +
        (isAwake ? '' : `<ellipse cx="44" cy="106" rx="6" ry="3" fill="#81c784"/>`) +
        // Body
        `<ellipse cx="70" cy="68" rx="30" ry="36" fill="${bodyColor}" ${S}/>` +
        `<ellipse cx="70" cy="78" rx="18" ry="22" fill="${bellyColor}"/>` +
        // Ear tufts
        `<polygon points="46,38 42,20 54,30" fill="${bodyColor}" ${S}/>` +
        `<polygon points="94,38 98,20 86,30" fill="${bodyColor}" ${S}/>` +
        eyeSvg +
        `<polygon points="70,54 66,66 74,66" fill="#ff9800" ${TS}/>` +
        (isAwake ? sparkle(70, 20, 8, '#ffd54f') + sparkle(34, 32, 6) + sparkle(106, 32, 6) : '')
      );
    },

    baby_dragon(state) {
      const isAwake = !!state.happy;
      const eyeSvg = isAwake
        ? `<circle cx="64" cy="54" r="5" fill="#7b1fa2"/><circle cx="65" cy="53" r="1.5" fill="#ffffff"/>`
        : `<path d="M 58 56 Q 64 52 70 56" fill="none" ${S}/>` +
          `<text x="86" y="38" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ba68c8">z</text>` +
          `<text x="96" y="28" font-family="sans-serif" font-weight="bold" font-size="16" fill="#ba68c8">Z</text>`;
      const breath = isAwake
        ? heart(34, 62, 1.2, '#ff5252') + sparkle(24, 52, 5)
        : '';

      return wrap(
        shadow(70, 126, 42, 6) +
        // Dragon wings
        `<path d="M 76 60 Q 104 36 108 52 Q 92 64 76 72 Z" fill="#7b1fa2" ${S}/>` +
        // Curled body & tail
        `<path d="M 52 68 C 44 88 56 114 84 114 C 112 114 114 88 98 84" fill="none" stroke="#00897b" stroke-width="24" stroke-linecap="round"/>` +
        `<circle cx="70" cy="74" r="28" fill="#00897b" ${S}/>` +
        `<path d="M 60 76 C 60 92 80 92 80 76 Z" fill="#ffe082"/>` +
        // Back ridges
        `<polygon points="78,44 86,40 84,52" fill="#ffd54f" ${TS}/>` +
        `<polygon points="86,54 94,52 90,64" fill="#ffd54f" ${TS}/>` +
        // Head
        `<ellipse cx="60" cy="58" rx="20" ry="16" fill="#00897b" ${S}/>` +
        `<circle cx="44" cy="62" r="2" fill="#004d40"/>` +
        eyeSvg +
        breath +
        (isAwake ? sparkle(108, 36, 6) : '')
      );
    },

    tall_snowman(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 44, 6) +
        // Bottom snowball
        `<circle cx="70" cy="104" r="22" fill="#f5f5f5" ${S}/>` +
        // Middle snowball
        `<circle cx="70" cy="76" r="17" fill="#f5f5f5" ${S}/>` +
        // Head snowball
        `<circle cx="70" cy="50" r="13" fill="#f5f5f5" ${S}/>` +
        // Stick arms
        `<path d="M 54 74 L 32 64 M 36 66 L 34 58" stroke="#5d4037" stroke-width="3" stroke-linecap="round"/>` +
        (isHappy
          ? `<path d="M 86 74 L 108 54 M 104 58 L 110 64" stroke="#5d4037" stroke-width="3" stroke-linecap="round"/>`
          : `<path d="M 86 74 L 108 68 M 104 69 L 108 62" stroke="#5d4037" stroke-width="3" stroke-linecap="round"/>`) +
        // Scarf
        `<rect x="58" y="58" width="24" height="7" rx="3" fill="#e53935" ${TS}/>` +
        `<rect x="74" y="62" width="6" height="16" rx="2" fill="#43a047" ${TS}/>` +
        // Face
        `<circle cx="65" cy="48" r="1.8" fill="#2d231e"/>` +
        `<circle cx="75" cy="48" r="1.8" fill="#2d231e"/>` +
        `<polygon points="70,51 84,54 70,55" fill="#ff9800" ${TS}/>` +
        `<circle cx="65" cy="56" r="1" fill="#2d231e"/>` +
        `<circle cx="70" cy="57" r="1" fill="#2d231e"/>` +
        `<circle cx="75" cy="56" r="1" fill="#2d231e"/>` +
        // Top hat
        `<rect x="52" y="38" width="36" height="4" rx="2" fill="#37474f" ${TS}/>` +
        `<rect x="58" y="20" width="24" height="18" fill="#37474f" ${TS}/>` +
        `<rect x="58" y="34" width="24" height="4" fill="#e53935"/>` +
        // Coal buttons
        `<circle cx="70" cy="74" r="2" fill="#2d231e"/>` +
        `<circle cx="70" cy="82" r="2" fill="#2d231e"/>` +
        (isHappy ? sparkle(30, 36, 5) + sparkle(110, 36, 6) : '')
      );
    },

    little_snowman(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 38, 6) +
        // Bottom snowball
        `<circle cx="70" cy="98" r="26" fill="#f5f5f5" ${S}/>` +
        // Head snowball
        `<circle cx="70" cy="62" r="19" fill="#f5f5f5" ${S}/>` +
        // Beanie hat with pom pom
        `<path d="M 52 56 C 52 36 88 36 88 56 Z" fill="#e53935" ${S}/>` +
        `<circle cx="70" cy="34" r="6" fill="#ffffff" ${TS}/>` +
        `<rect x="50" y="54" width="40" height="6" rx="2" fill="#d32f2f" ${TS}/>` +
        // Stick arms with mittens
        `<path d="M 48 88 L 30 78" stroke="#5d4037" stroke-width="3" stroke-linecap="round"/>` +
        `<circle cx="28" cy="76" r="5" fill="#e53935" ${TS}/>` +
        `<path d="M 92 88 L 110 78" stroke="#5d4037" stroke-width="3" stroke-linecap="round"/>` +
        `<circle cx="112" cy="76" r="5" fill="#e53935" ${TS}/>` +
        // Face
        `<circle cx="64" cy="62" r="2" fill="#2d231e"/>` +
        `<circle cx="76" cy="62" r="2" fill="#2d231e"/>` +
        `<polygon points="70,64 80,66 70,68" fill="#ff9800" ${TS}/>` +
        `<circle cx="58" cy="68" r="3" fill="#ff8a80" opacity="0.6"/>` +
        `<circle cx="82" cy="68" r="3" fill="#ff8a80" opacity="0.6"/>` +
        `<path d="M 66 70 Q 70 74 74 70" fill="none" ${TS}/>` +
        // Buttons
        `<circle cx="70" cy="92" r="2.5" fill="#2d231e"/>` +
        `<circle cx="70" cy="102" r="2.5" fill="#2d231e"/>` +
        (isHappy ? sparkle(70, 20, 6) + sparkle(106, 42, 5) : '')
      );
    },

    red_car(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 48, 6) +
        // Tires
        `<circle cx="42" cy="112" r="12" fill="#424242" ${S}/>` +
        `<circle cx="42" cy="112" r="5" fill="#cfd8dc"/>` +
        `<circle cx="98" cy="112" r="12" fill="#424242" ${S}/>` +
        `<circle cx="98" cy="112" r="5" fill="#cfd8dc"/>` +
        // Car body
        `<path d="M 22 108 L 22 96 C 22 84 32 82 44 82 L 50 60 C 54 48 86 48 90 60 L 98 82 C 112 82 118 88 118 98 L 118 108 Z" fill="#e53935" ${S}/>` +
        // Windshield
        `<path d="M 54 80 L 56 64 C 58 54 82 54 84 64 L 86 80 Z" fill="#e0f7fa" ${TS}/>` +
        // Eyes in windshield
        `<circle cx="64" cy="68" r="2.5" fill="#2d231e"/><circle cx="76" cy="68" r="2.5" fill="#2d231e"/>` +
        // Bumpers & headlights
        `<rect x="18" y="100" width="8" height="6" rx="2" fill="#cfd8dc" ${TS}/>` +
        `<rect x="114" y="100" width="8" height="6" rx="2" fill="#cfd8dc" ${TS}/>` +
        `<circle cx="114" cy="92" r="4" fill="#ffd54f" ${TS}/>` +
        (isHappy ? sparkle(118, 70, 6) + heart(70, 34, 1.1) : '')
      );
    },

    blue_truck(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 50, 6) +
        // Wheels
        `<circle cx="40" cy="112" r="13" fill="#424242" ${S}/>` +
        `<circle cx="40" cy="112" r="5" fill="#cfd8dc"/>` +
        `<circle cx="98" cy="112" r="13" fill="#424242" ${S}/>` +
        `<circle cx="98" cy="112" r="5" fill="#cfd8dc"/>` +
        // Cargo bed
        `<rect x="20" y="74" width="46" height="34" rx="3" fill="#1565c0" ${S}/>` +
        `<rect x="24" y="62" width="26" height="14" rx="2" fill="#d7a15c" ${TS}/>` +
        // Cab
        `<path d="M 66 108 L 66 66 C 66 54 74 54 84 54 L 98 54 C 112 54 116 70 116 84 L 116 108 Z" fill="#1e88e5" ${S}/>` +
        // Windshield
        `<path d="M 84 62 L 96 62 C 104 62 108 70 108 78 L 84 78 Z" fill="#e0f7fa" ${TS}/>` +
        `<circle cx="94" cy="70" r="2.5" fill="#2d231e"/>` +
        // Bumper & light
        `<rect x="112" y="98" width="8" height="6" rx="2" fill="#cfd8dc" ${TS}/>` +
        `<circle cx="112" cy="88" r="4" fill="#ffd54f" ${TS}/>` +
        (isHappy ? sparkle(108, 40, 6) : '')
      );
    },

    yellow_bus(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 52, 6) +
        // Wheels
        `<circle cx="42" cy="112" r="12" fill="#424242" ${S}/>` +
        `<circle cx="42" cy="112" r="5" fill="#cfd8dc"/>` +
        `<circle cx="98" cy="112" r="12" fill="#424242" ${S}/>` +
        `<circle cx="98" cy="112" r="5" fill="#cfd8dc"/>` +
        // Bus body
        `<rect x="18" y="52" width="104" height="56" rx="10" fill="#fbc02d" ${S}/>` +
        `<line x1="18" y1="88" x2="122" y2="88" stroke="#2d231e" stroke-width="4"/>` +
        // Windows
        `<rect x="26" y="60" width="18" height="18" rx="3" fill="#e0f7fa" ${TS}/>` +
        `<rect x="50" y="60" width="18" height="18" rx="3" fill="#e0f7fa" ${TS}/>` +
        `<rect x="74" y="60" width="18" height="18" rx="3" fill="#e0f7fa" ${TS}/>` +
        `<path d="M 98 60 L 112 60 C 116 60 118 66 118 78 L 98 78 Z" fill="#e0f7fa" ${TS}/>` +
        // Stop sign
        `<polygon points="26,78 30,74 34,74 38,78 38,82 34,86 30,86 26,82" fill="#e53935"/>` +
        `<circle cx="118" cy="94" r="3.5" fill="#ffffff" ${TS}/>` +
        (isHappy ? sparkle(110, 36, 6) + heart(70, 34, 1) : '')
      );
    },

    silver_rocket(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 128, 36, 6) +
        // Flame
        `<path d="M 62 108 Q 70 134 70 134 Q 70 134 78 108 Z" fill="#ff9800"/>` +
        `<path d="M 65 108 Q 70 126 70 126 Q 70 126 75 108 Z" fill="#ffd54f"/>` +
        // Fins
        `<polygon points="52,90 32,108 52,106" fill="#e53935" ${S}/>` +
        `<polygon points="88,90 108,108 88,106" fill="#e53935" ${S}/>` +
        // Body
        `<path d="M 50 96 C 50 62 60 36 70 20 C 80 36 90 62 90 96 Z" fill="#eceff1" ${S}/>` +
        // Red nose
        `<path d="M 62 44 C 65 30 70 20 70 20 C 70 20 75 30 78 44 Z" fill="#e53935"/>` +
        // Porthole
        `<circle cx="70" cy="62" r="10" fill="#4fc3f7" ${S}/>` +
        `<circle cx="70" cy="62" r="7" fill="#0288d1"/>` +
        `<circle cx="72" cy="60" r="2" fill="#ffffff"/>` +
        // Booster nozzle
        `<rect x="60" y="96" width="20" height="12" rx="2" fill="#37474f" ${TS}/>` +
        (isHappy ? sparkle(34, 30, 6) + sparkle(106, 30, 6) : '')
      );
    },

    green_saucer(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 48, 6) +
        // Tractor beam
        (isHappy
          ? `<polygon points="56,86 30,126 110,126 84,86" fill="#b2ebf2" opacity="0.4"/>`
          : '') +
        // Dome
        `<path d="M 46 62 C 46 36 94 36 94 62 Z" fill="#b2dfdb" opacity="0.85" ${S}/>` +
        // Cute alien eye inside dome
        `<circle cx="70" cy="50" r="6" fill="#7cb342" ${TS}/>` +
        `<circle cx="70" cy="50" r="2.5" fill="#2d231e"/>` +
        // Saucer rim
        `<ellipse cx="70" cy="74" rx="54" ry="16" fill="#00bfa5" ${S}/>` +
        `<ellipse cx="70" cy="78" rx="42" ry="10" fill="#00897b"/>` +
        // Perimeter jewel lights
        `<circle cx="34" cy="74" r="3.5" fill="#ffd54f"/>` +
        `<circle cx="50" cy="78" r="3.5" fill="#ff4081"/>` +
        `<circle cx="70" cy="80" r="3.5" fill="#00e5ff"/>` +
        `<circle cx="90" cy="78" r="3.5" fill="#ff4081"/>` +
        `<circle cx="106" cy="74" r="3.5" fill="#ffd54f"/>` +
        (isHappy ? sparkle(70, 24, 7, '#ffd54f') : '')
      );
    },

    blue_rover(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 48, 6) +
        // Chunky chevron rover wheels
        `<rect x="22" y="96" width="16" height="24" rx="4" fill="#37474f" ${S}/>` +
        `<rect x="44" y="96" width="16" height="24" rx="4" fill="#37474f" ${S}/>` +
        `<rect x="80" y="96" width="16" height="24" rx="4" fill="#37474f" ${S}/>` +
        `<rect x="102" y="96" width="16" height="24" rx="4" fill="#37474f" ${S}/>` +
        // Chassis
        `<rect x="30" y="78" width="80" height="24" rx="4" fill="#0288d1" ${S}/>` +
        // Cockpit dome
        `<path d="M 50 78 C 50 54 90 54 90 78 Z" fill="#81d4fa" ${S}/>` +
        // Antenna
        `<line x1="58" y1="58" x2="52" y2="40" stroke="#cfd8dc" stroke-width="3" stroke-linecap="round"/>` +
        `<circle cx="50" cy="38" r="4" fill="#ffd54f" ${TS}/>` +
        // Headlights
        `<circle cx="108" cy="86" r="3.5" fill="#fff59d" ${TS}/>` +
        (isHappy ? sparkle(116, 86, 6) + sparkle(48, 28, 5) : '')
      );
    },

    button_green(state) {
      return TARGETS._button(state, '#43a047', '#a5d6a7');
    },

    button_purple(state) {
      return TARGETS._button(state, '#8e24aa', '#e1bee7');
    },

    button_yellow(state) {
      return TARGETS._button(state, '#fdd835', '#fff9c4');
    },

    _button(state, buttonColor, glowColor) {
      const isLit = !!state.lit;
      const glow = isLit
        ? `<circle cx="70" cy="70" r="36" fill="${glowColor}" opacity="0.5"/>` +
          sparkle(70, 36, 7, buttonColor) + sparkle(36, 60, 6, buttonColor) + sparkle(104, 60, 6, buttonColor)
        : '';
      const buttonY = isLit ? 66 : 60;

      return wrap(
        shadow(70, 126, 42, 6) +
        glow +
        // Control pedestal
        `<polygon points="36,118 46,74 94,74 104,118" fill="#455a64" ${S}/>` +
        `<ellipse cx="70" cy="74" rx="28" ry="12" fill="#607d8b" ${S}/>` +
        // Domed push button
        `<ellipse cx="70" cy="${buttonY}" rx="18" ry="10" fill="${buttonColor}" ${S}/>` +
        `<ellipse cx="70" cy="${buttonY - 2}" rx="12" ry="5" fill="#ffffff" opacity="0.4"/>` +
        // Status LED
        `<circle cx="70" cy="100" r="3.5" fill="${isLit ? '#76ff03' : '#37474f'}" ${TS}/>`
      );
    },

    yellow_flashlight(state) {
      const isLit = !!state.lit;
      const beam = isLit
        ? `<polygon points="98,62 136,36 136,98 98,72" fill="#fff9c4" opacity="0.55"/>` +
          sparkle(126, 60, 7, '#ffd54f') + sparkle(116, 42, 5, '#ffd54f')
        : '';
      return wrap(
        shadow(70, 126, 42, 6) +
        beam +
        // Flashlight handle
        `<rect x="22" y="60" width="48" height="16" rx="4" fill="#fbc02d" ${S}/>` +
        `<rect x="34" y="62" width="16" height="12" rx="2" fill="#37474f"/>` +
        // Flare bezel & lens
        `<polygon points="70,60 96,52 96,84 70,76" fill="#fbc02d" ${S}/>` +
        `<ellipse cx="96" cy="68" rx="4" ry="16" fill="${isLit ? '#fff59d' : '#e0f7fa'}" ${S}/>`
      );
    },

    red_lantern(state) {
      const isLit = !!state.lit;
      const aura = isLit
        ? `<circle cx="70" cy="74" r="44" fill="#fff59d" opacity="0.45"/>` +
          sparkle(70, 24, 7, '#ffd54f') + sparkle(32, 68, 5) + sparkle(108, 68, 5)
        : '';
      return wrap(
        shadow(70, 126, 36, 6) +
        aura +
        // Wire bail handle
        `<path d="M 44 48 C 44 22 96 22 96 48" fill="none" stroke="#2d231e" stroke-width="3.5"/>` +
        // Cap
        `<path d="M 46 52 C 46 44 94 44 94 52 Z" fill="#d32f2f" ${S}/>` +
        // Glass globe
        `<ellipse cx="70" cy="74" rx="24" ry="22" fill="${isLit ? '#ffee58' : '#e0f7fa'}" ${S}/>` +
        // Flame / wick inside
        (isLit
          ? `<path d="M 70 82 Q 65 74 70 66 Q 75 74 70 82 Z" fill="#ff9800"/>` +
            `<circle cx="70" cy="76" r="3" fill="#ffffff"/>`
          : `<line x1="70" y1="82" x2="70" y2="76" stroke="#2d231e" stroke-width="2"/>`) +
        // Base
        `<rect x="44" y="96" width="52" height="18" rx="4" fill="#d32f2f" ${S}/>`
      );
    },

    blue_lamp(state) {
      const isLit = !!state.lit;
      const glow = isLit
        ? `<circle cx="70" cy="56" r="44" fill="#fff59d" opacity="0.4"/>` +
          sparkle(70, 22, 6, '#ffd54f') + sparkle(108, 48, 5)
        : '';
      return wrap(
        shadow(70, 126, 32, 6) +
        glow +
        // Ceramic base
        `<path d="M 54 116 C 50 96 60 84 70 84 C 80 84 90 96 86 116 Z" fill="#3f51b5" ${S}/>` +
        // Shade
        `<polygon points="50,46 90,46 102,80 38,80" fill="${isLit ? '#fff59d' : '#7986cb'}" ${S}/>` +
        `<ellipse cx="70" cy="80" rx="32" ry="7" fill="${isLit ? '#ffee58' : '#5c6bc0'}" ${TS}/>`
      );
    },

    sprout_sunflower(state) {
      return TARGETS._garden(state, 'sunflower');
    },

    sprout_rose(state) {
      return TARGETS._garden(state, 'rose');
    },

    sprout_pumpkin(state) {
      return TARGETS._garden(state, 'pumpkin');
    },

    _garden(state, type) {
      const isBloomed = !!state.bloomed;
      if (isBloomed) {
        if (type === 'sunflower') {
          return wrap(
            shadow(70, 126, 44, 6) +
            // Soil mound
            `<ellipse cx="70" cy="116" rx="40" ry="12" fill="#4e342e" ${S}/>` +
            // Stem & leaves
            `<path d="M 70 116 L 70 66" stroke="#43a047" stroke-width="7" stroke-linecap="round"/>` +
            `<path d="M 70 94 Q 50 86 44 96 Q 58 104 70 96" fill="#43a047" ${TS}/>` +
            `<path d="M 70 84 Q 90 76 96 86 Q 82 94 70 86" fill="#43a047" ${TS}/>` +
            // Sunflower petals
            `<circle cx="70" cy="52" r="28" fill="#ffd54f" ${S}/>` +
            `<circle cx="70" cy="52" r="16" fill="#5d4037" ${S}/>` +
            // Smiling face
            `<circle cx="65" cy="50" r="2" fill="#ffd54f"/>` +
            `<circle cx="75" cy="50" r="2" fill="#ffd54f"/>` +
            `<path d="M 66 56 Q 70 59 74 56" fill="none" stroke="#ffd54f" stroke-width="2" stroke-linecap="round"/>` +
            sparkle(102, 34, 6)
          );
        } else if (type === 'rose') {
          return wrap(
            shadow(70, 126, 44, 6) +
            // Soil
            `<ellipse cx="70" cy="116" rx="40" ry="12" fill="#4e342e" ${S}/>` +
            // Stem
            `<path d="M 70 116 Q 66 84 70 62" stroke="#2e7d32" stroke-width="6" stroke-linecap="round"/>` +
            `<path d="M 68 90 Q 52 86 50 94 Q 62 98 68 92" fill="#43a047" ${TS}/>` +
            // Blooming rose petals
            `<circle cx="70" cy="50" r="22" fill="#c62828" ${S}/>` +
            `<circle cx="70" cy="50" r="15" fill="#e53935" ${TS}/>` +
            `<path d="M 64 46 C 64 38 76 38 76 46 C 76 54 64 54 64 46 Z" fill="#ef5350"/>` +
            sparkle(96, 36, 6) + heart(70, 20, 1.1)
          );
        } else {
          // Pumpkin
          return wrap(
            shadow(70, 126, 46, 6) +
            // Soil
            `<ellipse cx="70" cy="116" rx="42" ry="12" fill="#4e342e" ${S}/>` +
            // Vines
            `<path d="M 32 110 Q 50 102 68 106" fill="none" stroke="#43a047" stroke-width="4" stroke-linecap="round"/>` +
            // Big plump pumpkin
            `<ellipse cx="70" cy="84" rx="34" ry="26" fill="#fb8c00" ${S}/>` +
            `<ellipse cx="70" cy="84" rx="20" ry="26" fill="#f57c00" ${TS}/>` +
            `<ellipse cx="70" cy="84" rx="8" ry="26" fill="#ef6c00"/>` +
            // Stem
            `<path d="M 68 58 Q 66 46 76 48 L 72 58 Z" fill="#2e7d32" ${S}/>` +
            sparkle(104, 64, 6)
          );
        }
      }

      // Sprout state
      let iconSvg = '';
      if (type === 'sunflower') {
        iconSvg = `<circle cx="94" cy="74" r="4" fill="#ffd54f"/>`;
      } else if (type === 'rose') {
        iconSvg = `<circle cx="94" cy="74" r="3.5" fill="#e53935"/>`;
      } else {
        iconSvg = `<ellipse cx="94" cy="74" rx="4" ry="3" fill="#fb8c00"/>`;
      }

      return wrap(
        shadow(70, 126, 44, 6) +
        // Soil mound
        `<ellipse cx="70" cy="116" rx="42" ry="14" fill="#4e342e" ${S}/>` +
        // Green sprout
        `<path d="M 68 114 L 68 86" stroke="#43a047" stroke-width="5" stroke-linecap="round"/>` +
        `<path d="M 68 88 Q 50 76 48 88 Q 60 94 68 90" fill="#7cb342" ${TS}/>` +
        `<path d="M 68 88 Q 86 76 88 88 Q 76 94 68 90" fill="#7cb342" ${TS}/>` +
        // Wooden marker stake with mini icon
        `<rect x="92" y="78" width="4" height="34" fill="#bcaaa4" ${TS}/>` +
        `<rect x="84" y="66" width="20" height="16" rx="3" fill="#d7ccc8" ${TS}/>` +
        iconSvg
      );
    },

    basket(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 42, 6) +
        // Overhead arched handle
        `<path d="M 40 78 C 40 32 100 32 100 78" fill="none" stroke="#8d5b2e" stroke-width="6"/>` +
        // Woven basket bowl
        `<path d="M 30 76 L 40 120 L 100 120 L 110 76 Z" fill="#d7a15c" ${S}/>` +
        `<line x1="48" y1="76" x2="52" y2="120" stroke="#b58242" stroke-width="2.5"/>` +
        `<line x1="70" y1="76" x2="70" y2="120" stroke="#b58242" stroke-width="2.5"/>` +
        `<line x1="92" y1="76" x2="88" y2="120" stroke="#b58242" stroke-width="2.5"/>` +
        // Red apples & fruit in basket
        `<circle cx="54" cy="72" r="10" fill="#e53935" ${TS}/>` +
        `<circle cx="70" cy="68" r="11" fill="#e53935" ${TS}/>` +
        `<circle cx="86" cy="72" r="10" fill="#7b1fa2" ${TS}/>` +
        `<path d="M 70 57 Q 73 52 76 54" fill="none" stroke="#43a047" stroke-width="2"/>` +
        (isHappy ? sparkle(70, 32, 6) + heart(70, 20, 1.1) : '')
      );
    },

    wagon(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 48, 6) +
        // Wheels
        `<circle cx="44" cy="112" r="12" fill="#424242" ${S}/>` +
        `<circle cx="44" cy="112" r="5" fill="#cfd8dc"/>` +
        `<circle cx="96" cy="112" r="12" fill="#424242" ${S}/>` +
        `<circle cx="96" cy="112" r="5" fill="#cfd8dc"/>` +
        // Pull handle
        `<path d="M 32 98 L 14 74" stroke="#2d231e" stroke-width="4" stroke-linecap="round"/>` +
        `<circle cx="14" cy="72" r="4" fill="#e53935" ${TS}/>` +
        // Wagon bed
        `<rect x="30" y="80" width="80" height="26" rx="4" fill="#d32f2f" ${S}/>` +
        // Wood slats
        `<rect x="34" y="68" width="72" height="12" rx="2" fill="#d7a15c" ${TS}/>` +
        (isHappy ? sparkle(106, 56, 6) + heart(70, 52, 1) : '')
      );
    },

    wheelbarrow(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 48, 6) +
        // Front wheel
        `<circle cx="34" cy="108" r="14" fill="#424242" ${S}/>` +
        `<circle cx="34" cy="108" r="5" fill="#cfd8dc"/>` +
        // Legs & wooden handles
        `<line x1="88" y1="94" x2="88" y2="120" stroke="#8d5b2e" stroke-width="5" stroke-linecap="round"/>` +
        `<line x1="34" y1="108" x2="114" y2="76" stroke="#8d5b2e" stroke-width="6" stroke-linecap="round"/>` +
        // Metal tray
        `<polygon points="40,86 46,104 90,104 102,76 56,76" fill="#2e7d32" ${S}/>` +
        // Fresh carrots in tray
        `<path d="M 64 74 L 76 60 L 80 66 Z" fill="#ff9800" ${TS}/>` +
        `<path d="M 76 60 L 82 52" stroke="#43a047" stroke-width="2.5" stroke-linecap="round"/>` +
        (isHappy ? sparkle(70, 48, 6) : '')
      );
    },

    king(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 42, 6) +
        // Royal crimson robe
        `<path d="M 44 82 L 32 120 L 108 120 L 96 82 Z" fill="#b71c1c" ${S}/>` +
        // Ermine fur collar
        `<path d="M 42 82 C 42 70 98 70 98 82 Z" fill="#ffffff" ${TS}/>` +
        `<circle cx="56" cy="78" r="1.5" fill="#2d231e"/>` +
        `<circle cx="70" cy="78" r="1.5" fill="#2d231e"/>` +
        `<circle cx="84" cy="78" r="1.5" fill="#2d231e"/>` +
        // Head
        `<circle cx="70" cy="56" r="20" fill="#ffd0a0" ${S}/>` +
        // White beard & mustache
        `<path d="M 52 58 C 50 82 90 82 88 58 Z" fill="#ffffff" ${TS}/>` +
        `<path d="M 60 62 Q 70 66 80 62" fill="none" ${TS}/>` +
        // Eyes
        `<circle cx="62" cy="52" r="2.5" fill="#2d231e"/>` +
        `<circle cx="78" cy="52" r="2.5" fill="#2d231e"/>` +
        // Golden crown
        `<polygon points="50,42 54,24 62,32 70,20 78,32 86,24 90,42" fill="#ffd54f" ${S}/>` +
        `<circle cx="70" cy="20" r="2.5" fill="#e53935"/>` +
        // Scepter in hand
        `<line x1="100" y1="110" x2="108" y2="60" stroke="#d4af37" stroke-width="4" stroke-linecap="round"/>` +
        `<circle cx="108" cy="58" r="5" fill="#ffd54f" ${TS}/>` +
        (isHappy ? sparkle(110, 48, 7) + heart(70, 14, 1.2) : '')
      );
    },

    dragon(state) {
      const isHappy = !!state.happy;
      const mouth = isHappy
        ? `<path d="M 56 76 Q 70 92 84 76 Z" fill="#ff5252" ${TS}/>`
        : `<path d="M 58 76 Q 70 82 82 76" fill="none" ${TS}/>`;
      return wrap(
        shadow(70, 126, 44, 6) +
        // Wings
        `<path d="M 44 64 Q 24 40 38 34 Q 48 50 48 64 Z" fill="#8e24aa" ${S}/>` +
        `<path d="M 96 64 Q 116 40 102 34 Q 92 50 92 64 Z" fill="#8e24aa" ${S}/>` +
        // Tail
        `<path d="M 94 98 C 118 98 126 78 116 70" fill="none" stroke="#00897b" stroke-width="12" stroke-linecap="round"/>` +
        `<polygon points="116,66 126,70 120,78" fill="#8e24aa"/>` +
        // Body
        `<circle cx="70" cy="74" r="32" fill="#00897b" ${S}/>` +
        `<path d="M 58 76 C 58 98 82 98 82 76 Z" fill="#fff59d"/>` +
        // Horns
        `<polygon points="56,44 50,26 62,38" fill="#ffd54f" ${TS}/>` +
        `<polygon points="84,44 90,26 78,38" fill="#ffd54f" ${TS}/>` +
        // Eyes
        `<circle cx="60" cy="58" r="4" fill="#2d231e"/><circle cx="61" cy="57" r="1.5" fill="#ffffff"/>` +
        `<circle cx="80" cy="58" r="4" fill="#2d231e"/><circle cx="81" cy="57" r="1.5" fill="#ffffff"/>` +
        // Snout
        `<ellipse cx="70" cy="70" rx="14" ry="8" fill="#00796b"/>` +
        `<circle cx="65" cy="69" r="1.8" fill="#004d40"/>` +
        `<circle cx="75" cy="69" r="1.8" fill="#004d40"/>` +
        mouth +
        (isHappy ? heart(70, 18, 1.2) + sparkle(106, 32, 6) : '')
      );
    },

    knight(state) {
      const isHappy = !!state.happy;
      return wrap(
        shadow(70, 126, 40, 6) +
        // Silver armor body
        `<rect x="46" y="78" width="48" height="42" rx="8" fill="#cfd8dc" ${S}/>` +
        // Armor chest crest
        `<polygon points="70,84 80,94 70,104 60,94" fill="#ffd54f" ${TS}/>` +
        // Helmet
        `<circle cx="70" cy="54" r="22" fill="#b0bec5" ${S}/>` +
        // Plume
        `<path d="M 70 32 C 70 16 92 16 88 32 Z" fill="#e53935" ${S}/>` +
        // Open visor showing face
        `<rect x="54" y="44" width="32" height="18" rx="4" fill="#ffd0a0" ${TS}/>` +
        `<circle cx="62" cy="50" r="2.5" fill="#2d231e"/>` +
        `<circle cx="78" cy="50" r="2.5" fill="#2d231e"/>` +
        `<path d="M 66 56 Q 70 59 74 56" fill="none" ${TS}/>` +
        `<circle cx="56" cy="54" r="2.5" fill="#ff8a80" opacity="0.6"/>` +
        `<circle cx="84" cy="54" r="2.5" fill="#ff8a80" opacity="0.6"/>` +
        // Tournament lance
        `<line x1="34" y1="120" x2="28" y2="28" stroke="#8d5b2e" stroke-width="4" stroke-linecap="round"/>` +
        `<polygon points="28,28 20,40 28,36" fill="#e53935"/>` +
        (isHappy ? sparkle(106, 44, 7) + heart(70, 14, 1.1) : '')
      );
    },

    dig_spot(state) {
      const isOpen = !!state.open;
      if (isOpen) {
        return wrap(
          shadow(70, 126, 46, 7) +
          // Sandy mound with dug pit
          `<ellipse cx="70" cy="114" rx="44" ry="14" fill="#f6d7b0" ${S}/>` +
          `<ellipse cx="70" cy="112" rx="26" ry="10" fill="#8d5b2e" ${S}/>` +
          // Gold treasure chest peeking out from pit
          `<rect x="52" y="92" width="36" height="22" rx="4" fill="#ffd54f" ${S}/>` +
          `<circle cx="70" cy="103" r="3" fill="#2d231e"/>` +
          `<circle cx="58" cy="90" r="4" fill="#e53935" ${TS}/>` +
          `<circle cx="82" cy="90" r="4" fill="#00e676" ${TS}/>` +
          sparkle(70, 68, 9, '#ffd54f') +
          sparkle(44, 78, 6, '#ffd54f') +
          sparkle(96, 78, 6, '#ffd54f')
        );
      }
      return wrap(
        shadow(70, 126, 44, 7) +
        // Fresh sandy mound
        `<ellipse cx="70" cy="114" rx="44" ry="16" fill="#f6d7b0" ${S}/>` +
        `<ellipse cx="70" cy="110" rx="36" ry="10" fill="#ffe0b2"/>` +
        // Red X marks the spot
        `<path d="M 54 98 L 86 122 M 86 98 L 54 122" stroke="#e53935" stroke-width="6" stroke-linecap="round"/>` +
        // Seashells & pebbles
        `<circle cx="38" cy="118" r="3" fill="#ffab91"/>` +
        `<circle cx="102" cy="118" r="3.5" fill="#cfd8dc"/>` +
        sparkle(70, 92, 5, '#ffd54f')
      );
    },

    // ==========================================
    // FALLBACK PLACEHOLDER
    // ==========================================
    fallback(id, state) {
      return wrap(
        shadow(70, 126, 38, 6) +
        `<rect x="36" y="38" width="68" height="68" rx="14" fill="#ffd54f" ${S}/>` +
        `<text x="70" y="82" font-family="sans-serif" font-weight="bold" font-size="38" text-anchor="middle" fill="#2d231e">?</text>` +
        sparkle(36, 36, 6) + sparkle(104, 36, 6)
      );
    }
  };

  // Aliases for gameplay resilience
  const ALIASES = {
    dog: 'spotted_dog',
    cat: 'white_cat',
    bunny: 'fluffy_bunny',
    rabbit: 'fluffy_bunny',
    frog: 'sleeping_frog',
    snowman: 'tall_snowman',
    car: 'red_car',
    truck: 'blue_truck',
    bus: 'yellow_bus',
    rocket: 'silver_rocket',
    saucer: 'green_saucer',
    rover: 'blue_rover',
    flashlight: 'yellow_flashlight',
    lantern: 'red_lantern',
    pan: 'red_pan',
    chest: 'treasure_chest',
    gate: 'castle_gate',
    book: 'magic_book',
    shield: 'red_shield',
    pillow: 'royal_pillow',
    umbrella: 'red_umbrella',
    rock: 'big_rock',
    crown: 'gold_crown_stand',
    crown_stand: 'gold_crown_stand',
    plate_blue: 'blue_plate',
    plate_green: 'green_plate'
  };

  const LeviTargetSprites = {
    /**
     * Get an SVG sprite by target ID.
     * @param {string} id - Target ID (e.g. 'levi', 'chair', 'pig', 'jar_blue', etc.)
     * @param {Object} [state={}] - State options: { open, lit, happy, count, heldKeyColor, bloomed }
     * @returns {string} SVG markup string
     */
    get(id, state = {}) {
      if (!id) return '';
      let key = String(id).toLowerCase().trim();
      if (ALIASES[key]) {
        key = ALIASES[key];
      }
      const fn = TARGETS[key];
      if (typeof fn === 'function') {
        return fn(state || {});
      }
      return TARGETS.fallback(key, state || {});
    },

    /**
     * List all officially supported target IDs.
     * @returns {string[]}
     */
    list() {
      return Object.keys(TARGETS).filter(k => !k.startsWith('_') && k !== 'fallback');
    }
  };

  window.LeviTargetSprites = LeviTargetSprites;
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
