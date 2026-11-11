/**
 * Levi's Reading Adventure - Core Scene & Puzzle Engine
 * Clean, distraction-free reading comprehension experience for a 6-year-old.
 */

window.LeviGame = (function () {
  const STORAGE_KEY = 'levi_reading_adventure_save_v1';

  let state = {
    screen: 'overworld', // 'overworld' | 'scene'
    currentLevelId: 1,
    highestUnlocked: 1,
    completed: {}, // { [levelId]: true }
    stars: {}, // { [levelId]: number }
    playCounts: {}, // { [levelId]: number }
    unlockAll: false
  };

  let activePuzzle = null;
  let puzzleProgress = {};
  let selectedItemUid = null;
  let dragState = null;

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state.highestUnlocked = parsed.highestUnlocked || 1;
        state.completed = parsed.completed || {};
        state.stars = parsed.stars || {};
        state.playCounts = parsed.playCounts || {};
        state.unlockAll = !!parsed.unlockAll;
      }
    } catch (e) {
      // Ignore storage errors
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          highestUnlocked: state.highestUnlocked,
          completed: state.completed,
          stars: state.stars,
          playCounts: state.playCounts,
          unlockAll: state.unlockAll
        })
      );
    } catch (e) {
      // Ignore storage errors
    }
  }

  function init() {
    loadProgress();

    const mapContainer = document.getElementById('overworld-container');
    window.LeviOverworld.init(mapContainer, (levelId) => {
      startLevel(levelId);
    });

    bindGlobalUI();
    showOverworld();
  }

  function bindGlobalUI() {
    const btnMap = document.getElementById('btn-back-map');
    if (btnMap) {
      btnMap.addEventListener('click', () => {
        if (window.LeviAudio) window.LeviAudio.stopSpeech();
        showOverworld();
      });
    }

    const syncMuteButtons = (isMuted) => {
      ['btn-mute', 'btn-scene-mute'].forEach((id) => {
        const b = document.getElementById(id);
        if (b) {
          b.textContent = isMuted ? '🔇' : '🔊';
          b.setAttribute('aria-label', isMuted ? 'Unmute sound' : 'Mute sound');
        }
      });
    };

    ['btn-mute', 'btn-scene-mute'].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', () => {
          if (window.LeviAudio) {
            const isMuted = window.LeviAudio.toggleMute();
            syncMuteButtons(isMuted);
          }
        });
      }
    });

    const btnUnlockAll = document.getElementById('btn-unlock-all');
    if (btnUnlockAll) {
      updateUnlockAllButton(btnUnlockAll);
      btnUnlockAll.addEventListener('click', () => {
        state.unlockAll = !state.unlockAll;
        saveProgress();
        updateUnlockAllButton(btnUnlockAll);
        if (state.screen === 'overworld') {
          window.LeviOverworld.render(state);
        }
      });
    }
  }

  function updateUnlockAllButton(btn) {
    btn.textContent = state.unlockAll ? '🔓' : '🔒';
    btn.classList.toggle('active', state.unlockAll);
  }

  function showOverworld(animateFromId, animateToId) {
    state.screen = 'overworld';
    const topHeader = document.getElementById('top-header');
    if (topHeader) topHeader.classList.remove('hidden');

    document.getElementById('screen-overworld').classList.remove('hidden');
    document.getElementById('screen-scene').classList.add('hidden');

    window.LeviOverworld.render(state, animateFromId, animateToId);
  }

  function startLevel(levelId, forceRandom) {
    const levelDef = window.LeviLevels.getLevel(levelId);
    if (!levelDef) return;

    state.screen = 'scene';
    state.currentLevelId = levelId;
    window.LeviOverworld.setLeviNode(levelId);

    const topHeader = document.getElementById('top-header');
    if (topHeader) topHeader.classList.add('hidden');

    document.getElementById('screen-overworld').classList.add('hidden');
    document.getElementById('screen-scene').classList.remove('hidden');

    const playIdx = state.playCounts[levelId] || 0;
    state.playCounts[levelId] = playIdx + 1;
    saveProgress();

    const starterIndex = !forceRandom && playIdx < 3 ? playIdx : undefined;
    activePuzzle = levelDef.buildPuzzle(starterIndex);

    puzzleProgress = {
      completed: false,
      fedCount: 0,
      targetStates: {},
      lightTurnedOn: false,
      animalFed: false,
      pilotPlaced: false,
      buttonPressed: false,
      DynamicItems: activePuzzle.items.map((item) => ({ ...item, consumed: false }))
    };

    activePuzzle.targets.forEach((t) => {
      puzzleProgress.targetStates[t.id] = {
        open: false,
        lit: false,
        happy: false,
        bloomed: false,
        placedItems: []
      };
    });

    selectedItemUid = null;
    renderScene(levelDef);
  }

  function renderScene(levelDef) {
    renderSentenceBanner(activePuzzle.sentence);

    const victoryModal = document.getElementById('victory-overlay');
    if (victoryModal) {
      victoryModal.classList.add('hidden');
    }

    const stageEl = document.getElementById('scene-stage');
    stageEl.className = `scene-stage theme-${levelDef.theme}`;

    updateSceneDOM();
  }

  function renderSentenceBanner(sentenceText) {
    const bannerEl = document.getElementById('sentence-text-container');
    const cardEl = document.getElementById('sentence-card');
    if (cardEl) {
      cardEl.classList.remove('sentence-completed-reading');
    }

    const words = sentenceText.split(/\s+/);
    bannerEl.innerHTML = words
      .map((word, idx) => `<span class="sentence-word" data-word-idx="${idx}">${word}</span>`)
      .join(' ');

    // Allow tapping a single word to sound it out
    bannerEl.querySelectorAll('.sentence-word').forEach((wordEl) => {
      wordEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (puzzleProgress.completed) {
          speakCurrentSentenceAloud();
          return;
        }
        const rawWord = wordEl.textContent.replace(/[^a-zA-Z]/g, '');
        wordEl.classList.remove('word-tap-bounce');
        void wordEl.offsetWidth;
        wordEl.classList.add('word-tap-bounce');
        if (window.LeviAudio && rawWord) {
          window.LeviAudio.speakWord(rawWord);
        }
      });
    });
  }

  function updateSceneDOM() {
    const targetsZone = document.getElementById('scene-targets-zone');
    const itemsZone = document.getElementById('scene-items-zone');
    if (!targetsZone || !itemsZone) return;

    // Render Targets (Pure visual illustrations—no text labels)
    targetsZone.innerHTML = activePuzzle.targets
      .map((target) => {
        const tState = puzzleProgress.targetStates[target.id] || {};
        const spriteKey = target.spriteId || target.id;
        const svgMarkup = window.LeviTargetSprites
          ? window.LeviTargetSprites.get(spriteKey, tState)
          : '';

        const placedMarkup = (tState.placedItems || [])
          .map((itemObj) => {
            const itemSvg = window.LeviItemSprites ? window.LeviItemSprites.get(itemObj.id) : '';
            return `<div class="placed-item-sticker">${itemSvg}</div>`;
          })
          .join('');

        // Preview badge on beach mounds or garden sprouts
        let previewBadge = '';
        if (target.badgeItem) {
          const miniSvg = window.LeviItemSprites ? window.LeviItemSprites.get(target.badgeItem) : '';
          previewBadge = `<div class="target-preview-badge">${miniSvg}</div>`;
        } else if (target.plantId && !tState.bloomed) {
          const miniSvg = window.LeviItemSprites ? window.LeviItemSprites.get(target.plantId) : '';
          previewBadge = `<div class="target-preview-badge sprout-sign">${miniSvg}</div>`;
        }

        const isTappable =
          (target.role === 'container' && !tState.open) ||
          (target.role === 'light' && !tState.lit) ||
          (target.role === 'button' && !tState.lit);

        return `
          <div class="scene-target-card ${isTappable ? 'tappable-target' : ''} ${
          tState.happy ? 'target-happy' : ''
        } ${tState.lit ? 'target-lit' : ''}"
               data-target-id="${target.id}"
               role="button"
               tabindex="0"
               aria-label="${target.label}">
            <div class="target-art-wrap">
              ${svgMarkup}
              ${previewBadge}
              <div class="target-placed-layer">${placedMarkup}</div>
            </div>
          </div>
        `;
      })
      .join('');

    // Render Floor Items — keep consumed items in place with .item-consumed so remaining items never shift!
    itemsZone.innerHTML = puzzleProgress.DynamicItems.map((item) => {
      if (item.consumed) {
        return `<div class="scene-item-sticker item-consumed" aria-hidden="true"></div>`;
      }
      const svgMarkup = window.LeviItemSprites ? window.LeviItemSprites.get(item.id) : '';
      const isSelected = selectedItemUid === item.uid;
      return `
        <div class="scene-item-sticker ${isSelected ? 'selected-sticker' : ''} ${
        item.freshlySpawned ? 'spawn-pop' : ''
      }"
             data-item-uid="${item.uid}"
             data-item-id="${item.id}"
             role="button"
             tabindex="0"
             aria-label="${item.label}">
          <div class="item-art-wrap">${svgMarkup}</div>
        </div>
      `;
    }).join('');

    puzzleProgress.DynamicItems.forEach((it) => {
      it.freshlySpawned = false;
    });

    bindSceneInteractions();
  }

  function bindSceneInteractions() {
    const targetsZone = document.getElementById('scene-targets-zone');
    const itemsZone = document.getElementById('scene-items-zone');

    targetsZone.querySelectorAll('.scene-target-card').forEach((targetEl) => {
      targetEl.addEventListener('click', () => {
        if (puzzleProgress.completed) return;
        const targetId = targetEl.getAttribute('data-target-id');

        if (selectedItemUid) {
          const itemObj = puzzleProgress.DynamicItems.find((i) => i.uid === selectedItemUid);
          if (itemObj && !itemObj.consumed) {
            attemptItemOnTarget(itemObj, targetId, targetEl);
            return;
          }
        }

        handleDirectTargetTap(targetId, targetEl);
      });
    });

    itemsZone.querySelectorAll('.scene-item-sticker:not(.item-consumed)').forEach((itemEl) => {
      itemEl.addEventListener('pointerdown', onItemPointerDown);
    });
  }

  function onItemPointerDown(e) {
    if (puzzleProgress.completed) return;
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();

    const itemEl = e.currentTarget;
    const uid = itemEl.getAttribute('data-item-uid');
    const itemObj = puzzleProgress.DynamicItems.find((i) => i.uid === uid);
    if (!itemObj || itemObj.consumed) return;

    if (window.LeviAudio) window.LeviAudio.playPickup();

    const rect = itemEl.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;

    const ghost = itemEl.cloneNode(true);
    ghost.classList.add('dragging-ghost');
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    document.body.appendChild(ghost);

    itemEl.classList.add('dragging-source');

    dragState = {
      uid,
      itemObj,
      sourceEl: itemEl,
      ghostEl: ghost,
      startX,
      startY,
      offsetX: startX - rect.left,
      offsetY: startY - rect.top,
      moved: false,
      hoveredTargetEl: null
    };

    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  function onPointerMove(e) {
    if (!dragState) return;
    e.preventDefault();

    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    if (Math.hypot(dx, dy) > 8) {
      dragState.moved = true;
    }

    const x = e.clientX - dragState.offsetX;
    const y = e.clientY - dragState.offsetY;
    dragState.ghostEl.style.left = `${x}px`;
    dragState.ghostEl.style.top = `${y}px`;

    const hitTarget = findTargetCardAtPoint(e.clientX, e.clientY);
    if (dragState.hoveredTargetEl && dragState.hoveredTargetEl !== hitTarget) {
      dragState.hoveredTargetEl.classList.remove('drop-hover');
    }
    if (hitTarget) {
      hitTarget.classList.add('drop-hover');
    }
    dragState.hoveredTargetEl = hitTarget;
  }

  function onPointerUp(e) {
    if (!dragState) return;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);

    const { uid, itemObj, sourceEl, ghostEl, moved, hoveredTargetEl } = dragState;
    dragState = null;

    if (hoveredTargetEl) {
      hoveredTargetEl.classList.remove('drop-hover');
    }
    if (ghostEl && ghostEl.parentNode) {
      ghostEl.parentNode.removeChild(ghostEl);
    }
    if (sourceEl) {
      sourceEl.classList.remove('dragging-source');
    }

    const dropTarget = hoveredTargetEl || findTargetCardAtPoint(e.clientX, e.clientY);
    if (dropTarget) {
      const targetId = dropTarget.getAttribute('data-target-id');
      attemptItemOnTarget(itemObj, targetId, dropTarget);
    } else if (!moved) {
      selectedItemUid = selectedItemUid === uid ? null : uid;
      updateSceneDOM();
    } else {
      if (window.LeviAudio) window.LeviAudio.playDrop();
    }
  }

  function findTargetCardAtPoint(clientX, clientY) {
    const cards = document.querySelectorAll('.scene-target-card');
    for (let i = 0; i < cards.length; i++) {
      const r = cards[i].getBoundingClientRect();
      if (
        clientX >= r.left - 10 &&
        clientX <= r.right + 10 &&
        clientY >= r.top - 10 &&
        clientY <= r.bottom + 10
      ) {
        return cards[i];
      }
    }
    return null;
  }

  function handleDirectTargetTap(targetId, targetEl) {
    const targetDef = activePuzzle.targets.find((t) => t.id === targetId);
    if (!targetDef) return;
    const tState = puzzleProgress.targetStates[targetId];

    // 1. Opening a Container (Jar, Magic Box, Beach Hiding Spot, Castle Hiding Spot)
    if (targetDef.role === 'container') {
      if (tState.open) return;
      tState.open = true;
      if (window.LeviAudio) {
        window.LeviAudio.playPop();
        setTimeout(() => window.LeviAudio.playClink(), 90);
      }

      const spawnedId = targetDef.keyId;
      puzzleProgress.DynamicItems.push({
        uid: `spawned_${targetId}_${Date.now()}`,
        id: spawnedId,
        fromContainer: targetId,
        label: spawnedId,
        consumed: false,
        freshlySpawned: true
      });

      updateSceneDOM();
      return;
    }

    // 2. Campfire Light Switch
    if (targetDef.role === 'light') {
      if (targetId === activePuzzle.targetLight) {
        if (!tState.lit) {
          tState.lit = true;
          puzzleProgress.lightTurnedOn = true;
          if (window.LeviAudio) {
            window.LeviAudio.playSwitch();
            window.LeviAudio.playStepSuccess();
          }
          updateSceneDOM();
          checkCompoundCompletion();
        }
      } else {
        triggerGentleRejection(targetEl);
      }
      return;
    }

    // 3. Space Launch Button
    if (targetDef.role === 'button') {
      if (targetId === activePuzzle.targetButton) {
        if (!puzzleProgress.pilotPlaced) {
          triggerGentleRejection(targetEl);
          return;
        }
        tState.lit = true;
        puzzleProgress.buttonPressed = true;
        if (window.LeviAudio) {
          window.LeviAudio.playSwitch();
        }
        updateSceneDOM();
        checkCompoundCompletion();
      } else {
        triggerGentleRejection(targetEl);
      }
    }
  }

  function attemptItemOnTarget(itemObj, targetId, targetEl) {
    const pType = activePuzzle.type;
    const tState = puzzleProgress.targetStates[targetId];

    // ARCHETYPE 1: PLACE ("Put the banana on the chair.")
    if (pType === 'place') {
      if (itemObj.id === activePuzzle.targetItem && targetId === activePuzzle.targetDest) {
        itemObj.consumed = true;
        selectedItemUid = null;
        tState.happy = true;
        tState.lit = true;
        tState.placedItems.push(itemObj);
        if (window.LeviAudio) window.LeviAudio.playPop();
        updateSceneDOM();
        triggerPuzzleComplete();
      } else {
        triggerGentleRejection(targetEl);
      }
      return;
    }

    // ARCHETYPE 2: FEED ("Feed the horse two grapes.")
    if (pType === 'feed') {
      if (itemObj.id === activePuzzle.targetFood && targetId === activePuzzle.targetAnimal) {
        itemObj.consumed = true;
        selectedItemUid = null;
        puzzleProgress.fedCount += 1;
        tState.happy = true;
        if (window.LeviAudio) window.LeviAudio.playMunch();
        updateSceneDOM();

        if (puzzleProgress.fedCount >= activePuzzle.requiredCount) {
          triggerPuzzleComplete();
        }
      } else {
        triggerGentleRejection(targetEl);
      }
      return;
    }

    // ARCHETYPE 3: CONTAINER UNLOCK ("Use the key in the blue jar to open the red door.")
    if (pType === 'container_unlock') {
      if (
        itemObj.fromContainer === activePuzzle.targetContainer &&
        targetId === activePuzzle.targetDoor
      ) {
        itemObj.consumed = true;
        selectedItemUid = null;
        tState.open = true;
        tState.happy = true;
        if (window.LeviAudio) window.LeviAudio.playUnlock();
        updateSceneDOM();
        triggerPuzzleComplete();
      } else {
        triggerGentleRejection(targetEl);
      }
      return;
    }

    // ARCHETYPE 4: PIRATE DIG
    if (pType === 'dig') {
      const targetDef = activePuzzle.targets.find((t) => t.id === targetId);
      if (
        itemObj.fromContainer === activePuzzle.targetContainer &&
        targetDef &&
        targetDef.treasureId === activePuzzle.targetTreasure
      ) {
        itemObj.consumed = true;
        selectedItemUid = null;
        tState.open = true;
        tState.placedItems.push({ id: activePuzzle.targetTreasure });
        if (window.LeviAudio) window.LeviAudio.playUnlock();
        updateSceneDOM();
        triggerPuzzleComplete();
      } else {
        triggerGentleRejection(targetEl);
      }
      return;
    }

    // ARCHETYPE 5: WIZARD WAKE
    if (pType === 'wake') {
      if (
        itemObj.fromContainer === activePuzzle.targetContainer &&
        targetId === activePuzzle.targetSleeper
      ) {
        itemObj.consumed = true;
        selectedItemUid = null;
        tState.happy = true;
        tState.open = true;
        if (window.LeviAudio) window.LeviAudio.playUnlock();
        updateSceneDOM();
        triggerPuzzleComplete();
      } else {
        triggerGentleRejection(targetEl);
      }
      return;
    }

    // ARCHETYPE 6: GARDEN
    if (pType === 'garden') {
      if (
        itemObj.id === activePuzzle.targetCan &&
        targetId === activePuzzle.targetSprout &&
        !tState.bloomed
      ) {
        itemObj.consumed = true;
        selectedItemUid = null;
        tState.bloomed = true;
        tState.happy = true;
        if (window.LeviAudio) {
          window.LeviAudio.playSplash();
          window.LeviAudio.playStepSuccess();
        }
        const plantId = activePuzzle.targetPlant;
        puzzleProgress.DynamicItems.push({
          uid: `bloomed_${plantId}_${Date.now()}`,
          id: plantId,
          label: window.LeviLevels.LABELS[plantId].singular,
          consumed: false,
          freshlySpawned: true
        });
        updateSceneDOM();
        return;
      }

      if (itemObj.id === activePuzzle.targetPlant && targetId === activePuzzle.targetHolder) {
        itemObj.consumed = true;
        selectedItemUid = null;
        tState.happy = true;
        tState.placedItems.push(itemObj);
        if (window.LeviAudio) window.LeviAudio.playPop();
        updateSceneDOM();
        triggerPuzzleComplete();
        return;
      }

      triggerGentleRejection(targetEl);
      return;
    }

    // ARCHETYPE 7: CAMPFIRE
    if (pType === 'campfire') {
      if (itemObj.id === activePuzzle.targetSnack && targetId === activePuzzle.targetAnimal) {
        itemObj.consumed = true;
        selectedItemUid = null;
        tState.happy = true;
        tState.placedItems.push(itemObj);
        puzzleProgress.animalFed = true;
        if (window.LeviAudio) {
          window.LeviAudio.playMunch();
          window.LeviAudio.playStepSuccess();
        }
        updateSceneDOM();
        checkCompoundCompletion();
      } else {
        triggerGentleRejection(targetEl);
      }
      return;
    }

    // ARCHETYPE 8: SPACE
    if (pType === 'space') {
      if (itemObj.id === activePuzzle.targetPilot && targetId === activePuzzle.targetShip) {
        itemObj.consumed = true;
        selectedItemUid = null;
        tState.happy = true;
        tState.placedItems.push(itemObj);
        puzzleProgress.pilotPlaced = true;
        if (window.LeviAudio) {
          window.LeviAudio.playPop();
          window.LeviAudio.playStepSuccess();
        }
        updateSceneDOM();
        checkCompoundCompletion();
      } else {
        triggerGentleRejection(targetEl);
      }
      return;
    }

    // ARCHETYPE 9: CASTLE FINALE
    if (pType === 'castle_finale') {
      if (
        itemObj.fromContainer === activePuzzle.targetContainer &&
        targetId === activePuzzle.targetLock &&
        !tState.open
      ) {
        itemObj.consumed = true;
        selectedItemUid = null;
        tState.open = true;
        if (window.LeviAudio) {
          window.LeviAudio.playUnlock();
          window.LeviAudio.playStepSuccess();
        }
        const gemId = activePuzzle.targetGem;
        puzzleProgress.DynamicItems.push({
          uid: `gem_${gemId}_${Date.now()}`,
          id: gemId,
          label: window.LeviLevels.LABELS[gemId].singular,
          consumed: false,
          freshlySpawned: true
        });
        updateSceneDOM();
        return;
      }

      if (itemObj.id === activePuzzle.targetGem && targetId === activePuzzle.targetHero) {
        itemObj.consumed = true;
        selectedItemUid = null;
        tState.happy = true;
        tState.placedItems.push(itemObj);
        if (window.LeviAudio) window.LeviAudio.playPop();
        updateSceneDOM();
        triggerPuzzleComplete();
        return;
      }

      triggerGentleRejection(targetEl);
    }
  }

  function checkCompoundCompletion() {
    if (activePuzzle.type === 'campfire') {
      if (puzzleProgress.lightTurnedOn && puzzleProgress.animalFed) {
        triggerPuzzleComplete();
      }
    } else if (activePuzzle.type === 'space') {
      if (puzzleProgress.pilotPlaced && puzzleProgress.buttonPressed) {
        triggerPuzzleComplete();
      }
    }
  }

  function triggerGentleRejection(targetEl) {
    if (window.LeviAudio) window.LeviAudio.playError();
    if (targetEl) {
      targetEl.classList.remove('shake-error');
      void targetEl.offsetWidth;
      targetEl.classList.add('shake-error');
    }
  }

  /**
   * Called as soon as the puzzle action is completed!
   * Plays fanfare, bursts confetti, and READS THE SENTENCE ALOUD with karaoke word highlighting!
   */
  function triggerPuzzleComplete() {
    if (puzzleProgress.completed) return;
    puzzleProgress.completed = true;

    const lvlId = state.currentLevelId;
    state.completed[lvlId] = true;
    state.stars[lvlId] = Math.min(3, (state.stars[lvlId] || 0) + 1);
    if (lvlId >= state.highestUnlocked && lvlId < 16) {
      state.highestUnlocked = lvlId + 1;
    }
    saveProgress();

    if (window.LeviAudio) {
      window.LeviAudio.playVictoryFanfare();
    }
    spawnConfettiBurst();

    const cardEl = document.getElementById('sentence-card');
    if (cardEl) {
      cardEl.classList.add('sentence-completed-reading');
    }

    setTimeout(() => {
      speakCurrentSentenceAloud(() => {
        showVictoryOverlay();
      });
      setTimeout(() => {
        showVictoryOverlay();
      }, 1200);
    }, 450);
  }

  function speakCurrentSentenceAloud(onDone) {
    if (!window.LeviAudio || !activePuzzle) {
      if (onDone) onDone();
      return;
    }

    const wordEls = document.querySelectorAll('#sentence-text-container .sentence-word');
    wordEls.forEach((el) => el.classList.remove('word-speaking', 'word-spoken'));

    window.LeviAudio.speakSentence(activePuzzle.sentence, {
      rate: 0.9,
      onWord(wordIdx) {
        wordEls.forEach((el, idx) => {
          if (idx < wordIdx) {
            el.classList.remove('word-speaking');
            el.classList.add('word-spoken');
          } else if (idx === wordIdx) {
            el.classList.add('word-speaking');
          } else {
            el.classList.remove('word-speaking', 'word-spoken');
          }
        });
      },
      onEnd() {
        wordEls.forEach((el) => {
          el.classList.remove('word-speaking');
          el.classList.add('word-spoken');
        });
        if (onDone) onDone();
      }
    });
  }

  /**
   * Minimal completion screen: just stars and a "Level N" button!
   */
  function showVictoryOverlay() {
    const victoryModal = document.getElementById('victory-overlay');
    if (!victoryModal || !victoryModal.classList.contains('hidden')) return;

    const nextLevelId = state.currentLevelId < 16 ? state.currentLevelId + 1 : 1;
    const isFinalLevel = state.currentLevelId === 16;

    victoryModal.innerHTML = `
      <div class="victory-banner-card">
        <div class="victory-stars-row">⭐ 🌟 ⭐</div>
        <div class="victory-buttons-row">
          <button type="button" class="btn-game btn-primary btn-next-level" id="btn-victory-next">
            ${isFinalLevel ? '🗺️' : `Level ${nextLevelId} ➔`}
          </button>
        </div>
      </div>
    `;
    victoryModal.classList.remove('hidden');

    document.getElementById('btn-victory-next').addEventListener('click', () => {
      if (window.LeviAudio) {
        window.LeviAudio.stopSpeech();
        window.LeviAudio.playPop();
      }
      const fromId = state.currentLevelId;
      const toId = state.currentLevelId < 16 ? state.currentLevelId + 1 : 16;
      showOverworld(fromId, toId);
    });
  }

  function spawnConfettiBurst() {
    const container = document.getElementById('confetti-layer');
    if (!container) return;
    container.innerHTML = '';

    const colors = ['#facc15', '#f97316', '#22c55e', '#38bdf8', '#ec4899', '#a855f7'];
    for (let i = 0; i < 42; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${15 + Math.random() * 70}%`;
      piece.style.backgroundColor = colors[i % colors.length];
      piece.style.setProperty('--dx', `${(Math.random() - 0.5) * 340}px`);
      piece.style.setProperty('--dy', `${-140 - Math.random() * 220}px`);
      piece.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
      piece.style.animationDelay = `${Math.random() * 0.18}s`;
      container.appendChild(piece);
    }

    setTimeout(() => {
      container.innerHTML = '';
    }, 2400);
  }

  return {
    init,
    startLevel,
    showOverworld
  };
})();

window.addEventListener('DOMContentLoaded', () => {
  window.LeviGame.init();
});
