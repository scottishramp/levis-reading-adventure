/**
 * Levi's Reading Adventure - Level & Sentence Definitions
 * Each level is a rich visual comprehension scene on the Mario-style Overworld.
 * Sentences are dynamically generated from templates with randomized words
 * (while offering signature curated first-play sentences matching classic prompts).
 */

window.LeviLevels = (function () {
  // Helper to pick random item from array
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

  // Human-readable display labels for items & targets
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
    melon: { singular: 'melon', plural: 'melons' },

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

  const WORLDS = [
    {
      id: 1,
      name: 'World 1: Cozy Meadow',
      subtitle: 'Home, Barn & Hallway',
      color: '#58b947',
      accent: '#f59e0b'
    },
    {
      id: 2,
      name: 'World 2: Sunny Coast',
      subtitle: 'Kitchen, Jungle & Pirate Beach',
      color: '#0ea5e9',
      accent: '#eab308'
    },
    {
      id: 3,
      name: 'World 3: Whispering Woods',
      subtitle: 'Wizard, Monsters & Campfire',
      color: '#8b5cf6',
      accent: '#ec4899'
    },
    {
      id: 4,
      name: 'World 4: Starry Kingdom',
      subtitle: 'Snow Peak, Space & Royal Castle',
      color: '#f97316',
      accent: '#3b82f6'
    }
  ];

  /**
   * 16 Levels across 4 Worlds on the Mario Overworld Map
   * Coordinates (mapX, mapY) are in a 1000x620 virtual SVG map coordinate system.
   */
  const LEVELS = [
    // ==================== WORLD 1 ====================
    {
      id: 1,
      world: 1,
      title: 'Fruit & Furniture Room',
      icon: '🍌',
      theme: 'living_room',
      mapX: 110,
      mapY: 490,
      type: 'place',
      preposition: 'on',
      itemsPool: ['banana', 'apple', 'pear', 'watermelon', 'pineapple'],
      targetsPool: ['chair', 'lamp', 'table', 'sofa', 'rug'],
      // Featured starter options so Levi gets the classic examples first, plus endless random combos
      starterCombos: [
        { item: 'banana', target: 'chair' },
        { item: 'apple', target: 'lamp' },
        { item: 'pear', target: 'table' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                item: pick(this.itemsPool),
                target: pick(this.targetsPool)
              };
        const itemLabel = LABELS[combo.item].singular;
        const targetLabel = LABELS[combo.target];
        const sentence = `Put the ${itemLabel} on the ${targetLabel}.`;

        return {
          type: 'place',
          sentence,
          targetItem: combo.item,
          targetDest: combo.target,
          targets: this.targetsPool.map((id) => ({
            id,
            label: LABELS[id]
          })),
          items: shuffle(this.itemsPool).map((id, idx) => ({
            uid: `${id}_${idx}`,
            id,
            label: LABELS[id].singular
          }))
        };
      }
    },

    {
      id: 2,
      world: 1,
      title: 'Hungry Horse Barn',
      icon: '🐴',
      theme: 'barn',
      mapX: 230,
      mapY: 450,
      type: 'feed',
      animalsPool: ['horse', 'pig', 'cow'],
      foodsPool: ['grapes', 'apple', 'carrot', 'strawberry'],
      countsPool: [2, 3, 1],
      starterCombos: [
        { animal: 'horse', count: 2, food: 'grapes' },
        { animal: 'pig', count: 3, food: 'apple' },
        { animal: 'cow', count: 2, food: 'carrot' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                animal: pick(this.animalsPool),
                count: pick(this.countsPool),
                food: pick(this.foodsPool)
              };

        const numWord = NUMBER_WORDS[combo.count];
        const foodWord =
          combo.count === 1
            ? LABELS[combo.food].singleClusterLabel || LABELS[combo.food].singular
            : LABELS[combo.food].plural;
        const animalWord = LABELS[combo.animal];
        const sentence = `Feed the ${animalWord} ${numWord} ${foodWord}.`;

        // Spawn 3 of the required food and 1 of two distractor foods (5 draggable foods total so they fit cleanly on mobile)
        const otherFoods = shuffle(this.foodsPool.filter((f) => f !== combo.food)).slice(0, 2);
        const itemInstances = [];
        for (let i = 0; i < 3; i++) {
          itemInstances.push({ uid: `${combo.food}_req_${i}`, id: combo.food, label: LABELS[combo.food].singular });
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
          targets: this.animalsPool.map((id) => ({
            id,
            label: LABELS[id]
          })),
          items: shuffle(itemInstances)
        };
      }
    },

    {
      id: 3,
      world: 1,
      title: 'The Mystery Doors',
      icon: '🔑',
      theme: 'hallway',
      mapX: 345,
      mapY: 390,
      type: 'container_unlock',
      containersPool: [
        { id: 'jar_blue', keyId: 'key_blue', color: 'blue' },
        { id: 'jar_green', keyId: 'key_green', color: 'green' },
        { id: 'jar_yellow', keyId: 'key_yellow', color: 'yellow' }
      ],
      doorsPool: ['door_red', 'door_purple', 'door_orange'],
      starterCombos: [
        { jar: 'jar_blue', door: 'door_red' },
        { jar: 'jar_green', door: 'door_purple' },
        { jar: 'jar_yellow', door: 'door_orange' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                jar: pick(this.containersPool).id,
                door: pick(this.doorsPool)
              };

        const jarObj = this.containersPool.find((c) => c.id === combo.jar);
        const jarLabel = LABELS[combo.jar];
        const doorLabel = LABELS[combo.door];
        const sentence = `Use the key in the ${jarLabel} to open the ${doorLabel}.`;

        return {
          type: 'container_unlock',
          sentence,
          targetContainer: combo.jar,
          targetKey: jarObj.keyId,
          targetDoor: combo.door,
          containers: this.containersPool.map((c) => ({
            id: c.id,
            keyId: c.keyId,
            label: LABELS[c.id]
          })),
          doors: this.doorsPool.map((d) => ({
            id: d,
            label: LABELS[d]
          })),
          targets: [
            ...this.doorsPool.map((d) => ({ id: d, label: LABELS[d], role: 'door' })),
            ...this.containersPool.map((c) => ({
              id: c.id,
              keyId: c.keyId,
              label: LABELS[c.id],
              role: 'container',
              tapHint: 'Tap jar to open!'
            }))
          ],
          items: [] // Keys spawn when jars are tapped open!
        };
      }
    },

    {
      id: 4,
      world: 1,
      title: 'Silly Bedroom',
      icon: '🦖',
      theme: 'bedroom',
      mapX: 235,
      mapY: 310,
      type: 'place',
      preposition: 'in',
      itemsPool: ['teddy_bear', 'robot', 'dinosaur', 'sock', 'crown'],
      targetsPool: ['toy_box', 'bed', 'laundry_basket', 'bookshelf', 'fishbowl'],
      starterCombos: [
        { item: 'dinosaur', target: 'bed' },
        { item: 'sock', target: 'fishbowl' },
        { item: 'robot', target: 'toy_box' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                item: pick(this.itemsPool),
                target: pick(this.targetsPool)
              };
        const prep = combo.target === 'bed' || combo.target === 'bookshelf' ? 'on' : 'in';
        const sentence = `Put the ${LABELS[combo.item].singular} ${prep} the ${LABELS[combo.target]}.`;

        return {
          type: 'place',
          sentence,
          targetItem: combo.item,
          targetDest: combo.target,
          targets: this.targetsPool.map((id) => ({ id, label: LABELS[id] })),
          items: shuffle(this.itemsPool).map((id, idx) => ({
            uid: `${id}_${idx}`,
            id,
            label: LABELS[id].singular
          }))
        };
      }
    },

    // ==================== WORLD 2 ====================
    {
      id: 5,
      world: 2,
      title: 'Chef Levi Kitchen',
      icon: '🥞',
      theme: 'kitchen',
      mapX: 360,
      mapY: 230,
      type: 'place',
      itemsPool: ['cheese', 'pancake', 'carrot', 'cupcake', 'pizza'],
      targetsPool: ['blue_plate', 'green_plate', 'red_pan', 'toaster', 'fridge'],
      starterCombos: [
        { item: 'pancake', target: 'blue_plate' },
        { item: 'cheese', target: 'toaster' },
        { item: 'pizza', target: 'red_pan' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                item: pick(this.itemsPool),
                target: pick(this.targetsPool)
              };
        const prep = combo.target === 'fridge' ? 'in' : 'on';
        const sentence = `Put the ${LABELS[combo.item].singular} ${prep} the ${LABELS[combo.target]}.`;

        return {
          type: 'place',
          sentence,
          targetItem: combo.item,
          targetDest: combo.target,
          targets: this.targetsPool.map((id) => ({ id, label: LABELS[id] })),
          items: shuffle(this.itemsPool).map((id, idx) => ({
            uid: `${id}_${idx}`,
            id,
            label: LABELS[id].singular
          }))
        };
      }
    },

    {
      id: 6,
      world: 2,
      title: 'Jungle River Snacks',
      icon: '🐒',
      theme: 'jungle',
      mapX: 485,
      mapY: 185,
      type: 'feed',
      animalsPool: ['monkey', 'hippo', 'parrot'],
      foodsPool: ['banana', 'melon', 'cookie', 'mango'],
      countsPool: [2, 3, 1],
      starterCombos: [
        { animal: 'hippo', count: 2, food: 'melon' },
        { animal: 'monkey', count: 3, food: 'banana' },
        { animal: 'parrot', count: 2, food: 'cookie' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                animal: pick(this.animalsPool),
                count: pick(this.countsPool),
                food: pick(this.foodsPool)
              };

        const numWord = NUMBER_WORDS[combo.count];
        const foodWord = combo.count === 1 ? LABELS[combo.food].singular : LABELS[combo.food].plural;
        const sentence = `Feed the ${LABELS[combo.animal]} ${numWord} ${foodWord}.`;

        const otherFoods = shuffle(this.foodsPool.filter((f) => f !== combo.food)).slice(0, 2);
        const itemInstances = [];
        for (let i = 0; i < 3; i++) {
          itemInstances.push({ uid: `${combo.food}_req_${i}`, id: combo.food, label: LABELS[combo.food].singular });
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
          targets: this.animalsPool.map((id) => ({ id, label: LABELS[id] })),
          items: shuffle(itemInstances)
        };
      }
    },

    {
      id: 7,
      world: 2,
      title: 'Pirate Treasure Cove',
      icon: '🏴‍☠️',
      theme: 'beach',
      mapX: 590,
      mapY: 260,
      type: 'dig',
      hidingPool: ['palm_tree', 'big_rock', 'red_umbrella'],
      treasuresPool: ['gold_chest', 'pink_shell', 'silver_star'],
      starterCombos: [
        { spot: 'palm_tree', treasure: 'gold_chest' },
        { spot: 'big_rock', treasure: 'pink_shell' },
        { spot: 'red_umbrella', treasure: 'silver_star' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                spot: pick(this.hidingPool),
                treasure: pick(this.treasuresPool)
              };

        const sentence = `Use the shovel under the ${LABELS[combo.spot]} to dig up the ${LABELS[combo.treasure].singular}.`;

        return {
          type: 'dig',
          sentence,
          targetContainer: combo.spot,
          targetTreasure: combo.treasure,
          targets: [
            ...this.treasuresPool.map((t) => ({
              id: `mound_${t}`,
              treasureId: t,
              spriteId: 'dig_spot',
              badgeItem: t,
              label: `${LABELS[t].singular} spot`,
              role: 'mound'
            })),
            ...this.hidingPool.map((h) => ({
              id: h,
              keyId: 'shovel',
              label: LABELS[h],
              role: 'container',
              tapHint: 'Tap to grab shovel!'
            }))
          ],
          items: []
        };
      }
    },

    {
      id: 8,
      world: 2,
      title: 'Pet Party Dress-Up',
      icon: '🐶',
      theme: 'party',
      mapX: 495,
      mapY: 365,
      type: 'place',
      itemsPool: ['party_hat', 'bow_tie', 'sunglasses', 'crown'],
      targetsPool: ['spotted_dog', 'white_cat', 'fluffy_bunny'],
      starterCombos: [
        { item: 'sunglasses', target: 'spotted_dog' },
        { item: 'party_hat', target: 'white_cat' },
        { item: 'bow_tie', target: 'fluffy_bunny' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                item: pick(this.itemsPool),
                target: pick(this.targetsPool)
              };
        const itemLabel = combo.item === 'crown' ? 'gold crown' : LABELS[combo.item].singular;
        const sentence = `Put the ${itemLabel} on the ${LABELS[combo.target]}.`;

        return {
          type: 'place',
          sentence,
          targetItem: combo.item,
          targetDest: combo.target,
          targets: this.targetsPool.map((id) => ({ id, label: LABELS[id] })),
          items: shuffle(this.itemsPool).map((id, idx) => ({
            uid: `${id}_${idx}`,
            id,
            label: id === 'crown' ? 'gold crown' : LABELS[id].singular
          }))
        };
      }
    },

    // ==================== WORLD 3 ====================
    {
      id: 9,
      world: 3,
      title: 'Wizard Workshop',
      icon: '🪄',
      theme: 'wizard',
      mapX: 540,
      mapY: 485,
      type: 'wake',
      boxesPool: ['star_box', 'moon_box', 'sun_box'],
      sleepersPool: ['sleeping_frog', 'stone_owl', 'baby_dragon'],
      starterCombos: [
        { box: 'star_box', sleeper: 'baby_dragon' },
        { box: 'moon_box', sleeper: 'sleeping_frog' },
        { box: 'sun_box', sleeper: 'stone_owl' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                box: pick(this.boxesPool),
                sleeper: pick(this.sleepersPool)
              };
        const sentence = `Use the wand in the ${LABELS[combo.box]} to wake up the ${LABELS[combo.sleeper]}.`;

        return {
          type: 'wake',
          sentence,
          targetContainer: combo.box,
          targetSleeper: combo.sleeper,
          targets: [
            ...this.sleepersPool.map((s) => ({
              id: s,
              label: LABELS[s],
              role: 'sleeper'
            })),
            ...this.boxesPool.map((b) => ({
              id: b,
              keyId: 'wand',
              label: LABELS[b],
              role: 'container',
              tapHint: 'Tap box to open!'
            }))
          ],
          items: []
        };
      }
    },

    {
      id: 10,
      world: 3,
      title: 'Monster Picnic',
      icon: '👾',
      theme: 'picnic',
      mapX: 665,
      mapY: 495,
      type: 'feed',
      animalsPool: ['green_monster', 'purple_monster', 'orange_monster'],
      foodsPool: ['cupcake', 'taco', 'pizza', 'donut'],
      countsPool: [2, 3, 1],
      starterCombos: [
        { animal: 'purple_monster', count: 2, food: 'taco' },
        { animal: 'green_monster', count: 3, food: 'cupcake' },
        { animal: 'orange_monster', count: 2, food: 'donut' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                animal: pick(this.animalsPool),
                count: pick(this.countsPool),
                food: pick(this.foodsPool)
              };
        const numWord = NUMBER_WORDS[combo.count];
        const foodWord = combo.count === 1 ? LABELS[combo.food].singular : LABELS[combo.food].plural;
        const sentence = `Give the ${LABELS[combo.animal]} ${numWord} ${foodWord}.`;

        const otherFoods = shuffle(this.foodsPool.filter((f) => f !== combo.food)).slice(0, 2);
        const itemInstances = [];
        for (let i = 0; i < 3; i++) {
          itemInstances.push({ uid: `${combo.food}_req_${i}`, id: combo.food, label: LABELS[combo.food].singular });
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
          targets: this.animalsPool.map((id) => ({ id, label: LABELS[id] })),
          items: shuffle(itemInstances)
        };
      }
    },

    {
      id: 11,
      world: 3,
      title: 'Magic Garden Patch',
      icon: '🌻',
      theme: 'garden',
      mapX: 735,
      mapY: 390,
      type: 'garden',
      cansPool: ['can_blue', 'can_red', 'can_green'],
      plantsPool: ['sunflower', 'rose', 'pumpkin'],
      holdersPool: ['basket', 'wagon', 'wheelbarrow'],
      starterCombos: [
        { can: 'can_blue', plant: 'sunflower', holder: 'basket' },
        { can: 'can_red', plant: 'rose', holder: 'wagon' },
        { can: 'can_green', plant: 'pumpkin', holder: 'wheelbarrow' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                can: pick(this.cansPool),
                plant: pick(this.plantsPool),
                holder: pick(this.holdersPool)
              };

        const sentence = `Use the ${LABELS[combo.can]} to grow the ${LABELS[combo.plant].singular}, then put it in the ${LABELS[combo.holder]}.`;

        return {
          type: 'garden',
          sentence,
          targetCan: combo.can,
          targetPlant: combo.plant,
          targetSprout: `sprout_${combo.plant}`,
          targetHolder: combo.holder,
          targets: [
            ...this.plantsPool.map((p) => ({
              id: `sprout_${p}`,
              plantId: p,
              label: `${LABELS[p].singular} sprout`,
              role: 'sprout'
            })),
            ...this.holdersPool.map((h) => ({
              id: h,
              label: LABELS[h],
              role: 'holder'
            }))
          ],
          items: shuffle(this.cansPool).map((id, idx) => ({
            uid: `${id}_${idx}`,
            id,
            label: LABELS[id]
          }))
        };
      }
    },

    {
      id: 12,
      world: 3,
      title: 'Campfire Woods',
      icon: '⛺',
      theme: 'campfire',
      mapX: 660,
      mapY: 295,
      type: 'campfire',
      lightsPool: ['yellow_flashlight', 'red_lantern', 'blue_lamp'],
      snacksPool: ['marshmallow', 'hot_dog', 'apple', 'cookie'],
      animalsPool: ['fox', 'bear', 'owl'],
      starterCombos: [
        { light: 'yellow_flashlight', snack: 'marshmallow', animal: 'fox' },
        { light: 'red_lantern', snack: 'hot_dog', animal: 'bear' },
        { light: 'blue_lamp', snack: 'apple', animal: 'owl' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                light: pick(this.lightsPool),
                snack: pick(this.snacksPool),
                animal: pick(this.animalsPool)
              };

        const sentence = `Turn on the ${LABELS[combo.light]} and give the ${LABELS[combo.snack].singular} to the ${LABELS[combo.animal]}.`;

        return {
          type: 'campfire',
          sentence,
          targetLight: combo.light,
          targetSnack: combo.snack,
          targetAnimal: combo.animal,
          targets: [
            ...this.lightsPool.map((l) => ({
              id: l,
              label: LABELS[l],
              role: 'light',
              tapHint: 'Tap to switch on!'
            })),
            ...this.animalsPool.map((a) => ({
              id: a,
              label: LABELS[a],
              role: 'animal'
            }))
          ],
          items: shuffle(this.snacksPool).map((id, idx) => ({
            uid: `${id}_${idx}`,
            id,
            label: LABELS[id].singular
          }))
        };
      }
    },

    // ==================== WORLD 4 ====================
    {
      id: 13,
      world: 4,
      title: 'Snowy Mountain',
      icon: '⛄',
      theme: 'snow',
      mapX: 735,
      mapY: 185,
      type: 'place',
      itemsPool: ['red_hat', 'blue_scarf', 'green_mittens', 'yellow_boots'],
      targetsPool: ['tall_snowman', 'little_snowman', 'brown_bear'],
      starterCombos: [
        { item: 'red_hat', target: 'tall_snowman' },
        { item: 'blue_scarf', target: 'little_snowman' },
        { item: 'yellow_boots', target: 'brown_bear' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                item: pick(this.itemsPool),
                target: pick(this.targetsPool)
              };

        const sentence = `Put the ${LABELS[combo.item].singular} on the ${LABELS[combo.target]}.`;

        return {
          type: 'place',
          sentence,
          targetItem: combo.item,
          targetDest: combo.target,
          targets: this.targetsPool.map((id) => ({ id, label: LABELS[id] })),
          items: shuffle(this.itemsPool).map((id, idx) => ({
            uid: `${id}_${idx}`,
            id,
            label: LABELS[id].singular
          }))
        };
      }
    },

    {
      id: 14,
      world: 4,
      title: 'Super Toy Garage',
      icon: '🚗',
      theme: 'garage',
      mapX: 835,
      mapY: 250,
      type: 'place',
      itemsPool: ['big_wheels', 'jet_wings', 'shiny_horn', 'crown'],
      targetsPool: ['red_car', 'blue_truck', 'yellow_bus'],
      starterCombos: [
        { item: 'jet_wings', target: 'red_car' },
        { item: 'big_wheels', target: 'yellow_bus' },
        { item: 'shiny_horn', target: 'blue_truck' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                item: pick(this.itemsPool),
                target: pick(this.targetsPool)
              };
        const itemLabel = combo.item === 'crown' ? 'gold crown' : LABELS[combo.item].singular;
        const sentence = `Put the ${itemLabel} on the ${LABELS[combo.target]}.`;

        return {
          type: 'place',
          sentence,
          targetItem: combo.item,
          targetDest: combo.target,
          targets: this.targetsPool.map((id) => ({ id, label: LABELS[id] })),
          items: shuffle(this.itemsPool).map((id, idx) => ({
            uid: `${id}_${idx}`,
            id,
            label: id === 'crown' ? 'gold crown' : LABELS[id].singular
          }))
        };
      }
    },

    {
      id: 15,
      world: 4,
      title: 'Star Launch Pad',
      icon: '🚀',
      theme: 'space',
      mapX: 890,
      mapY: 380,
      type: 'space',
      pilotsPool: ['astronaut', 'alien', 'robot'],
      shipsPool: ['silver_rocket', 'green_saucer', 'blue_rover'],
      buttonsPool: ['button_green', 'button_purple', 'button_yellow'],
      starterCombos: [
        { pilot: 'astronaut', ship: 'silver_rocket', button: 'button_green' },
        { pilot: 'alien', ship: 'green_saucer', button: 'button_purple' },
        { pilot: 'robot', ship: 'blue_rover', button: 'button_yellow' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                pilot: pick(this.pilotsPool),
                ship: pick(this.shipsPool),
                button: pick(this.buttonsPool)
              };

        const sentence = `Put the ${LABELS[combo.pilot].singular} in the ${LABELS[combo.ship]} and press the ${LABELS[combo.button]}.`;

        return {
          type: 'space',
          sentence,
          targetPilot: combo.pilot,
          targetShip: combo.ship,
          targetButton: combo.button,
          targets: [
            ...this.shipsPool.map((s) => ({
              id: s,
              label: LABELS[s],
              role: 'ship'
            })),
            ...this.buttonsPool.map((b) => ({
              id: b,
              label: LABELS[b],
              role: 'button',
              tapHint: 'Tap to press!'
            }))
          ],
          items: shuffle(this.pilotsPool).map((id, idx) => ({
            uid: `${id}_${idx}`,
            id,
            label: LABELS[id].singular
          }))
        };
      }
    },

    {
      id: 16,
      world: 4,
      title: "King Levi's Castle",
      icon: '🏰',
      theme: 'castle',
      mapX: 895,
      mapY: 140,
      type: 'castle_finale',
      hidingPool: ['royal_pillow', 'gold_crown_stand', 'red_shield'],
      locksPool: [
        { id: 'treasure_chest', gem: 'diamond' },
        { id: 'castle_gate', gem: 'ruby' },
        { id: 'magic_book', gem: 'silver_star' }
      ],
      heroesPool: ['king', 'dragon', 'knight'],
      starterCombos: [
        { spot: 'royal_pillow', lock: 'treasure_chest', hero: 'dragon' },
        { spot: 'gold_crown_stand', lock: 'magic_book', hero: 'king' },
        { spot: 'red_shield', lock: 'castle_gate', hero: 'knight' }
      ],
      buildPuzzle(useStarterIndex) {
        const combo =
          useStarterIndex !== undefined && this.starterCombos[useStarterIndex]
            ? this.starterCombos[useStarterIndex]
            : {
                spot: pick(this.hidingPool),
                lock: pick(this.locksPool).id,
                hero: pick(this.heroesPool)
              };

        const lockObj = this.locksPool.find((l) => l.id === combo.lock);
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
            ...this.locksPool.map((l) => ({
              id: l.id,
              gemId: l.gem,
              label: LABELS[l.id],
              role: 'lock'
            })),
            ...this.heroesPool.map((h) => ({
              id: h,
              label: LABELS[h],
              role: 'hero'
            })),
            ...this.hidingPool.map((h) => ({
              id: h,
              keyId: 'key_gold',
              label: LABELS[h],
              role: 'container',
              tapHint: 'Tap to find key!'
            }))
          ],
          items: []
        };
      }
    }
  ];

  return {
    WORLDS,
    LEVELS,
    LABELS,
    getLevel(id) {
      return LEVELS.find((l) => l.id === Number(id));
    }
  };
})();
