/**
 * Levi's Reading Adventure - Mario-Style Overworld Map
 * Renders a vibrant interactive SVG storybook island map with 4 biome worlds,
 * winding paths, 16 level nodes, star badges, and an animated walking Levi character.
 */

window.LeviOverworld = (function () {
  let containerEl = null;
  let onSelectLevelCallback = null;
  let currentLeviNodeId = 1;
  let isWalking = false;

  function init(container, onSelectLevel) {
    containerEl = container;
    onSelectLevelCallback = onSelectLevel;
  }

  function render(progressState, animateFromNodeId, animateToNodeId) {
    if (!containerEl) return;
    const levels = window.LeviLevels.LEVELS;
    const unlockedMax = progressState.unlockAll ? 16 : progressState.highestUnlocked;

    if (animateToNodeId) {
      currentLeviNodeId = animateFromNodeId || animateToNodeId;
    } else if (!currentLeviNodeId) {
      currentLeviNodeId = Math.min(unlockedMax, 16);
    }

    // Build path segments between consecutive levels
    let roadUnderlayPaths = '';
    let roadDashPaths = '';
    for (let i = 0; i < levels.length - 1; i++) {
      const a = levels[i];
      const b = levels[i + 1];
      const isCompletedSegment =
        progressState.unlockAll || progressState.completed[a.id] || b.id <= unlockedMax;
      const midX = (a.mapX + b.mapX) / 2;
      const midY = (a.mapY + b.mapY) / 2 - 18;
      const d = `M ${a.mapX} ${a.mapY} Q ${midX} ${midY} ${b.mapX} ${b.mapY}`;

      roadUnderlayPaths += `<path d="${d}" fill="none" stroke="${
        isCompletedSegment ? '#d97706' : '#64748b'
      }" stroke-width="18" stroke-linecap="round" opacity="0.45"/>`;

      roadDashPaths += `<path d="${d}" fill="none" stroke="${
        isCompletedSegment ? '#fef08a' : '#cbd5e1'
      }" stroke-width="8" stroke-linecap="round" stroke-dasharray="1 18" />`;
    }

    // Build Level Nodes SVG groups
    let nodesMarkup = '';
    levels.forEach((lvl) => {
      const isCompleted = !!progressState.completed[lvl.id];
      const starsCount = progressState.stars[lvl.id] || 0;
      const isUnlocked = progressState.unlockAll || lvl.id <= unlockedMax;
      const isNextToPlay = !isCompleted && lvl.id === unlockedMax;

      let padFill = '#94a3b8';
      let padRim = '#475569';
      if (isCompleted) {
        padFill = '#22c55e';
        padRim = '#15803d';
      } else if (isUnlocked) {
        padFill = '#f59e0b';
        padRim = '#b45309';
      }

      const pulseRing = isNextToPlay
        ? `<circle cx="${lvl.mapX}" cy="${lvl.mapY}" r="36" fill="none" stroke="#fde047" stroke-width="5" class="map-node-pulse"/>`
        : '';

      const starBadge = isCompleted
        ? `<g transform="translate(${lvl.mapX + 20}, ${lvl.mapY - 24})">
             <circle cx="0" cy="0" r="13" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5"/>
             <text x="0" y="5" text-anchor="middle" font-size="15">⭐</text>
           </g>`
        : !isUnlocked
        ? `<g transform="translate(${lvl.mapX + 20}, ${lvl.mapY - 24})">
             <circle cx="0" cy="0" r="12" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
             <text x="0" y="4" text-anchor="middle" font-size="12">🔒</text>
           </g>`
        : '';

      nodesMarkup += `
        <g class="map-node ${isUnlocked ? 'unlocked' : 'locked'} ${
        isNextToPlay ? 'next-node' : ''
      }" data-level-id="${lvl.id}" tabindex="${isUnlocked ? '0' : '-1'}" role="button" aria-label="Level ${
        lvl.id
      }: ${lvl.title}">
          ${pulseRing}
          <!-- 3D shadow & base -->
          <ellipse cx="${lvl.mapX}" cy="${lvl.mapY + 9}" rx="31" ry="20" fill="rgba(0,0,0,0.28)"/>
          <ellipse cx="${lvl.mapX}" cy="${lvl.mapY + 5}" rx="29" ry="18" fill="${padRim}" stroke="#2d231e" stroke-width="3"/>
          <ellipse cx="${lvl.mapX}" cy="${lvl.mapY}" rx="29" ry="18" fill="${padFill}" stroke="#2d231e" stroke-width="3"/>
          <ellipse cx="${lvl.mapX}" cy="${lvl.mapY - 2}" rx="21" ry="11" fill="rgba(255,255,255,0.28)"/>

          <!-- Level Number & Icon -->
          <text x="${lvl.mapX}" y="${
        lvl.mapY + 6
      }" text-anchor="middle" font-family="'Fredoka', 'Nunito', sans-serif" font-weight="800" font-size="17" fill="#ffffff" stroke="#2d231e" stroke-width="3" paint-order="stroke">${
        lvl.id
      } ${lvl.icon}</text>

          <!-- Floating Label Pill -->
          <g transform="translate(${lvl.mapX}, ${lvl.mapY + 33})" class="map-node-label">
            <rect x="-66" y="-11" width="132" height="22" rx="11" fill="#fffbeb" stroke="#2d231e" stroke-width="2.5"/>
            <text x="0" y="4" text-anchor="middle" font-family="'Fredoka', 'Nunito', sans-serif" font-weight="700" font-size="11.5" fill="#2d231e">${
              lvl.title
            }</text>
          </g>
          ${starBadge}
        </g>
      `;
    });

    const startNode = levels.find((l) => l.id === currentLeviNodeId) || levels[0];
    const leviSvg = window.LeviTargetSprites
      ? window.LeviTargetSprites.get('levi', { happy: true })
      : '';

    containerEl.innerHTML = `
      <div class="overworld-wrapper">
        <svg class="overworld-svg" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="60%" stop-color="#0ea5e9"/>
              <stop offset="100%" stop-color="#0284c7"/>
            </linearGradient>
            <linearGradient id="meadowGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#86efac"/>
              <stop offset="55%" stop-color="#4ade80"/>
              <stop offset="100%" stop-color="#22c55e"/>
            </linearGradient>
            <linearGradient id="forestGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#a78bfa"/>
              <stop offset="100%" stop-color="#7c3aed"/>
            </linearGradient>
            <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f8fafc"/>
              <stop offset="100%" stop-color="#cbd5e1"/>
            </linearGradient>
            <filter id="islandShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="10" stdDeviation="6" flood-color="#0369a1" flood-opacity="0.45"/>
            </filter>
          </defs>

          <!-- Ocean Background -->
          <rect width="1000" height="620" fill="url(#oceanGrad)"/>

          <!-- Animated Ocean Waves -->
          <g stroke="rgba(255,255,255,0.35)" stroke-width="3.5" stroke-linecap="round" fill="none" class="ocean-waves">
            <path d="M 40 90 Q 60 80 80 90 T 120 90"/>
            <path d="M 150 560 Q 170 550 190 560 T 230 560"/>
            <path d="M 430 570 Q 450 560 470 570 T 510 570"/>
            <path d="M 850 565 Q 870 555 890 565 T 930 565"/>
            <path d="M 620 75 Q 640 65 660 75 T 700 75"/>
          </g>

          <!-- Main Storybook Continent & Biome Regions -->
          <g filter="url(#islandShadow)">
            <!-- Sandy Coast / Island Base -->
            <path d="M 55 510 C 35 380, 90 240, 230 200 C 330 170, 420 110, 560 130 C 660 145, 730 90, 860 85 C 950 82, 975 180, 955 310 C 940 420, 950 510, 830 535 C 710 560, 580 555, 470 510 C 350 470, 260 555, 130 545 Z"
                  fill="#fde68a" stroke="#2d231e" stroke-width="5"/>

            <!-- World 1 & 2 Lush Green Mainland -->
            <path d="M 75 495 C 60 385, 110 260, 245 220 C 340 190, 430 140, 550 155 C 640 170, 620 330, 520 430 C 420 510, 250 535, 130 525 Z"
                  fill="url(#meadowGrad)" stroke="#2d231e" stroke-width="4"/>

            <!-- World 2 Sunny Beach Cove Peninsula -->
            <path d="M 440 165 C 520 135, 635 160, 650 255 C 660 325, 580 355, 515 310 C 460 270, 410 210, 440 165 Z"
                  fill="#fef08a" stroke="#eab308" stroke-width="3"/>

            <!-- World 3 Enchanted Whispering Woods Biome -->
            <path d="M 485 450 C 510 340, 620 275, 735 285 C 815 295, 825 460, 745 520 C 665 565, 510 545, 485 450 Z"
                  fill="url(#forestGrad)" stroke="#2d231e" stroke-width="4"/>

            <!-- World 4 Snowy Mountain & Royal Peak Biome -->
            <path d="M 685 235 C 700 135, 790 95, 895 100 C 955 105, 955 285, 925 415 C 895 470, 800 440, 775 345 C 755 275, 680 285, 685 235 Z"
                  fill="url(#snowGrad)" stroke="#2d231e" stroke-width="4"/>
          </g>

          <!-- Decorative Landmarks -->
          <!-- World 1 Cozy House & Red Barn -->
          <g transform="translate(65, 425)">
            <rect x="0" y="15" width="38" height="28" rx="4" fill="#fef3c7" stroke="#2d231e" stroke-width="3"/>
            <polygon points="-5,17 19,-5 43,17" fill="#ef4444" stroke="#2d231e" stroke-width="3"/>
            <rect x="14" y="27" width="10" height="16" fill="#92400e" stroke="#2d231e" stroke-width="2"/>
          </g>
          <g transform="translate(170, 480)">
            <rect x="0" y="12" width="44" height="30" rx="3" fill="#dc2626" stroke="#2d231e" stroke-width="3"/>
            <polygon points="-4,14 22,-8 48,14" fill="#991b1b" stroke="#2d231e" stroke-width="3"/>
            <path d="M 13 24 L 31 42 M 31 24 L 13 42" stroke="#ffffff" stroke-width="2.5"/>
          </g>

          <!-- Cute Trees & Pines -->
          <g stroke="#2d231e" stroke-width="2.8">
            <circle cx="165" cy="365" r="18" fill="#16a34a"/>
            <circle cx="152" cy="372" r="14" fill="#22c55e"/>
            <circle cx="305" cy="310" r="19" fill="#16a34a"/>
            <circle cx="420" cy="300" r="16" fill="#22c55e"/>
            <!-- Whispering Woods Mushrooms & Pines -->
            <polygon points="600,435 616,395 632,435" fill="#4c1d95"/>
            <polygon points="785,465 802,420 819,465" fill="#5b21b6"/>
            <!-- Snow Pines -->
            <polygon points="780,150 795,112 810,150" fill="#e2e8f0"/>
            <polygon points="815,190 830,155 845,190" fill="#f1f5f9"/>
          </g>

          <!-- Pirate Ship / Palm Tree near World 2 -->
          <g transform="translate(625, 195)" stroke="#2d231e" stroke-width="2.5">
            <path d="M 10 35 Q 15 15 12 0" fill="none" stroke="#92400e" stroke-width="5"/>
            <path d="M 12 2 Q -5 -5 -12 8" fill="none" stroke="#16a34a" stroke-width="5"/>
            <path d="M 12 2 Q 28 -5 34 8" fill="none" stroke="#16a34a" stroke-width="5"/>
            <path d="M 12 2 Q 12 -14 26 -10" fill="none" stroke="#22c55e" stroke-width="5"/>
          </g>

          <!-- King Levi's Grand Castle at Node 16 -->
          <g transform="translate(855, 42)" stroke="#2d231e" stroke-width="3">
            <rect x="12" y="34" width="56" height="44" fill="#f8fafc"/>
            <rect x="2" y="20" width="20" height="58" fill="#e2e8f0"/>
            <rect x="58" y="20" width="20" height="58" fill="#e2e8f0"/>
            <polygon points="-2,20 12,0 26,20" fill="#ec4899"/>
            <polygon points="54,20 68,0 82,20" fill="#ec4899"/>
            <polygon points="22,34 40,8 58,34" fill="#3b82f6"/>
            <path d="M 30 78 L 30 56 A 10 10 0 0 1 50 56 L 50 78 Z" fill="#b45309"/>
            <path d="M 40 8 L 40 -6 L 56 -1 L 40 4" fill="#facc15"/>
          </g>

          <!-- World Banners on Map -->
          <g font-family="'Fredoka', 'Nunito', sans-serif" font-weight="800" font-size="14">
            <g transform="translate(135, 575)">
              <rect x="-85" y="-16" width="170" height="28" rx="14" fill="#15803d" stroke="#ffffff" stroke-width="2.5"/>
              <text x="0" y="3" text-anchor="middle" fill="#ffffff">🏡 World 1: Meadow</text>
            </g>
            <g transform="translate(475, 108)">
              <rect x="-85" y="-16" width="170" height="28" rx="14" fill="#0369a1" stroke="#ffffff" stroke-width="2.5"/>
              <text x="0" y="3" text-anchor="middle" fill="#ffffff">🏖️ World 2: Coast</text>
            </g>
            <g transform="translate(645, 575)">
              <rect x="-85" y="-16" width="170" height="28" rx="14" fill="#6d28d9" stroke="#ffffff" stroke-width="2.5"/>
              <text x="0" y="3" text-anchor="middle" fill="#ffffff">🪄 World 3: Woods</text>
            </g>
            <g transform="translate(760, 62)">
              <rect x="-95" y="-16" width="190" height="28" rx="14" fill="#c2410c" stroke="#ffffff" stroke-width="2.5"/>
              <text x="0" y="3" text-anchor="middle" fill="#ffffff">🏰 World 4: Kingdom</text>
            </g>
          </g>

          <!-- Winding Overworld Paths -->
          ${roadUnderlayPaths}
          ${roadDashPaths}

          <!-- Level Nodes -->
          ${nodesMarkup}
        </svg>

        <!-- Animated Levi Character Token on the Overworld -->
        <div id="overworld-levi-token" class="overworld-levi-token" style="left: ${
          (startNode.mapX / 1000) * 100
        }%; top: ${(startNode.mapY / 620) * 100}%;">
          <div class="levi-token-inner">
            ${leviSvg}
            <div class="levi-token-name">LEVI</div>
          </div>
        </div>
      </div>
    `;

    // Bind click/tap events to unlocked nodes
    const nodeEls = containerEl.querySelectorAll('.map-node.unlocked');
    nodeEls.forEach((nodeEl) => {
      const handleActivate = () => {
        if (isWalking) return;
        const targetId = Number(nodeEl.getAttribute('data-level-id'));
        walkLeviToNode(targetId, () => {
          if (onSelectLevelCallback) {
            onSelectLevelCallback(targetId);
          }
        });
      };
      nodeEl.addEventListener('click', handleActivate);
      nodeEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleActivate();
        }
      });
    });

    // If we were asked to animate Levi walking from just-completed node to newly unlocked node
    if (animateFromNodeId && animateToNodeId && animateFromNodeId !== animateToNodeId) {
      setTimeout(() => {
        walkLeviToNode(animateToNodeId);
      }, 280);
    }
  }

  function walkLeviToNode(targetNodeId, onDone) {
    const levels = window.LeviLevels.LEVELS;
    const tokenEl = document.getElementById('overworld-levi-token');
    const targetNode = levels.find((l) => l.id === targetNodeId);
    if (!tokenEl || !targetNode) {
      currentLeviNodeId = targetNodeId;
      if (onDone) onDone();
      return;
    }

    if (currentLeviNodeId === targetNodeId) {
      if (window.LeviAudio) window.LeviAudio.playPop();
      if (onDone) onDone();
      return;
    }

    isWalking = true;
    tokenEl.classList.add('walking');

    // Step along intermediate nodes if adjacent, or direct smooth hop
    const diff = Math.abs(targetNodeId - currentLeviNodeId);
    const stepIds = [];
    if (diff <= 3) {
      const dir = targetNodeId > currentLeviNodeId ? 1 : -1;
      for (let id = currentLeviNodeId + dir; dir > 0 ? id <= targetNodeId : id >= targetNodeId; id += dir) {
        stepIds.push(id);
      }
    } else {
      stepIds.push(targetNodeId);
    }

    let idx = 0;
    function nextStep() {
      if (idx >= stepIds.length) {
        isWalking = false;
        tokenEl.classList.remove('walking');
        currentLeviNodeId = targetNodeId;
        if (onDone) setTimeout(onDone, 180);
        return;
      }
      const nextId = stepIds[idx++];
      const node = levels.find((l) => l.id === nextId);
      if (window.LeviAudio) window.LeviAudio.playFootstep();
      tokenEl.style.left = `${(node.mapX / 1000) * 100}%`;
      tokenEl.style.top = `${(node.mapY / 620) * 100}%`;
      setTimeout(nextStep, 340);
    }

    nextStep();
  }

  return {
    init,
    render,
    setLeviNode(id) {
      currentLeviNodeId = id;
    }
  };
})();
