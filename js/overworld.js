/**
 * Levi's Reading Adventure - 4-Island Mario-Style Overworld Map
 * Renders 4 distinct themed islands (16 levels per island = 64 levels total)
 * with winding paths, numbered level pads (1..16), star badges, and animated Levi.
 */

window.LeviOverworld = (function () {
  let containerEl = null;
  let onSelectLevelCallback = null;
  let currentLeviNodeId = 1;
  let isWalking = false;

  const ISLAND_THEMES = {
    1: {
      oceanTop: '#38bdf8',
      oceanMid: '#0ea5e9',
      oceanBot: '#0284c7',
      beach: '#fde68a',
      land1Top: '#86efac',
      land1Bot: '#22c55e',
      land2: '#fef08a',
      land3Top: '#a78bfa',
      land3Bot: '#7c3aed',
      land4Top: '#f8fafc',
      land4Bot: '#cbd5e1',
      castleRoof1: '#ec4899',
      castleRoof2: '#3b82f6'
    },
    2: {
      oceanTop: '#2dd4bf',
      oceanMid: '#14b8a6',
      oceanBot: '#0f766e',
      beach: '#fef08a',
      land1Top: '#fde047',
      land1Bot: '#eab308',
      land2: '#fed7aa',
      land3Top: '#6ee7b7',
      land3Bot: '#059669',
      land4Top: '#fca5a5',
      land4Bot: '#dc2626',
      castleRoof1: '#f59e0b',
      castleRoof2: '#10b981'
    },
    3: {
      oceanTop: '#818cf8',
      oceanMid: '#6366f1',
      oceanBot: '#4338ca',
      beach: '#e9d5ff',
      land1Top: '#c084fc',
      land1Bot: '#9333ea',
      land2: '#fbcfe8',
      land3Top: '#38bdf8',
      land3Bot: '#0284c7',
      land4Top: '#e2e8f0',
      land4Bot: '#94a3b8',
      castleRoof1: '#a855f7',
      castleRoof2: '#ec4899'
    },
    4: {
      oceanTop: '#fb923c',
      oceanMid: '#f97316',
      oceanBot: '#c2410c',
      beach: '#fef08a',
      land1Top: '#fcd34d',
      land1Bot: '#d97706',
      land2: '#fde68a',
      land3Top: '#f43f5e',
      land3Bot: '#be123c',
      land4Top: '#fef9c3',
      land4Bot: '#facc15',
      castleRoof1: '#eab308',
      castleRoof2: '#ef4444'
    }
  };

  function init(container, onSelectLevel) {
    containerEl = container;
    onSelectLevelCallback = onSelectLevel;
  }

  function isLevelUnlocked(lvl, progressState) {
    if (progressState.unlockAll) return true;
    // Level 1 of the current island is always playable when viewing that island,
    // and any level <= highestUnlocked (or whose previous level on the island is completed) is unlocked
    if (lvl.islandLevel === 1) return true;
    if (lvl.id <= progressState.highestUnlocked) return true;
    const prevGlobalId = lvl.id - 1;
    if (progressState.completed[prevGlobalId]) return true;
    return false;
  }

  function render(progressState, animateFromNodeId, animateToNodeId, onWalkComplete) {
    if (!containerEl) return;
    const islandId = progressState.currentIsland || 1;
    const theme = ISLAND_THEMES[islandId] || ISLAND_THEMES[1];
    const levels = window.LeviLevels.getLevelsByIsland(islandId);

    if (animateToNodeId && levels.some((l) => l.id === animateToNodeId)) {
      currentLeviNodeId =
        animateFromNodeId && levels.some((l) => l.id === animateFromNodeId)
          ? animateFromNodeId
          : animateToNodeId;
    } else if (!levels.some((l) => l.id === currentLeviNodeId)) {
      // Find highest unlocked level on this island
      let best = levels[0].id;
      levels.forEach((l) => {
        if (isLevelUnlocked(l, progressState)) {
          best = l.id;
        }
      });
      currentLeviNodeId = best;
    }

    // Build path segments between consecutive levels on this island
    let roadUnderlayPaths = '';
    let roadDashPaths = '';
    for (let i = 0; i < levels.length - 1; i++) {
      const a = levels[i];
      const b = levels[i + 1];
      const isCompletedSegment =
        progressState.unlockAll ||
        progressState.completed[a.id] ||
        isLevelUnlocked(b, progressState);
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

    // Build Level Nodes SVG groups (numbered 1..16 on each island)
    let nodesMarkup = '';
    levels.forEach((lvl) => {
      const isCompleted = !!progressState.completed[lvl.id];
      const isUnlocked = isLevelUnlocked(lvl, progressState);
      const nextLv = levels.find((x) => x.id === lvl.id + 1);
      const isNextToPlay =
        isUnlocked && !isCompleted && (!nextLv || !progressState.completed[nextLv.id]);

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
        ? `<circle cx="${lvl.mapX}" cy="${lvl.mapY}" r="38" fill="none" stroke="#fde047" stroke-width="5" class="map-node-pulse"/>`
        : '';

      const starBadge = isCompleted
        ? `<g transform="translate(${lvl.mapX + 22}, ${lvl.mapY - 22})">
             <circle cx="0" cy="0" r="13" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5"/>
             <text x="0" y="5" text-anchor="middle" font-size="15">⭐</text>
           </g>`
        : !isUnlocked
        ? `<g transform="translate(${lvl.mapX + 22}, ${lvl.mapY - 22})">
             <circle cx="0" cy="0" r="12" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
             <text x="0" y="4" text-anchor="middle" font-size="12">🔒</text>
           </g>`
        : '';

      nodesMarkup += `
        <g class="map-node ${isUnlocked ? 'unlocked' : 'locked'} ${
        isNextToPlay ? 'next-node' : ''
      }" data-level-id="${lvl.id}" tabindex="${isUnlocked ? '0' : '-1'}" role="button" aria-label="Level ${
        lvl.islandLevel
      }">
          ${pulseRing}
          <ellipse cx="${lvl.mapX}" cy="${lvl.mapY + 9}" rx="32" ry="21" fill="rgba(0,0,0,0.28)"/>
          <ellipse cx="${lvl.mapX}" cy="${lvl.mapY + 5}" rx="30" ry="19" fill="${padRim}" stroke="#2d231e" stroke-width="3"/>
          <ellipse cx="${lvl.mapX}" cy="${lvl.mapY}" rx="30" ry="19" fill="${padFill}" stroke="#2d231e" stroke-width="3"/>
          <ellipse cx="${lvl.mapX}" cy="${lvl.mapY - 2}" rx="22" ry="12" fill="rgba(255,255,255,0.28)"/>

          <!-- Local Island Level Number (1..16) -->
          <text x="${lvl.mapX}" y="${
        lvl.mapY + 7
      }" text-anchor="middle" font-family="'Fredoka', 'Nunito', sans-serif" font-weight="800" font-size="20" fill="#ffffff" stroke="#2d231e" stroke-width="3.5" paint-order="stroke">${
        lvl.islandLevel
      }</text>
          ${starBadge}
        </g>
      `;
    });

    const startNode = levels.find((l) => l.id === currentLeviNodeId) || levels[0];
    const leviSvg = window.LeviTargetSprites
      ? window.LeviTargetSprites.get('levi', { happy: true })
      : '';

    containerEl.innerHTML = `
      <div class="overworld-wrapper" style="background: ${theme.oceanMid};">
        <svg class="overworld-svg" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${theme.oceanTop}"/>
              <stop offset="60%" stop-color="${theme.oceanMid}"/>
              <stop offset="100%" stop-color="${theme.oceanBot}"/>
            </linearGradient>
            <linearGradient id="meadowGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="${theme.land1Top}"/>
              <stop offset="100%" stop-color="${theme.land1Bot}"/>
            </linearGradient>
            <linearGradient id="forestGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="${theme.land3Top}"/>
              <stop offset="100%" stop-color="${theme.land3Bot}"/>
            </linearGradient>
            <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${theme.land4Top}"/>
              <stop offset="100%" stop-color="${theme.land4Bot}"/>
            </linearGradient>
            <filter id="islandShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="10" stdDeviation="6" flood-color="rgba(0,0,0,0.35)" flood-opacity="0.5"/>
            </filter>
          </defs>

          <!-- Ocean Background -->
          <rect width="1000" height="620" fill="url(#oceanGrad)"/>

          <!-- Ocean Waves -->
          <g stroke="rgba(255,255,255,0.35)" stroke-width="3.5" stroke-linecap="round" fill="none" class="ocean-waves">
            <path d="M 40 90 Q 60 80 80 90 T 120 90"/>
            <path d="M 150 560 Q 170 550 190 560 T 230 560"/>
            <path d="M 430 570 Q 450 560 470 570 T 510 570"/>
            <path d="M 850 565 Q 870 555 890 565 T 930 565"/>
            <path d="M 620 75 Q 640 65 660 75 T 700 75"/>
          </g>

          <!-- Main Storybook Continent & Biome Regions -->
          <g filter="url(#islandShadow)">
            <path d="M 55 510 C 35 380, 90 240, 230 200 C 330 170, 420 110, 560 130 C 660 145, 730 90, 860 85 C 950 82, 975 180, 955 310 C 940 420, 950 510, 830 535 C 710 560, 580 555, 470 510 C 350 470, 260 555, 130 545 Z"
                  fill="${theme.beach}" stroke="#2d231e" stroke-width="5"/>

            <path d="M 75 495 C 60 385, 110 260, 245 220 C 340 190, 430 140, 550 155 C 640 170, 620 330, 520 430 C 420 510, 250 535, 130 525 Z"
                  fill="url(#meadowGrad)" stroke="#2d231e" stroke-width="4"/>

            <path d="M 440 165 C 520 135, 635 160, 650 255 C 660 325, 580 355, 515 310 C 460 270, 410 210, 440 165 Z"
                  fill="${theme.land2}" stroke="#eab308" stroke-width="3"/>

            <path d="M 485 450 C 510 340, 620 275, 735 285 C 815 295, 825 460, 745 520 C 665 565, 510 545, 485 450 Z"
                  fill="url(#forestGrad)" stroke="#2d231e" stroke-width="4"/>

            <path d="M 685 235 C 700 135, 790 95, 895 100 C 955 105, 955 285, 925 415 C 895 470, 800 440, 775 345 C 755 275, 680 285, 685 235 Z"
                  fill="url(#snowGrad)" stroke="#2d231e" stroke-width="4"/>
          </g>

          <!-- Decorative Landmarks -->
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

          <g stroke="#2d231e" stroke-width="2.8">
            <circle cx="165" cy="365" r="18" fill="#16a34a"/>
            <circle cx="152" cy="372" r="14" fill="#22c55e"/>
            <circle cx="305" cy="310" r="19" fill="#16a34a"/>
            <circle cx="420" cy="300" r="16" fill="#22c55e"/>
            <polygon points="600,435 616,395 632,435" fill="#4c1d95"/>
            <polygon points="785,465 802,420 819,465" fill="#5b21b6"/>
            <polygon points="780,150 795,112 810,150" fill="#e2e8f0"/>
            <polygon points="815,190 830,155 845,190" fill="#f1f5f9"/>
          </g>

          <g transform="translate(625, 195)" stroke="#2d231e" stroke-width="2.5">
            <path d="M 10 35 Q 15 15 12 0" fill="none" stroke="#92400e" stroke-width="5"/>
            <path d="M 12 2 Q -5 -5 -12 8" fill="none" stroke="#16a34a" stroke-width="5"/>
            <path d="M 12 2 Q 28 -5 34 8" fill="none" stroke="#16a34a" stroke-width="5"/>
            <path d="M 12 2 Q 12 -14 26 -10" fill="none" stroke="#22c55e" stroke-width="5"/>
          </g>

          <!-- Castle at Node 16 -->
          <g transform="translate(855, 42)" stroke="#2d231e" stroke-width="3">
            <rect x="12" y="34" width="56" height="44" fill="#f8fafc"/>
            <rect x="2" y="20" width="20" height="58" fill="#e2e8f0"/>
            <rect x="58" y="20" width="20" height="58" fill="#e2e8f0"/>
            <polygon points="-2,20 12,0 26,20" fill="${theme.castleRoof1}"/>
            <polygon points="54,20 68,0 82,20" fill="${theme.castleRoof1}"/>
            <polygon points="22,34 40,8 58,34" fill="${theme.castleRoof2}"/>
            <path d="M 30 78 L 30 56 A 10 10 0 0 1 50 56 L 50 78 Z" fill="#b45309"/>
            <path d="M 40 8 L 40 -6 L 56 -1 L 40 4" fill="#facc15"/>
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

    if (animateFromNodeId && animateToNodeId && animateFromNodeId !== animateToNodeId) {
      setTimeout(() => {
        walkLeviToNode(animateToNodeId, onWalkComplete);
      }, 220);
    } else if (onWalkComplete) {
      setTimeout(onWalkComplete, 220);
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

    const diff = Math.abs(targetNodeId - currentLeviNodeId);
    const stepIds = [];
    if (diff <= 3) {
      const dir = targetNodeId > currentLeviNodeId ? 1 : -1;
      for (
        let id = currentLeviNodeId + dir;
        dir > 0 ? id <= targetNodeId : id >= targetNodeId;
        id += dir
      ) {
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
