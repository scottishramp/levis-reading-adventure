/**
 * Levi's Reading Adventure - 4 Islands x 16 Levels (64 Levels Total)
 * Island 1: Gentle 1-step reading comprehension (short, direct sentences)
 * Island 2: Medium comprehension (adjectives, counting to 3, 2-step container/tool puzzles)
 * Island 3: Compound actions ("and" / "then" two-part puzzles)
 * Island 4: Master Reader quests & 3-step Royal Castle adventures
 */

window.LeviLevels = (function () {
  function pick(arr, exclude) {
    const filtered = exclude !== undefined ? arr.filter((x) => x !== exclude) : arr;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  function shuffle(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  const NUMBER_WORDS = {
    1: 'one',
    2: 'two',
    3: 'three'
  };

  const LABELS = {
    // Fruits & Veggies
    banana: { singular: 'banana', plural: 'bananas' },
    apple: { singular: 'apple', plural: 'apples' },
    pear: { singular: 'pear', plural: 'pears' },
    watermelon: { singular: 'watermelon', plural: 'watermelons' },
    pineapple: { singular: 'pineapple', plural: 'pineapples' },
    grapes: { singular: 'grape', plural: 'grapes', singleClusterLabel: 'grapes' },
    carrot: { singular: 'carrot', plural: 'carrots' },
    strawberry: { singular: 'strawberry', plural: 'strawberries' },
    mango: { singular: 'mango', plural: 'mangoes' },
    lemon: { singular: 'lemon', plural: 'lemons' },

    // Foods
    cheese: { singular: 'cheese', plural: 'cheeses' },
    pancake: { singular: 'pancake', plural: 'pancakes' },
    cupcake: { singular: 'cupcake', plural: 'cupcakes' },
    pizza: { singular: 'pizza', plural: 'pizzas' },
    cookie: { singular: 'cookie', plural: 'cookies' },
    taco: { singular: 'taco', plural: 'tacos' },
    donut: { singular: 'donut', plural: 'donuts' },
    marshmallow: { singular: 'marshmallow', plural: 'marshmallows' },
    hot_dog: { singular: 'hot dog', plural: 'hot dogs' },

    // Toys & Bedroom
    teddy_bear: { singular: 'teddy bear' },
    robot: { singular: 'robot' },
    dinosaur: { singular: 'dinosaur' },
    sock: { singular: 'sock' },
    crown: { singular: 'crown' },

    // Clothing & Vehicle parts
    red_hat: { singular: 'red hat' },
    blue_scarf: { singular: 'blue scarf' },
    green_mittens: { singular: 'green mittens' },
    yellow_boots: { singular: 'yellow boots' },
    party_hat: { singular: 'party hat' },
    bow_tie: { singular: 'bow tie' },
    sunglasses: { singular: 'sunglasses' },
    big_wheels: { singular: 'big wheels' },
    jet_wings: { singular: 'jet wings' },
    shiny_horn: { singular: 'shiny horn' },
    gold_star: { singular: 'gold star', plural: 'gold stars' },

    // Treasures & Flowers
    gold_chest: { singular: 'gold chest' },
    pink_shell: { singular: 'pink shell' },
    silver_star: { singular: 'silver star' },
    diamond: { singular: 'diamond' },
    ruby: { singular: 'ruby' },
    sunflower: { singular: 'sunflower' },
    rose: { singular: 'rose' },
    pumpkin: { singular: 'pumpkin' },

    // Space characters
    astronaut: { singular: 'astronaut' },
    alien: { singular: 'alien' },

    // Targets
    chair: 'chair',
    lamp: 'lamp',
    table: 'table',
    sofa: 'sofa',
    rug: 'rug',
    toy_box: 'toy box',
    bed: 'bed',
    laundry_basket: 'laundry basket',
    bookshelf: 'bookshelf',
    fishbowl: 'fishbowl',
    blue_plate: 'blue plate',
    green_plate: 'green plate',
    red_pan: 'red pan',
    toaster: 'toaster',
    fridge: 'fridge',

    // Animals & Monsters
    horse: 'horse',
    pig: 'pig',
    cow: 'cow',
    monkey: 'monkey',
    hippo: 'hippo',
    parrot: 'parrot',
    green_monster: 'green monster',
    purple_monster: 'purple monster',
    orange_monster: 'orange monster',
    fox: 'fox',
    bear: 'bear',
    brown_bear: 'brown bear',
    owl: 'owl',
    spotted_dog: 'spotted dog',
    white_cat: 'white cat',
    fluffy_bunny: 'fluffy bunny',
    tall_snowman: 'tall snowman',
    little_snowman: 'little snowman',

    // Containers & Doors
    jar_blue: 'blue jar',
    jar_green: 'green jar',
    jar_yellow: 'yellow jar',
    door_red: 'red door',
    door_purple: 'purple door',
    door_orange: 'orange door',
    palm_tree: 'palm tree',
    big_rock: 'big rock',
    red_umbrella: 'red umbrella',
    star_box: 'star box',
    moon_box: 'moon box',
    sun_box: 'sun box',
    sleeping_frog: 'sleeping frog',
    stone_owl: 'stone owl',
    baby_dragon: 'baby dragon',
    red_car: 'red car',
    blue_truck: 'blue truck',
    yellow_bus: 'yellow bus',
    yellow_flashlight: 'yellow flashlight',
    red_lantern: 'red lantern',
    blue_lamp: 'blue lamp',
    can_blue: 'blue watering can',
    can_red: 'red watering can',
    can_green: 'green watering can',
    basket: 'basket',
    wagon: 'wagon',
    wheelbarrow: 'wheelbarrow',
    silver_rocket: 'silver rocket',
    green_saucer: 'green saucer',
    blue_rover: 'blue rover',
    button_green: 'green button',
    button_purple: 'purple button',
    button_yellow: 'yellow button',
    royal_pillow: 'royal pillow',
    gold_crown_stand: 'gold crown',
    red_shield: 'red shield',
    treasure_chest: 'treasure chest',
    castle_gate: 'castle gate',
    magic_book: 'magic book',
    king: 'king',
    dragon: 'dragon',
    knight: 'knight'
  };

  // Node coordinates on the 1000x620 SVG Overworld Map (16 nodes per island)
  const ISLAND_COORDS = [
    { mapX: 110, mapY: 490 },
    { mapX: 230, mapY: 450 },
    { mapX: 345, mapY: 390 },
    { mapX: 235, mapY: 310 },
    { mapX: 360, mapY: 230 },
    { mapX: 485, mapY: 185 },
    { mapX: 590, mapY: 260 },
    { mapX: 495, mapY: 365 },
    { mapX: 540, mapY: 485 },
    { mapX: 665, mapY: 495 },
    { mapX: 735, mapY: 390 },
    { mapX: 660, mapY: 295 },
    { mapX: 735, mapY: 185 },
    { mapX: 835, mapY: 250 },
    { mapX: 890, mapY: 380 },
    { mapX: 895, mapY: 140 }
  ];

  // Reusable puzzle builder factories
  function makePlacePuzzle(itemsPool, targetsPool, starterCombos, sentenceFn) {
    return function (useStarterIndex) {
      const combo =
        useStarterIndex !== undefined && starterCombos[useStarterIndex]
          ? starterCombos[useStarterIndex]
          : { item: pick(itemsPool), target: pick(targetsPool) };

      const sentence = sentenceFn
        ? sentenceFn(combo.item, combo.target)
        : `Put the ${LABELS[combo.item].singular} on the ${LABELS[combo.target]}.`;

      return {
        type: 'place',
        sentence,
        targetItem: combo.item,
        targetDest: combo.target,
        targets: targetsPool.map((id) => ({ id, label: LABELS[id] })),
        items: shuffle(itemsPool).map((id, idx) => ({
          uid: `${id}_${idx}`,
          id,
          label: LABELS[id].singular
        }))
      };
    };
  }

  function makeFeedPuzzle(animalsPool, foodsPool, countsPool, starterCombos, verb = 'Feed') {
    return function (useStarterIndex) {
      const combo =
        useStarterIndex !== undefined && starterCombos[useStarterIndex]
          ? starterCombos[useStarterIndex]
          : {
              animal: pick(animalsPool),
              count: pick(countsPool),
              food: pick(foodsPool)
            };

      const numWord = NUMBER_WORDS[combo.count];
      const foodWord =
        combo.count === 1
          ? LABELS[combo.food].singleClusterLabel || LABELS[combo.food].singular
          : LABELS[combo.food].plural;
      const sentence = `${verb} the ${LABELS[combo.animal]} ${numWord} ${foodWord}.`;

      const otherFoods = shuffle(foodsPool.filter((f) => f !== combo.food)).slice(0, 2);
      const itemInstances = [];
      for (let i = 0; i < 3; i++) {
        itemInstances.push({
          uid: `${combo.food}_req_${i}`,
          id: combo.food,
          label: LABELS[combo.food].singular
        });
      }
      otherFoods.forEach((fId) => {
        itemInstances.push({ uid: `${fId}_dist_0`, id: fId, label: LABELS[fId].singular });
      });

      return {
        type: 'feed',
        sentence,
        targetAnimal: combo.animal,
        targetFood: combo.food,
        requiredCount: combo.count,
        targets: animalsPool.map((id) => ({ id, label: LABELS[id] })),
        items: shuffle(itemInstances)
      };
    };
  }

  function makeTapLightPuzzle(lightsPool, starterLights) {
    return function (useStarterIndex) {
      const targetLight =
        useStarterIndex !== undefined && starterLights[useStarterIndex]
          ? starterLights[useStarterIndex]
          : pick(lightsPool);
      const sentence = `Turn on the ${LABELS[targetLight]}.`;
      return {
        type: 'tap_light',
        sentence,
        targetLight,
        targets: lightsPool.map((l) => ({
          id: l,
          label: LABELS[l],
          role: 'light'
        })),
        items: []
      };
    };
  }

  function makeContainerUnlockPuzzle(starterCombos) {
    const containersPool = [
      { id: 'jar_blue', keyId: 'key_blue' },
      { id: 'jar_green', keyId: 'key_green' },
      { id: 'jar_yellow', keyId: 'key_yellow' }
    ];
    const doorsPool = ['door_red', 'door_purple', 'door_orange'];
    return function (useStarterIndex) {
      const combo =
        useStarterIndex !== undefined && starterCombos[useStarterIndex]
          ? starterCombos[useStarterIndex]
          : { jar: pick(containersPool).id, door: pick(doorsPool) };

      const jarObj = containersPool.find((c) => c.id === combo.jar);
      const sentence = `Use the key in the ${LABELS[combo.jar]} to open the ${LABELS[combo.door]}.`;

      return {
        type: 'container_unlock',
        sentence,
        targetContainer: combo.jar,
        targetKey: jarObj.keyId,
        targetDoor: combo.door,
        targets: [
          ...doorsPool.map((d) => ({ id: d, label: LABELS[d], role: 'door' })),
          ...containersPool.map((c) => ({
            id: c.id,
            keyId: c.keyId,
            label: LABELS[c.id],
            role: 'container'
          }))
        ],
        items: []
      };
    };
  }

  function makeDigPuzzle(starterCombos) {
    const hidingPool = ['palm_tree', 'big_rock', 'red_umbrella'];
    const treasuresPool = ['gold_chest', 'pink_shell', 'silver_star'];
    return function (useStarterIndex) {
      const combo =
        useStarterIndex !== undefined && starterCombos[useStarterIndex]
          ? starterCombos[useStarterIndex]
          : { spot: pick(hidingPool), treasure: pick(treasuresPool) };

      const sentence = `Use the shovel under the ${LABELS[combo.spot]} to dig up the ${LABELS[combo.treasure].singular}.`;
      return {
        type: 'dig',
        sentence,
        targetContainer: combo.spot,
        targetTreasure: combo.treasure,
        targets: [
          ...treasuresPool.map((t) => ({
            id: `mound_${t}`,
            treasureId: t,
            spriteId: 'dig_spot',
            badgeItem: t,
            label: `${LABELS[t].singular} spot`,
            role: 'mound'
          })),
          ...hidingPool.map((h) => ({
            id: h,
            keyId: 'shovel',
            label: LABELS[h],
            role: 'container'
          }))
        ],
        items: []
      };
    };
  }

  function makeWakePuzzle(starterCombos) {
    const boxesPool = ['star_box', 'moon_box', 'sun_box'];
    const sleepersPool = ['sleeping_frog', 'stone_owl', 'baby_dragon'];
    return function (useStarterIndex) {
      const combo =
        useStarterIndex !== undefined && starterCombos[useStarterIndex]
          ? starterCombos[useStarterIndex]
          : { box: pick(boxesPool), sleeper: pick(sleepersPool) };

      const sentence = `Use the wand in the ${LABELS[combo.box]} to wake up the ${LABELS[combo.sleeper]}.`;
      return {
        type: 'wake',
        sentence,
        targetContainer: combo.box,
        targetSleeper: combo.sleeper,
        targets: [
          ...sleepersPool.map((s) => ({ id: s, label: LABELS[s], role: 'sleeper' })),
          ...boxesPool.map((b) => ({ id: b, keyId: 'wand', label: LABELS[b], role: 'container' }))
        ],
        items: []
      };
    };
  }

  function makeCastleUnlock2StepPuzzle(starterCombos) {
    const hidingPool = ['royal_pillow', 'gold_crown_stand', 'red_shield'];
    const locksPool = ['treasure_chest', 'castle_gate', 'magic_book'];
    return function (useStarterIndex) {
      const combo =
        useStarterIndex !== undefined && starterCombos[useStarterIndex]
          ? starterCombos[useStarterIndex]
          : { spot: pick(hidingPool), lock: pick(locksPool) };

      const sentence = `Use the key under the ${LABELS[combo.spot]} to open the ${LABELS[combo.lock]}.`;
      return {
        type: 'container_unlock',
        sentence,
        targetContainer: combo.spot,
        targetKey: 'key_gold',
        targetDoor: combo.lock,
        targets: [
          ...locksPool.map((l) => ({ id: l, label: LABELS[l], role: 'door' })),
          ...hidingPool.map((h) => ({ id: h, keyId: 'key_gold', label: LABELS[h], role: 'container' }))
        ],
        items: []
      };
    };
  }

  function makeCampfirePuzzle(starterCombos) {
    const lightsPool = ['yellow_flashlight', 'red_lantern', 'blue_lamp'];
    const snacksPool = ['marshmallow', 'hot_dog', 'apple', 'cookie'];
    const animalsPool = ['fox', 'bear', 'owl'];
    return function (useStarterIndex) {
      const combo =
        useStarterIndex !== undefined && starterCombos[useStarterIndex]
          ? starterCombos[useStarterIndex]
          : { light: pick(lightsPool), snack: pick(snacksPool), animal: pick(animalsPool) };

      const sentence = `Turn on the ${LABELS[combo.light]} and give the ${LABELS[combo.snack].singular} to the ${LABELS[combo.animal]}.`;
      return {
        type: 'campfire',
        sentence,
        targetLight: combo.light,
        targetSnack: combo.snack,
        targetAnimal: combo.animal,
        targets: [
          ...lightsPool.map((l) => ({ id: l, label: LABELS[l], role: 'light' })),
          ...animalsPool.map((a) => ({ id: a, label: LABELS[a], role: 'animal' }))
        ],
        items: shuffle(snacksPool).map((id, idx) => ({
          uid: `${id}_${idx}`,
          id,
          label: LABELS[id].singular
        }))
      };
    };
  }

  function makeGardenPuzzle(starterCombos) {
    const cansPool = ['can_blue', 'can_red', 'can_green'];
    const plantsPool = ['sunflower', 'rose', 'pumpkin'];
    const holdersPool = ['basket', 'wagon', 'wheelbarrow'];
    return function (useStarterIndex) {
      const combo =
        useStarterIndex !== undefined && starterCombos[useStarterIndex]
          ? starterCombos[useStarterIndex]
          : { can: pick(cansPool), plant: pick(plantsPool), holder: pick(holdersPool) };

      const sentence = `Use the ${LABELS[combo.can]} to grow the ${LABELS[combo.plant].singular}, then put it in the ${LABELS[combo.holder]}.`;
      return {
        type: 'garden',
        sentence,
        targetCan: combo.can,
        targetPlant: combo.plant,
        targetSprout: `sprout_${combo.plant}`,
        targetHolder: combo.holder,
        targets: [
          ...plantsPool.map((p) => ({
            id: `sprout_${p}`,
            plantId: p,
            label: `${LABELS[p].singular} sprout`,
            role: 'sprout'
          })),
          ...holdersPool.map((h) => ({ id: h, label: LABELS[h], role: 'holder' }))
        ],
        items: shuffle(cansPool).map((id, idx) => ({
          uid: `${id}_${idx}`,
          id,
          label: LABELS[id]
        }))
      };
    };
  }

  function makeSpacePuzzle(starterCombos) {
    const pilotsPool = ['astronaut', 'alien', 'robot'];
    const shipsPool = ['silver_rocket', 'green_saucer', 'blue_rover'];
    const buttonsPool = ['button_green', 'button_purple', 'button_yellow'];
    return function (useStarterIndex) {
      const combo =
        useStarterIndex !== undefined && starterCombos[useStarterIndex]
          ? starterCombos[useStarterIndex]
          : { pilot: pick(pilotsPool), ship: pick(shipsPool), button: pick(buttonsPool) };

      const sentence = `Put the ${LABELS[combo.pilot].singular} in the ${LABELS[combo.ship]} and press the ${LABELS[combo.button]}.`;
      return {
        type: 'space',
        sentence,
        targetPilot: combo.pilot,
        targetShip: combo.ship,
        targetButton: combo.button,
        targets: [
          ...shipsPool.map((s) => ({ id: s, label: LABELS[s], role: 'ship' })),
          ...buttonsPool.map((b) => ({ id: b, label: LABELS[b], role: 'button' }))
        ],
        items: shuffle(pilotsPool).map((id, idx) => ({
          uid: `${id}_${idx}`,
          id,
          label: LABELS[id].singular
        }))
      };
    };
  }

  function makeCastleFinalePuzzle(starterCombos) {
    const hidingPool = ['royal_pillow', 'gold_crown_stand', 'red_shield'];
    const locksPool = [
      { id: 'treasure_chest', gem: 'diamond' },
      { id: 'castle_gate', gem: 'ruby' },
      { id: 'magic_book', gem: 'silver_star' }
    ];
    const heroesPool = ['king', 'dragon', 'knight'];
    return function (useStarterIndex) {
      const combo =
        useStarterIndex !== undefined && starterCombos[useStarterIndex]
          ? starterCombos[useStarterIndex]
          : { spot: pick(hidingPool), lock: pick(locksPool).id, hero: pick(heroesPool) };

      const lockObj = locksPool.find((l) => l.id === combo.lock);
      const gemId = lockObj.gem;
      const sentence = `Use the key under the ${LABELS[combo.spot]} to open the ${LABELS[combo.lock]}, then give the ${LABELS[gemId].singular} to the ${LABELS[combo.hero]}.`;
      return {
        type: 'castle_finale',
        sentence,
        targetContainer: combo.spot,
        targetLock: combo.lock,
        targetGem: gemId,
        targetHero: combo.hero,
        targets: [
          ...locksPool.map((l) => ({ id: l.id, gemId: l.gem, label: LABELS[l.id], role: 'lock' })),
          ...heroesPool.map((h) => ({ id: h, label: LABELS[h], role: 'hero' })),
          ...hidingPool.map((h) => ({
            id: h,
            keyId: 'key_gold',
            label: LABELS[h],
            role: 'container'
          }))
        ],
        items: []
      };
    };
  }

  const ISLANDS = [
    { id: 1, name: 'Island 1', oceanTop: '#38bdf8', oceanBot: '#0284c7', landMain: '#4ade80' },
    { id: 2, name: 'Island 2', oceanTop: '#2dd4bf', oceanBot: '#0d9488', landMain: '#facc15' },
    { id: 3, name: 'Island 3', oceanTop: '#818cf8', oceanBot: '#4f46e5', landMain: '#a78bfa' },
    { id: 4, name: 'Island 4', oceanTop: '#fb923c', oceanBot: '#e11d48', landMain: '#fcd34d' }
  ];

  // =========================================================================
  // ISLAND 1 (Levels 1 - 16): Gentle, Short, Direct 1-Step Sentences!
  // =========================================================================
  const ISLAND_1_DEFS = [
    {
      theme: 'living_room',
      buildPuzzle: makePlacePuzzle(
        ['banana', 'apple', 'pear', 'lemon', 'pineapple'],
        ['chair', 'lamp', 'table', 'sofa', 'rug'],
        [
          { item: 'banana', target: 'chair' },
          { item: 'apple', target: 'lamp' },
          { item: 'pear', target: 'table' }
        ]
      )
    },
    {
      theme: 'barn',
      buildPuzzle: makeFeedPuzzle(
        ['horse', 'pig', 'cow'],
        ['grapes', 'apple', 'carrot', 'strawberry'],
        [2, 1],
        [
          { animal: 'horse', count: 2, food: 'grapes' },
          { animal: 'pig', count: 2, food: 'apple' },
          { animal: 'cow', count: 1, food: 'carrot' }
        ]
      )
    },
    {
      theme: 'bedroom',
      buildPuzzle: makePlacePuzzle(
        ['teddy_bear', 'robot', 'dinosaur', 'sock', 'crown'],
        ['toy_box', 'bed', 'laundry_basket', 'bookshelf', 'fishbowl'],
        [
          { item: 'dinosaur', target: 'bed' },
          { item: 'teddy_bear', target: 'toy_box' },
          { item: 'robot', target: 'bookshelf' }
        ],
        (item, target) =>
          `Put the ${LABELS[item].singular} ${
            target === 'bed' || target === 'bookshelf' ? 'on' : 'in'
          } the ${LABELS[target]}.`
      )
    },
    {
      theme: 'kitchen',
      buildPuzzle: makePlacePuzzle(
        ['cheese', 'pancake', 'carrot', 'cupcake', 'pizza'],
        ['blue_plate', 'green_plate', 'red_pan', 'toaster', 'fridge'],
        [
          { item: 'pancake', target: 'blue_plate' },
          { item: 'pizza', target: 'red_pan' },
          { item: 'cupcake', target: 'green_plate' }
        ],
        (item, target) =>
          `Put the ${LABELS[item].singular} ${target === 'fridge' ? 'in' : 'on'} the ${LABELS[target]}.`
      )
    },
    {
      theme: 'jungle',
      buildPuzzle: makeFeedPuzzle(
        ['monkey', 'hippo', 'parrot'],
        ['banana', 'lemon', 'cookie', 'mango'],
        [2, 1],
        [
          { animal: 'hippo', count: 2, food: 'lemon' },
          { animal: 'monkey', count: 2, food: 'banana' },
          { animal: 'parrot', count: 1, food: 'cookie' }
        ]
      )
    },
    {
      theme: 'party',
      buildPuzzle: makePlacePuzzle(
        ['party_hat', 'bow_tie', 'sunglasses', 'crown'],
        ['spotted_dog', 'white_cat', 'fluffy_bunny'],
        [
          { item: 'party_hat', target: 'white_cat' },
          { item: 'bow_tie', target: 'fluffy_bunny' },
          { item: 'sunglasses', target: 'spotted_dog' }
        ]
      )
    },
    {
      theme: 'living_room',
      buildPuzzle: makePlacePuzzle(
        ['lemon', 'pineapple', 'banana', 'pear', 'apple'],
        ['sofa', 'rug', 'table', 'chair', 'lamp'],
        [
          { item: 'lemon', target: 'sofa' },
          { item: 'pineapple', target: 'rug' },
          { item: 'banana', target: 'table' }
        ]
      )
    },
    {
      theme: 'snow',
      buildPuzzle: makePlacePuzzle(
        ['red_hat', 'blue_scarf', 'green_mittens', 'yellow_boots'],
        ['tall_snowman', 'little_snowman', 'brown_bear'],
        [
          { item: 'red_hat', target: 'tall_snowman' },
          { item: 'blue_scarf', target: 'little_snowman' },
          { item: 'yellow_boots', target: 'brown_bear' }
        ]
      )
    },
    {
      theme: 'picnic',
      buildPuzzle: makeFeedPuzzle(
        ['green_monster', 'purple_monster', 'orange_monster'],
        ['cupcake', 'taco', 'pizza', 'donut'],
        [2, 1],
        [
          { animal: 'purple_monster', count: 2, food: 'taco' },
          { animal: 'green_monster', count: 2, food: 'cupcake' },
          { animal: 'orange_monster', count: 1, food: 'donut' }
        ],
        'Give'
      )
    },
    {
      theme: 'garage',
      buildPuzzle: makePlacePuzzle(
        ['big_wheels', 'jet_wings', 'shiny_horn', 'crown'],
        ['red_car', 'blue_truck', 'yellow_bus'],
        [
          { item: 'big_wheels', target: 'blue_truck' },
          { item: 'jet_wings', target: 'red_car' },
          { item: 'shiny_horn', target: 'yellow_bus' }
        ]
      )
    },
    {
      theme: 'campfire',
      buildPuzzle: makePlacePuzzle(
        ['marshmallow', 'hot_dog', 'apple', 'cookie'],
        ['fox', 'bear', 'owl'],
        [
          { item: 'marshmallow', target: 'fox' },
          { item: 'hot_dog', target: 'bear' },
          { item: 'apple', target: 'owl' }
        ],
        (item, target) => `Give the ${LABELS[item].singular} to the ${LABELS[target]}.`
      )
    },
    {
      theme: 'beach',
      buildPuzzle: makePlacePuzzle(
        ['gold_chest', 'pink_shell', 'silver_star', 'pineapple'],
        ['palm_tree', 'big_rock', 'red_umbrella'],
        [
          { item: 'pink_shell', target: 'big_rock' },
          { item: 'gold_chest', target: 'palm_tree' },
          { item: 'silver_star', target: 'red_umbrella' }
        ],
        (item, target) => `Put the ${LABELS[item].singular} by the ${LABELS[target]}.`
      )
    },
    {
      theme: 'space',
      buildPuzzle: makePlacePuzzle(
        ['astronaut', 'alien', 'robot'],
        ['silver_rocket', 'green_saucer', 'blue_rover'],
        [
          { item: 'astronaut', target: 'silver_rocket' },
          { item: 'alien', target: 'green_saucer' },
          { item: 'robot', target: 'blue_rover' }
        ],
        (item, target) => `Put the ${LABELS[item].singular} in the ${LABELS[target]}.`
      )
    },
    {
      theme: 'garden',
      buildPuzzle: makePlacePuzzle(
        ['sunflower', 'rose', 'pumpkin', 'carrot'],
        ['basket', 'wagon', 'wheelbarrow'],
        [
          { item: 'sunflower', target: 'basket' },
          { item: 'rose', target: 'wagon' },
          { item: 'pumpkin', target: 'wheelbarrow' }
        ],
        (item, target) => `Put the ${LABELS[item].singular} in the ${LABELS[target]}.`
      )
    },
    {
      theme: 'campfire',
      buildPuzzle: makeTapLightPuzzle(
        ['yellow_flashlight', 'red_lantern', 'blue_lamp'],
        ['yellow_flashlight', 'red_lantern', 'blue_lamp']
      )
    },
    {
      theme: 'castle',
      buildPuzzle: makePlacePuzzle(
        ['diamond', 'ruby', 'silver_star', 'crown'],
        ['dragon', 'king', 'knight'],
        [
          { item: 'diamond', target: 'dragon' },
          { item: 'crown', target: 'king' },
          { item: 'ruby', target: 'knight' }
        ],
        (item, target) => `Give the ${LABELS[item].singular} to the ${LABELS[target]}.`
      )
    }
  ];

  // =========================================================================
  // ISLAND 2 (Levels 17 - 32): A Little Harder (2-Step Containers, Tools & Counting to 3)
  // =========================================================================
  const ISLAND_2_DEFS = [
    {
      theme: 'hallway',
      buildPuzzle: makeContainerUnlockPuzzle([
        { jar: 'jar_blue', door: 'door_red' },
        { jar: 'jar_green', door: 'door_purple' },
        { jar: 'jar_yellow', door: 'door_orange' }
      ])
    },
    {
      theme: 'barn',
      buildPuzzle: makeFeedPuzzle(
        ['pig', 'horse', 'cow'],
        ['apple', 'carrot', 'strawberry', 'grapes'],
        [3, 2],
        [
          { animal: 'pig', count: 3, food: 'apple' },
          { animal: 'cow', count: 3, food: 'carrot' },
          { animal: 'horse', count: 3, food: 'strawberry' }
        ]
      )
    },
    {
      theme: 'bedroom',
      buildPuzzle: makePlacePuzzle(
        ['sock', 'crown', 'robot', 'dinosaur', 'teddy_bear'],
        ['fishbowl', 'laundry_basket', 'bed', 'toy_box', 'bookshelf'],
        [
          { item: 'sock', target: 'fishbowl' },
          { item: 'crown', target: 'laundry_basket' },
          { item: 'dinosaur', target: 'bookshelf' }
        ],
        (item, target) =>
          `Put the ${LABELS[item].singular} ${
            target === 'bed' || target === 'bookshelf' ? 'on' : 'in'
          } the ${LABELS[target]}.`
      )
    },
    {
      theme: 'beach',
      buildPuzzle: makeDigPuzzle([
        { spot: 'palm_tree', treasure: 'gold_chest' },
        { spot: 'big_rock', treasure: 'pink_shell' },
        { spot: 'red_umbrella', treasure: 'silver_star' }
      ])
    },
    {
      theme: 'kitchen',
      buildPuzzle: makePlacePuzzle(
        ['cheese', 'pancake', 'carrot', 'cupcake', 'pizza'],
        ['toaster', 'fridge', 'blue_plate', 'green_plate', 'red_pan'],
        [
          { item: 'cheese', target: 'toaster' },
          { item: 'carrot', target: 'fridge' },
          { item: 'pancake', target: 'green_plate' }
        ],
        (item, target) =>
          `Put the ${LABELS[item].singular} ${target === 'fridge' ? 'in' : 'on'} the ${LABELS[target]}.`
      )
    },
    {
      theme: 'jungle',
      buildPuzzle: makeFeedPuzzle(
        ['monkey', 'hippo', 'parrot'],
        ['banana', 'lemon', 'mango', 'cookie'],
        [3, 2],
        [
          { animal: 'monkey', count: 3, food: 'banana' },
          { animal: 'hippo', count: 3, food: 'mango' },
          { animal: 'parrot', count: 2, food: 'lemon' }
        ]
      )
    },
    {
      theme: 'wizard',
      buildPuzzle: makeWakePuzzle([
        { box: 'star_box', sleeper: 'baby_dragon' },
        { box: 'moon_box', sleeper: 'sleeping_frog' },
        { box: 'sun_box', sleeper: 'stone_owl' }
      ])
    },
    {
      theme: 'party',
      buildPuzzle: makePlacePuzzle(
        ['sunglasses', 'party_hat', 'bow_tie', 'crown'],
        ['spotted_dog', 'white_cat', 'fluffy_bunny'],
        [
          { item: 'sunglasses', target: 'spotted_dog' },
          { item: 'crown', target: 'white_cat' },
          { item: 'party_hat', target: 'fluffy_bunny' }
        ]
      )
    },
    {
      theme: 'snow',
      buildPuzzle: makePlacePuzzle(
        ['yellow_boots', 'green_mittens', 'blue_scarf', 'red_hat'],
        ['brown_bear', 'little_snowman', 'tall_snowman'],
        [
          { item: 'yellow_boots', target: 'brown_bear' },
          { item: 'green_mittens', target: 'tall_snowman' },
          { item: 'red_hat', target: 'little_snowman' }
        ]
      )
    },
    {
      theme: 'hallway',
      buildPuzzle: makeContainerUnlockPuzzle([
        { jar: 'jar_green', door: 'door_purple' },
        { jar: 'jar_yellow', door: 'door_red' },
        { jar: 'jar_blue', door: 'door_orange' }
      ])
    },
    {
      theme: 'picnic',
      buildPuzzle: makeFeedPuzzle(
        ['orange_monster', 'green_monster', 'purple_monster'],
        ['donut', 'cupcake', 'pizza', 'taco'],
        [3, 2],
        [
          { animal: 'orange_monster', count: 3, food: 'donut' },
          { animal: 'green_monster', count: 3, food: 'pizza' },
          { animal: 'purple_monster', count: 3, food: 'cupcake' }
        ],
        'Give'
      )
    },
    {
      theme: 'beach',
      buildPuzzle: makeDigPuzzle([
        { spot: 'big_rock', treasure: 'pink_shell' },
        { spot: 'red_umbrella', treasure: 'gold_chest' },
        { spot: 'palm_tree', treasure: 'silver_star' }
      ])
    },
    {
      theme: 'garage',
      buildPuzzle: makePlacePuzzle(
        ['jet_wings', 'big_wheels', 'shiny_horn', 'crown'],
        ['red_car', 'yellow_bus', 'blue_truck'],
        [
          { item: 'jet_wings', target: 'red_car' },
          { item: 'big_wheels', target: 'yellow_bus' },
          { item: 'shiny_horn', target: 'blue_truck' }
        ]
      )
    },
    {
      theme: 'wizard',
      buildPuzzle: makeWakePuzzle([
        { box: 'moon_box', sleeper: 'sleeping_frog' },
        { box: 'sun_box', sleeper: 'baby_dragon' },
        { box: 'star_box', sleeper: 'stone_owl' }
      ])
    },
    {
      theme: 'space',
      buildPuzzle: makePlacePuzzle(
        ['alien', 'robot', 'astronaut'],
        ['green_saucer', 'silver_rocket', 'blue_rover'],
        [
          { item: 'alien', target: 'green_saucer' },
          { item: 'robot', target: 'silver_rocket' },
          { item: 'astronaut', target: 'blue_rover' }
        ],
        (item, target) => `Put the ${LABELS[item].singular} in the ${LABELS[target]}.`
      )
    },
    {
      theme: 'castle',
      buildPuzzle: makeCastleUnlock2StepPuzzle([
        { spot: 'royal_pillow', lock: 'treasure_chest' },
        { spot: 'gold_crown_stand', lock: 'magic_book' },
        { spot: 'red_shield', lock: 'castle_gate' }
      ])
    }
  ];

  // =========================================================================
  // ISLAND 3 (Levels 33 - 48): Compound 2-Part Sentences ("and" / "then")
  // =========================================================================
  const ISLAND_3_DEFS = [
    {
      theme: 'campfire',
      buildPuzzle: makeCampfirePuzzle([
        { light: 'yellow_flashlight', snack: 'marshmallow', animal: 'fox' },
        { light: 'red_lantern', snack: 'hot_dog', animal: 'bear' },
        { light: 'blue_lamp', snack: 'apple', animal: 'owl' }
      ])
    },
    {
      theme: 'garden',
      buildPuzzle: makeGardenPuzzle([
        { can: 'can_blue', plant: 'sunflower', holder: 'basket' },
        { can: 'can_red', plant: 'rose', holder: 'wagon' },
        { can: 'can_green', plant: 'pumpkin', holder: 'wheelbarrow' }
      ])
    },
    {
      theme: 'space',
      buildPuzzle: makeSpacePuzzle([
        { pilot: 'astronaut', ship: 'silver_rocket', button: 'button_green' },
        { pilot: 'alien', ship: 'green_saucer', button: 'button_purple' },
        { pilot: 'robot', ship: 'blue_rover', button: 'button_yellow' }
      ])
    },
    {
      theme: 'hallway',
      buildPuzzle: makeContainerUnlockPuzzle([
        { jar: 'jar_yellow', door: 'door_orange' },
        { jar: 'jar_blue', door: 'door_purple' },
        { jar: 'jar_green', door: 'door_red' }
      ])
    },
    {
      theme: 'campfire',
      buildPuzzle: makeCampfirePuzzle([
        { light: 'red_lantern', snack: 'hot_dog', animal: 'bear' },
        { light: 'blue_lamp', snack: 'cookie', animal: 'fox' },
        { light: 'yellow_flashlight', snack: 'apple', animal: 'owl' }
      ])
    },
    {
      theme: 'garden',
      buildPuzzle: makeGardenPuzzle([
        { can: 'can_red', plant: 'rose', holder: 'wagon' },
        { can: 'can_green', plant: 'sunflower', holder: 'wheelbarrow' },
        { can: 'can_blue', plant: 'pumpkin', holder: 'basket' }
      ])
    },
    {
      theme: 'space',
      buildPuzzle: makeSpacePuzzle([
        { pilot: 'alien', ship: 'green_saucer', button: 'button_purple' },
        { pilot: 'robot', ship: 'silver_rocket', button: 'button_green' },
        { pilot: 'astronaut', ship: 'blue_rover', button: 'button_yellow' }
      ])
    },
    {
      theme: 'beach',
      buildPuzzle: makeDigPuzzle([
        { spot: 'red_umbrella', treasure: 'silver_star' },
        { spot: 'palm_tree', treasure: 'pink_shell' },
        { spot: 'big_rock', treasure: 'gold_chest' }
      ])
    },
    {
      theme: 'wizard',
      buildPuzzle: makeWakePuzzle([
        { box: 'sun_box', sleeper: 'stone_owl' },
        { box: 'star_box', sleeper: 'sleeping_frog' },
        { box: 'moon_box', sleeper: 'baby_dragon' }
      ])
    },
    {
      theme: 'garden',
      buildPuzzle: makeGardenPuzzle([
        { can: 'can_green', plant: 'pumpkin', holder: 'wheelbarrow' },
        { can: 'can_blue', plant: 'rose', holder: 'basket' },
        { can: 'can_red', plant: 'sunflower', holder: 'wagon' }
      ])
    },
    {
      theme: 'campfire',
      buildPuzzle: makeCampfirePuzzle([
        { light: 'blue_lamp', snack: 'apple', animal: 'owl' },
        { light: 'yellow_flashlight', snack: 'hot_dog', animal: 'fox' },
        { light: 'red_lantern', snack: 'marshmallow', animal: 'bear' }
      ])
    },
    {
      theme: 'space',
      buildPuzzle: makeSpacePuzzle([
        { pilot: 'robot', ship: 'blue_rover', button: 'button_yellow' },
        { pilot: 'astronaut', ship: 'green_saucer', button: 'button_green' },
        { pilot: 'alien', ship: 'silver_rocket', button: 'button_purple' }
      ])
    },
    {
      theme: 'jungle',
      buildPuzzle: makeFeedPuzzle(
        ['parrot', 'monkey', 'hippo'],
        ['cookie', 'lemon', 'mango', 'banana'],
        [3, 2],
        [
          { animal: 'parrot', count: 3, food: 'cookie' },
          { animal: 'hippo', count: 3, food: 'lemon' },
          { animal: 'monkey', count: 3, food: 'mango' }
        ]
      )
    },
    {
      theme: 'party',
      buildPuzzle: makePlacePuzzle(
        ['crown', 'party_hat', 'bow_tie', 'sunglasses'],
        ['fluffy_bunny', 'spotted_dog', 'white_cat'],
        [
          { item: 'crown', target: 'fluffy_bunny' },
          { item: 'bow_tie', target: 'spotted_dog' },
          { item: 'sunglasses', target: 'white_cat' }
        ],
        (item, target) =>
          `Put the ${item === 'crown' ? 'gold crown' : LABELS[item].singular} on the ${LABELS[target]}.`
      )
    },
    {
      theme: 'garage',
      buildPuzzle: makePlacePuzzle(
        ['shiny_horn', 'jet_wings', 'big_wheels', 'crown'],
        ['yellow_bus', 'blue_truck', 'red_car'],
        [
          { item: 'shiny_horn', target: 'yellow_bus' },
          { item: 'jet_wings', target: 'blue_truck' },
          { item: 'big_wheels', target: 'red_car' }
        ]
      )
    },
    {
      theme: 'castle',
      buildPuzzle: makeCastleUnlock2StepPuzzle([
        { spot: 'red_shield', lock: 'castle_gate' },
        { spot: 'royal_pillow', lock: 'magic_book' },
        { spot: 'gold_crown_stand', lock: 'treasure_chest' }
      ])
    }
  ];

  // =========================================================================
  // ISLAND 4 (Levels 49 - 64): Master Reader Multi-Step Quests & Silly Combos
  // =========================================================================
  const ISLAND_4_DEFS = [
    {
      theme: 'living_room',
      buildPuzzle: makePlacePuzzle(
        ['pineapple', 'lemon', 'banana', 'apple', 'pear'],
        ['lamp', 'chair', 'sofa', 'table', 'rug'],
        [
          { item: 'pineapple', target: 'lamp' },
          { item: 'lemon', target: 'chair' },
          { item: 'pear', target: 'sofa' }
        ]
      )
    },
    {
      theme: 'castle',
      buildPuzzle: makeCastleFinalePuzzle([
        { spot: 'royal_pillow', lock: 'treasure_chest', hero: 'dragon' },
        { spot: 'gold_crown_stand', lock: 'magic_book', hero: 'king' },
        { spot: 'red_shield', lock: 'castle_gate', hero: 'knight' }
      ])
    },
    {
      theme: 'kitchen',
      buildPuzzle: makePlacePuzzle(
        ['cupcake', 'pizza', 'cheese', 'pancake', 'carrot'],
        ['fridge', 'toaster', 'red_pan', 'blue_plate', 'green_plate'],
        [
          { item: 'cupcake', target: 'fridge' },
          { item: 'pizza', target: 'toaster' },
          { item: 'cheese', target: 'green_plate' }
        ],
        (item, target) =>
          `Put the ${LABELS[item].singular} ${target === 'fridge' ? 'in' : 'on'} the ${LABELS[target]}.`
      )
    },
    {
      theme: 'castle',
      buildPuzzle: makeCastleFinalePuzzle([
        { spot: 'gold_crown_stand', lock: 'magic_book', hero: 'king' },
        { spot: 'red_shield', lock: 'treasure_chest', hero: 'knight' },
        { spot: 'royal_pillow', lock: 'castle_gate', hero: 'dragon' }
      ])
    },
    {
      theme: 'campfire',
      buildPuzzle: makeCampfirePuzzle([
        { light: 'yellow_flashlight', snack: 'cookie', animal: 'bear' },
        { light: 'blue_lamp', snack: 'marshmallow', animal: 'owl' },
        { light: 'red_lantern', snack: 'apple', animal: 'fox' }
      ])
    },
    {
      theme: 'garden',
      buildPuzzle: makeGardenPuzzle([
        { can: 'can_green', plant: 'rose', holder: 'basket' },
        { can: 'can_red', plant: 'pumpkin', holder: 'wagon' },
        { can: 'can_blue', plant: 'sunflower', holder: 'wheelbarrow' }
      ])
    },
    {
      theme: 'space',
      buildPuzzle: makeSpacePuzzle([
        { pilot: 'robot', ship: 'silver_rocket', button: 'button_yellow' },
        { pilot: 'astronaut', ship: 'green_saucer', button: 'button_purple' },
        { pilot: 'alien', ship: 'blue_rover', button: 'button_green' }
      ])
    },
    {
      theme: 'castle',
      buildPuzzle: makeCastleFinalePuzzle([
        { spot: 'red_shield', lock: 'castle_gate', hero: 'knight' },
        { spot: 'royal_pillow', lock: 'magic_book', hero: 'dragon' },
        { spot: 'gold_crown_stand', lock: 'treasure_chest', hero: 'king' }
      ])
    },
    {
      theme: 'bedroom',
      buildPuzzle: makePlacePuzzle(
        ['crown', 'robot', 'teddy_bear', 'dinosaur', 'sock'],
        ['fishbowl', 'bed', 'toy_box', 'laundry_basket', 'bookshelf'],
        [
          { item: 'crown', target: 'fishbowl' },
          { item: 'robot', target: 'bed' },
          { item: 'teddy_bear', target: 'laundry_basket' }
        ],
        (item, target) =>
          `Put the ${LABELS[item].singular} ${
            target === 'bed' || target === 'bookshelf' ? 'on' : 'in'
          } the ${LABELS[target]}.`
      )
    },
    {
      theme: 'snow',
      buildPuzzle: makePlacePuzzle(
        ['green_mittens', 'red_hat', 'blue_scarf', 'yellow_boots'],
        ['little_snowman', 'brown_bear', 'tall_snowman'],
        [
          { item: 'green_mittens', target: 'little_snowman' },
          { item: 'red_hat', target: 'brown_bear' },
          { item: 'yellow_boots', target: 'tall_snowman' }
        ]
      )
    },
    {
      theme: 'beach',
      buildPuzzle: makeDigPuzzle([
        { spot: 'red_umbrella', treasure: 'gold_chest' },
        { spot: 'big_rock', treasure: 'silver_star' },
        { spot: 'palm_tree', treasure: 'pink_shell' }
      ])
    },
    {
      theme: 'wizard',
      buildPuzzle: makeWakePuzzle([
        { box: 'sun_box', sleeper: 'baby_dragon' },
        { box: 'moon_box', sleeper: 'stone_owl' },
        { box: 'star_box', sleeper: 'sleeping_frog' }
      ])
    },
    {
      theme: 'campfire',
      buildPuzzle: makeCampfirePuzzle([
        { light: 'red_lantern', snack: 'marshmallow', animal: 'owl' },
        { light: 'yellow_flashlight', snack: 'cookie', animal: 'fox' },
        { light: 'blue_lamp', snack: 'hot_dog', animal: 'bear' }
      ])
    },
    {
      theme: 'garden',
      buildPuzzle: makeGardenPuzzle([
        { can: 'can_blue', plant: 'pumpkin', holder: 'wagon' },
        { can: 'can_green', plant: 'sunflower', holder: 'basket' },
        { can: 'can_red', plant: 'rose', holder: 'wheelbarrow' }
      ])
    },
    {
      theme: 'space',
      buildPuzzle: makeSpacePuzzle([
        { pilot: 'astronaut', ship: 'green_saucer', button: 'button_green' },
        { pilot: 'alien', ship: 'blue_rover', button: 'button_yellow' },
        { pilot: 'robot', ship: 'silver_rocket', button: 'button_purple' }
      ])
    },
    {
      theme: 'castle',
      buildPuzzle: makeCastleFinalePuzzle([
        { spot: 'gold_crown_stand', lock: 'treasure_chest', hero: 'king' },
        { spot: 'royal_pillow', lock: 'castle_gate', hero: 'knight' },
        { spot: 'red_shield', lock: 'magic_book', hero: 'dragon' }
      ])
    }
  ];

  const ALL_ISLAND_DEFS = [ISLAND_1_DEFS, ISLAND_2_DEFS, ISLAND_3_DEFS, ISLAND_4_DEFS];

  const LEVELS = [];
  ALL_ISLAND_DEFS.forEach((islandDefs, islandIdx) => {
    const islandNum = islandIdx + 1;
    islandDefs.forEach((def, localIdx) => {
      const localNum = localIdx + 1;
      const globalId = islandIdx * 16 + localNum;
      const coord = ISLAND_COORDS[localIdx];
      LEVELS.push({
        id: globalId,
        island: islandNum,
        islandLevel: localNum,
        theme: def.theme,
        mapX: coord.mapX,
        mapY: coord.mapY,
        buildPuzzle: def.buildPuzzle
      });
    });
  });

  return {
    ISLANDS,
    LEVELS,
    LABELS,
    getLevel(id) {
      return LEVELS.find((l) => l.id === Number(id));
    },
    getLevelsByIsland(islandId) {
      return LEVELS.filter((l) => l.island === Number(islandId));
    }
  };
})();
